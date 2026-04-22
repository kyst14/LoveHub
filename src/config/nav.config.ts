import { Home, LucideIcon, BookOpen, CalendarHeart } from 'lucide-react'

export interface INavItem {
	label: string
	href: string
	icon: LucideIcon
	className?: string
	active?: boolean
	style?: React.CSSProperties
}

export const NAV: INavItem[] = [
	{
		label: 'Дом',
		href: '/',
		icon: Home
	},
	{
		label: 'Мы',
		href: '/memories',
		icon: BookOpen
	},
	{
		label: 'События',
		href: '/events',
		icon: CalendarHeart
	}
]
