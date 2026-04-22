import { INavItem } from '@/config/nav.config'
import Link from 'next/link'

export const NavLink = ({
	href,
	icon: Icon,
	label,
	className = '',
	active = false,
	style
}: INavItem) => {
	return (
		<Link
			href={href}
			aria-label={label}
			title={label}
			className={`group h-full flex justify-center items-center gap-3 px-6 py-2.5 rounded-full transition-all duration-200 ${className}
				${active ? 'text-text' : 'text-text/50 hover:text-text/90'}
			`}
			style={style}
		>
			<Icon
				size={24}
				color="currentColor"
				strokeWidth={2}
			/>

			<span className="block">{label}</span>
		</Link>
	)
}
