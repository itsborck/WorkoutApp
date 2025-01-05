import { Link } from "react-router-dom";
import { LuSave, LuSearch } from "react-icons/lu";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        Welcome to Workout Planner
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <LuSearch className="h-6 w-6 text-indigo-600 mr-2 flex-shrink-0" />
            <h2 className="text-xl font-semibold">Browse Workouts</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Explore our extensive collection of workouts and exercises to find
            the perfect routine for you.
          </p>
          <Link
            to="/workouts"
            className="inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 w-full text-center md:w-auto"
          >
            Browse Now
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <LuSave className="h-6 w-6 text-indigo-600 mr-2 flex-shrink-0" />
            <h2 className="text-xl font-semibold">Saved Workouts</h2>
          </div>
          <p className="text-gray-600 mb-4">
            View and manage your saved workout routines and track your progress
            over time.
          </p>
          <Link
            to="/saved"
            className="inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 w-full text-center md:w-auto"
          >
            View Saved
          </Link>
        </div>
      </div>
    </div>
  );
}
