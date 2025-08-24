//import Header from "../Partials/Header";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Partials/Footer";

import Navbar from "../components/Partials/Navbar";
import Sidebar from "../components/Partials/Sidebar";

const AdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="root-main">
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <div
          className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "ml-64" : "ml-0"
          }`}
        >
          <Navbar toggleSidebar={toggleSidebar} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray">
            {/* Page content goes here */}
            <div className="container mx-auto p-4">
              <Outlet />
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
