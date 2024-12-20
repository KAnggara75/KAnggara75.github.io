import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createHashRouter, RouterProvider } from "react-router";
import Header from "./component/Header";
import Home from "./pages/Home";
import About from "./pages/About";

const router = createHashRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "#/about",
		element: <About />,
	},
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Header />
		<RouterProvider router={router} />
	</StrictMode>
);
