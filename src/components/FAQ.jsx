import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const faqs = [
  {
    question: "Does blood donation hurt?",
    answer:
      "Most donors feel only a brief pinch when the needle is inserted. The actual donation is painless, and our trained staff ensures your comfort throughout the process.",
  },
  {
    question: "How long does the donation process take?",
    answer:
      "The entire process takes about 45 minutes to an hour, including registration, health screening, the actual donation (8–10 minutes), and refreshment afterward.",
  },
  {
    question: "How often can I donate blood?",
    answer:
      "You can donate whole blood every 56 days (about 8 weeks). Platelet donors can give more frequently, up to 24 times per year. We'll help you track your eligibility.",
  },
  {
    question: "What should I do before donating?",
    answer:
      "Get a good night's sleep, eat a healthy meal, drink plenty of water, and avoid fatty foods. Bring a valid ID and wear comfortable clothing with sleeves that can be raised.",
  },
  {
    question: "Are there any side effects?",
    answer:
      "Most donors feel fine after donating. Some may experience slight dizziness or bruising at the needle site. These are temporary and resolve quickly with rest and hydration.",
  },
  {
    question: "What blood types are most needed?",
    answer:
      "All blood types are needed, but O-negative (universal donor) and O-positive are always in high demand. AB plasma donors are also valuable as universal plasma donors.",
  },
];

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={ref} className="py-28 bg-red-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span className="text-sm font-semibold text-red-600 uppercase">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">
            Common Questions
          </h2>
          <p className="text-gray-700 text-lg">
            Everything you need to know about blood donation.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto space-y-4"
        >
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center font-semibold text-gray-800 hover:bg-red-50 transition"
              >
                {faq.question}
                {/* Simple arrow using Tailwind */}
                <motion.span
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-4 inline-block w-4 h-4 border-r-2 border-b-2 border-red-600 transform"
                  style={{ transformOrigin: "center" }}
                ></motion.span>
              </button>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="px-6 overflow-hidden text-gray-700 pb-5"
              >
                {faq.answer}
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
