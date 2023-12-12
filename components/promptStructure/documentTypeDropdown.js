import React, { useState } from 'react';

function Dropdown({documentType,setDocumentType}) {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState(documentType);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setDocumentType(option);
    setType(option)
    setIsOpen(false); // Close the dropdown menu
  }


  return (
    <div className="relative inline-block text-left">
      <button className="inline-flex justify-center w-full px-4 py-2 text-xl font-semibold text-gray-600 rounded-md " onClick={toggleDropdown}>
        {type}
        <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#718096">
          <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
      </button>
      {isOpen && (
        <div className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1 font-medium" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => handleOptionClick('General')}>General</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => handleOptionClick('Receipt')}>Receipt</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => handleOptionClick('Check')}>Check</a>
            {/* Add more options here */}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
