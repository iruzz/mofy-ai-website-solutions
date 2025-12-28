import { NavLink } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  to: string;
  collapsed?: boolean; // ADDED: Prop to receive collapse state
  animation?: 'slide' | 'color' | 'rotate' | 'none'; // FIXED: Added 'none' to types
}

export const SidebarItem = ({ icon: Icon, label, to, collapsed = false, animation = 'none' }: SidebarItemProps) => {
  
  // Animation Styles based on type
  const getAnimationClass = () => {
    switch (animation) {
      case 'slide':
        return 'group-hover:translate-x-1 group-hover:text-blue-400'; // Move right + Color
      case 'color':
        return 'group-hover:text-green-400'; // Color up
      case 'rotate':
        return 'group-hover:rotate-[360deg] transition-transform duration-700 group-hover:text-purple-400'; // Rotate full
      default: // 'none'
        return 'group-hover:text-slate-200';
    }
  };

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `group relative flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all duration-200 overflow-hidden
        ${isActive 
          ? 'bg-blue-600 text-white' 
          : 'text-slate-300 hover:bg-slate-700/50' 
        }`
      }
      title={label}
    >
      {({ isActive }) => (
        <>
          <Icon 
            size={20} 
            className={`flex-shrink-0 transition-all duration-300 ${getAnimationClass()} ${
              isActive ? 'text-white' : 'text-slate-400'
            }`}
          />
          {/* FIXED: Now uses the 'collapsed' prop */}
          <span className={`font-medium whitespace-nowrap overflow-hidden text-ellipsis transition-all duration-300 ${collapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            {label}
          </span>
        </>
      )}
    </NavLink>
  );
};

export type { SidebarItemProps };