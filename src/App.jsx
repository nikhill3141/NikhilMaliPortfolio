import { Routes, Route } from "react-router-dom";
import Projects from "./sections/Projects";
import YouTube from "./sections/Vlogs";
import Blog from "./sections/Blog";
import Contact from "./sections/Contact";
import "./App.css";
import PublicLayout from "./layout/PublicLayout";
import AdminRoutes from "./admin/routes/AdminRoutes";
import HomePage from "./layout/HomePage";



function App() {
  return (
    <Routes>
      {/* Public website */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage/>} />

        <Route path="/projects" element={<Projects/>} />

        <Route path="/videos" element={<YouTube/>} />

        <Route path="/blogs" element={<Blog/>} />

        <Route path="/contact" element={<Contact/>} />
      </Route>

      {/* Admin application */}
      <Route path="/admin/*" element={<AdminRoutes />} />
    </Routes>
  );
}

export default App;
