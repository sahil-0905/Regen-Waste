// 4. Finally, modify your App.tsx as we discussed before

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import ReportWaste from "./pages/ReportWaste";
import SchedulePickup from "./pages/SchedulePickup";
import TrackWaste from "./pages/TrackWaste";
import TrackWasteDetail from "./pages/TrackWasteDetail";
import NotFound from "./pages/NotFound";
import { ReportProvider } from "./context/ReportContext"; // Import the ReportProvider

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ReportProvider> {/* Wrap your routes with ReportProvider */}
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/report" element={<ReportWaste />} />
            <Route path="/schedule" element={<SchedulePickup />} />
            <Route path="/track" element={<TrackWaste />} />
            <Route path="/track/:id" element={<TrackWasteDetail />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ReportProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;