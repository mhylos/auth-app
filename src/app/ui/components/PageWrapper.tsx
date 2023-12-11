import { AnimatePresence, motion } from 'framer-motion';

export default function PageWrapper({
	children,
	className = 'flex flex-col items-center px-6 py-8 lg:py-0 justify-center h-full bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#549abc] via-[#1076ad] to-[#02163f]',
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<AnimatePresence>
			<motion.main
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className={className}
			>
				{children}
			</motion.main>
		</AnimatePresence>
	);
}
