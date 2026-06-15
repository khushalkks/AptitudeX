import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import ResumeTracker from "./pages/ResumeTracker";
import RoadmapAI from "./pages/RoadmapAI";
import MockInterviews from "./pages/MockInterviews";
import SalaryPrediction from "./pages/SalaryInsights";
import  Applications  from "./pages/Applications";
import Analytics from "./pages/Analytics";
import GithubAnalyzer from "./pages/GithubAnalyzer";
import Sidebar from "./components/Sidebar";
import ChatBot from './components/ChatBot';
import { Menu } from "lucide-react";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 1024);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const user = params.get("user");

    if (token && user) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", decodeURIComponent(user));
      // Clean up the URL by removing query parameters
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      // Check if already logged in
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        const frontendUrl = import.meta.env.VITE_FRONTEND_URL || "http://localhost:5173";
        window.location.href = `${frontendUrl}/login`;
      }
    }
  }, []);

  return (
    <div className="flex min-h-screen relative">
      {/* Floating Hamburger Menu for Mobile/Tablet */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed top-4 left-4 z-30 lg:hidden p-3 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-xl hover:scale-105 active:scale-95 transition-all"
        >
          <Menu size={20} />
        </button>
      )}

      {/* Sidebar with global control */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "lg:ml-80" : "lg:ml-20"
        } ml-0 p-4 w-full overflow-hidden`}
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/Applications" element={<Applications />} />
          <Route path="/resumes" element={<ResumeTracker />} />
          <Route path="/career-roadmap" element={<RoadmapAI />} />
          <Route path="/mock-interviews" element={<MockInterviews />} />
          <Route path="/salary-insights" element={<SalaryPrediction />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/github-analyzer" element={<GithubAnalyzer />} />
        </Routes>

        <ChatBot/>
      </div>
    </div>
  );
}