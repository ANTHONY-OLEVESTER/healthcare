import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFAQ } from "../api/faq";

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const data = await getFAQ();
        if (cancelled) return;
        const grouped = data.reduce((acc, item) => {
          const category = item.category || "General";
          if (!acc[category]) acc[category] = [];
          acc[category].push({ q: item.question, a: item.answer, order: item.order || 0 });
          return acc;
        }, {});
        const groupedArray = Object.entries(grouped).map(([category, questions]) => ({
          category,
          questions: questions.sort((a, b) => (a.order || 0) - (b.order || 0)),
        }));
        setGroups(groupedArray);
      } catch (err) {
        if (!cancelled) setError(err.message);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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

      {error && (
        <section className="section">
          <p className="form-error-message">{error}</p>
        </section>
      )}

      {groups.map((category, catIndex) => (
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
                    <span className="faq-toggle">{isOpen ? '-' : '+'}</span>
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
