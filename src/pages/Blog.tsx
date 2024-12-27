import { useState, useEffect } from "react";
import Posts from "../model/Posts";
import PostThumb from "../component/PostThumb";
import Header from "../component/Header";

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
		<>
			<title>Blog | Kelvin Anggara</title>
			<Header />
			<section
				id="blog"
				className="bg-slate-100 py-24 dark:bg-dark"
			>
				<div className="flex flex-wrap">
					{data?.pages
						.reverse()
						.reverse()
						.map((post, i) => (
							<PostThumb
								key={post.url + "-" + i}
								title={post.title}
								href={"/" + post.url}
								img={post.img}
								src={post.src}
								subtitle={post.subtitle}
								tags={post.tags}
							/>
						))}
				</div>
			</section>
		</>
	);
}
