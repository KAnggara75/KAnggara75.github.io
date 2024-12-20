import About from "../component/About";
import Blog from "../component/Blog";
import Client from "../component/Client";
import Contact from "../component/Contact";
import Footer from "../component/Footer";
import Hero from "../component/Hero";
import Portofolio from "../component/Portofolio";

export default function Home() {
	return (
		<>
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
