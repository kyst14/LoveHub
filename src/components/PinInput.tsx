'use client'

import React, { useRef, useState } from 'react'

interface PinInputProps {
	length?: number
	onComplete?: (pin: string) => void
	onChange?: (pin: string) => void
	mask?: boolean
}

export function PinInput({
	length = 6,
	onComplete,
	onChange,
	mask = false
}: PinInputProps) {
	const [pin, setPin] = useState<string[]>(Array(length).fill(''))
	const inputRefs = useRef<HTMLInputElement[]>([])

	const handleChange = (index: number, value: string) => {
		if (!/^\d*$/.test(value)) return

		const newPin = [...pin]
		newPin[index] = value.slice(-1)
		setPin(newPin)

		const currentPin = newPin.join('')
		onChange?.(currentPin)

		if (value && index < length - 1) {
			inputRefs.current[index + 1]?.focus()
		}

		if (
			newPin.every(digit => digit !== '') &&
			currentPin.length === length
		) {
			onComplete?.(currentPin)
		}
	}

	const handleKeyDown = (
		index: number,
		e: React.KeyboardEvent<HTMLInputElement>
	) => {
		if (e.key === 'Backspace' && !pin[index] && index > 0) {
			inputRefs.current[index - 1]?.focus()
		}

		if (e.key === 'ArrowLeft' && index > 0) {
			inputRefs.current[index - 1]?.focus()
		}

		if (e.key === 'ArrowRight' && index < length - 1) {
			inputRefs.current[index + 1]?.focus()
		}

        if (e.key === 'Enter') {
            const currentPin = pin.join('')
            onComplete?.(currentPin)
        }
	}

	const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
		e.preventDefault()
		const pastedData = e.clipboardData
			.getData('text')
			.slice(0, length)
			.replace(/\D/g, '')

		if (pastedData) {
			const newPin = [...pin]
			pastedData.split('').forEach((char, i) => {
				if (i < length) newPin[i] = char
			})
			setPin(newPin)

			const finalPin = newPin.join('')
			onChange?.(finalPin)

			if (finalPin.length === length) {
				onComplete?.(finalPin)
			}

			const nextIndex = Math.min(pastedData.length, length - 1)
			inputRefs.current[nextIndex]?.focus()
		}
	}

	return (
		<div className="flex gap-3">
			{pin.map((digit, index) => (
				<input
					key={index}
					ref={el => {
						if (el) inputRefs.current[index] = el
					}}
					type={mask ? 'password' : 'text'}
					inputMode="numeric"
                    autoComplete="off"
                    autoCorrect="off"
					autoFocus={index === 0}
					maxLength={2}
					value={digit}
					onChange={e => handleChange(index, e.target.value)}
					onKeyDown={e => handleKeyDown(index, e)}
					onPaste={handlePaste}
					className="w-12 h-12 text-center text-3xl md:text-2xl md:h-10 md:w-10 font-sans border-2 border-secondary 
                     rounded-xl focus:border-secondary/50 focus:outline-none transition-all
                     bg-secondary/10"
				/>
			))}
		</div>
	)
}
