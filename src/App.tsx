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
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin/login" element={<Admin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminContent />} />
            <Route path="content" element={<AdminContent />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="messages" element={<AdminMessages />} />
            <Route path="realizations" element={<AdminRealizations />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
