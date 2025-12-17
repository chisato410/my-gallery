import React, { useRef, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import GalleryPage from "./pages/GalleryPage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  const virtuosoRef = useRef(null);
  const [bgColor, setBgColor] = useState("white");
  const [artworks, setArtworks] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]); // 追加

  console.log(virtuosoRef.current);

  // 背景色が変更されたら data-theme 属性を更新
  useEffect(() => {
    const root = document.documentElement;

    if (bgColor === "white") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", "dark");
    }
  }, [bgColor]);

  return (
    <Router>
      <Header isCompact={isScrolled} />

      <Routes>
        <Route
          path="/"
          element={
            <GalleryPage
              ref={virtuosoRef}
              setArtworks={setArtworks}
              setIsScrolled={setIsScrolled}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              currentBgColor={bgColor}
              setBgColor={setBgColor}
            />
          }
        />{" "}
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <BottomNav
        virtuosoRef={virtuosoRef}
        artworks={artworks}
        setBgColor={setBgColor}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />
    </Router>
  );
}
