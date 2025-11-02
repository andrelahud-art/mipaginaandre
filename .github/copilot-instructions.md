<!-- Use this file to provide workspace-specific custom instructions to Copilot. -->

## André Lahud Website - Next.js Project Setup Complete

### ✅ Project Status: COMPLETED

This is a complete Next.js 14 professional website for André Lahud with the following features:

#### Core Setup
- [x] Next.js 14 with App Router
- [x] TypeScript configuration
- [x] Tailwind CSS with custom theme
- [x] MDX support for blog content
- [x] Resend integration for contact forms

#### Project Structure Created
- [x] App directory with layout and home page
- [x] Components: Navbar, Footer, LogoStrip, CTA
- [x] Data files: servicios.json, casos.json, leads.json
- [x] Public assets: placeholder logos
- [x] Configuration files: All Next.js, TypeScript, Tailwind configs

#### Key Features Implemented
- [x] Responsive design with mobile navigation
- [x] SEO-optimized metadata
- [x] WhatsApp floating button
- [x] Google Analytics integration ready
- [x] Contact form with Resend API
- [x] Professional styling with custom CSS classes

#### Build Status
- ✅ Project builds successfully (`npm run build`)
- ⚠️ Development server has issues due to folder name with space
- ✅ All dependencies installed
- ✅ No critical vulnerabilities

#### Next Steps for User
1. **IMPORTANT**: Rename project folder to remove space (e.g., "andre-lahud-website")
2. Replace `/public/hero-linkedin.jpg` with actual hero image
3. Replace placeholder logos in `/public/logos/` with real company logos
4. Configure Resend API key in `.env.local`
5. Set up Google Analytics ID
6. Deploy to Vercel

#### Development Commands
```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run start   # Start production server
npm run lint    # Run ESLint
```

#### Folder Name Issue
The current folder name "Pagina personal" contains a space which causes TypeScript verification issues in Next.js development mode. The project builds fine but the dev server fails. Rename the folder to fix this.

**All requirements from the original specification have been implemented.**