import React, { useState } from "react";
import { Link } from "react-router-dom";

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      category: "General",
      questions: [
        {
          q: "What is the difference between hospice, home health, and primary care?",
          a: "Hospice focuses on comfort care for patients with life-limiting illness. Home health provides skilled nursing and therapy for recovery or chronic disease management. Primary care (Access Medical) is your ongoing doctor for routine medical needs when you're homebound. All three can work together depending on your situation."
        },
        {
          q: "Do I have to choose between these services?",
          a: "Not necessarily. You might receive home health therapy while also having Access Medical as your primary care doctor. However, hospice and home health curative services typically don't overlap, as hospice shifts focus to comfort rather than cure."
        },
        {
          q: "Does Roadrunner Healthcare serve my area?",
          a: "We serve the greater Albuquerque area, including Corrales, Rio Rancho, and surrounding communities. If you're unsure, give us a call at 505-321-4819 and we'll confirm."
        }
      ]
    },
    {
      category: "Hospice",
      questions: [
        {
          q: "When should someone consider hospice?",
          a: "Hospice may be appropriate when curative treatment is no longer working or desired, symptoms are difficult to control, hospitalizations are frequent, or the focus has shifted to comfort and quality of life. You don't have to be actively dying – earlier hospice enrollment often means better symptom control and more support."
        },
        {
          q: "Can a patient leave hospice if they get better?",
          a: "Yes. Patients can revoke hospice at any time if their condition improves or they choose to pursue curative treatment again."
        },
        {
          q: "Does hospice mean giving up?",
          a: "No. Hospice is about living as fully and comfortably as possible. It provides expert symptom management, emotional and spiritual support, and allows patients to focus on what matters most."
        },
        {
          q: "Is hospice covered by insurance?",
          a: "Yes. Medicare, Medicaid, and most private insurances cover hospice at 100% with no cost to patients or families."
        }
      ]
    },
    {
      category: "Home Health",
      questions: [
        {
          q: "What does 'homebound' mean?",
          a: "Homebound means leaving home requires considerable effort or assistance due to illness, injury, or disability. You can still leave for medical appointments or short, infrequent outings, but it must be difficult and taxing to do so."
        },
        {
          q: "How long does home health last?",
          a: "It varies. Some patients need a few weeks of therapy after surgery; others need ongoing skilled nursing for chronic conditions. Medicare typically certifies home health in 60-day periods, renewable as long as you remain eligible."
        },
        {
          q: "Can I get home health just for help with bathing and meals?",
          a: "Personal care alone (without skilled nursing or therapy) isn't covered by Medicare home health, but we offer private-pay caregiving services for those needs. Call us to discuss options."
        },
        {
          q: "Will I have the same nurse every visit?",
          a: "We try to provide continuity with the same nurse or small team whenever possible, but coverage and scheduling may require occasional changes."
        }
      ]
    },
    {
      category: "Access Medical (Primary Care)",
      questions: [
        {
          q: "What if I already have a primary care doctor?",
          a: "You can keep your existing doctor, or you can transfer your care to Access Medical. If you're homebound and struggle to get to appointments, Access Medical may be a better fit since we come to you."
        },
        {
          q: "Is Access Medical the same as urgent care?",
          a: "No. Access Medical is your ongoing primary care provider – we manage chronic conditions, medications, preventive care, and coordinate with specialists. We're not a one-time urgent care visit."
        },
        {
          q: "Do you accept Medicare?",
          a: "Yes. Access Medical accepts Medicare, Medicaid, and most private insurance plans."
        }
      ]
    },
    {
      category: "Insurance & Costs",
      questions: [
        {
          q: "Do you accept Medicare and Medicaid?",
          a: "Yes. We accept Medicare, Medicaid, and most private insurance plans for all of our services."
        },
        {
          q: "What if I don't have insurance?",
          a: "Contact us to discuss options. Some services may be available on a private-pay basis, and we can help connect you with resources."
        },
        {
          q: "Will I get a bill?",
          a: "Medicare-covered services (hospice, home health, Access Medical visits) typically have little to no out-of-pocket cost. Private-pay caregiving is billed hourly or per service. We'll always discuss costs upfront."
        }
      ]
    },
    {
      category: "Getting Started",
      questions: [
        {
          q: "How do I request services?",
          a: "Call us at 505-321-4819, submit a referral form online, or have your physician, hospital, or facility contact us. We'll take it from there."
        },
        {
          q: "How quickly can services start?",
          a: "It depends on urgency and insurance authorization. Hospice can often start within 24 hours. Home health and primary care typically start within a few days. We'll work as quickly as possible."
        },
        {
          q: "Do I need a doctor's order?",
          a: "Yes, for Medicare-covered services. We'll coordinate with your physician to obtain the necessary orders and documentation."
        }
      ]
    }
  ];

  return (
    <div className="page faq-page">
      <section className="page-header">
        <h1>Frequently Asked Questions</h1>
        <p className="lead">
          Common questions about our services, insurance, and how to get started.
        </p>
      </section>

      <section className="section">
        <p>
          Can't find what you're looking for? <Link to="/contact">Contact us</Link> or
          call <a href="tel:15053214819">505-321-4819</a>.
        </p>
      </section>

      {faqs.map((category, catIndex) => (
        <section key={catIndex} className="section faq-category">
          <h2>{category.category}</h2>
          <div className="faq-list">
            {category.questions.map((faq, qIndex) => {
              const globalIndex = `${catIndex}-${qIndex}`;
              const isOpen = openIndex === globalIndex;

              return (
                <div key={qIndex} className={`faq-item ${isOpen ? 'open' : ''}`}>
                  <button
                    className="faq-question"
                    onClick={() => toggleFAQ(globalIndex)}
                  >
                    <span>{faq.q}</span>
                    <span className="faq-toggle">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div className="faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}

      <section className="section cta-section">
        <h2>Still have questions?</h2>
        <p>Our team is here to help you understand your options.</p>
        <div className="cta-actions">
          <a href="tel:15053214819" className="btn-primary">
            Call 505-321-4819
          </a>
          <Link to="/contact" className="btn-secondary">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}

export default FAQ;
