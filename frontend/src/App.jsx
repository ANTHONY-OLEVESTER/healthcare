import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ScrollToTop from "./components/layout/ScrollToTop";
import { usePageView } from "./hooks/usePageView";
import { AuthProvider } from "./context/AuthContext";

import Home from "./routes/Home";
import About from "./routes/About";
import ServicesOverview from "./routes/Services/ServicesOverview";
import ServiceDetail from "./routes/Services/ServiceDetail";
import Careers from "./routes/Careers";
import Referrals from "./routes/Referrals";
import FAQ from "./routes/FAQ";
import Contact from "./routes/Contact";
import AdminLogin from "./routes/Admin/AdminLogin";
import AdminDashboard from "./routes/Admin/AdminDashboard";
import NotFound from "./routes/NotFound";

function App() {
  usePageView();

  return (
    <AuthProvider>
      <Layout>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<ServicesOverview />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/referrals" element={<Referrals />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}

export default App;
