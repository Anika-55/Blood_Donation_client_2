import { motion } from "framer-motion";
import { Heart, ArrowRight, Droplet } from "lucide-react";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-red-50 via-white to-white overflow-hidden">
      {/* Blur background */}
      <div className="absolute top-24 right-10 w-72 h-72 bg-red-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-24 left-10 w-96 h-96 bg-red-300/10 rounded-full blur-3xl" />

      {/* Floating drops */}
      <motion.div
        className="absolute top-1/3 right-1/4 text-red-400/30"
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Droplet className="w-10 h-10 fill-current" />
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 left-1/5 text-red-400/20"
        animate={{ y: [0, -12, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <Droplet className="w-8 h-8 fill-current" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 text-red-600 text-sm font-medium mb-6">
              <Heart className="w-4 h-4" /> Every Drop Saves Lives
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Be Someone’s{" "}
              <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                Hero
              </span>{" "}
              Today
            </h1>

            <p className="text-gray-600 max-w-xl mx-auto lg:mx-0 mb-10 text-lg">
              Your blood donation can save up to 3 lives. Join thousands of
              donors helping their communities every day.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-8 py-3 bg-red-600 text-white rounded-xl font-semibold shadow-lg hover:bg-red-700 transition group"
              >
                Donate Now
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition" />
              </Link>

              <Link
                to="/search"
                className="inline-flex items-center justify-center px-8 py-3 border border-red-600 text-red-600 rounded-xl font-semibold hover:bg-red-50 transition"
              >
                Find Donor
              </Link>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-10 mt-14">
              <Stat value="50K+" label="Lives Saved" />
              <Divider />
              <Stat value="200+" label="Centers" />
              <Divider />
              <Stat value="15K+" label="Donors" />
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 bg-red-400/30 rounded-full blur-2xl animate-pulse" />
              <div className="absolute inset-8 bg-red-500/40 rounded-full" />
              <div className="absolute inset-16 bg-red-600 rounded-full flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.12, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Heart className="w-20 h-20 text-white" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }) {
  return (
    <div className="text-center lg:text-left">
      <p className="text-3xl font-bold text-red-600">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}

function Divider() {
  return <div className="w-px h-12 bg-gray-300 hidden sm:block" />;
}

export default HeroSection;
