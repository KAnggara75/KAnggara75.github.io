import { useEffect } from "react";

export default function BackToTop() {
	let topUrl = "#";

	if (window.location.pathname === "/") {
		topUrl = "#home";
	}

	/* Method that will fix header after a specific scrollable */
	const hideToTop = () => {
		const header = document.querySelector("header");
		const toTop = document.querySelector("#to-top");

		if (window.scrollY > header!.offsetTop) {
			toTop!.classList.add("flex");
			toTop!.classList.remove("hidden");
		} else {
			toTop!.classList.add("hidden");
			toTop!.classList.remove("flex");
		}
	};

	// Sticky Menu Area
	useEffect(() => {
		window.addEventListener("scroll", hideToTop);
		return () => {
			window.removeEventListener("scroll", hideToTop);
		};
	});

	return (
		<a
			href={topUrl}
			id="to-top"
			className="fixed bottom-4 right-4 z-[9999] hidden h-14 w-14 items-center justify-center rounded-full bg-primary p-4 hover:animate-pulse"
		>
			<span className="mt-2 block h-5 w-5 rotate-45 border-l-2 border-t-2" />
		</a>
	);
}
