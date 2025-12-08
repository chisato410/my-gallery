// src/components/BottomNav.jsx
import React from "react";

export function BottomNav() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40">
      <div className="grid grid-cols-3 h-16 bg-[#f6e7e7] border-t border-gray-300 text-gray-800">
        {/* MENU */}
        <button className="flex items-center justify-center font-medium tracking-wide hover:bg-[#f1dede] transition-colors">
          MENU
        </button>

        {/* 中央 △ ボタン（両サイドに縦線） */}
        <button className="flex items-center justify-center border-x border-gray-300 font-medium tracking-wide hover:bg-[#f1dede] transition-colors">
          △
        </button>

        {/* OPTION */}
        <button className="flex items-center justify-center font-medium tracking-wide hover:bg-[#f1dede] transition-colors">
          OPTION
        </button>
      </div>
    </footer>
  );
}
