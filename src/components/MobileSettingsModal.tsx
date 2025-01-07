import { LuX, LuLogOut, LuMoon, LuUser } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../lib/auth';
import { useTheme } from '../contexts/ThemeContext';
import toast from 'react-hot-toast';

interface MobileSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSettingsModal({ isOpen, onClose }: MobileSettingsModalProps) {
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useTheme();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error('Error signing out');
    } else {
      toast.success('Signed out successfully');
      navigate('/');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 rounded-t-2xl p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold dark:text-white">Settings</h2>
          <button onClick={onClose} className="p-2">
            <LuX className="h-6 w-6 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => {
              navigate('/account');
              onClose();
            }}
            className="flex items-center w-full p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <LuUser className="h-5 w-5 mr-3 text-gray-600 dark:text-gray-400" />
            <span className="text-gray-800 dark:text-gray-200">Account</span>
          </button>

          <button
            onClick={() => {
              toggleDarkMode();
              onClose();
            }}
            className="flex items-center w-full p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <LuMoon className="h-5 w-5 mr-3 text-gray-600 dark:text-gray-400" />
            <span className="text-gray-800 dark:text-gray-200">
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </span>
          </button>

          <button
            onClick={handleSignOut}
            className="flex items-center w-full p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-red-600 dark:text-red-400"
          >
            <LuLogOut className="h-5 w-5 mr-3" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}