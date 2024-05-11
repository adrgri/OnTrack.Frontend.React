import { useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  console.log("Is logged in:", isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);
  return children;
}
