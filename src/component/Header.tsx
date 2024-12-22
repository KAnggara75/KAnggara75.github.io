import { useEffect, useState } from "react";

export default function Header() {
	const html = document.querySelector("html");

	const [dark, setDark] = useState<boolean>(
		window.matchMedia("(prefers-color-scheme: dark)").matches
	);

	const toggleTheme = () => {
		if (dark) {
			html?.classList.add("dark");
			setDark(false);
		} else {
			html?.classList.remove("dark");
			setDark(true);
		}
	};

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

	const toggleHamburger = () => {
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

	// Sticky Menu Area
	useEffect(() => {
		if (dark) {
			console.info("dark");
			html?.classList.add("dark");
		} else {
			console.info("light");
			html?.classList.remove("dark");
		}

		window.addEventListener("scroll", isSticky);
		return () => {
			window.removeEventListener("scroll", isSticky);
		};
	}, [dark, html]);

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
							onClick={toggleHamburger}
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
								<li className="group">
									<div className="ml-3 flex flex-col justify-center">
										<input
											type="checkbox"
											id="light-switch"
											name="light-switch"
											className="light-switch sr-only"
											checked={dark === true}
											onChange={toggleTheme}
										/>
										<label
											className="relative cursor-pointer p-2"
											htmlFor="light-switch"
										>
											<svg
												className="dark:hidden"
												width="16"
												height="16"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													className="fill-slate-300"
													d="M7 0h2v2H7zM12.88 1.637l1.414 1.415-1.415 1.413-1.413-1.414zM14 7h2v2h-2zM12.95 14.433l-1.414-1.413 1.413-1.415 1.415 1.414zM7 14h2v2H7zM2.98 14.364l-1.413-1.415 1.414-1.414 1.414 1.415zM0 7h2v2H0zM3.05 1.706 4.463 3.12 3.05 4.535 1.636 3.12z"
												/>
												<path
													className="fill-slate-400"
													d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z"
												/>
											</svg>
											<svg
												className="hidden dark:block"
												width="16"
												height="16"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													className="fill-slate-400"
													d="M6.2 1C3.2 1.8 1 4.6 1 7.9 1 11.8 4.2 15 8.1 15c3.3 0 6-2.2 6.9-5.2C9.7 11.2 4.8 6.3 6.2 1Z"
												/>
												<path
													className="fill-slate-500"
													d="M12.5 5a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 5Z"
												/>
											</svg>
											<span className="sr-only">
												Switch to light / dark version
											</span>
										</label>
									</div>
								</li>
							</ul>
						</nav>
					</div>
				</div>
			</div>
		</header>
	);
}
