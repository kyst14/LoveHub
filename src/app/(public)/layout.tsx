import { BottomNav } from '@/components/Navigation/BottomNav'

export default function PublicLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			{children}
			<BottomNav />
		</>
	)
}
