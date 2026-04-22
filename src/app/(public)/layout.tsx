import { BottomNav } from '@/components/Navigation/BottomNav'
import Image from 'next/image'

export default function PublicLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className="relative flex flex-col justify-center items-center h-screen">
			<Image
				src="/bg.svg"
				alt="bg"
				fill
				priority
				className="object-cover object-bottom z-0 pointer-events-none opacity-50"
			/>
			{children}
			<BottomNav />
		</div>
	)
}
