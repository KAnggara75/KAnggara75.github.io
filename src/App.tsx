import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import Header from "./component/Header";
import Post from "./pages/Post";

export default function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route
					index
					path="/"
					element={<Home />}
				/>
				<Route
					path="/index.html"
					element={<Home />}
				/>
				<Route
					path="about"
					element={<About />}
				/>
				<Route
					path="post"
					element={<Post />}
				/>
			</Routes>
		</>
	);
}
