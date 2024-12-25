import Home from "./pages/Home";
import Post from "./pages/Post";
import Blog from "./pages/Blog";
import About from "./pages/About";
import ErrorNotFound from "./pages/404";
import { Routes, Route } from "react-router";

export default function Routers() {
	return (
		<Routes>
			<Route
				index
				path="/"
				element={<Home />}
				errorElement={<ErrorNotFound />}
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
				path="post/:yyyy/:mm/:postId"
				element={<Post />}
			/>
			<Route
				path="blog"
				element={<Blog />}
			/>
		</Routes>
	);
}
