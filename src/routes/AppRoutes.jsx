import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layouts
import RootLayout from "../layouts/RootLayout";
import AdminLayout from "../layouts/AdminLayout";

// Pages
import ResumeAnalyzer from "../pages/Main/ResumeAnalyzer";
import AnalysisResult from "../pages/Main/AnalysisResult";
import CareerChatbot from "../pages/Main/CareerChatBot";
import LandingPage from "../pages/Main/LandingPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root `/` to `/login` */}
        <Route path="/" element={<Navigate to="/landing-page" replace />} />

        <Route element={<RootLayout />}>
          <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
          <Route path="/result" element={<AnalysisResult />} />
          <Route path="/career-chatbot" element={<CareerChatbot />} />
          <Route path="/landing-page" element={<LandingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
