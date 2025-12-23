import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AddProject from "./pages/AddProject";
import ProjectDetail from "./pages/ProjectDetail";
import NotFound from "./pages/NotFound";
import EditProject from './pages/EditProject';
import RevisionNotes from './pages/RevisionNotes';
import AddPDF from './pages/AddPDF';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/add-project" element={<AddProject />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/edit-project/:id" element={<EditProject />} />
          <Route path="/revision-notes" element={<RevisionNotes />} />
          <Route path="/add-pdf" element={<AddPDF />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
