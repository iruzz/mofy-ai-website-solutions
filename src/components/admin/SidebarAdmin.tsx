import { 
  LayoutDashboard, 
  Briefcase, 
  Settings, 
  Server 
} from 'lucide-react';
import { SidebarRoot } from './SidebarSystem/SidebarRoot';
import { SidebarItem } from './SidebarSystem/SidebarItem';

export const SidebarAdmin = () => {
  return (
    <SidebarRoot>
      
      <SidebarItem 
        icon={LayoutDashboard} 
        label="Dashboard" 
        to="/dashboard" 
        animation="slide" // Move box
      />

      <SidebarItem 
        icon={Briefcase} 
        label="Portfolio" 
        to="/admin/portofolio" 
        animation="slide" // Move & Color
      />

      <SidebarItem 
        icon={Server} 
        label="Services" 
        to="/admin/services" 
        animation="color" // Color up
      />

      <SidebarItem 
        icon={Settings} 
        label="Settings" 
        to="/admin/settings" 
        animation="rotate" // Rotate full
      />

    </SidebarRoot>
  );
};