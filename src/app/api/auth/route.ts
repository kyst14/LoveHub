import { hashPin } from '@/lib/hash'
import { NextRequest, NextResponse } from 'next/server'
import 'server-only'

const PIN = process.env.PIN_ACCESS as string

export async function POST(req: NextRequest) {
	const { pin } = await req.json()

	if (!pin || typeof pin !== 'string' || pin.length < 4) {
		return NextResponse.json(
			{
				success: false,
				message: 'PIN is required and must be at least 4 digits'
			},
			{ status: 400 }
		)
	}

	const isValid = pin.trim() === PIN

	if (isValid) {
		const response = NextResponse.json(
			{ success: true, message: 'PIN verified successfully' },
			{ status: 200 }
		)

		response.cookies.set({
			name: 'auth_token',
			value: await hashPin(pin),
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 7, // 7 days
			path: '/'
		})

		return response
	} else {
		return NextResponse.json(
			{ success: false, message: 'Invalid pin' },
			{ status: 400 }
		)
	}
}
