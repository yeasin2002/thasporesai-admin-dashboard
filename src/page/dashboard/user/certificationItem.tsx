/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect } from "react";

function CertificationItem({ name, issuer, imageUrl }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = (option: any) => {
    console.log(`Action chosen for "${name}": ${option}`);
    setIsMenuOpen(false);
  };

  return (
    <div className="mb-4 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
      <h3 className="mb-4 text-lg font-medium text-black">Certifications</h3>

      <div className="flex items-center justify-between">
        <div className="flex items-start">
          <img
            src={imageUrl}
            alt="Certificate"
            className="mr-4 h-16 w-16 flex-shrink-0 rounded-md object-cover shadow"
          />
          <div>
            <p className="font-semibold text-gray-900">{name}</p>
            <p className="text-sm text-gray-600">from {issuer}</p>
          </div>
        </div>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 z-10 mt-2 w-40 rounded-md border border-gray-200 bg-white py-1 shadow-lg">
              <button
                onClick={() => handleOptionClick("Verified")}
                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
              >
                <svg
                  className="mr-2 h-5 w-5 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </button>

              <button
                onClick={() => handleOptionClick("None")}
                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600"
              >
                <svg
                  className="mr-2 h-5 w-5 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                None
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CertificationItem;
