import { useState, ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarRootProps {
  children: ReactNode;
}

export const SidebarRoot = ({ children }: SidebarRootProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <aside className={`h-screen bg-gradient-to-b from-slate-800 to-slate-900 border-r border-slate-700 flex flex-col transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
      {/* Header with Logo */}
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
        <div className={`flex items-center gap-3 overflow-hidden transition-all duration-300 ${collapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-white">
            M
          </div>
          <div>
            <h2 className="text-white font-bold text-lg whitespace-nowrap">MOFY AI</h2>
            <p className="text-slate-400 text-xs whitespace-nowrap">Admin Panel</p>
          </div>
        </div>
        
        <button
          onClick={toggleCollapse}
          className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-white"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 overflow-y-auto">
        {children}
      </nav>

      {/* Footer */}
      <div className={`p-4 border-t border-slate-700 text-center transition-all duration-300 ${collapsed ? 'opacity-0' : 'opacity-100'}`}>
        <p className="text-slate-500 text-xs">© 2025 MOFY AI</p>
      </div>
    </aside>
  );
};

export type { SidebarRootProps };

// ❗🛑 JANGAN DI APA APAIN ❗🛑