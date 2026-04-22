'use client'

import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const variants = {
	variants: {
		initial: {
			opacity: 0,
			x: '100%',
			scale: 0.6
		},
		animate: {
			opacity: 1,
			x: 0,
			scale: 1
		},
		exit: {
			opacity: 0,
			x: '-100%',
			scale: 0.6
		}
	},
	transition: { duration: 0.3 }
}

export default function Template({ children }: { children: React.ReactNode }) {
	const [displayChildren, setDisplayChildren] = useState(children)
	const pathname = usePathname()

	useEffect(() => {
		const timeout = setTimeout(() => {
			setDisplayChildren(children)
		}, 100)

		return () => clearTimeout(timeout)
	}, [children, pathname])

	return (
		<LazyMotion features={domAnimation}>
			<AnimatePresence>
				<m.div
					key={pathname}
					initial="initial"
					animate="animate"
					exit="exit"
					variants={variants.variants}
					transition={variants.transition}
				>
					{displayChildren}
				</m.div>
			</AnimatePresence>
		</LazyMotion>
	)
}
