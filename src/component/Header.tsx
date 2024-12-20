import { useEffect } from "react";

export default function Header() {
	// Sticky Menu Area
	useEffect(() => {
		window.addEventListener("scroll", isSticky);
		return () => {
			window.removeEventListener("scroll", isSticky);
		};
	});

	/* Method that will fix header after a specific scrollable */
	const isSticky = () => {
		const header = document.querySelector("header");

		if (window.scrollY > header!.offsetTop) {
			header!.classList.add("navbar-fixed");
		} else {
			header!.classList.remove("navbar-fixed");
		}
	};

	const hamburger = () => {
		const hamburger = document.querySelector("#hamburger");
		const navMenu = document.querySelector("#nav-menu");
		hamburger!.classList.toggle("hamburger-active");
		navMenu!.classList.toggle("hidden");
	};

	return (
		<header className="bg-transparent absolute mt-0 left-0 w-full flex items-center z-10">
			<div className="container">
				<div className="flex items-center justify-between relative">
					<div className="px-4">
						<a
							href="/"
							className="font-bold text-lg text-primary block py-6"
						>
							Kelvin Anggara
						</a>
					</div>
					<div className="flex items-center px-4">
						<button
							id="hamburger"
							name="humberger"
							type="button"
							onClick={hamburger}
							className="absolute flex items-center right-4 lg:invisible"
						>
							<div className="w-8 flex items-center justify-center relative">
								<span className="hamburger-line -translate-y-2"></span>
								<span className="hamburger-line"></span>
								<span className="hamburger-line translate-y-2"></span>
							</div>
						</button>
						<nav
							id="nav-menu"
							className="hidden absolute py-5 bg-white shadow-lg rounded-lg max-w-[250px] w-full right-4 top-full lg:block lg:static lg:bg-transparent lg:max-w-full lg:shadow-none lg:rounded-none"
						>
							<ul className="block lg:flex">
								<li className="group">
									<a
										href="#home"
										className="nav-menu"
									>
										Home
									</a>
								</li>
								<li className="group">
									<a
										href="#about"
										className="nav-menu"
									>
										About Me
									</a>
								</li>
								<li className="group">
									<a
										href="#portfolio"
										className="nav-menu"
									>
										Portfolio
									</a>
								</li>
								<li className="group">
									<a
										href="#client"
										className="nav-menu"
									>
										Client
									</a>
								</li>
								<li className="group">
									<a
										href="#blog"
										className="nav-menu"
									>
										Blog
									</a>
								</li>
								<li className="group">
									<a
										href="#contact"
										className="nav-menu"
									>
										Contact
									</a>
								</li>
							</ul>
						</nav>
					</div>
				</div>
			</div>
		</header>
	);
}
