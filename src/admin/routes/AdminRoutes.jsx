import { Route, Routes } from "react-router-dom"
import AdminLogin from "../pages/AdminLogin"
import Dashboard from "../pages/Dashboard"
import AdminLayout from "../layouts/AdminLayout"
import ProtectedRoute from "./ProtectedRoute"
import Posts from "../pages/Posts"
import CreatePost from "../pages/CreatePost"
import EditPost from "../pages/EditPost"


const AdminRoutes = () => {
  return (
    <Routes>
      {/* login page */}
      <Route path="login" element={<AdminLogin />} />
      {/* admin layout */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="" element={<Dashboard />} />
          <Route path="posts" element={<Posts />} />
          <Route path="posts/new" element={<CreatePost />} />
          <Route path="posts/:id/edit" element={<EditPost />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AdminRoutes