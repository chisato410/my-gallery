// src/components/FilterBar.jsx
import React from "react";
import { Grid, List } from "lucide-react";

export function FilterBar({
  filter,
  setFilter,
  viewMode,
  setViewMode,
  sortBy,
  setSortBy,
  totalCount,
}) {
  return (
    <div className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2 items-center flex-wrap">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded transition-colors ${
              filter === "all"
                ? "bg-white text-black"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("p5.js")}
            className={`px-4 py-2 rounded transition-colors ${
              filter === "p5.js"
                ? "bg-white text-black"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            p5.js
          </button>
          <button
            onClick={() => setFilter("Three.js")}
            className={`px-4 py-2 rounded transition-colors ${
              filter === "Three.js"
                ? "bg-white text-black"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            Three.js
          </button>
          <span className="text-sm text-gray-400 ml-2">{totalCount} works</span>
        </div>

        <div className="flex gap-2 items-center">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors text-sm"
          >
            <option value="newest">Newest</option>
            <option value="popular">Most Popular</option>
            <option value="title">Title (A-Z)</option>
          </select>

          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded transition-colors ${
                viewMode === "grid"
                  ? "bg-white text-black"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded transition-colors ${
                viewMode === "list"
                  ? "bg-white text-black"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              <List size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
