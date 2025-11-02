"use client";

import { motion, Variants } from "framer-motion";
import { Mail, Linkedin, MessageCircle } from 'lucide-react';
import Link from "next/link";

const contactOptions = [
	{
		icon: Mail,
		title: "Email",
		handle: "andre.lahud@gmail.com",
		href: "mailto:andre.lahud@gmail.com",
		cta: "Enviar un Email",
		color: "hover:border-red-500",
		shadow: "hover:shadow-red-500/20"
	},
	{
		icon: Linkedin,
		title: "LinkedIn",
		handle: "André Lahud",
		href: "https://www.linkedin.com/in/andrelahud/",
		cta: "Conectar en LinkedIn",
		color: "hover:border-blue-500",
		shadow: "hover:shadow-blue-500/20"
	},
	{
		icon: MessageCircle,
		title: "WhatsApp",
		handle: "Chat Directo",
		href: "https://wa.me/5215532254095",
		cta: "Iniciar Conversación",
		color: "hover:border-green-500",
		shadow: "hover:shadow-green-500/20"
	}
];

export default function ContactoPage() {
	const containerVariants: Variants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
				delayChildren: 0.3,
			},
		},
	};

	const itemVariants: Variants = {
		hidden: { y: 30, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				type: "spring",
				stiffness: 100,
				damping: 12,
			},
		},
	};

	return (
		<div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden">

			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-gray-900/80 via-black to-transparent"></div>
				<div className="absolute bottom-0 right-0 w-1/2 h-full bg-gradient-to-l from-gray-900/80 via-black to-transparent"></div>
				<motion.div
					className="absolute top-1/4 left-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl"
					animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
					transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
				/>
				<motion.div
					className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"
					animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
					transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
				/>
			</div>

			<div className="z-10 text-center mb-12 md:mb-16">
				<motion.h1
					className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50"
					initial={{ y: -20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.5, ease: "easeOut" }}
				>
					Hablemos.
				</motion.h1>
				<motion.p
					className="mt-4 text-base sm:text-lg md:text-xl text-neutral-300 max-w-xl mx-auto"
					initial={{ y: -20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
				>
					Estoy aquí para ayudarte a transformar tu negocio. Elige tu canal de comunicación preferido.
				</motion.p>
			</div>

			<motion.div
				className="z-10 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full max-w-5xl"
				variants={containerVariants}
				initial="hidden"
				animate="visible"
			>
				{contactOptions.map((option, index) => (
					<motion.div key={index} variants={itemVariants}>
						<Link href={option.href} target="_blank" rel="noopener noreferrer" className="block h-full">
							<div className={`h-full bg-gray-900/50 backdrop-blur-sm border border-neutral-700 rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center transition-all duration-300 ${option.color} ${option.shadow} hover:border-opacity-80 hover:-translate-y-2`}>
								<div className="mb-5">
									<option.icon className="w-10 h-10 sm:w-12 sm:h-12 text-neutral-300" />
								</div>
								<h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">{option.title}</h3>
								<p className="text-neutral-400 mb-6 flex-grow">{option.handle}</p>
								<span className="mt-auto bg-neutral-800 text-white py-2 px-5 rounded-full text-sm font-medium transition-colors duration-300 hover:bg-neutral-700">
									{option.cta}
								</span>
							</div>
						</Link>
					</motion.div>
				))}
			</motion.div>
		</div>
	);
}