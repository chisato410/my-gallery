// src/pages/AboutPage.jsx
import React from "react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-8">
      <h2 className="text-3xl font-semibold mb-4">About This Gallery</h2>
      <p className="mb-2">
        This gallery showcases "Thousand Fragments" — Universes of Web Art.
      </p>
      <p className="mb-2">
        <strong>Tech stack:</strong> React, React Router, Tailwind / SCSS,
        Virtuoso Grid, IntersectionObserver, Lucide icons
      </p>
      <p className="mb-2">
        All artworks are interactive previews with lazy-loading GIFs and modals.
      </p>
    </div>
  );
}
