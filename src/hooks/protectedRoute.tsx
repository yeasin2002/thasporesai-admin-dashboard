import { currentToken } from "@/redux/features/auth/authslice";
import { useAppSelector } from "@/redux/hooks";
import { Navigate } from "react-router";
// import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = useAppSelector(currentToken);
  const isLoading = token === undefined; // or use a loading state if you have one

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};
