// src/pages/NotFoundPage.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-8">
      <h2 className="text-3xl font-semibold mb-4">404 - Page Not Found</h2>
      <p className="mb-4">The page you are looking for does not exist.</p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Go to Gallery
      </Link>
    </div>
  );
}
