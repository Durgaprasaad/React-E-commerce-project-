import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import ReactDOM from "react-dom/client";
import "remixicon/fonts/remixicon.css";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
//react routers
import { BrowserRouter } from "react-router-dom";
//react-redux
import store from "./redux/store";
import { Provider } from "react-redux";
//react-toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//stripe
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        {/* <Elements stripe={stripePromise}> */}
          <ToastContainer
            position="bottom-right"
            autoClose={2000}
            closeOnClick
            draggable
            pauseOnHover={false}
            theme="light"
          />
          <App />
        {/* </Elements> */}
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
