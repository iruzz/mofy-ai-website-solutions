import { User, Menu, LogOut, ChevronDown } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Header = () => {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="h-[72px] bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-40 transition-all">
      
      {/* Left: Mobile Menu & Title */}
      <div className="flex items-center gap-4">
        <button className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600">
          <Menu size={24} />
        </button>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{getPageTitle()}</h1>
      </div>
      
      {/* Right: Actions & Profile */}
      <div className="flex items-center gap-4">
        

        {/* Profile Dropdown Container */}
        <div ref={dropdownRef} className="relative">
          
          {/* Profile Trigger */}
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 p-1.5 pr-4 hover:bg-slate-50 rounded-xl cursor-pointer transition-all border border-transparent hover:border-slate-200 group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-sm ring-2 ring-transparent group-hover:ring-blue-500/20 transition-all">
              <User size={18} className="text-white" />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-bold text-slate-900 leading-tight">Fairuz Fuu Lil nas</p>
              <p className="text-xs text-slate-500 font-medium">Administrator</p>
            </div>
            <ChevronDown 
              size={16} 
              className={`text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-slate-600' : ''}`} 
            />
          </button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden origin-top-right z-50"
              >
                <div className="px-4 py-3 border-b border-slate-50 bg-slate-50/50">
                  <p className="text-sm font-semibold text-slate-900">Signed in as</p>
                  <p className="text-xs text-slate-500 truncate">fairuz@mofy.ai</p>
                </div>
                
                <div className="py-1">
                  <button
                    onClick={() => {
                      // Add logout logic here
                      console.log("Logging out...");
                      setIsDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-red-50 hover:text-red-600 transition-colors group"
                  >
                    <LogOut size={16} className="group-hover:scale-110 transition-transform" />
                    Log Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};