import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Footer from "./component/Footer.tsx";
import Contact from "./component/Contact.tsx";
import Blog from "./component/Blog.tsx";
import Client from "./component/Client.tsx";
import Portofolio from "./component/Portofolio.tsx";
import About from "./component/About.tsx";
import Hero from "./component/Hero.tsx";
import Header from "./component/Header.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Header />
		<Hero />
		<About />
		<Portofolio />
		<Client />
		<Blog />
		<Contact />
		<Footer />
	</StrictMode>
);
