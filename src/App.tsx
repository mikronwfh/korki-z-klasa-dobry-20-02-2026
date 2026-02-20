import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import Admin from "./pages/Admin";
import AdminLayout from "./pages/AdminContent/AdminLayout";
import { AdminContent } from "./pages/AdminContent/AdminContent";
import { AdminGallery } from "./pages/AdminContent/AdminGallery";
import { AdminMessages } from "./pages/AdminContent/AdminMessages";
import { AdminRealizations } from "./pages/AdminContent/AdminRealizations";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<Admin />} />
          <Route element={<AdminLayout />}>
            <Route path="/admin/content" element={<AdminContent />} />
            <Route path="/admin/gallery" element={<AdminGallery />} />
            <Route path="/admin/messages" element={<AdminMessages />} />
            <Route path="/admin/realizations" element={<AdminRealizations />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
