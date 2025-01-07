import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LuDumbbell,
  LuSearch,
  LuHistory,
  LuChartLine,
  LuEllipsis,
} from "react-icons/lu";
import { useAuth } from "../contexts/AuthContext";
import AuthButton from "./AuthButton";
import MobileSettingsModal from "./MobileSettingsModal";

export default function Navbar() {
  const authContext = useAuth();
  const user = authContext ? authContext.user : null;
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/", label: "Routines", icon: LuDumbbell },
    { path: "/workouts", label: "Explore", icon: LuSearch },
    { path: "/history", label: "History", icon: LuHistory },
    { path: "/measures", label: "Measures", icon: LuChartLine },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-lg hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <LuDumbbell className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Workout Planner
              </span>
            </Link>

            <div className="flex space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 ${
                    isActive(item.path)
                      ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                      : ""
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <AuthButton user={user} />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50">
        <div className="grid grid-cols-5 h-14">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center space-y-1 ${
                  active
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                <Icon
                  className={`h-6 w-6 ${
                    active
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                />
                <span className={`text-xs ${active ? "font-bold" : ""}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex flex-col items-center justify-center space-y-1 text-gray-600 dark:text-gray-400"
          >
            <LuEllipsis className="h-5 w-5" />
            <span className="text-xs">More</span>
          </button>
        </div>
      </nav>

      {/* Mobile Settings Modal */}
      <MobileSettingsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Mobile bottom spacing */}
      <div className="h-16 md:hidden" />
    </>
  );
}
