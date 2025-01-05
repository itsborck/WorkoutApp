import { LuMoon, LuSun } from 'react-icons/lu';
import { useTheme } from '../contexts/ThemeContext';

export default function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? (
        <LuSun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      ) : (
        <LuMoon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      )}
      <span className="text-gray-700 dark:text-gray-300">
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </span>
    </button>
  );
}