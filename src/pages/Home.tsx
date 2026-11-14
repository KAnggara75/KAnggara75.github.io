import Blog from "../component/Blog";
import Hero from "../component/Hero";
import About from "../component/About";
import Footer from "../component/Footer";
import Header from "../component/Header";
import Contact from "../component/Contact";
import BackToTop from "../component/BackToTop";
import Portofolio from "../component/Portofolio";

export default function Home() {
	return (
		<>
			<Header />
			<Hero />
			<About />
			<Portofolio />
			<Blog />
			<Contact />
			<Footer />
			<BackToTop />
		</>
	);
}
