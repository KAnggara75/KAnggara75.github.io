import { Link } from "react-router";

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
	const postHref = href.startsWith("/") ? href : `/${href}`;

	return (
		<div className="w-full px-4 lg:w-1/2 xl:w-1/3">
			<div className="mb-10 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-lg dark:border-slate-700/60 dark:bg-slate-900">
				<img
					src={img}
					alt={title}
					className="w-full"
				/>
				<div className="px-6 py-8">
					<h3>
						<Link
							to={postHref}
							className="block truncate text-xl font-semibold text-dark hover:text-primary dark:text-white"
						>
							{title}
						</Link>
					</h3>
					<p className="mb-4 text-base font-medium text-secondary">
						{subtitle}
					</p>
					<div className="tags hidden sm:block">
						{tags.map((tag) => (
							<Link
								className="mx-1 mb-2 inline-block rounded-full border border-s px-2 leading-6 text-secondary lowercase dark:text-slate-300"
								key={tag}
								to={"/tags/" + tag}
							>
								{tag.substring(0, 10)}
							</Link>
						))}
					</div>
					<Link
						to={postHref}
						className="mt-6 block rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-80"
					>
						Baca Selengkapnya
					</Link>
				</div>
			</div>
		</div>
	);
}
