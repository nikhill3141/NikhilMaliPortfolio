import { Navigate, Outlet } from "react-router-dom";
import { useCurrentAdmin } from "../hooks/useCurrentAdmin";

const ProtectedRoute = () => {
  const { data, isLoading, isError } = useCurrentAdmin();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50">
        <p className="text-sm text-zinc-500">Checking authentication...</p>
      </div>
    );
  }

  if (isError || !data?.data) {
    console.log("Authentication error:", isError, data);
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
