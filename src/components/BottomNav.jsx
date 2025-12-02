// src/components/BottomNav.jsx
import React from "react";

export function BottomNav() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white text-black border-t border-gray-300 z-40">
      <div className="grid grid-cols-3 h-16">
        <button className="flex items-center justify-center hover:bg-gray-100 transition-colors font-medium">
          MENU
        </button>
        <button className="flex items-center justify-center hover:bg-gray-100 transition-colors border-x border-gray-300">
          △
        </button>
        <button className="flex items-center justify-center hover:bg-gray-100 transition-colors font-medium">
          OPTION
        </button>
      </div>
    </footer>
  );
}
