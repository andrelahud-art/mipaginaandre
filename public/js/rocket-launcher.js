(()=>{
    const CDN = {
        three: "https://unpkg.com/three@0.160.0/build/three.min.js",
        gltfLoader: "https://unpkg.com/three@0.160.0/examples/js/loaders/GLTFLoader.js",
        gsap: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js",
    };

    function loadScript(src){
        return new Promise((resolve,reject)=>{
            const s=document.createElement('script');
            s.src=src;
            s.async=true;
            s.onload=()=>resolve();
            s.onerror=()=>reject(new Error(`Failed to load ${src}`));
            document.head.appendChild(s);
        });
    }

    class NirvanaAscension {
        constructor(){
            this.THREE = null;
            this.gsap = null;
            this.animationFrameId = null;
            this.overlay = null;
            this.canvas = null;
            this.countdownText = null;
            this.scene = null;
            this.camera = null;
            this.renderer = null;
            this.rocket = null;
            this.logo = null;
            this.particleSystem = null;
            this.sounds = {};
            this.tl = null;

            this.init();
        }

            async init(){
            try {
                    // Only on homepage
                    try { if (location && location.pathname !== '/') { return; } } catch(_) {}
                    // Run once per session
                    try{ if(window.sessionStorage && sessionStorage.getItem('nirvanaShown')==='1'){ return; } }catch(_){ /* ignore */ }
                if(!this.isWebGLAvailable()){
                    return; // fallback: do nothing
                }
                await this.loadLibs();
                this.createDOM();
                this.setupScene();
                this.setupAudio();
                await this.loadAssets();
                this.wireEscToCleanup();
                this.startAnimation();
            } catch(err){
                console.warn('Nirvana init failed, cleaning up.', err);
                this.cleanup();
            }
        }

        isWebGLAvailable(){
            try {
                const canvas=document.createElement('canvas');
                return !!(window.WebGLRenderingContext && (canvas.getContext('webgl')||canvas.getContext('experimental-webgl')));
            } catch(e){
                return false;
            }
        }

        async loadLibs(){
            // Load Three, Loader and GSAP UMDs
            await loadScript(CDN.three);
            await loadScript(CDN.gltfLoader);
            await loadScript(CDN.gsap);
            // Bind globals
            this.THREE = window.THREE;
            this.gsap = window.gsap;
        }

        createDOM(){
            this.overlay=document.createElement('div');
            this.overlay.id='wow-overlay';
            this.overlay.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;z-index:9999;background:#000;opacity:1;';

            this.canvas=document.createElement('canvas');
            this.canvas.id='rocket-canvas';
            this.canvas.style.cssText='width:100%;height:100%;display:block;';

            this.countdownText=document.createElement('div');
            this.countdownText.id='countdown-text';
            this.countdownText.style.cssText='position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:10000;font-size:8vw;color:#fff;font-family:system-ui,-apple-system,Segoe UI,Roboto,"Helvetica Neue",Arial;letter-spacing:0.05em;';

            this.overlay.appendChild(this.canvas);
            this.overlay.appendChild(this.countdownText);
            document.body.appendChild(this.overlay);
        }

        setupScene(){
            const THREE=this.THREE;
            this.scene = new THREE.Scene();
            this.scene.background = new THREE.Color(0x000000);
            this.camera = new THREE.PerspectiveCamera(55, window.innerWidth/window.innerHeight, 0.1, 2000);
            this.camera.position.set(0, 0, 20);
            this.renderer = new THREE.WebGLRenderer({canvas:this.canvas, alpha:true, antialias:true});
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

            const keyLight = new THREE.DirectionalLight(0xffffff, 2);
            keyLight.position.set(6, 10, 8);
            this.scene.add(keyLight);

            const fillLight = new THREE.PointLight(0xff8844, 1.2, 200);
            fillLight.position.set(-10, -5, 10);
            this.scene.add(fillLight);

            const rimLight = new THREE.DirectionalLight(0x66aaff, 1.0);
            rimLight.position.set(-6, 8, -8);
            this.scene.add(rimLight);

            window.addEventListener('resize', ()=>{
                this.camera.aspect = window.innerWidth/window.innerHeight;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize(window.innerWidth, window.innerHeight);
            });
        }

        setupAudio(){
            this.sounds = {
                ticking: new Audio('/sounds/ticking.mp3'),
                roar: new Audio('/sounds/roar.mp3'),
                boom: new Audio('/sounds/boom.mp3'),
                wowSynth: new Audio('/sounds/wow-synth.mp3')
            };
            Object.values(this.sounds).forEach((a)=>{ a.preload='auto'; a.volume=0.9; });
        }

        playSound(key){
            try{
                const s=this.sounds[key];
                if(s){ s.currentTime=0; s.play(); }
            }catch(_){/* ignore */}
        }

        loadAssets(){
            const THREE=this.THREE;
            return new Promise((resolve, reject)=>{
                try{
                    // Rocket model
                    const loader = new THREE.GLTFLoader();
                    loader.load('/models/rocket.glb', (gltf)=>{
                        this.rocket = gltf.scene;
                        this.rocket.scale.set(0.6,0.6,0.6);
                        this.rocket.position.set(0,-10,0);
                        this.scene.add(this.rocket);

                        // Logo placeholder (replace with your GLB later if desired)
                        const logoGeom = new THREE.TorusKnotGeometry(6, 1.4, 150, 24);
                        const logoMat = new THREE.MeshStandardMaterial({ color: 0x00ffff, emissive: 0x00ffff, emissiveIntensity: 0, metalness: 0.6, roughness: 0.25 });
                        this.logo = new THREE.Mesh(logoGeom, logoMat);
                        this.logo.visible = false;
                        this.scene.add(this.logo);

                        // Particles placeholder
                        const pGeom = new THREE.BufferGeometry();
                        const verts = new Float32Array(3*8000);
                        for(let i=0;i<verts.length;i++){ verts[i] = THREE.MathUtils.randFloatSpread(600); }
                        pGeom.setAttribute('position', new THREE.BufferAttribute(verts, 3));
                        const pMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.8 });
                        this.particleSystem = new THREE.Points(pGeom, pMat);
                        this.particleSystem.visible = false;
                        this.scene.add(this.particleSystem);

                        resolve();
                    }, undefined, (err)=>{
                        console.warn('Rocket model failed to load, using primitive placeholder', err);
                        // Primitive placeholder if GLB missing
                        const body = new THREE.ConeGeometry(1.5, 6, 16);
                        const mat = new THREE.MeshStandardMaterial({ color: 0xff5533, metalness: 0.8, roughness: 0.3 });
                        this.rocket = new THREE.Mesh(body, mat);
                        this.rocket.position.set(0,-10,0);
                        this.scene.add(this.rocket);

                        // Logo
                        const logoGeom = new THREE.TorusKnotGeometry(6, 1.4, 150, 24);
                        const logoMat = new THREE.MeshStandardMaterial({ color: 0x00ffff, emissive: 0x00ffff, emissiveIntensity: 0, metalness: 0.6, roughness: 0.25 });
                        this.logo = new THREE.Mesh(logoGeom, logoMat);
                        this.logo.visible = false;
                        this.scene.add(this.logo);

                        resolve();
                    });
                }catch(e){ reject(e); }
            });
        }

        wireEscToCleanup(){
            this._escHandler = (e)=>{ if(e.key==='Escape'){ this.cleanup(); } };
            document.addEventListener('keydown', this._escHandler);
        }

        startAnimation(){
            const gsap=this.gsap;
            this.tl = gsap.timeline({
                onComplete: ()=> this.cleanup(),
                defaults: { ease: 'power1.out' }
            });

            // Phase 1: Tension 0-3s
            const countdown={value:3};
            this.tl.to(countdown, {
                value: 0,
                duration: 3,
                snap: 'value',
                onStart: ()=> this.playSound('ticking'),
                onUpdate: ()=>{ this.countdownText.textContent = String(Math.ceil(countdown.value)); }
            }, 0);
            this.tl.to(this.camera.position, { z: 30, duration: 3 }, 0);
            this.tl.to(this.countdownText, { opacity: 0, duration: 0.4 }, 2.6);

            // Phase 2: Launch 3-6s
            this.tl.call(()=>{ this.playSound('roar'); }, null, 3.0);
            this.tl.to(this.rocket.position, { y: 90, duration: 1.8, ease: 'power4.in' }, 3.2);
            this.tl.to(this.camera.position, { y: 10, z: 45, duration: 2.0 }, 3.2);

            // Phase 3: Big Bang 6-9s
            this.tl.call(()=>{ if(this.rocket) this.rocket.visible=false; }, null, 6.0);
            this.tl.call(()=>{ this.particleSystem.visible=true; }, null, 6.05);
            this.tl.fromTo(this.particleSystem.scale, { x:0.1, y:0.1, z:0.1 }, { x:10, y:10, z:10, duration: 0.15 }, 6.1);
            this.tl.call(()=>{ this.playSound('boom'); this.playSound('wowSynth'); }, null, 6.1);
            this.tl.call(()=>{ this.particleSystem.visible=false; this.logo.visible=true; }, null, 6.3);
            this.tl.to(this.logo.material, { emissiveIntensity: 1.5, duration: 1.0 }, 6.3);
            this.tl.to(this.camera.rotation, { z: Math.PI/16, duration: 2.2, ease: 'power1.inOut' }, 7.0);

            // Phase 4: Fade 9-9.5s
            this.tl.to(this.overlay, { opacity: 0, duration: 0.5, ease: 'power2.in' }, 9.0);

            this.animate();
        }

        animate(){
            this.animationFrameId = requestAnimationFrame(()=> this.animate());
            this.renderer.render(this.scene, this.camera);
        }

            cleanup(){
            try{
                    try{ if(window.sessionStorage){ sessionStorage.setItem('nirvanaShown','1'); } }catch(_){ /* ignore */ }
                if(this._escHandler){ document.removeEventListener('keydown', this._escHandler); }
                if(this.tl){ this.tl.kill(); }
                if(this.animationFrameId){ cancelAnimationFrame(this.animationFrameId); }
                if(this.overlay && this.overlay.parentElement){ this.overlay.remove(); }
                if(this.scene){
                    this.scene.traverse((obj)=>{
                        if(obj.isMesh){
                            if(obj.geometry) obj.geometry.dispose();
                            if(obj.material){
                                if(Array.isArray(obj.material)) obj.material.forEach(m=>m.dispose()); else obj.material.dispose();
                            }
                        }
                    });
                }
                if(this.renderer){ this.renderer.dispose(); }
            }catch(_){/* ignore */}
        }
    }

    document.addEventListener('DOMContentLoaded', ()=>{
        new NirvanaAscension();
    });
})();
