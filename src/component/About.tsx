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
						<h4 className="mb-3 text-lg font-bold uppercase text-primary">
							Tentang Saya
						</h4>
						<h2 className="mb-5 max-w-md text-3xl font-bold text-dark dark:text-slate-100 lg:text-4xl">
							Kunjungi Repo Saya
						</h2>
						<p className="max-w-xl text-base font-medium text-secondary lg:text-lg">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
							nulla reiciendis facilis nihil sint unde beatae?
						</p>
					</div>
					<div className="w-full px-4 lg:w-1/2">
						<h3 className="mb-4 text-2xl font-semibold text-dark dark:text-slate-100 lg:pt-10 lg:text-3xl">
							Let's Connect!
						</h3>
						<p className="mb-6 text-base font-medium text-secondary lg:text-lg">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima,
							dolores iusto vero atque odio pariatur earum! At rem eligendi
							molestias!
						</p>
						<div className="flex items-center">
							<YouTubeIcon />
							<GithubIcon />
							<LinkedInIcon />
							<InstagramIcon />
							<TwitterIcon />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
