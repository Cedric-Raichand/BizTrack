import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import CreateBusiness from "../pages/CreateBusiness";
import CreateTransaction from "../pages/CreateTransaction";

import ProtectedRoute from "./ProtectedRoute";


const AppRoutes = () => {

  return (

    <Routes>


      {/* Default page */}
      <Route 
        path="/" 
        element={<Login />} 
      />


      {/* Public routes */}
      <Route 
        path="/login" 
        element={<Login />} 
      />


      <Route 
        path="/register" 
        element={<Register />} 
      />



      {/* Protected routes */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />


      <Route
        path="/create-business"
        element={
          <ProtectedRoute>
            <CreateBusiness />
          </ProtectedRoute>
        }
      />


      <Route
        path="/create-transaction"
        element={
          <ProtectedRoute>
            <CreateTransaction />
          </ProtectedRoute>
        }
      />


    </Routes>

  );

};


export default AppRoutes;