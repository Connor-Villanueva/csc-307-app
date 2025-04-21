// src/main.jsx
import React from "react";
import ReactDOMClient from "react-dom/client";
import MyApp from "./MyApp";
import "./main.css";

// Creating the container
const container = document.getElementById("root");

// Creating the root
const root = ReactDOMClient.createRoot(container);

// Initial render: Render an element to the root

root.render(<MyApp />);