import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AppErrorBoundary } from "./components/AppErrorBoundary";
import "./index.css";

const root = createRoot(document.getElementById("root")!);
root.render(
  <AppErrorBoundary>
    <App />
  </AppErrorBoundary>
);
