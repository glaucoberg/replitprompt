import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import CreatePrompt from "@/pages/CreatePrompt";
import Templates from "@/pages/Templates";
import History from "@/pages/History";
import Settings from "@/pages/Settings";
import KnowledgeBase from "@/pages/KnowledgeBase";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/create" component={CreatePrompt} />
      <Route path="/templates" component={Templates} />
      <Route path="/history" component={History} />
      <Route path="/settings" component={Settings} />
      <Route path="/learn" component={KnowledgeBase} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
