import { ArrowDown, Filter } from "lucide-react";
import { useState } from "react";

const statuses = ["All Status", "Customer", "Contractor"];

const StatusFilterDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  const handleStatusSelect = (status: string) => {
    setSelectedStatus(status);
    setIsOpen(false);
  };

  return (
    <div className="flex justify-end rounded-md border-b border-gray-100 bg-[#F8F8F8] p-6 shadow-sm">
      <div className="relative inline-block text-left">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center rounded border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm transition duration-150 ease-in-out hover:bg-gray-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none ${isOpen ? "border-indigo-500 ring-2 ring-indigo-500" : ""} `}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <Filter className="mr-2 h-4 w-4 text-gray-500" />

          <span className="font-medium whitespace-nowrap">{selectedStatus}</span>

          <ArrowDown
            className={`ml-2 h-4 w-4 transform transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"} `}
          />
        </button>
        {isOpen && (
          <div
            className="ring-opacity-5 absolute right-0 z-10 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
          >
            <div className="py-1" role="none">
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusSelect(status)}
                  // Styling for each menu item
                  className={`block w-full px-4 py-2 text-left text-sm transition duration-100 ${
                    selectedStatus === status
                      ? "bg-indigo-500 font-semibold text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  } `}
                  role="menuitem"
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusFilterDropdown;
