export default function Client() {
	return (
		<section
			id="client"
			className="bg-slate-700 pb-32 pt-36 dark:bg-slate-900"
		>
			<div className="container">
				<div className="w-full px-4">
					<div className="mx-auto mb-16 text-center">
						<h4 className="mb-2 text-lg font-semibold text-primary">Clients</h4>
						<h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
							Yang Pernah Bekerja Sama
						</h2>
						<p className="text-md font-medium text-secondary md:text-lg">
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima
							amet esse possimus.
						</p>
					</div>
				</div>

				<div className="w-full px-4">
					<div className="flex flex-wrap items-center justify-center">
						<a href="#">
							<img
								src="img/hero.png"
								alt="WA"
								className="mx-4 max-w-[120px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8"
							/>
						</a>
						<a href="#">
							<img
								src="img/hero.png"
								alt="WA"
								className="mx-4 max-w-[120px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8"
							/>
						</a>
						<a href="#">
							<img
								src="img/hero.png"
								alt="WA"
								className="mx-4 max-w-[120px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8"
							/>
						</a>
						<a href="#">
							<img
								src="img/hero.png"
								alt="WA"
								className="mx-4 max-w-[120px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8"
							/>
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
