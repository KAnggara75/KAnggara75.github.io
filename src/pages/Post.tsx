import ErrorNotFound from "./404";
import Header from "../component/Header";
import { useParams } from "react-router";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import { mdxComponents } from "../config/ReactMarkdownStyle";

export default function Post() {
	const params = useParams();
	const [content, setContent] = useState("");

	const url = params.postId ? params.postId : "kanggara75";

	useEffect(() => {
		fetch("/pages/" + url + ".md")
			.then((response) => {
				return response.text();
			})
			.then((text) => {
				setContent(text);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [url]);

	if (content.startsWith("<!doctype html>")) {
		return <ErrorNotFound />;
	} else {
		return (
			<>
				<Header />
				<div className="gb-white py-16 px-10">
					<ReactMarkdown components={mdxComponents}>{content}</ReactMarkdown>
				</div>
			</>
		);
	}
}
