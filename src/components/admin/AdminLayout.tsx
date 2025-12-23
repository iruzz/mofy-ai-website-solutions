import { Outlet } from 'react-router-dom';
import { SidebarAdmin } from '@/components/admin/SidebarAdmin';
import { Header } from '@/components/admin/Header';

export const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-slate-50">
      <SidebarAdmin />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

// ❗🛑 JANGAN DI APA APAIN ❗🛑