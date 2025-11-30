import drawerImage from "../../../assets/job-drawer-img.png";
type Tprops = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};
function JobDrawerWith({ isOpen, setIsOpen }: Tprops) {
  //   const isVerifiedAdmin = true;

  //   const shouldOpen = isVerifiedAdmin;

  //   const toggleDrawer = () => {
  //     if (shouldOpen) {
  //       setIsOpen(true);
  //     } else {
  //       setIsOpen(false);
  //       alert("Permission denied. Only verified admins can access this drawer.");
  //     }
  //   };

  return (
    <div className="relative">
      <div
        className={`fixed inset-0 z-40 bg-black transition-opacity duration-500 ease-out ${
          isOpen ? "pointer-events-auto opacity-50" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
      />
      <div
        className={`fixed top-0 right-0 z-50 h-full w-96 transform overflow-hidden bg-[#F8F8F8] shadow-2xl transition-all duration-500 ease-out ${
          isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
        style={{
          transitionTimingFunction: isOpen
            ? "cubic-bezier(0.16, 1, 0.3, 1)"
            : "cubic-bezier(0.7, 0, 0.84, 0)",
        }}
      >
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-5 py-4">
          <h2 className="text-[24px] font-semibold text-[#000000]">Profile Details</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 text-gray-500 transition-colors duration-200 hover:text-gray-700"
            aria-label="Close drawer"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="h-full overflow-y-auto pb-10">
          <div className="h-48 w-full overflow-hidden bg-gray-200">
            <img src={drawerImage} alt="Cover" className="h-full w-full object-cover" />
          </div>

          <div className="my-4 border-b border-white bg-white px-5 py-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/150?img=12"
                  alt="Profile"
                  className="h-12 w-12 rounded-full border-2 border-white shadow-sm"
                />
                <div>
                  <h3 className="text-base font-semibold text-gray-900">David Martinez</h3>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-[#616161]">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Joined Sep 2025
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-[#13527Fs]">$50</div>
              </div>
            </div>
          </div>

          <div className="my-8 border-b border-gray-100 bg-white px-5 py-4">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-sm font-semibold text-gray-900">Contact Information</h4>
              <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600">
                Active
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="mb-1 text-xs font-medium text-gray-500">Date</div>
                <div className="text-sm text-gray-900">November 7, 2025</div>
              </div>

              <div>
                <div className="mb-1 flex items-center gap-1 text-xs font-medium text-gray-500">
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Location
                </div>
                <div className="text-sm text-gray-900">38 Bohimya street, Plainvilla, USA</div>
              </div>
            </div>
          </div>

          <div className="my4 my-4 border-b border-gray-100 bg-white px-5 py-4">
            <h4 className="mb-2 text-sm font-semibold text-gray-900">Description</h4>
            <p className="text-sm leading-relaxed text-gray-700">
              I'm John Doe, a licensed plumber with over 10 years of experience in residential and
              commercial plumbing services. I'm dedicated to providing reliable and efficient
              plumbing solutions...{" "}
              <button className="font-medium text-blue-600 hover:underline">Read more</button>
            </p>
          </div>

          <div className="px-5 py-4">
            <h4 className="mb-3 text-[16px] font-semibold text-[#000000]">Admin Actions</h4>

            <div className="space-y-2.5">
              <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#13527F] px-4 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-700">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Send a Message
              </button>

              <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-yellow-200 bg-[#FFE0A3] px-4 py-2.5 text-sm font-medium text-yellow-700 transition-colors duration-200 hover:bg-yellow-100">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Cancel Job
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDrawerWith;
