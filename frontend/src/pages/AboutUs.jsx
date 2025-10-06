import React from "react";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="max-w-3xl bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">About Us</h1>
        <p className="text-gray-700 leading-relaxed">
          Welcome to the <span className="text-orange-500 font-semibold">AI Multimodal Vehicle Access System</span>.  
          Our mission is to provide a seamless and secure solution for managing vehicle registration, monitoring logs, 
          and generating reports for organizations.  
        </p>

        <p className="mt-4 text-gray-700 leading-relaxed">
          This system is built with a modern tech stack to ensure high performance, security, and scalability.  
          Whether you are an <span className="font-semibold text-blue-700">Admin</span> managing the database 
          or a <span className="font-semibold text-orange-500">User</span> accessing services, 
          we make the process simple and efficient.
        </p>

        <p className="mt-4 text-gray-700 leading-relaxed">
          Designed with <span className="font-semibold">professional UI/UX</span> and robust backend integration, 
          we aim to deliver a reliable and future-ready platform.
        </p>
      </div>
    </div>
  );
}
