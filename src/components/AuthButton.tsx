import { useNavigate } from "react-router-dom";
import { LuUser } from "react-icons/lu";

interface AuthButtonProps {
  user: any; // Replace 'any' with the appropriate type if known
}

export default function AuthButton({ user }: AuthButtonProps) {
  const navigate = useNavigate();

  if (!user) {
    return (
      <button
        onClick={() => navigate('/auth')}
        className="text-gray-700 hover:text-indigo-600 px-3 py-2"
      >
        Sign In
      </button>
    );
  }

  return (
    <button
      onClick={() => navigate('/account')}
      className="flex items-center text-gray-700 hover:text-indigo-600 px-3 py-2"
    >
      <LuUser className="h-5 w-5 mr-1" />
      Account
    </button>
  );
}
