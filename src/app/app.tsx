import { createRoot } from "react-dom/client";
import "./styles/style.css";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { AppRouter } from "./routers";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
