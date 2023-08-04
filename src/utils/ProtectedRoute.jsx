import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"



export const ProtectedRoute = () => {

  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <h1>Loading...</h1>
  if (!isAuthenticated && !isLoading) return <Navigate to={"/login"} />

  return <Outlet />
}