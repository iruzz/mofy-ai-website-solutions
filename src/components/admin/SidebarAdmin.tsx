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
      />

      <SidebarItem 
        icon={Briefcase} 
        label="Portfolio Admin" 
        to="/admin/portofolio" 
      />

      <SidebarItem 
        icon={Server} 
        label="Services" 
        to="/admin/services" 
      />

      <SidebarItem 
        icon={Settings} 
        label="Settings" 
        to="/admin/settings" 
      />

    </SidebarRoot>
  );
};

// kalo mau nambah halaman gitu aja. ko cuman boleh tambahin halamn kayak template di atas kecuali JANGAN KO EDIT BENTUK YANG SUDAH ADA ❗🛑