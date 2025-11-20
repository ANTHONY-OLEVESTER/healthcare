import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Hook to track page views with Google Analytics or other analytics providers
 * Usage: Call usePageView() at the top level of your App component
 */
export function usePageView() {
  const location = useLocation();

  useEffect(() => {
    // Google Analytics (gtag.js)
    if (typeof window.gtag !== "undefined") {
      window.gtag("event", "page_view", {
        page_path: location.pathname + location.search,
        page_location: window.location.href,
        page_title: document.title,
      });
    }

    // Google Analytics 4 (ga4)
    if (typeof window.dataLayer !== "undefined") {
      window.dataLayer.push({
        event: "page_view",
        page_path: location.pathname + location.search,
      });
    }

    // Plausible Analytics
    if (typeof window.plausible !== "undefined") {
      window.plausible("pageview");
    }

    // Simple console log for development (remove in production)
    if (process.env.NODE_ENV === "development") {
      console.log("Page view:", location.pathname);
    }
  }, [location]);
}

export default usePageView;
