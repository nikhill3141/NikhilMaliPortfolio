import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

function PublicLayout() {

  const sections = [
    { key: 'home', label: 'Home', path: '/' },
    { key: 'projects', label: 'Projects', path: '/projects' },
    { key: 'youtube', label: 'Videos', path: '/videos' },
    { key: 'blogs', label: 'Blogs', path: '/blogs' },
    { key: 'contact', label: 'Contact', path: '/contact' },
  ];
  return (
    <>
      <Navbar items={sections} />
      <main className="mx-auto w-full max-w-3xl px-4 pb-20 pt-8 sm:px-6">
        <Outlet />
      </main>
    </>
  );
}

export default PublicLayout;