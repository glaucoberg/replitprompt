import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 h-full overflow-hidden relative">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 relative z-0 scroll-smooth">
          {children}
        </main>
        
        {/* Ambient background glow */}
        <div className="absolute top-0 left-0 right-0 h-96 bg-primary/5 blur-[100px] pointer-events-none z-[-1]" />
      </div>
    </div>
  );
}
