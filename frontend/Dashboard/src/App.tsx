import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import GraphsPage from "./pages/GraphsPage";
import ProfilePage from "./pages/ProfilePage";
import DataPage from "./pages/DataPage";
import ChatbotPage from "./pages/ChatbotPage";
import AddDevicePage from "./pages/AddDevicePage";
import CriticalSystemPage from "./pages/CriticalSystemPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/graphs" element={<GraphsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/data" element={<DataPage />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/add-device" element={<AddDevicePage />} />
          <Route path="/critical-system" element={<CriticalSystemPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
