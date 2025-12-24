import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// PAGES
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Portofolio from "./pages/Portofolio"; 

// ADMIN LAYOUT & PAGES  
import { AdminLayout } from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Settings from "./pages/admin/Settings";
import Serviced from "./pages/admin/Services";
// ADMIN PORTOFOLIO PAGES
import Portadmin from "./pages/admin/Portadmin";

import PortofolioIndex from "./pages/admin/portofolio/Index";
import Create from "./pages/admin/portofolio/Create";
import Edit from "./pages/admin/portofolio/Edit";
import Images from "./pages/admin/portofolio/Images";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/portofolio" element={<Portofolio />} />

          {/* Admin Routes */}
          <Route element={<AdminLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />

            {/* PORTOFOLIO ADMIN */}
            <Route path="/admin/portofolio" element={<PortofolioIndex />} />
            <Route path="/admin/portofolio/create" element={<Create />} />
            <Route path="/admin/portofolio/:id/edit" element={<Edit />} />
            <Route path="/admin/portofolio/:id/images" element={<Images />} />

            <Route path="/admin/settings" element={<Settings />} />
            <Route path="/admin/services" element={<Serviced />} />
          </Route>


          {/* /* HARUS PALING BAWAH */
          /* path="*" adalah fallback route.
          // Harus di bawah agar gk menimpa rendering route lain (alasan: ko pake React Router v6, berlaku ke v7 juga karena design roouting nya gitu. 
          // Jika diletakkan di atas, route nanti selalu match lebih dulu
          // dan menyebabkan route spesifik (/login, /portofolio, dll) tidak pernah dirender. */}
          <Route path="*" element={<NotFound />} /> 
          
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;


