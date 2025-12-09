import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ScrollToTop from "./components/layout/ScrollToTop";
import { usePageView } from "./hooks/usePageView";
import { AuthProvider } from "./context/AuthContext";
import { AccessibilityProvider } from "./context/AccessibilityContext";
import RequireAuth from "./components/admin/RequireAuth";
import AdminLayout from "./components/admin/AdminLayout";

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
import AdminNav from "./routes/Admin/AdminNav";
import AdminServices from "./routes/Admin/AdminServices";
import AdminFAQ from "./routes/Admin/AdminFAQ";
import AdminCareers from "./routes/Admin/AdminCareers";
import AdminSlides from "./routes/Admin/AdminSlides";
import AdminNews from "./routes/Admin/AdminNews";
import NotFound from "./routes/NotFound";

function App() {
  usePageView();

  return (
    <AuthProvider>
      <AccessibilityProvider>
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
            <Route
              path="/admin"
              element={
                <RequireAuth>
                  <AdminLayout />
                </RequireAuth>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="nav" element={<AdminNav />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="faq" element={<AdminFAQ />} />
              <Route path="careers" element={<AdminCareers />} />
              <Route path="slides" element={<AdminSlides />} />
              <Route path="news" element={<AdminNews />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </AccessibilityProvider>
    </AuthProvider>
  );
}

export default App;
