import argon2 from 'argon2'
import 'server-only'

const HASH_OPTIONS = {
	type: argon2.argon2id,
	memoryCost: 2 ** 16, // 64 MiB
	timeCost: 4,
	parallelism: 4,
	saltLength: 32
} as const

export async function hashPin(token: string): Promise<string> {
	if (!token || typeof token !== 'string') {
		throw new Error('Token must be a non-empty string')
	}

	return await argon2.hash(token, HASH_OPTIONS)
}

// Verify token hash and pin
export async function verifyPin(
	hash: string,
	pin: string,
): Promise<boolean> {
	if (!pin || !hash) return false
	
	try {
		return await argon2.verify(hash, pin)
	} catch (error) {
		console.error('Argon2 verify error:', error)
		return false
	}
}
