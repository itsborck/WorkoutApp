import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Account() {
  const authContext = useAuth();
  const user = authContext ? authContext.user : null;
  const navigate = useNavigate();

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
        </div>
      </div>
    </div>
  );
}