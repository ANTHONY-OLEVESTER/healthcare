import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ScrollToTop from "./components/layout/ScrollToTop";
import { usePageView } from "./hooks/usePageView";

import Home from "./routes/Home";
import About from "./routes/About";
import ServicesOverview from "./routes/Services/ServicesOverview";
import Hospice from "./routes/Services/Hospice";
import HomeHealth from "./routes/Services/HomeHealth";
import MedicalCare from "./routes/Services/MedicalCare";
import Careers from "./routes/Careers";
import Referrals from "./routes/Referrals";
import FAQ from "./routes/FAQ";
import Contact from "./routes/Contact";
import NotFound from "./routes/NotFound";

function App() {
  usePageView();

  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<ServicesOverview />} />
        <Route path="/services/hospice" element={<Hospice />} />
        <Route path="/services/home-health" element={<HomeHealth />} />
        <Route path="/services/medical-care" element={<MedicalCare />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/referrals" element={<Referrals />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
