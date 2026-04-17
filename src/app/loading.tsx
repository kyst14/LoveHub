import Image from 'next/image'

export default function Loading() {
	return (
		<div className="flex flex-col justify-center items-center h-screen bg-bg p-4">
			<Image src="/loading.svg" alt="Loading" width={100} height={100} priority />
		</div>
	)
}