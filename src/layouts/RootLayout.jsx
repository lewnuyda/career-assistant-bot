import { Outlet } from "react-router-dom";
import Header from "../components/Partials/Header";
import Footer from "../components/Partials/Footer";

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
