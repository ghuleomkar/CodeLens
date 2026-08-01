import { BrowserRouter, Routes, Route } from "react-router-dom";


import Home from "./pages/Home";

import Analyze from "./pages/Analyze";

import Repository from "./pages/Repository";

import Login from "./pages/Login";

import Register from "./pages/Register";


import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import ProtectedRoute from "./components/auth/ProtectedRoute";

import { AuthProvider } from "./context/AuthContext";


const App = () => {

  return (

    <AuthProvider>

      <BrowserRouter>

        <Navbar />


        <Routes>


          {/* Public Routes */}

          <Route
            path="/"
            element={<Home />}
          />


          <Route
            path="/login"
            element={<Login />}
          />


          <Route
            path="/register"
            element={<Register />}
          />


          {/* Protected Routes */}

          <Route
            path="/analyze"
            element={

              <ProtectedRoute>

                <Analyze />

              </ProtectedRoute>

            }
          />


          <Route
            path="/repository/:id"
            element={

              <ProtectedRoute>

                <Repository />

              </ProtectedRoute>

            }
          />


        </Routes>
   <Footer/>
      </BrowserRouter>

    
  
    </AuthProvider>

    

  );

};


export default App;