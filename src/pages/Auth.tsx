import { Navigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../contexts/AuthContext";

export default function Auth() {
  const authContext = useAuth();

  if (authContext?.user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="max-w-4xl mx-auto pt-12">
      <AuthForm />
    </div>
  );
}
