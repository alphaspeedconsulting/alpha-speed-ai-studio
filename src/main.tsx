import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AppErrorBoundary } from "./components/AppErrorBoundary";
import { initAnalytics } from "./lib/analytics";
import "./index.css";

initAnalytics();

const root = createRoot(document.getElementById("root")!);
root.render(
  <AppErrorBoundary>
    <App />
  </AppErrorBoundary>
);
