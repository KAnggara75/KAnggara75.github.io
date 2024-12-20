// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";

// createRoot(document.getElementById("root")!).render(<StrictMode></StrictMode>);

createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<Routes>
			<Route
				path="/"
				element={<Home />}
			/>
			<Route
				path="/about"
				element={<About />}
			/>
		</Routes>
	</BrowserRouter>
);
