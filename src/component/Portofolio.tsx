import {
	Css,
	ExpressIcon,
	Html,
	JavaScript,
	MongoIcon,
	MysqlIcon,
	NodeIcon,
	Php,
	ReactIcon,
} from "./Icons";

export default function Portofolio() {
	return (
		<section
			id="portfolio"
			className="pt-36 pb-16 bg-slate-100"
		>
			<div className="container">
				<div className="w-full px-4">
					<div className="mx-auto text-center mb-16">
						<h4 className="font-semibold text-lg text-primary mb-2 sm:text-4xl lg:text-5xl">
							Portfolio
						</h4>
						<h2 className="font-bold text-dark text-3xl mb-4 md:text-lg">
							Project Terbaru
						</h2>
						<p className="font-medium text-md text-secondary">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. At est
							doloribus voluptatibus, eos beatae sed ea sequi odio vel dolores?
						</p>
					</div>
				</div>
				<div className="w-full px-4 flex flex-wrap justify-center xl:w-10/12 xl:mx-auto">
					<div className="mb-12 p-4 md:w-1/2">
						<div className="rounded-md shadow-md overflow-hidden">
							<img
								src="img/porto/p1.jpeg"
								alt="Landing Page"
								width="w-full"
							/>
						</div>
						<h3 className="font-semibold text-xl text-dark mt-5 mb-2">
							Kelvin Anggara
						</h3>
						<div className="flex">
							<Php />
							<Html />
							<Css />
							<JavaScript />
						</div>
						<p className="font-medium text-base text-secondary">
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Consectetur aliquid aut ipsum!
						</p>
					</div>
					<div className="mb-12 p-4 md:w-1/2">
						<div className="rounded-md shadow-md overflow-hidden">
							<img
								src="img/porto/p2.jpeg"
								alt="E-Commerce"
								width="w-full"
							/>
						</div>
						<h3 className="font-semibold text-xl text-dark mt-5 mb-2">
							E-Commerce
						</h3>
						<div className="flex">
							<Php />
							<Html />
							<Css />
							<JavaScript />
						</div>
						<p className="font-medium text-base text-secondary">
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Consectetur aliquid aut ipsum!
						</p>
					</div>
					<div className="mb-12 p-4 md:w-1/2">
						<div className="rounded-md shadow-md overflow-hidden">
							<img
								src="img/porto/p3.jpeg"
								alt="Technical Documentation"
								width="w-full"
							/>
						</div>
						<h3 className="font-semibold text-xl text-dark mt-5 mb-2">
							Technical Documentation
						</h3>
						<div className="flex">
							<MongoIcon />
							<ExpressIcon />
							<ReactIcon />
							<NodeIcon />
						</div>
						<p className="font-medium text-base text-secondary">
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Consectetur aliquid aut ipsum!
						</p>
					</div>
					<div className="mb-12 p-4 md:w-1/2">
						<div className="rounded-md shadow-md overflow-hidden">
							<img
								src="img/porto/p4.jpeg"
								alt="Tribute Page"
								width="w-full"
							/>
						</div>
						<h3 className="font-semibold text-xl text-dark mt-5 mb-2">
							Tribute Page
						</h3>
						<div className="flex">
							<MysqlIcon />
							<ExpressIcon />
							<ReactIcon />
							<NodeIcon />
						</div>
						<p className="font-medium text-base text-secondary">
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Consectetur aliquid aut ipsum!
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
