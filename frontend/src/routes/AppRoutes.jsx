import { Routes, Route } from "react-router-dom";


import Login from "../pages/Login";
import Register from "../pages/Register";

import Dashboard from "../pages/Dashboard";

import Businesses from "../pages/Businesses";
import Transactions from "../pages/Transactions";
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";


import CreateBusiness from "../pages/CreateBusiness";
import CreateTransaction from "../pages/CreateTransaction";
import EditTransaction from "../pages/EditTransaction";
import TransactionDetails from "../pages/TransactionDetails";


import ProtectedRoute from "./ProtectedRoute";



const AppRoutes = () => {


  return (

    <Routes>



      {/* Public routes */}


      <Route

        path="/"

        element={<Login />}

      />


      <Route

        path="/login"

        element={<Login />}

      />


      <Route

        path="/register"

        element={<Register />}

      />






      {/* Protected Dashboard */}


      <Route

        path="/dashboard"

        element={

          <ProtectedRoute>

            <Dashboard />

          </ProtectedRoute>

        }

      />








      {/* Businesses */}


      <Route

        path="/businesses"

        element={

          <ProtectedRoute>

            <Businesses />

          </ProtectedRoute>

        }

      />







      {/* Transactions */}


      <Route

        path="/transactions"

        element={

          <ProtectedRoute>

            <Transactions />

          </ProtectedRoute>

        }

      />







      {/* Reports */}


      <Route

        path="/reports"

        element={

          <ProtectedRoute>

            <Reports />

          </ProtectedRoute>

        }

      />







      {/* Settings */}


      <Route

        path="/settings"

        element={

          <ProtectedRoute>

            <Settings />

          </ProtectedRoute>

        }

      />









      {/* Create Business */}


      <Route

        path="/create-business"

        element={

          <ProtectedRoute>

            <CreateBusiness />

          </ProtectedRoute>

        }

      />







      {/* Create Transaction */}


      <Route

        path="/create-transaction"

        element={

          <ProtectedRoute>

            <CreateTransaction />

          </ProtectedRoute>

        }

      />








      {/* Edit Transaction */}


      <Route

        path="/edit-transaction/:id"

        element={

          <ProtectedRoute>

            <EditTransaction />

          </ProtectedRoute>

        }

      />








      {/* Transaction Details */}


      <Route

        path="/transaction/:id"

        element={

          <ProtectedRoute>

            <TransactionDetails />

          </ProtectedRoute>

        }

      />



    </Routes>

  );

};



export default AppRoutes;