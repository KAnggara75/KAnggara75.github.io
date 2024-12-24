interface PostThumbProps {
	title: string;
	subtitle: string;
	href: string;
	src: string;
	img: string;
	tags: string[];
}

export default function PostThumb({
	title,
	subtitle,
	href,
	img,
	tags,
}: Readonly<PostThumbProps>) {
	return (
		<div className="w-full px-4 lg:w-1/2 xl:w-1/3">
			<div className="mb-10 overflow-hidden rounded-xl bg-white shadow-lg dark:bg-slate-700">
				<img
					src={img}
					alt={title}
					className="w-full"
				/>
				<div className="px-6 py-8">
					<h3>
						<a
							href={href}
							className="block truncate text-xl font-semibold text-dark hover:text-primary dark:text-white"
						>
							{title}
						</a>
					</h3>
					<p className="mb-4 text-base font-medium text-secondary">
						{subtitle}
					</p>
					<div className="hidden grid-cols-4 sm:grid">
						{tags.map((tag) => (
							<a
								className="m-1 rounded-lg border border-transparent bg-green-600 px-2.5 py-0.5 text-sm text-white shadow-sm transition-all hover:bg-blue-600 dark:bg-amber-200 dark:text-dark hover:dark:bg-blue-600 hover:dark:text-white"
								key={tag}
								href={"tags/" + tag}
							>
								{tag.substring(0, 10)}
							</a>
						))}
					</div>
					<a
						href={href}
						className="mt-3 block rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-80"
					>
						Baca Selengkapnya
					</a>
				</div>
			</div>
		</div>
	);
}
