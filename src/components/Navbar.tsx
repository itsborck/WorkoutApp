import { useState } from "react";
import { Link } from "react-router-dom";
import { LuDumbbell, LuMenu, LuX } from "react-icons/lu";
import { useAuth } from "../contexts/AuthContext";
import AuthButton from "./AuthButton";

export default function Navbar() {
  const authContext = useAuth() as { user: any } | null;
  const user = authContext ? authContext.user : null;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <LuDumbbell className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">
              Workout Planner
            </span>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-indigo-600"
          >
            {isMenuOpen ? (
              <LuX className="h-6 w-6" />
            ) : (
              <LuMenu className="h-6 w-6" />
            )}
          </button>

          {/* Desktop navigation */}
          <div className="hidden md:flex space-x-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2"
            >
              Home
            </Link>
            <Link
              to="/workouts"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2"
            >
              Workouts
            </Link>
            {user && (
              <Link
                to="/saved"
                className="text-gray-700 hover:text-indigo-600 px-3 py-2"
              >
                Saved
              </Link>
            )}
            <AuthButton user={user} />
          </div>
        </div>

        {/* Mobile navigation */}
        <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"} pb-4`}>
          <div className="flex flex-col space-y-2">
            <Link
              to="/"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/workouts"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2"
              onClick={toggleMenu}
            >
              Workouts
            </Link>
            {user && (
              <Link
                to="/saved"
                className="text-gray-700 hover:text-indigo-600 px-3 py-2"
                onClick={toggleMenu}
              >
                Saved
              </Link>
            )}
            <div className="px-3 py-2">
              <AuthButton user={user} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
