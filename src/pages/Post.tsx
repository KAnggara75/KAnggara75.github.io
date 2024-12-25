import ErrorNotFound from "./404";
import Header from "../component/Header";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import BackToTop from "../component/BackToTop";
import { Link, useParams } from "react-router";
import PostsList, { PostTypes } from "../model/Posts";
import { mdxComponents } from "../config/ReactMarkdownStyle";

export default function Post() {
	const params = useParams();
	const [content, setContent] = useState("");
	const [articleInfo, setArticleInfo] = useState<PostTypes>();
	const [posteOn, setPosteOn] = useState("");

	const mm = params.mm ? params.mm : "01";
	const yyyy = params.yyyy ? params.yyyy : "2022";
	const url = params.postId ? params.postId : "kanggara75";
	const article = "pages/" + yyyy + "/" + mm + "/" + url + ".md";

	useEffect(() => {
		fetch("/" + article)
			.then((response) => {
				return response.text();
			})
			.then((text) => {
				setContent(text);
			})
			.catch((error) => {
				console.error(error);
			});

		fetch("/index.json")
			.then((response) => {
				return response.json();
			})
			.then((json: PostsList) => {
				const postInfo: PostTypes[] = json.pages.filter(function (postList) {
					return postList.src == article;
				});
				setArticleInfo(postInfo[0]);
				const date = new Date(postInfo[0].postOn);
				setPosteOn(
					`${date.getDate()} ${date.toLocaleString("en-US", { month: "long" })} ${date.getFullYear()}`
				);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [article]);

	if (content.startsWith("<!doctype html>")) {
		return <ErrorNotFound />;
	} else {
		return (
			<>
				<Header />
				<article className="bg-slate-200 px-10 pb-16 pt-28 dark:bg-dark">
					<div
						className=""
						id="articleHeader"
					>
						<div className="tags mb-1 text-xs">
							{articleInfo?.tags.map((tag) => (
								<Link
									className="mx-1 mb-2 inline-block rounded-full border border-s px-1 lowercase leading-5 text-secondary dark:text-slate-300"
									key={tag}
									to={"/tags/" + tag}
								>
									{tag.substring(0, 10)}
								</Link>
							))}
						</div>
						<h1 className="mb-2 text-2xl font-bold capitalize dark:text-white md:text-4xl">
							{articleInfo?.title}
						</h1>
						<h2 className="-mt-1 font-sans text-base font-normal capitalize leading-normal dark:text-slate-200 md:text-xl">
							{articleInfo?.subtitle}
						</h2>
						<span className="block text-xs font-light italic leading-[1.1] text-secondary md:text-sm">
							Posted by {articleInfo?.author} on {posteOn}
						</span>
						<hr className="my-6" />
					</div>
					<ReactMarkdown components={mdxComponents}>{content}</ReactMarkdown>
				</article>
				<BackToTop />
			</>
		);
	}
}
