'use client'

import { NAV } from '@/config/nav.config'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { NavLink } from './NavLink'

export function BottomNav() {
	const pathname = usePathname()
	const containerRef = useRef<HTMLDivElement>(null)
	const [sliderStyle, setSliderStyle] = useState({
		width: 0,
		left: 0
	})

	useEffect(() => {
		if (containerRef.current) {
			const width = containerRef.current.offsetWidth / NAV.length
			const left =
				width * (NAV.findIndex(item => item.href === pathname) || 0)
			setSliderStyle({ width, left })
		}
	}, [pathname])

	return (
		<motion.div
			className="absolute bottom-3 left-1/2 transform -translate-x-1/2 z-50 w-full md:w-1/2 lg:w-1/3 lg:bg-text/20 lg:rounded-full pb-[env(safe-area-inset-bottom)]"
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -50 }}
			transition={{ duration: 0.3 }}
		>
			<div
				className="relative w-full h-full flex justify-around items-center"
				ref={containerRef}
			>
				<div
					className="absolute bottom-0 h-full bg-text/30 rounded-full transition-all duration-300"
					style={{
						width: sliderStyle.width,
						left: sliderStyle.left
					}}
				/>

				{NAV.map(item => (
					<NavLink
						key={item.label}
						href={item.href}
						icon={item.icon}
						label={item.label}
						active={pathname === item.href}
						style={{ width: sliderStyle.width }}
					/>
				))}
			</div>
		</motion.div>
	)
}
