import {
  LayoutDashboard,
  FileText,
  Folder,
  Image,
  BarChart3,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navigation = [
  {
    label: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Posts",
    path: "/admin/posts",
    icon: FileText,
  },
  {
    label: "Categories",
    path: "/admin/categories",
    icon: Folder,
  },
  {
    label: "Media",
    path: "/admin/media",
    icon: Image,
  },
];

const secondaryNavigation = [
  {
    label: "Analytics",
    path: "/admin/analytics",
    icon: BarChart3,
  },
  {
    label: "Settings",
    path: "/admin/settings",
    icon: Settings,
  },
];

const Sidebar = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-zinc-200 bg-white lg:block">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-zinc-200 px-6">
          <div>
            <p className="text-sm font-semibold tracking-tight text-zinc-950">
              Nikhil Mali
            </p>

            <p className="text-xs text-zinc-500">Content Studio</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-5">
          <p className="px-3 pb-2 text-[11px] font-medium uppercase tracking-wider text-zinc-400">
            Workspace
          </p>

          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-zinc-100 text-zinc-950"
                        : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950"
                    }`
                  }
                >
                  <Icon size={18} strokeWidth={1.8} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>

          <p className="px-3 pb-2 pt-8 text-[11px] font-medium uppercase tracking-wider text-zinc-400">
            Manage
          </p>

          <div className="space-y-1">
            {secondaryNavigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-zinc-100 text-zinc-950"
                        : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950"
                    }`
                  }
                >
                  <Icon size={18} strokeWidth={1.8} />

                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* User */}
        <div className="border-t border-zinc-200 p-4">
          <div className="flex items-center gap-3 rounded-lg px-2 py-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-sm font-medium text-white">
              NM
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-zinc-900">
                Nikhil Mali
              </p>

              <p className="truncate text-xs text-zinc-500">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
