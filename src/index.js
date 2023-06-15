import { createRoot } from "react-dom/client";

const container = document.getElementById("app-wrapper");
const root = createRoot(container);
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import AuthProvider from "./context/AuthProvider";
console.log({ AuthProvider });
root.render(
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
);
