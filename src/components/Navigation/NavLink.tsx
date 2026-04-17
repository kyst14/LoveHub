import Link from 'next/link'
import { LucideIcon } from 'lucide-react'

interface NavLinkProps {
	href: string
	icon: LucideIcon
	label?: string
	className?: string
	active?: boolean
}

export const NavLink = ({
	href,
	icon: Icon,
	label,
	className = '',
	active = false
}: NavLinkProps) => {
	return (
		<Link
			href={href}
			className={`group flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200
        ${
			active
				? 'bg-zinc-800 text-white'
				: 'hover:bg-zinc-900/50 text-zinc-400 hover:text-white'
		} ${className}`}
		>
			<Icon
				size={22}
				className={`transition-all group-hover:scale-110 ${active ? 'text-white' : ''}`}
			/>

			{label && <span className="font-medium">{label}</span>}
		</Link>
	)
}
