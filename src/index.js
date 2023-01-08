import { createRoot } from "react-dom/client";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.min.css"
import "./index.css"

const container = document.getElementById("app");
const root = createRoot(container)
root.render(<App />);