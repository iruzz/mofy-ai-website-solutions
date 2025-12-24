import { Bell, User, Menu } from "lucide-react";
import { useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  
  // Get page title from current path
  const getPageTitle = () => {
    const path = location.pathname;
    const titles: { [key: string]: string } = {
      "/dashboard": "Dashboard",
      "/portadmin": "Portfolio Admin",
      "/serviced": "Services",
      "/settings": "Settings"
    };
    return titles[path] || "Admin Panel";
  };

  return (
    <header className="h-18 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors">
          <Menu size={24} className="text-slate-600" />
        </button>
        <h1 className="text-2xl font-bold text-slate-900">{getPageTitle()}</h1>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors">
          <Bell size={20} className="text-slate-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        {/* Profile */}
        <div className="flex items-center gap-3 p-2 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User size={20} className="text-white" />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-slate-900">Admin</p>
            <p className="text-xs text-slate-500">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
};