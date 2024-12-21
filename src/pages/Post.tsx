import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { mdxComponents } from "../config/ReactMarkdownStyle";

export default function Post() {
	useEffect(() => {
		fetch(
			"https://raw.githubusercontent.com/KAnggara75/KAnggara75.github.io/refs/heads/main/pages/react-typescript-vite.md"
		)
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
