// components/CustomSearchInput.tsx

import React from "react";

const CustomSearchInput = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-full border border-gray-300 bg-white px-4 py-2 text-lg text-gray-700 shadow-sm outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-indigo-500 px-4 py-2 text-white transition-all hover:bg-indigo-600"
        >
          Go
        </button>
      </div>
    </div>
  );
};

export default CustomSearchInput;
