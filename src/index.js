import { createRoot } from "react-dom/client";

const container = document.getElementById("app-wrapper");
const root = createRoot(container);
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

root.render(
  <Router>
    <App />
  </Router>
);
