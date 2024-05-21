import { useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { useEffect } from "react";
import Loading from "./components/Loading/Loading";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { isLoggedIn, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, loading, navigate]);

  if (loading) {
    return <Loading />;
  }

  return isLoggedIn ? children : null;
}
