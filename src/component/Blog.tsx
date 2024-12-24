import PostThumb from "./PostThumb";
import { useEffect, useState } from "react";

interface Posts {
	pages: [
		{
			title: string;
			subtitle: string;
			tags: string[];
			source: string;
			author: string;
			url: string;
			src: string;
			img: string;
		},
	];
}

export default function Blog() {
	const [data, setData] = useState<Posts>();

	useEffect(() => {
		fetch("/index.json")
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.info(data);
				setData(data);
			})
			.catch((e: Error) => {
				console.error(e.message);
			});
	}, []);

	return (
		<section
			id="blog"
			className="bg-slate-100 py-24 dark:bg-dark"
		>
			<div className="container">
				<div className="w-full px-4">
					<div className="mx-auto mb-16 text-center">
						<h4 className="mb-2 text-lg font-semibold text-primary">Blog</h4>
						<h2 className="mb-4 text-3xl font-bold text-dark dark:text-slate-100 sm:text-4xl lg:text-5xl">
							Tulisan Terkini
						</h2>
						<p className="text-md font-medium text-secondary md:text-lg">
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Provident, consequatur. Non, harum autem.
						</p>
					</div>
				</div>
				<div className="flex flex-wrap">
					{data?.pages
						.reverse()
						.slice(0, 6)
						.reverse()
						.map((post) => (
							<PostThumb
								key={post.url}
								title={post.title}
								href={post.url}
								img={post.img}
								src={post.src}
								subtitle={post.subtitle}
								tags={post.tags}
							/>
						))}
				</div>
			</div>
		</section>
	);
}
