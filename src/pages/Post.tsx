import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { mdxComponents } from "../config/ReactMarkdownStyle";
import { useParams } from "react-router";

export default function Post() {
	let params = useParams();
	const url = params.postId ? params.postId : "KAnggara75";
	useEffect(() => {
		fetch("/pages/" + url + ".md")
			.then((response) => {
				return response.text();
			})
			.then((text) => {
				console.log(text);
				setContent(text);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	const [content, setContent] = useState("");

	return (
		<div className="gb-white py-16 px-10">
			<ReactMarkdown components={mdxComponents}>{content}</ReactMarkdown>
		</div>
	);
}
