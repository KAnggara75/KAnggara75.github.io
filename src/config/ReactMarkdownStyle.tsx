import { Components } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export const mdxComponents: Components = {
	ul: ({ children }) => <ul className="list-disc ml-4 mt-4">{children}</ul>,
	li: ({ children }) => <li className="mt-1">{children}</li>,
	h1: ({ children }) => <h1 className="text-3xl font-bold mb-4">{children}</h1>,
	h2: ({ children }) => <h2 className="text-2xl font-bold">{children}</h2>,
	h3: ({ children }) => <h3 className="text-xl font-bold">{children}</h3>,
	h4: ({ children }) => <h4 className="text-lg font-bold">{children}</h4>,
	h5: ({ children }) => <h5 className="text-base font-bold">{children}</h5>,
	h6: ({ children }) => <h6 className="text-sm font-bold">{children}</h6>,
	p: ({ children }) => (
		<p className="text-gray-800 leading-relaxed mb-4">{children}</p>
	),
	em: ({ children }) => <em className="text-blue-500">{children}</em>,
	blockquote: ({ children }) => (
		<blockquote className="bg-gray-100 border-l-4 border-blue-500 px-4 py-3 my-4">
			{children}{" "}
		</blockquote>
	),
	strong: ({ children }) => (
		<strong className="text-red-500">{children}</strong>
	),
	a: ({ href, children }) => (
		<a
			href={href}
			className="text-green-500 hover:underline hover:text-green-800"
			target="_blank"
			rel="noopener noreferrer"
		>
			{children}
		</a>
	),
	hr: () => <hr className="border-t border-gray-300 my-6" />,
	table: ({ children }) => (
		<div className="overflow-x-auto">
			<table className="table-auto border-collapse border border-gray-300">
				{children}
			</table>
		</div>
	),
	tr: ({ children }) => (
		<tr className="bg-gray-100 border-b border-gray-300">{children}</tr>
	),
	td: ({ children }) => (
		<td className="p-4 border border-gray-300">{children}</td>
	),
	th: ({ children }) => (
		<th className="p-4 border border-gray-300 bg-gray-200 font-semibold">
			{children}
		</th>
	),
	code({ className, children, ...rest }) {
		const match = /language-(\w+)/.exec(className || "");
		return match ? (
			<SyntaxHighlighter
				PreTag="div"
				language={match[1]}
				style={vscDarkPlus}
				{...rest}
			>
				{children}
			</SyntaxHighlighter>
		) : (
			<code
				{...rest}
				className={className}
			>
				{children}
			</code>
		);
	},
};
