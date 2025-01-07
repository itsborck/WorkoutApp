import { Link } from "react-router-dom";
import { LuSave, LuSearch } from "react-icons/lu";

export default function Home() {
  const homeTabs = [
    { title: 'Browse Workouts', description: 'Explore our extensive collection of workouts and exercises to find the perfect routine for you.', linkText: 'Browse Now', icon: LuSearch, path: '/workouts' },
    { title: 'Saved Workouts', description: 'View and manage your saved workout routines and track your progress over time.', linkText: 'View Saved', icon: LuSave, path: '/saved' }
  ]
  return (
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        Welcome to Workout Planner
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {homeTabs.map((item) => {
          const Icon = item.icon;
          return (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2 flex-shrink-0" />
                <h2 className="text-xl font-semibold">{item.title}</h2>
              </div>
              <p className="text-gray-500 mb-4">{item.description}</p>
              <Link
                to={item.path}
                className="inline-block bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-700 dark:hover:bg-indigo-600 w-full text-center md:w-auto"
              >
                {item.linkText}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
