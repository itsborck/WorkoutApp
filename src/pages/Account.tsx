import { LuLogOut } from 'react-icons/lu';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../lib/auth';
import toast from 'react-hot-toast';
import ThemeToggle from '../components/ThemeToggle';

export default function Account() {
  const authContext = useAuth();
  const user = authContext ? authContext.user : null;
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error('Error signing out');
    } else {
      toast.success('Signed out successfully');
      navigate('/');
    }
  };

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8">
        <h1 className="text-2xl font-bold mb-6 dark:text-white">Account Settings</h1>

        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-2 dark:text-white">Email</h2>
            <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <h2 className="text-lg font-semibold mb-4 dark:text-white">Preferences</h2>
            <ThemeToggle />
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <button
              onClick={handleSignOut}
              className="flex items-center text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-medium"
            >
              <LuLogOut className="h-5 w-5 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}