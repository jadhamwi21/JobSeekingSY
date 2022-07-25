import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";

const container = document.getElementById("root");

const root = createRoot(container!);

root.render(
	<Router>
		<Provider store={store}>
			<App />
		</Provider>
	</Router>
);
