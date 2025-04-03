import React from "react";
import ReactDOM from "react-dom/client";
import PostApp from "./PostApp";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<PostApp />
	</React.StrictMode>
);
