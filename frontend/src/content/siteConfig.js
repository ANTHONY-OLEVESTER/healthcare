// Central configuration for site-wide content and settings

export const siteConfig = {
  siteName: "Roadrunner Healthcare",
  tagline: "Home health, hospice, and primary care that feels like family",

  contact: {
    phone: "505-321-4819",
    phoneFormatted: "(505) 321-4819",
    fax: "505-898-3630",
    email: {
      general: "info@roadrunnerhealthcare.com",
      referrals: "referrals@roadrunnerhealthcare.com",
      careers: "careers@roadrunnerhealthcare.com",
      accessMedical: "info@accessmedicalnm.care"
    },
    address: {
      street: "Corrales Road",
      city: "Corrales",
      state: "NM",
      zip: "87048",
      full: "Corrales, New Mexico"
    }
  },

  hours: {
    office: "Monday – Friday, 8:00 AM – 5:00 PM",
    onCall: "24/7 On-Call Support Available"
  },

  serviceAreas: [
    "Corrales",
    "Albuquerque",
    "Rio Rancho",
    "Bernalillo",
    "Placitas",
    "Surrounding New Mexico communities"
  ],

  services: {
    hospice: {
      name: "Hospice Care",
      shortName: "Hospice",
      path: "/services/hospice",
      icon: "🏥",
      description: "Comfort-focused end-of-life care for patients and families – 24/7 support, symptom management, and emotional and spiritual care."
    },
    homeHealth: {
      name: "Home Health & In-Home Care",
      shortName: "Home Health",
      path: "/services/home-health",
      icon: "🏠",
      description: "Skilled nursing, therapy, and caregiving in the comfort of home – supporting recovery, independence, and daily living."
    },
    medicalCare: {
      name: "Homebound Primary Care",
      shortName: "Primary Care",
      path: "/services/medical-care",
      icon: "⚕️",
      description: "Access Medical provides geriatric primary care for homebound patients, assisted living residents, and group homes."
    }
  },

  social: {
    facebook: "#",
    linkedin: "#",
    // Add actual URLs when available
  }
};

export default siteConfig;
