import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	/* config options here */
	reactStrictMode: true,
	allowedDevOrigins: [
		'localhost:3000',
		process.env.NEXT_PUBLIC_BASE_URL || '',
		...(process.env.ALLOWED_DEV_ORIGINS || '').split(',')
	]
}

export default nextConfig
