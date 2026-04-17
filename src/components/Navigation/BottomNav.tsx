import { Book, Home } from 'lucide-react'
import { NavLink } from './NavLink'

export function BottomNav() {
	return (
		<div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50 w-full md:w-1/2 bg-secondary/20 rounded-t-2xl">
			<div className="flex h-16 items-center justify-around pb-[env(safe-area-inset-bottom)]">
				<NavLink href="/" icon={Home} label="Главная" />
				{/* <NavLink href="/library" icon={Book} label="Воспоминания" /> */}
			</div>
		</div>
	)
}
