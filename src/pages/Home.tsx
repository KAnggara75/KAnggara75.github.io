import Blog from "../component/Blog";
import Hero from "../component/Hero";
import About from "../component/About";
import Client from "../component/Client";
import Footer from "../component/Footer";
import Header from "../component/Header";
import Contact from "../component/Contact";
import Portofolio from "../component/Portofolio";

export default function Home() {
	return (
		<>
			<Header />
			<Hero />
			<About />
			<Portofolio />
			<Client />
			<Blog />
			<Contact />
			<Footer />
		</>
	);
}
