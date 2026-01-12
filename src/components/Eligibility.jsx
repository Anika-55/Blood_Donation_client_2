import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, X } from "lucide-react";
import { Link } from "react-router-dom";

const eligible = [
  "Age between 18–65 years",
  "Weight at least 50 kg",
  "Generally good health",
  "Not donated in last 56 days",
  "Adequate hemoglobin levels",
  "Well-rested and hydrated",
];

const notEligible = [
  "Recent tattoo or piercing (6 months)",
  "Currently on restricted medication",
  "Recent surgery or blood transfusion",
  "Pregnant or nursing",
  "Cold, flu, or infection",
  "Low iron or hemoglobin",
];

function Eligibility() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section ref={ref} className="py-28 bg-gradient-to-br from-white to-red-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span className="text-sm font-semibold text-red-600 uppercase">
            Requirements
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">
            Am I Eligible?
          </h2>
          <p className="text-gray-600 text-lg">
            Check these simple conditions before becoming a hero.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Eligible */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="p-10 rounded-3xl bg-white border-2 border-red-200 shadow-lg"
          >
            <h3 className="flex items-center gap-3 text-2xl font-semibold text-red-600 mb-6">
              <Check className="w-6 h-6" /> You Can Donate If
            </h3>

            <ul className="space-y-4">
              {eligible.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  className="flex items-center gap-3 text-gray-700"
                >
                  <Check className="w-5 h-5 text-red-600" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Not Eligible */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="p-10 rounded-3xl bg-white border border-gray-200 shadow-lg"
          >
            <h3 className="flex items-center gap-3 text-2xl font-semibold text-gray-500 mb-6">
              <X className="w-6 h-6" /> You May Not Donate If
            </h3>

            <ul className="space-y-4">
              {notEligible.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  className="flex items-center gap-3 text-gray-500"
                >
                  <X className="w-5 h-5" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-6 text-lg">
            Still unsure? Take our quick eligibility check.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center justify-center px-8 py-3 bg-red-600 text-white rounded-xl font-semibold shadow-lg hover:bg-red-700 transition"
          >
            Check Eligibility
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default Eligibility;
