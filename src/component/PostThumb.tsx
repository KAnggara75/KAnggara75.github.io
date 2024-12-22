interface PostThumbProps {
	title: string;
	href: string;
	src: string;
	img: string;
}

export default function PostThumb({
	title,
	href,
	img,
}: Readonly<PostThumbProps>) {
	return (
		<div className="w-full px-4 lg:w-1/2 xl:w-1/3">
			<div className="mb-10 overflow-hidden rounded-xl bg-white shadow-lg dark:bg-dark">
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
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt, sit!
					</p>
					<a
						href={href}
						className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-80"
					>
						Baca Selengkapnya
					</a>
				</div>
			</div>
		</div>
	);
}
