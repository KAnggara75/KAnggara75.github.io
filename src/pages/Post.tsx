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
				<div className="gb-white px-10 py-16 dark:bg-dark">
					<ReactMarkdown components={mdxComponents}>{content}</ReactMarkdown>
				</div>
				<BackToTop />
			</>
		);
	}
}
