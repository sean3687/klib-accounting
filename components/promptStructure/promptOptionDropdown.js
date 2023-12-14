import React, { useState } from "react";

function DocumentTypeDropdown({ fetchStructureData, extractStructureData }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = () => {
    setIsOpen(false); // Close the dropdown menu
  };

  return (
    <div className="relative inline-block text-left">
      <button
        className="inline-flex justify-center w-full px-4 py-2 text-sm font-semibold text-gray-600 rounded-md "
        onClick={toggleDropdown}
      >
        Options
      </button>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1 font-medium"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => extractStructureData()}
            >
              Initiate Extraction
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => fetchStructureData()}
            >
              Sync
            </a>

            {/* Add more options here */}
          </div>
        </div>
      )}
    </div>
  );
}

export default DocumentTypeDropdown;
