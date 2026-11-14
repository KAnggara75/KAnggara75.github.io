interface Project {
	title: string;
	tagline: string;
	description: string;
	techStack: string[];
	githubUrl: string;
}

const projects: Project[] = [
	{
		title: "PakaiWA",
		tagline: "Self-hosted WhatsApp RESTful API Gateway",
		description:
			"Gateway API WhatsApp mandiri berkinerja tinggi yang memisahkan konektivitas sesi WebSocket client dari pemrosesan bisnis via Apache Kafka, didukung Redis caching dan PostgreSQL untuk autentikasi multi-tenant.",
		techStack: ["Go", "Fiber v3", "whatsmeow", "PostgreSQL", "Redis", "Kafka"],
		githubUrl: "https://github.com/KAnggara75",
	},
	{
		title: "kafka-topic-controller",
		tagline: "Custom Kubernetes Operator for Declarative Kafka Topics",
		description:
			"Kubernetes Operator untuk manajemen topik Kafka secara deklaratif via Custom Resource Definitions (CRD), memudahkan otomatisasi provisioning partisi, replikasi, dan konfigurasi melalui alur GitOps bersama Argo CD.",
		techStack: ["Go", "Kubernetes", "Operator SDK", "CRD", "Argo CD", "Kafka"],
		githubUrl: "https://github.com/KAnggara75/kafka-topic-controller",
	},
	{
		title: "IDXStock",
		tagline: "Broker Activity & Historical Market Data Tracker",
		description:
			"Aplikasi pelacakan aktivitas broker dan pemrosesan data historis pasar saham Bursa Efek Indonesia (BEI/IDX), dirancang untuk pencatatan transaksi volume tinggi dan analisis data pasar berlatensi rendah.",
		techStack: ["Go", "PostgreSQL", "REST API", "Financial Data"],
		githubUrl: "https://github.com/KAnggara75/IDXStock",
	},
	{
		title: "Rest2Kafka / Conflect",
		tagline: "HTTP-to-Kafka Event Ingestion & Webhook Synchronizer",
		description:
			"Layanan event ingestion ringan yang menjembatani webhook REST HTTP langsung ke topik Apache Kafka tanpa direct client overhead, dilengkapi in-memory buffer untuk sinkronisasi webhook Git yang tangguh.",
		techStack: [
			"Go",
			"Apache Kafka",
			"In-Memory Queue",
			"Webhooks",
			"Reflection",
		],
		githubUrl: "https://github.com/KAnggara75/Rest2Kafka",
	},
];

export default function Portofolio() {
	return (
		<section
			id="projects"
			className="bg-slate-100 py-20 dark:bg-dark"
		>
			{/* Anchor compatibility for portfolio */}
			<div
				id="portfolio"
				className="relative -top-24"
			></div>
			<div className="container">
				<div className="w-full px-4">
					<div className="mx-auto mb-16 text-center">
						<h4 className="mb-2 text-lg font-semibold text-primary sm:text-4xl lg:text-5xl">
							Projects
						</h4>
						<h2 className="mb-4 text-3xl font-bold text-dark md:text-xl dark:text-slate-100">
							Featured Engineering Projects
						</h2>
						<p className="mx-auto max-w-2xl text-base font-medium text-secondary dark:text-slate-300">
							Proyek sistem backend nyata yang berfokus pada skalabilitas,
							otomasi infrastruktur cloud-native, dan arsitektur event-driven.
						</p>
					</div>
				</div>

				<div className="flex w-full flex-wrap justify-center px-4 xl:mx-auto xl:w-11/12">
					{projects.map((project) => (
						<div
							key={project.title}
							className="mb-8 w-full p-4 md:w-1/2"
						>
							<div className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
								<div>
									<div className="mb-3 flex items-start justify-between">
										<h3 className="text-2xl font-bold text-dark dark:text-white">
											{project.title}
										</h3>
										<a
											href={project.githubUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-1 rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:border-primary hover:bg-primary hover:text-white dark:border-slate-700 dark:text-slate-300 dark:hover:border-primary dark:hover:bg-primary dark:hover:text-white"
										>
											<svg
												className="fill-current"
												width="14"
												height="14"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
											</svg>
											GitHub
										</a>
									</div>
									<p className="mb-3 text-sm font-semibold text-primary">
										{project.tagline}
									</p>
									<p className="mb-6 text-sm leading-relaxed text-secondary dark:text-slate-300">
										{project.description}
									</p>
								</div>
								<div>
									<div className="flex flex-wrap gap-2 pt-2">
										{project.techStack.map((tech) => (
											<span
												key={tech}
												className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
											>
												{tech}
											</span>
										))}
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
