import PostThumb from "./PostThumb";
import { useEffect, useState } from "react";

interface Posts {
	pages: [
		{
			src: string;
			img: string;
			url: string;
			title: string;
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
				setData(data);
			})
			.catch((e: Error) => {
				console.error(e.message);
			});
	}, []);

	return (
		<section
			id="blog"
			className="pt-36 pb-32 bg-slate-100"
		>
			<div className="container">
				<div className="w-full px-4">
					<div className="mx-auto text-center mb-16">
						<h4 className="font-semibold text-lg text-primary mb-2">Blog</h4>
						<h2 className="font-bold text-dark text-3xl mb-4 sm:text-4xl lg:text-5xl">
							Tulisan Terkini
						</h2>
						<p className="font-medium text-md text-secondary md:text-lg">
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
							/>
						))}
				</div>
			</div>
		</section>
	);
}
