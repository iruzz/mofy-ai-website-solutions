import { useState, ReactNode, isValidElement, cloneElement, Children } from 'react';
import { ChevronLeft } from 'lucide-react';
import type { SidebarItemProps } from './SidebarItem'; 

interface SidebarRootProps {
  children: ReactNode;
}

export const SidebarRoot = ({ children }: SidebarRootProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <aside 
      className={`h-screen bg-gradient-to-b from-slate-800 to-slate-900 border-r border-slate-700 flex flex-col transition-all duration-300 relative z-50
      ${collapsed ? 'w-20' : 'w-64'}`}
    >
      {/* Header with Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-700">
        
        {collapsed ? (
          // COLLAPSED STATE: Centered 'M' Logo (Acts as button)
          <div 
            onClick={toggleCollapse}
            className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-white cursor-pointer hover:bg-blue-600 transition-colors"
          >
            M
          </div>
        ) : (
          // EXPANDED STATE: Logo + Text + Arrow
          <>
            <div className="flex items-center gap-3">
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
              className="p-2 hover:bg-slate-700 rounded-lg transition-all duration-300 text-slate-400 hover:text-white"
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <ChevronLeft size={20} strokeWidth={2.5} />
            </button>
          </>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 overflow-y-auto custom-scrollbar">
        {/* 
           We map over children to inject the 'collapsed' state into them.
           This allows SidebarItem to know when to hide its text.
        */}
        {Children.map(children, (child) => {
          if (isValidElement(child)) {
            return cloneElement(child, { collapsed } as Partial<SidebarItemProps>);
          }
          return child;
        })}
      </nav>

      {/* Footer */}
      <div className={`p-4 border-t border-slate-700 text-center transition-all duration-300 ${collapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>
        <p className="text-slate-500 text-xs">© 2025 MOFY AI</p>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
        }
      `}</style>
    </aside>
  );
};

export type { SidebarRootProps };