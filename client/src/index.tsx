import ReactDOM from "react-dom/client";
import "./assets/styles/main.scss";
import App from "./App";
import { setupStore } from "./utilities/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={setupStore()}>
    <App />
  </Provider>
);
