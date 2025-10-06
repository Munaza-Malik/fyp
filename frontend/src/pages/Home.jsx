import React from "react";
import logo from "../assets/logo.png";
import numberPlate from "../assets/side-img.jpg"; 

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-blue-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
            <span className="font-bold text-xl">MOVA</span>
          </div>

          {/* Nav / Buttons */}
          <nav className="flex space-x-4">
            <a
              href="/login"
              className="bg-orange-400 px-4 py-2 rounded-lg font-semibold hover:bg-orange-500 transition"
            >
              Login
            </a>
            <a
              href="/signup"
              className="bg-white text-blue-900 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Sign Up
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full h-[400px] md:h-[500px]">
        <img
          src={numberPlate}
          alt="Pakistani Number Plate"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white text-center">
            AI Multimodal Vehicle Access System
          </h1>
        </div>
      </section>

      {/* Introduction */}
      <section className="max-w-5xl mx-auto p-8 text-center">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Introduction</h2>
        <p className="text-gray-700 text-lg">
          Our project introduces an AI-powered multimodal vehicle access system
          designed to provide secure, fast, and reliable vehicle identification.
          By integrating advanced recognition techniques, the system ensures
          seamless operations for modern transportation environments.
        </p>
      </section>

      {/* How it Works */}
      <section className="bg-orange-50 py-12 px-6 text-center">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">How it Works?</h2>
        <p className="text-gray-700 max-w-3xl mx-auto mb-6">
          Vehicles are scanned in real-time using AI-powered cameras that detect
          and process number plates, ensuring accurate verification and access
          control with minimal human intervention.
        </p>

        {/* Optional video embed */}
        <div className="flex justify-center">
          <iframe
            className="w-full max-w-3xl h-64 md:h-96 rounded-xl shadow-lg"
            src="https://www.youtube.com/embed/h7N4UC929NE"
            title="Demo Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* What We Offer */}
      <section className="max-w-5xl mx-auto py-12 px-6 text-center">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">What We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">
              Great Accuracy
            </h3>
            <p className="text-gray-600">
              High precision recognition ensures accurate results in every scan.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">
              Adaptability
            </h3>
            <p className="text-gray-600">
              Flexible to work in multiple environments with reliable
              performance.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">
              24/7 Operation
            </h3>
            <p className="text-gray-600">
              Continuous operation in all weather conditions, day or night.
            </p>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section id="about" className="bg-gray-100 py-12 px-6 text-center">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">About Us</h2>
        <p className="text-gray-700 max-w-3xl mx-auto">
          We are a dedicated team of Computer Science students working on
          innovative AI-based solutions. Our goal is to revolutionize the way
          vehicle access and security systems operate by integrating modern
          technology into real-world applications.
        </p>
      </section>

      {/* Contact Us */}
      <section id="contact" className="bg-orange-50 py-12 px-6 text-center">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Contact Us</h2>
        <p className="text-gray-700 max-w-3xl mx-auto mb-4">
          Have questions or want to collaborate? Reach out to us!
        </p>
        <p className="text-gray-600">Email: support@mova.com</p>
        <p className="text-gray-600">Phone: +92 300 1234567</p>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-6 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-6">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="#about" className="hover:underline">
              About Us
            </a>
            <a href="#contact" className="hover:underline">
              Contact Us
            </a>
          </div>
          <p className="text-sm">© 2025 All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}
