import { Components } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export const mdxComponents: Components = {
	h1: ({ children }) => <h1 className="hidden">{children}</h1>,
	h2: ({ children }) => (
		<h2 className="text-xl font-bold dark:text-white">{children}</h2>
	),
	h3: ({ children }) => (
		<h3 className="text-lg font-bold dark:text-white">{children}</h3>
	),
	h4: ({ children }) => (
		<h4 className="text-base font-bold dark:text-white">{children}</h4>
	),
	h5: ({ children }) => (
		<h5 className="text-sm font-bold dark:text-white">{children}</h5>
	),
	h6: ({ children }) => (
		<h6 className="text-xs font-bold dark:text-white">{children}</h6>
	),
	ul: ({ children }) => (
		<ul className="ml-4 mt-4 list-disc dark:text-slate-300">{children}</ul>
	),
	li: ({ children }) => (
		<li className="mt-1 dark:text-slate-300">{children}</li>
	),
	p: ({ children }) => (
		<p className="mb-4 leading-relaxed text-gray-800 dark:text-slate-300">
			{children}
		</p>
	),
	em: ({ children }) => (
		<em className="text-blue-500 dark:text-green-500">{children}</em>
	),
	blockquote: ({ children }) => (
		<blockquote className="my-4 border-l-4 border-blue-500 bg-gray-100 px-4 py-3 dark:text-slate-300">
			{children}{" "}
		</blockquote>
	),
	strong: ({ children }) => (
		<strong className="text-red-500">{children}</strong>
	),
	a: ({ href, children }) => (
		<a
			href={href}
			className="text-green-500 hover:text-green-800 hover:underline dark:text-blue-500"
			target="_blank"
			rel="noopener noreferrer"
		>
			{children}
		</a>
	),
	hr: () => <hr className="my-6 border-t border-gray-300" />,
	table: ({ children }) => (
		<div className="overflow-x-auto">
			<table className="table-auto border-collapse border border-gray-300">
				{children}
			</table>
		</div>
	),
	tr: ({ children }) => (
		<tr className="border-b border-gray-300 bg-gray-100">{children}</tr>
	),
	td: ({ children }) => (
		<td className="border border-gray-300 p-4">{children}</td>
	),
	th: ({ children }) => (
		<th className="border border-gray-300 bg-gray-200 p-4 font-semibold">
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
