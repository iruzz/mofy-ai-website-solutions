import { NavLink } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  to: string;
}

export const SidebarItem = ({ icon: Icon, label, to }: SidebarItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all duration-200 group ${
          isActive 
            ? 'bg-blue-500 text-white' 
            : 'text-slate-300 hover:bg-slate-700 hover:text-white'
        }`
      }
      title={label}
    >
      {({ isActive }) => (
        <>
          <Icon 
            size={20} 
            className={`flex-shrink-0 transition-colors ${
              isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'
            }`}
          />
          <span className="font-medium whitespace-nowrap overflow-hidden text-ellipsis">
            {label}
          </span>
        </>
      )}
    </NavLink>
  );
};

export type { SidebarItemProps };

// ❗🛑 JANGAN DI APA APAIN ❗🛑