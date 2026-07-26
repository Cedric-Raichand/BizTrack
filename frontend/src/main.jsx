import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
import { BusinessProvider } from "./context/BusinessContext.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


ReactDOM.createRoot(
  document.getElementById("root")
).render(


  <BrowserRouter>


    <AuthProvider>


      <BusinessProvider>


        <App />


        <ToastContainer

          position="top-right"

          autoClose={3000}

        />


      </BusinessProvider>


    </AuthProvider>


  </BrowserRouter>


);