import Link from 'next/link'

export default function NotFound() {
	return (
		<div className="flex justify-center items-center h-screen bg-bg p-4">
			<div className="flex justify-center items-center gap-4">
				<h1 className="text-5xl tracking-widest font-bold font-mono">
					404
				</h1>

				<div className="w-1 h-16 bg-primary rounded-md"></div>

				<div className="flex flex-col">
					<h2 className="text-lg font-bold font-mono">
						Страница не найдена
					</h2>
					{/* <p className="text-sm font-mono">
						Попробуйте перезагрузить страницу или вернуться на главную
					</p> */}
					<Link href="/" className="block py-2 text-sm text-primary hover:underline">
						Вернуться
					</Link>
				</div>
			</div>
		</div>
	)
}
