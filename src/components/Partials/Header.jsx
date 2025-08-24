import { Link, useLocation } from "react-router-dom";
import { BotMessageSquare, ChartLine } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const isOnCareerChatbotPage = location.pathname === "/career-chatbot";

  return (
    <header className="bg-black text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left: Logo Section */}
        <div className="flex items-center gap-3">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
            alt="React Logo"
            className="w-8 h-8"
          />
          <span className="text-xl font-bold">+</span>
          <img
            src="https://avatars.githubusercontent.com/u/45487711?s=200&v=4"
            alt="n8n Logo"
            className="w-8 h-8 rounded"
          />
        </div>

        {/* Right: Navigation Links */}
        <nav className="flex gap-6 items-center">
          <Link
            to={isOnCareerChatbotPage ? "/resume-analyzer" : "/career-chatbot"}
            className="relative group flex items-center"
          >
            {isOnCareerChatbotPage ? (
              <>
                <ChartLine className="h-6 w-6" />
                <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 text-xs text-black bg-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  Resume Analyzer
                </span>
              </>
            ) : (
              <>
                <BotMessageSquare className="h-6 w-6" />
                <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 text-xs text-black bg-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  ChatBot
                </span>
              </>
            )}
          </Link>

          {/* Only show Home link if not already on Home */}
          {location.pathname !== "/landing-page" && (
            <Link to="/" className="hover:underline">
              Home
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
