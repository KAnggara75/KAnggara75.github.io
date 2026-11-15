import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import PostsList, { PostTypes } from "../model/Posts";
import Header from "../component/Header";
import Footer from "../component/Footer";
import PostThumb from "../component/PostThumb";
import BackToTop from "../component/BackToTop";

export default function Tags() {
	const params = useParams();
	const activeTag = params.tag ? decodeURIComponent(params.tag).trim() : "";
	const [posts, setPosts] = useState<PostTypes[]>([]);
	const [allTags, setAllTags] = useState<{ name: string; count: number }[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("/index.json")
			.then((response) => response.json())
			.then((json: PostsList) => {
				const allPosts = json.pages || [];
				setPosts(allPosts);

				// Extract unique tags with counts
				const tagMap = new Map<string, { name: string; count: number }>();
				allPosts.forEach((post) => {
					post.tags?.forEach((t) => {
						const lower = t.toLowerCase();
						const existing = tagMap.get(lower);
						if (existing) {
							existing.count += 1;
						} else {
							tagMap.set(lower, { name: t, count: 1 });
						}
					});
				});

				const sortedTags = Array.from(tagMap.values()).sort(
					(a, b) => b.count - a.count
				);
				setAllTags(sortedTags);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Gagal memuat artikel:", error);
				setLoading(false);
			});
	}, []);

	const filteredPosts = activeTag
		? posts
				.filter((post) =>
					post.tags?.some((t) => t.toLowerCase() === activeTag.toLowerCase())
				)
				.slice()
				.reverse()
		: posts.slice().reverse();

	// Canonical display name for the active tag (preserve original casing if found)
	const matchedTagMeta = allTags.find(
		(t) => t.name.toLowerCase() === activeTag.toLowerCase()
	);
	const displayTagName = matchedTagMeta ? matchedTagMeta.name : activeTag;

	return (
		<>
			<Header />
			<main className="min-h-screen bg-slate-50 pt-28 pb-20 dark:bg-dark">
				<div className="container mx-auto px-4">
					{/* Breadcrumb / Back Link */}
					<div className="mb-6">
						<Link
							to="/#blog"
							className="inline-flex items-center text-sm font-semibold text-primary transition-colors hover:opacity-80"
						>
							<svg
								className="mr-2 h-4 w-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M10 19l-7-7m0 0l7-7m-7 7h18"
								/>
							</svg>
							Kembali ke Semua Tulisan
						</Link>
					</div>

					{/* Header Section */}
					<div className="mb-12">
						<h4 className="mb-2 text-sm font-semibold tracking-wider text-primary uppercase">
							Kategori Tulisan
						</h4>
						<h1 className="mb-3 text-3xl font-bold text-dark sm:text-4xl lg:text-5xl dark:text-white">
							#{displayTagName}
						</h1>
						<p className="text-base font-medium text-secondary dark:text-slate-300">
							{loading
								? "Memuat artikel..."
								: `Menampilkan ${filteredPosts.length} artikel dengan topik "${displayTagName}".`}
						</p>

						{/* Tag Selector Badges */}
						{allTags.length > 0 && (
							<div className="mt-6 flex flex-wrap gap-2 border-t border-slate-200 pt-6 dark:border-slate-800">
								<span className="mr-2 self-center text-xs font-semibold tracking-wider text-secondary uppercase dark:text-slate-400">
									Topik Lain:
								</span>
								{allTags.map((item) => {
									const isActive =
										item.name.toLowerCase() === activeTag.toLowerCase();
									return (
										<Link
											key={item.name}
											to={`/tags/${item.name}`}
											className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-all ${
												isActive
													? "bg-primary text-white shadow-sm"
													: "border border-slate-200 bg-white text-secondary hover:border-primary hover:text-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-primary"
											}`}
										>
											#{item.name}
											<span
												className={`py-0.2 ml-1.5 rounded-full px-1.5 text-[10px] ${
													isActive
														? "bg-white/20 text-white"
														: "bg-slate-100 text-secondary dark:bg-slate-700 dark:text-slate-300"
												}`}
											>
												{item.count}
											</span>
										</Link>
									);
								})}
							</div>
						)}
					</div>

					{/* Content Section */}
					{loading ? (
						<div className="py-20 text-center">
							<div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
							<p className="mt-4 text-sm text-secondary dark:text-slate-400">
								Sedang mengambil data artikel...
							</p>
						</div>
					) : filteredPosts.length > 0 ? (
						<div className="-mx-4 flex flex-wrap">
							{filteredPosts.map((post) => (
								<PostThumb
									key={post.url}
									title={post.title}
									href={post.url}
									img={post.img}
									src={post.src}
									subtitle={post.subtitle}
									tags={post.tags}
								/>
							))}
						</div>
					) : (
						<div className="mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
							<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-secondary dark:bg-slate-800 dark:text-slate-400">
								<svg
									className="h-8 w-8"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="1.5"
										d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
							<h3 className="mb-2 text-xl font-bold text-dark dark:text-white">
								Tidak Ada Artikel Ditemukan
							</h3>
							<p className="mb-6 text-sm text-secondary dark:text-slate-400">
								Belum ada tulisan yang dipublikasikan dengan tag "#
								{displayTagName}". Silakan pilih topik lain di atas atau kembali
								ke beranda.
							</p>
							<Link
								to="/#blog"
								className="inline-block rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-opacity hover:opacity-90"
							>
								Lihat Semua Tulisan
							</Link>
						</div>
					)}
				</div>
			</main>
			<Footer />
			<BackToTop />
		</>
	);
}
