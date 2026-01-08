import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ContactUsPage from "./pages/ContactUsPage";
import ServicesPage from "./pages/Services/Service";
import LearnMore from "./pages/Services/LearnMore";
import Blogs from "./pages/Blogs/Blog";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import AboutPage from "./pages/About/About";
import Products from "./pages/products/Products";
import RouteLoadingWrapper from "./components/common/RouteLoadingWrapper";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/Auth/LoginPage";
import CustomerDashboard from "./pages/Dashboard/CustomerDashboard";
import EmployeeDashboard from "./pages/Dashboard/EmployeeDashboard";
import ManagerDashboard from "./pages/Dashboard/ManagerDashboard";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import ProtectedRoute from "./components/common/ProtectedRoute";

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Header />
        <main className="flex-grow">
          <RouteLoadingWrapper>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/contact" element={<ContactUsPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:serviceSlug" element={<LearnMore />} />
              <Route path="/blog" element={<Blogs />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/products" element={<Products />} />

              {/* Authentication Routes */}
              <Route path="/login" element={<LoginPage />} />

              {/* Protected Protected Routes */}
              <Route element={<ProtectedRoute allowedRoles={['customer']} />}>
                 <Route path="/dashboard" element={<CustomerDashboard />} />
              </Route>

              <Route element={<ProtectedRoute allowedRoles={['employee']} />}>
                  <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
              </Route>

              <Route element={<ProtectedRoute allowedRoles={['manager']} />}>
                  <Route path="/manager-dashboard" element={<ManagerDashboard />} />
              </Route>

              <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                  <Route path="/admin-dashboard" element={<AdminDashboard />} />
              </Route>

              <Route path="*" element={<HomePage />} />
            </Routes>
          </RouteLoadingWrapper>
        </main>
        <Footer />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
