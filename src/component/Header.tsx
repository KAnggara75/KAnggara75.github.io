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
		const toTop = document.querySelector("#to-top");

		if (window.scrollY > header!.offsetTop) {
			header!.classList.add("navbar-fixed");
			toTop!.classList.remove("hidden");
			toTop!.classList.add("flex");
		} else {
			toTop!.classList.add("hidden");
			toTop!.classList.remove("flex");
			header!.classList.remove("navbar-fixed");
		}
	};

	const hamburger = () => {
		const hamburger = document.querySelector("#hamburger");
		const navMenu = document.querySelector("#nav-menu");
		hamburger!.classList.toggle("hamburger-active");
		navMenu!.classList.toggle("hidden");
	};

	let homeUrl = "/";
	let blogUrl = "/blog";
	let aboutUrl = "/about";
	let clientUrl = "/client";
	let contactUrl = "/contact";
	let portofolioUrl = "/portfolio";

	if (window.location.pathname === "/") {
		homeUrl = "#home";
		blogUrl = "#blog";
		aboutUrl = "#about";
		clientUrl = "#client";
		contactUrl = "#contact";
		portofolioUrl = "#portfolio";
	}

	return (
		<header className="absolute left-0 z-10 mt-0 flex w-full items-center bg-transparent">
			<div className="container">
				<div className="relative flex items-center justify-between">
					<div className="px-4">
						<a
							href="/"
							className="block py-4 text-lg font-bold text-primary"
						>
							Kelvin Anggara
						</a>
					</div>
					<div className="flex items-center px-3">
						<button
							id="hamburger"
							name="humberger"
							type="button"
							onClick={hamburger}
							className="absolute right-4 flex items-center lg:invisible"
						>
							<div className="relative flex w-8 items-center justify-center">
								<span className="hamburger-line -translate-y-2"></span>
								<span className="hamburger-line"></span>
								<span className="hamburger-line translate-y-2"></span>
							</div>
						</button>
						<nav
							id="nav-menu"
							className="absolute right-4 top-full hidden w-full max-w-[250px] rounded-lg bg-white py-2 shadow-lg lg:static lg:block lg:max-w-full lg:rounded-none lg:bg-transparent lg:shadow-none"
						>
							<ul className="block lg:flex">
								<li className="group">
									<a
										href={homeUrl}
										className="nav-menu"
									>
										Home
									</a>
								</li>
								<li className="group">
									<a
										href={aboutUrl}
										className="nav-menu"
									>
										About Me
									</a>
								</li>
								<li className="group">
									<a
										href={portofolioUrl}
										className="nav-menu"
									>
										Portfolio
									</a>
								</li>
								<li className="group">
									<a
										href={clientUrl}
										className="nav-menu"
									>
										Client
									</a>
								</li>
								<li className="group">
									<a
										href={blogUrl}
										className="nav-menu"
									>
										Blog
									</a>
								</li>
								<li className="group">
									<a
										href={contactUrl}
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
