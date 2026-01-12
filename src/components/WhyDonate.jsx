import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Shield, Smile, RefreshCw, Users, Award } from "lucide-react";

const benefits = [
  {
    icon: Heart,
    title: "Save Lives",
    description:
      "One donation can save up to 3 lives. Your blood goes directly to patients in need.",
  },
  {
    icon: Shield,
    title: "Free Health Screening",
    description:
      "Get a mini health check including blood pressure, pulse, and hemoglobin levels.",
  },
  {
    icon: Smile,
    title: "Emotional Wellness",
    description:
      "Feel the happiness of knowing you’ve made a real difference in someone’s life.",
  },
  {
    icon: RefreshCw,
    title: "Regenerate Blood Cells",
    description:
      "Your body naturally produces fresh blood cells after donation to keep you healthy.",
  },
  {
    icon: Users,
    title: "Join the Community",
    description:
      "Become part of a caring donor community making a positive impact together.",
  },
  {
    icon: Award,
    title: "Earn Recognition",
    description:
      "Receive certificates, badges and special appreciation for your contributions.",
  },
];

function WhyDonate() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span className="inline-block mb-3 text-sm font-semibold text-red-600 uppercase">
            Benefits
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5">
            Why Donate Blood?
          </h2>
          <p className="text-gray-600 text-lg">
            Donating blood is not just about giving — it’s about gaining health,
            happiness, and helping humanity.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="p-8 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-xl hover:border-red-300 transition"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-red-100 text-red-600 mb-6">
                <item.icon className="w-7 h-7" />
              </div>

              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyDonate;
