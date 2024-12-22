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
			className="bg-slate-100 py-16 dark:bg-dark"
		>
			<div className="container">
				<div className="w-full px-4">
					<div className="mx-auto mb-16 text-center">
						<h4 className="mb-2 text-lg font-semibold text-primary sm:text-4xl lg:text-5xl">
							Portfolio
						</h4>
						<h2 className="mb-4 text-3xl font-bold text-dark dark:text-slate-100 md:text-lg">
							Project Terbaru
						</h2>
						<p className="text-md font-medium text-secondary">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. At est
							doloribus voluptatibus, eos beatae sed ea sequi odio vel dolores?
						</p>
					</div>
				</div>
				<div className="flex w-full flex-wrap justify-center px-4 xl:mx-auto xl:w-10/12">
					<div className="mb-12 p-4 md:w-1/2">
						<div className="overflow-hidden rounded-md shadow-md">
							<img
								src="img/porto/p1.jpeg"
								alt="Landing Page"
								width="w-full"
							/>
						</div>
						<h3 className="mb-2 mt-5 text-xl font-semibold text-dark dark:text-slate-100">
							Kelvin Anggara
						</h3>
						<div className="flex">
							<Php />
							<Html />
							<Css />
							<JavaScript />
						</div>
						<p className="text-base font-medium text-secondary">
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Consectetur aliquid aut ipsum!
						</p>
					</div>
					<div className="mb-12 p-4 md:w-1/2">
						<div className="overflow-hidden rounded-md shadow-md">
							<img
								src="img/porto/p2.jpeg"
								alt="E-Commerce"
								width="w-full"
							/>
						</div>
						<h3 className="mb-2 mt-5 text-xl font-semibold text-dark dark:text-slate-100">
							E-Commerce
						</h3>
						<div className="flex">
							<Php />
							<Html />
							<Css />
							<JavaScript />
						</div>
						<p className="text-base font-medium text-secondary">
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Consectetur aliquid aut ipsum!
						</p>
					</div>
					<div className="mb-12 p-4 md:w-1/2">
						<div className="overflow-hidden rounded-md shadow-md">
							<img
								src="img/porto/p3.jpeg"
								alt="Technical Documentation"
								width="w-full"
							/>
						</div>
						<h3 className="mb-2 mt-5 text-xl font-semibold text-dark dark:text-slate-100">
							Technical Documentation
						</h3>
						<div className="flex">
							<MongoIcon />
							<ExpressIcon />
							<ReactIcon />
							<NodeIcon />
						</div>
						<p className="text-base font-medium text-secondary">
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Consectetur aliquid aut ipsum!
						</p>
					</div>
					<div className="mb-12 p-4 md:w-1/2">
						<div className="overflow-hidden rounded-md shadow-md">
							<img
								src="img/porto/p4.jpeg"
								alt="Tribute Page"
								width="w-full"
							/>
						</div>
						<h3 className="mb-2 mt-5 text-xl font-semibold text-dark dark:text-slate-100">
							Tribute Page
						</h3>
						<div className="flex">
							<MysqlIcon />
							<ExpressIcon />
							<ReactIcon />
							<NodeIcon />
						</div>
						<p className="text-base font-medium text-secondary">
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Consectetur aliquid aut ipsum!
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
