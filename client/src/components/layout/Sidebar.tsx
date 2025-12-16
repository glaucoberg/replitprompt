import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  PlusCircle, 
  Library, 
  History, 
  Settings, 
  LogOut, 
  BookOpen,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState } from "react";
import logoIcon from "@assets/generated_images/promptcraft_ai_minimal_logo_icon.png";

export function Sidebar() {
  const [location] = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: PlusCircle, label: "Create Prompt", href: "/create" },
    { icon: Library, label: "Templates", href: "/templates" },
    { icon: History, label: "History", href: "/history" },
    { icon: BookOpen, label: "Knowledge Base", href: "/learn" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <aside 
      className={cn(
        "h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 relative z-20",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="h-16 flex items-center px-6 border-b border-sidebar-border/50">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-md rounded-full group-hover:bg-primary/40 transition-all"></div>
            <img 
              src={logoIcon} 
              alt="PromptCraft" 
              className="w-8 h-8 rounded-lg relative z-10" 
            />
          </div>
          {!collapsed && (
            <span className="font-heading font-bold text-lg tracking-tight text-sidebar-foreground">
              PromptCraft
            </span>
          )}
        </Link>
      </div>

      <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <div
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all cursor-pointer group mb-1",
                location === item.href 
                  ? "bg-sidebar-primary/10 text-sidebar-primary" 
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className={cn("w-5 h-5", location === item.href && "text-sidebar-primary")} />
              {!collapsed && <span className="font-medium text-sm">{item.label}</span>}
              
              {collapsed && location === item.href && (
                <div className="absolute left-16 bg-popover text-popover-foreground px-2 py-1 rounded text-xs border border-border shadow-md z-50 animate-in fade-in slide-in-from-left-2">
                  {item.label}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      <div className="p-4 border-t border-sidebar-border/50">
        <div className={cn(
          "flex items-center gap-3 p-2 rounded-lg hover:bg-sidebar-accent transition-colors cursor-pointer",
          collapsed ? "justify-center" : ""
        )}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-bold text-xs">
            JD
          </div>
          {!collapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate text-sidebar-foreground">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">Free Plan</p>
            </div>
          )}
          {!collapsed && <LogOut className="w-4 h-4 text-muted-foreground hover:text-destructive transition-colors" />}
        </div>
      </div>

      <button 
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 bg-card border border-border rounded-full p-1 text-muted-foreground hover:text-foreground shadow-sm z-30 hidden md:flex"
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>
    </aside>
  );
}
