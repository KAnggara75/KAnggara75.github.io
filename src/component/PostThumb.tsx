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
			<div className="bg-white rounded-xl shadow-lg overflow-hidden mb-10">
				<img
					src={img}
					alt={title}
					className="w-full"
				/>
				<div className="py-8 px-6">
					<h3>
						<a
							href={href}
							className="block font-semibold text-dark text-xl hover:text-primary truncate"
						>
							{title}
						</a>
					</h3>
					<p className="font-medium text-base text-secondary mb-4">
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt, sit!
					</p>
					<a
						href={href}
						className="font-medium bg-primary text-white text-sm py-2 px-4 rounded-lg hover:opacity-80"
					>
						Baca Selengkapnya
					</a>
				</div>
			</div>
		</div>
	);
}
