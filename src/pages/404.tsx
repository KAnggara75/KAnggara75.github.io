export default function ErrorNotFound() {
	return (
		<main className="flex h-screen w-full flex-col items-center justify-center bg-[#1A2238]">
			<h1 className="text-9xl font-extrabold tracking-widest text-white">
				404
			</h1>
			<div className="text-md absolute rotate-[20deg] rounded bg-primary px-6 text-white">
				Page Not Found
			</div>
			<button className="mt-5">
				<div className="group relative inline-block text-sm font-medium text-primary focus:outline-none focus:ring active:text-primary">
					<span className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-primary transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>
					<span className="relative block border border-current bg-[#1A2238] px-8 py-3">
						<a href="/">Go Home</a>
					</span>
				</div>
			</button>
		</main>
	);
}
