import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.scss";
import App from "./App";
import { Provider } from "react-redux";
import store from "./features/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    </React.StrictMode>
);
