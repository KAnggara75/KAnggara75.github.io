export default function Hero() {
	return (
		<section
			id="home"
			className="pt-36 pb-16 dark:bg-dark"
		>
			<div className="container">
				<div className="flex flex-wrap">
					<div className="mb-10 w-full self-center px-4 lg:w-7/12">
						<h1 className="text-base font-semibold text-primary md:text-xl">
							Halo Semuanya,{" "}
							<img
								src="img/hi.gif"
								alt="hi"
								width="20px"
								className="inline-block"
							/>{" "}
							Saya
							<span className="mt-1 block text-4xl font-bold text-dark lg:text-5xl dark:text-white">
								Kelvin Anggara
							</span>
						</h1>
						<h2 className="mt-2 text-xl font-bold text-dark lg:text-3xl dark:text-white">
							Backend & Cloud-Native Engineer
						</h2>
						<p className="mt-1 text-sm font-semibold tracking-wide text-primary lg:text-base">
							Java (Quarkus) • Go • Apache Kafka • Kubernetes (K3s)
						</p>
						<p className="mt-4 mb-8 leading-relaxed font-medium text-secondary lg:text-lg dark:text-slate-300">
							Backend Developer yang berfokus pada sistem high-concurrency,
							reliabilitas infrastruktur, dan clean architecture. Sehari-hari
							bekerja dengan Go, Java/Quarkus, Kafka, dan Kubernetes untuk
							memastikan sistem tetap stabil di bawah beban tinggi.
						</p>
						<div className="flex flex-wrap gap-4">
							<a
								href="#projects"
								className="rounded-full bg-primary px-7 py-3 text-base font-semibold text-white transition duration-300 ease-in-out hover:opacity-85 hover:shadow-lg"
							>
								Jelajahi Repositori
							</a>
							<a
								href="#blog"
								className="rounded-full border-2 border-primary bg-transparent px-7 py-3 text-base font-semibold text-primary transition duration-300 ease-in-out hover:bg-primary hover:text-white hover:shadow-lg dark:border-primary dark:text-primary dark:hover:bg-primary dark:hover:text-white"
							>
								Baca Artikel Teknis
							</a>
						</div>
					</div>
					<div className="w-full self-end px-4 lg:w-5/12">
						<div className="relative mt-10 lg:right-0 lg:mt-0">
							<img
								src="img/hero.png"
								alt="Kelvin"
								className="relative z-10 mx-auto max-w-full"
							/>
							<span className="absolute -bottom-3 left-1/2 -translate-x-1/2 md:scale-125">
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
