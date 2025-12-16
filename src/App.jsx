import React, { useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import GalleryPage from "./pages/GalleryPage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  const virtuosoRef = useRef(null);

  console.log(virtuosoRef.current);

  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<GalleryPage ref={virtuosoRef} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <BottomNav virtuosoRef={virtuosoRef} />
    </Router>
  );
}
