import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppButton from "../UI/AppButton";
import TitleText from "../UI/TitleText";

const Navbar = ({ toggleSidebar }) => {
  const [userName, setUserName] = useState("");
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const navigateTo = useNavigate();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    // Retrieve user_name from localStorage
    const storedUserName = localStorage.getItem("user_name");
    if (storedUserName) {
      setUserName(storedUserName);
    } else {
      // Redirect to login if user_name is not found in localStorage
      // history.push("/login");
    }
  }, [history]);

  // Function to handle resizing of the window
  const handleResize = () => {
    setIsSmallScreen(window.innerWidth < 768); // You can adjust the breakpoint as needed
  };

  useEffect(() => {
    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Initial check for screen size
    handleResize();

    // Cleanup function for removing event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleAdminDropdown = () => {
    setAdminDropdownOpen(!adminDropdownOpen);
  };

  const handleLogout = async () => {};

  return (
    <header className="bg-black text-white">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <AppButton
            onClick={toggleSidebar}
            variant="text"
            className="p-2 text-white hover:bg-black rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fillRule="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </AppButton>

          {/* Admin Dropdown */}
          <div>
            <AppButton
              onClick={toggleAdminDropdown}
              variant="text"
              className="inline-flex items-center gap-1 px-2 py-1 text-white whitespace-nowrap hover:bg-black focus:outline-none"
            >
              <TitleText
                variant="small"
                className="text-white font-semibold uppercase leading-none tracking-normal mb-0"
              >
                Welcome {userName}!
              </TitleText>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fillRule="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={`w-4 h-4 ml-1 transition-transform transform ${
                  adminDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </AppButton>

            {adminDropdownOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                <div className="py-1">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </a>
                  <a
                    onClick={handleLogout}
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </a>
                  {/* Add more dropdown items as needed */}
                </div>
              </div>
            )}
          </div>
          {/* End of Admin Dropdown */}
          {/* Add user authentication or other elements in the navbar */}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
