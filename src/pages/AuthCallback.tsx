import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import toast from "react-hot-toast";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // Get the current session immediately
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        toast.success("Signed in successfully!");
        navigate("/", { replace: true });
      }
    });

    // Also listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        toast.success("Signed in successfully!");
        navigate("/", { replace: true });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Completing sign in...</p>
      </div>
    </div>
  );
}
