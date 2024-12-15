export default function Hero() {
	return (
		<section
			id="home"
			className="pt-36"
		>
			<div className="container">
				<div className="flex flex-wrap">
					<div className="w-full self-center px-4 lg:w-1/2 mb-10">
						<h1 className="text-base font-semibold text-primary md:text-xl">
							Hallo Semuanya,
							<img
								src="dist/img/hi.gif"
								alt="hi"
								width="20px"
								className="inline-block"
							/>
							Perkenalkan Saya
							<span className="block font-bold text-dark text-4xl mt-1 lg:text-5xl">
								Kelvin Anggara
							</span>
						</h1>
						<h2 className="font-medium text-secondary text-lg mb-5 lg:text-2xl">
							<span className="text-dark">Software Developer </span> |
							PHP-Java-Flutter-IoT
						</h2>
						<p className="font-medium text-secondary mb-10 leading-relaxed">
							Saat ini sedang belajar Spring Boot, Laravel dan Flutter
							Development.
						</p>
						<a
							href="#footer"
							className="text-base font-semibold bg-primary py-3 px-8 text-white rounded-full hover:shadow-xl hover:opacity-80 transition duration-300 ease-in-out"
						>
							Hubungi Saya
						</a>
					</div>
					<div className="w-full self-end px-4 lg:w-1/2">
						<div className="mt-10 relative lg:mt-0 lg:right-0">
							<img
								src="dist/img/hero.png"
								alt="Kelvin"
								className="max-w-full mx-auto"
							/>
							<span className="absolute -bottom-3 -z-10 left-1/2 -translate-x-1/2 md:scale-125">
								<svg
									width="300"
									viewBox="0 0 200 200"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fill="#0EA5E9"
										d="M41.4,-61.8C51.5,-49.6,56.3,-34.7,59.9,-20.2C63.6,-5.8,66.2,8.3,64.5,23.3C62.9,38.3,56.9,54.2,45.5,64.2C34,74.1,17,78,2.1,75.1C-12.8,72.3,-25.7,62.6,-41,54C-56.4,45.3,-74.2,37.6,-81.8,24.2C-89.4,10.8,-86.7,-8.2,-79.5,-24.4C-72.3,-40.6,-60.5,-53.8,-46.5,-64.8C-32.5,-75.7,-16.2,-84.3,-0.3,-83.8C15.6,-83.4,31.2,-73.9,41.4,-61.8Z"
										transform="translate(100 100) scale(1.1) rotate(-30)"
									/>
								</svg>
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
