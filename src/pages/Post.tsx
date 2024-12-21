import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { mdxComponents } from "../config/ReactMarkdownStyle";
import { useParams } from "react-router";

export default function Post() {
	const params = useParams();
	const [content, setContent] = useState("");

	const url = params.postId ? params.postId : "KAnggara75";

	console.info(params.postId);
	console.info(url);

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

	return (
		<div className="gb-white py-16 px-10">
			<ReactMarkdown components={mdxComponents}>{content}</ReactMarkdown>
		</div>
	);
}
