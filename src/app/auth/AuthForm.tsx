'use client'

import { PinInput } from '@/components/PinInput'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const AuthForm = () => {
	const [error, setError] = useState('')

	const router = useRouter()

	const handleComplete = (pin: string) => {
		axios
			.post('/api/auth', { pin })
			.then(() => {
				router.push('/') // Redirect to the home page
			})
			.catch(e => {
				setError(e.response.data.message || 'Unknown error')
			})
	}

	const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()

		const form = e.currentTarget
		const formData = new FormData(form)
		const pin = formData.get('pin')

		handleComplete(pin as string)
	}

	return (
		<>
			<form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-primary/50 p-4 px-8 rounded-2xl">
				<h1 className="text-2xl font-bold font-sans">Код доступа</h1>

				<div className="flex flex-col md:flex-row justify-center items-center gap-4">
					<PinInput
						length={4}
						onComplete={handleComplete}
					/>

					<button
						type="submit"
						className="px-6 py-2 bg-primary text-white rounded-full cursor-pointer active:scale-95 transition-all"
					>
						Войти
					</button>
				</div>

			</form>
			<p className="block text-center text-red-500">{error}</p>
		</>
	)
}
