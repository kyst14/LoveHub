import type { Metadata } from 'next'
import { Nunito, Roboto_Slab, Geist } from 'next/font/google'
import Head from 'next/head'
import './globals.css'
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const nunitoSans = Nunito({
	variable: '--font-nunito-sans',
	subsets: ['latin', 'cyrillic']
})

const robotoSlabMono = Roboto_Slab({
	variable: '--font-roboto-slab-mono',
	subsets: ['latin']
})

export const metadata: Metadata = {
	title: 'LoveHub',
	description:
		'LoveHub is a personal web project that brings together a collection of small interactive websites created as surprise experiences for someone special.',
	icons: {
		icon: '/favicon.ico'
	}
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang="ru"
			className={cn("h-full", "antialiased", nunitoSans.variable, robotoSlabMono.variable, "font-sans", geist.variable)}
		>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=0, viewport-fit=cover"
				/>
			</Head>
			<body className="min-h-full flex flex-col">{children}</body>
		</html>
	)
}
