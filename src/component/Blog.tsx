import PostThumb from "./PostThumb";

export default function Blog() {
	return (
		<section
			id="blog"
			className="pt-36 pb-32 bg-slate-100"
		>
			<div className="container">
				<div className="w-full px-4">
					<div className="mx-auto text-center mb-16">
						<h4 className="font-semibold text-lg text-primary mb-2">Blog</h4>
						<h2 className="font-bold text-dark text-3xl mb-4 sm:text-4xl lg:text-5xl">
							Tulisan Terkini
						</h2>
						<p className="font-medium text-md text-secondary md:text-lg">
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Provident, consequatur. Non, harum autem.
						</p>
					</div>
				</div>
				<div className="flex flex-wrap">
					<PostThumb
						title={"Tips Belajar Programming"}
						href={"/blog"}
					/>
					<PostThumb
						title={"Tips Belajar Programming"}
						href={"/blog"}
					/>
					<PostThumb
						title={"Tips Belajar Programming"}
						href={"/blog"}
					/>
				</div>
			</div>
		</section>
	);
}
