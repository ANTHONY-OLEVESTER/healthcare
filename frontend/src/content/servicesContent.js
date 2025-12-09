// Detailed service information for use across components

export const servicesContent = {
  hospice: {
    benefits: [
      "Pain and symptom management",
      "24/7 on-call nursing support",
      "Emotional, spiritual, and bereavement care",
      "Medical equipment and supplies at home",
      "Care coordination with your physician",
      "Family education and support"
    ],
    team: [
      {
        role: "Registered Nurses",
        description: "Coordinate care, manage symptoms, educate families"
      },
      {
        role: "Hospice Physician",
        description: "Oversees medical care and comfort management"
      },
      {
        role: "Social Worker",
        description: "Provides counseling, resources, and emotional support"
      },
      {
        role: "Chaplain",
        description: "Offers spiritual care and support (optional, all faiths welcome)"
      },
      {
        role: "Home Health Aides",
        description: "Assist with bathing, dressing, personal care"
      },
      {
        role: "Bereavement Coordinator",
        description: "Supports families after loss"
      }
    ],
    eligibilityCriteria: [
      "Treatment is no longer working or the patient chooses to stop curative treatment",
      "Frequent hospitalizations or ER visits",
      "Uncontrolled symptoms such as pain, shortness of breath, or fatigue",
      "Progressive decline in function, mobility, or weight loss",
      "The focus is shifting from cure to comfort and quality of life"
    ]
  },

  homeHealth: {
    skilledNursing: [
      "Wound care and dressing changes",
      "Medication management and education",
      "Chronic disease monitoring (diabetes, heart failure, COPD, etc.)",
      "IV therapy and infusions",
      "Catheter and ostomy care",
      "Post-surgical care",
      "Vital sign monitoring",
      "Patient and caregiver education"
    ],
    therapy: [
      {
        type: "Physical Therapy (PT)",
        description: "Improve mobility, strength, balance, and reduce fall risk"
      },
      {
        type: "Occupational Therapy (OT)",
        description: "Regain ability to perform daily activities like bathing, dressing, cooking"
      },
      {
        type: "Speech Therapy (ST)",
        description: "Address swallowing difficulties, speech, and cognitive function"
      }
    ],
    caregiving: [
      "Bathing, dressing, grooming",
      "Meal preparation and feeding assistance",
      "Light housekeeping and laundry",
      "Companionship and conversation",
      "Medication reminders",
      "Transportation to appointments",
      "Respite care for family caregivers"
    ],
    eligibility: [
      "You are homebound (difficult or unsafe to leave home without assistance)",
      "Your physician orders home health services",
      "You need skilled nursing or therapy (not just personal care)",
      "Services are provided by a Medicare-certified agency"
    ]
  },

  medicalCare: {
    services: [
      "Comprehensive physical exams",
      "Chronic disease management",
      "Medication review and management",
      "Routine lab work and diagnostics",
      "Preventive care and screenings"
    ],
    conditions: [
      "Diabetes",
      "Heart failure",
      "COPD and respiratory disease",
      "Hypertension",
      "Dementia and Alzheimer's",
      "Arthritis and mobility issues",
      "Chronic kidney disease",
      "Parkinson's disease",
      "Stroke recovery",
      "Depression and anxiety",
      "Medication management",
      "Post-hospitalization care"
    ],
    eligibility: [
      "Are homebound or have significant difficulty traveling to appointments",
      "Reside in assisted living facilities or group homes",
      "Have multiple chronic conditions requiring ongoing management",
      "Need a primary care physician who understands geriatric care",
      "Prefer the convenience and comfort of care at home"
    ]
  }
};

export default servicesContent;
