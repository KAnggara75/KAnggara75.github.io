import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";

export default function App() {
	return (
		<>
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
			</Routes>
		</>
	);
}
