import {
	GithubIcon,
	TwitterIcon,
	YouTubeIcon,
	LinkedInIcon,
	InstagramIcon,
} from "./Icons";

export default function About() {
	return (
		<section
			id="about"
			className="py-24 dark:bg-slate-800"
		>
			<div className="container">
				<div className="flex flex-wrap">
					<div className="mb-10 w-full px-4 lg:w-1/2">
						<h4 className="mb-3 text-lg font-bold text-primary uppercase">
							Tentang Saya
						</h4>
						<h2 className="mb-5 max-w-md text-3xl font-bold text-dark lg:text-4xl dark:text-slate-100">
							Spesialisasi & Rekayasa Sistem
						</h2>
						<p className="max-w-xl text-base font-medium text-secondary lg:text-lg dark:text-slate-300">
							Backend Developer yang berfokus pada sistem high-concurrency,
							reliabilitas infrastruktur, dan clean architecture. Sehari-hari
							merancang microservices terdistribusi dengan Go dan Java
							(Quarkus), pipeline event-driven berbasis Apache Kafka, serta
							otomasi infrastruktur menggunakan Kubernetes (K3s) dan pendekatan
							GitOps.
						</p>
					</div>
					<div className="w-full px-4 lg:w-1/2">
						<h3 className="mb-4 text-2xl font-semibold text-dark lg:pt-10 lg:text-3xl dark:text-slate-100">
							Let's Connect!
						</h3>
						<p className="mb-6 text-base font-medium text-secondary lg:text-lg dark:text-slate-300">
							Terbuka untuk diskusi teknis seputar arsitektur cloud-native,
							sistem terdistribusi, atau kolaborasi open source. Mari terhubung
							melalui tautan profil di bawah:
						</p>
						<div className="flex items-center">
							<GithubIcon />
							<LinkedInIcon />
							<YouTubeIcon />
							<InstagramIcon />
							<TwitterIcon />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
