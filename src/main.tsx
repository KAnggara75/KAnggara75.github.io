import "./index.css";
import Routers from "./Routers";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<Routers />
		</BrowserRouter>
	</StrictMode>
);
