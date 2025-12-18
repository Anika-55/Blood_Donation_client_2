// VolunteerSection.jsx
import React from "react";

// Import images from assets folder
import volunteer1 from "../assets/volunteer1.jpg";
import volunteer2 from "../assets/volunteer2.jpg";
import volunteer3 from "../assets/volunteer3.jpg";

const volunteers = [
  {
    name: "Jane Doe",
    role: "Volunteer",
    image: volunteer1,
  },
  {
    name: "Abbi Smith",
    role: "Volunteer",
    image: volunteer2,
  },
  {
    name: "Mike Johnson",
    role: "Volunteer",
    image: volunteer3,
  },
];

export default function VolunteerSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Meet Our Volunteers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {volunteers.map((volunteer, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={volunteer.image}
                alt={volunteer.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  {volunteer.name}
                </h3>
                <p className="text-gray-500 mt-2">{volunteer.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
