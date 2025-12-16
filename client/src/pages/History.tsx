import { AppLayout } from "@/components/layout/AppLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RECENT_ACTIVITY } from "@/lib/mockData";
import { Search, Filter, MoreHorizontal, FileText, Image, Code, Clock, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function History() {
  const getIcon = (category: string) => {
    if (category.includes("Image")) return Image;
    if (category.includes("Code")) return Code;
    return FileText;
  };

  return (
    <AppLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold">Prompt History</h1>
            <p className="text-muted-foreground">View and manage your past generations.</p>
          </div>
          <div className="flex gap-2">
             <Button variant="outline">
                <Download className="w-4 h-4 mr-2" /> Export All
             </Button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 items-center bg-card/50 p-4 rounded-xl border border-border/50">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search history..." 
              className="pl-9 bg-background/50 border-input"
            />
          </div>
          <div className="flex gap-2">
             <Button variant="outline" size="icon">
               <Clock className="w-4 h-4" />
             </Button>
             <Button variant="outline" size="icon">
               <Filter className="w-4 h-4" />
             </Button>
          </div>
        </div>

        {/* List */}
        <div className="bg-card/30 rounded-xl border border-border/50 overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-border/50 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            <div className="col-span-5 md:col-span-4">Prompt Details</div>
            <div className="col-span-3 hidden md:block">Category</div>
            <div className="col-span-3 hidden md:block">Date</div>
            <div className="col-span-4 md:col-span-2 text-right">Status</div>
          </div>
          
          <div className="divide-y divide-border/50">
            {RECENT_ACTIVITY.map((item) => {
              const Icon = getIcon(item.category);
              return (
                <div key={item.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-card/50 transition-colors group">
                  <div className="col-span-5 md:col-span-4 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-background border border-border text-muted-foreground group-hover:text-primary group-hover:border-primary/50 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-foreground">{item.title}</p>
                      <p className="text-xs text-muted-foreground md:hidden">{item.date}</p>
                    </div>
                  </div>
                  
                  <div className="col-span-3 hidden md:flex items-center">
                    <span className="px-2 py-1 rounded-full bg-secondary text-xs text-secondary-foreground">
                      {item.category}
                    </span>
                  </div>
                  
                  <div className="col-span-3 hidden md:block text-sm text-muted-foreground">
                    {item.date}
                  </div>
                  
                  <div className="col-span-4 md:col-span-2 flex items-center justify-end gap-3">
                     <span className={cn(
                        "px-2 py-0.5 rounded-full text-xs font-medium border",
                        item.status === "Completed" 
                          ? "bg-green-500/10 text-green-400 border-green-500/20" 
                          : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                      )}>
                        {item.status}
                      </span>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Copy Prompt</DropdownMenuItem>
                          <DropdownMenuItem>Regenerate</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
