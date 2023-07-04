import { createRoot } from "react-dom/client";

const container = document.getElementById("app-wrapper");
const root = createRoot(container);
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import AuthProvider from "./context/AuthProvider";
import PostProvider from "./context/PostProvider";
import BookmarkProvider from "./context/BookmarkProvider";

root.render(
  <Router>
    <AuthProvider>
      <PostProvider>
        <BookmarkProvider>
          <App />
        </BookmarkProvider>
      </PostProvider>
    </AuthProvider>
  </Router>
);
