import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaHeart,
  FaLocationArrow,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-10 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-3xl font-extrabold text-white mb-3 flex items-center gap-2">
            <FaHeart className="text-red-500" /> BloodCare
          </h2>
          <p className="text-gray-400 leading-relaxed">
            Saving lives together. Donate blood, save a life, and make the world
            a better place.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 mt-5">
            {[FaFacebookF, FaInstagram, FaTwitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="p-2 bg-gray-700 rounded-full hover:bg-red-600 transition"
              >
                <Icon className="text-white text-lg" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-3">
            {["Home", "Donate", "Donors", "Campaigns", "Contact"].map(
              (item, i) => (
                <li key={i}>
                  <Link
                    className="hover:text-red-500 transition"
                    to={`/${item.toLowerCase()}`}
                  >
                    {item}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Support</h3>
          <ul className="space-y-3">
            <li>
              <Link to="/privacy" className="hover:text-red-500 transition">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-red-500 transition">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-red-500 transition">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/help" className="hover:text-red-500 transition">
                Help Center
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>

          <div className="flex items-start gap-3 mb-4">
            <FaLocationArrow className="text-red-500 mt-1" />
            <p>Dhaka, Bangladesh</p>
          </div>

          <div className="flex items-start gap-3 mb-4">
            <FaPhoneAlt className="text-red-500 mt-1" />
            <p>+880 123 456 789</p>
          </div>

          <div className="flex items-start gap-3">
            <FaEnvelope className="text-red-500 mt-1" />
            <p>support@bloodcare.com</p>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()}{" "}
        <span className="text-red-500 font-semibold">BloodCare</span>. All
        Rights Reserved.
      </div>
    </footer>
  );
}
