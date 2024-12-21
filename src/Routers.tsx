import Home from "./pages/Home";
import Post from "./pages/Post";
import About from "./pages/About";
import Header from "./component/Header";
import { Routes, Route } from "react-router";

export default function Routers() {
	return (
		<>
			<Header />
			<Routes>
				<Route
					path="*"
					element={<Home />}
				/>
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
					path="post/:postId"
					element={<Post />}
				/>
			</Routes>
		</>
	);
}
