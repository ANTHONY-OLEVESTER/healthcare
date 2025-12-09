import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import AccessibilityPanel from "../AccessibilityPanel";
import ChatWidget from "../ChatWidget";

function Layout({ children }) {
  return (
    <div className="app">
      <Header />
      <main className="app-main">{children}</main>
      <AccessibilityPanel />
      <ChatWidget />
      <Footer />
    </div>
  );
}

export default Layout;
