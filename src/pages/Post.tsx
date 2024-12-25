import ErrorNotFound from "./404";
import Header from "../component/Header";
import { useParams } from "react-router";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import BackToTop from "../component/BackToTop";
import { mdxComponents } from "../config/ReactMarkdownStyle";

export default function Post() {
	const params = useParams();
	const [content, setContent] = useState("");

	const mm = params.mm ? params.mm : "01";
	const yyyy = params.yyyy ? params.yyyy : "2022";
	const url = params.postId ? params.postId : "kanggara75";

	useEffect(() => {
		fetch("/pages/" + yyyy + "/" + mm + "/" + url + ".md")
			.then((response) => {
				return response.text();
			})
			.then((text) => {
				setContent(text);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [url, params, yyyy, mm]);

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
