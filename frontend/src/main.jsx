import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
import { BusinessProvider } from "./context/BusinessContext.jsx";

import ThemedToastContainer from "./components/ThemedToastContainer.jsx";
import "react-toastify/dist/ReactToastify.css";


ReactDOM.createRoot(
  document.getElementById("root")
).render(


  <BrowserRouter>


    <AuthProvider>


      <BusinessProvider>


        <App />


        <ThemedToastContainer />


      </BusinessProvider>


    </AuthProvider>


  </BrowserRouter>


);