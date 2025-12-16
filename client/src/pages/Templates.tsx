import { AppLayout } from "@/components/layout/AppLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { TEMPLATES } from "@/lib/mockData";
import { Search, Filter, Star, Zap, ArrowRight, Bookmark } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Templates() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Image Generation", "Text Creation", "Code Generation", "Marketing"];

  return (
    <AppLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold">Template Library</h1>
            <p className="text-muted-foreground">Kickstart your creativity with community-curated prompts.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <Star className="w-4 h-4 text-yellow-400" /> My Favorites
            </Button>
            <Button>
              <Zap className="w-4 h-4 mr-2" /> Create Template
            </Button>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 items-center bg-card/50 p-4 rounded-xl border border-border/50">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search templates..." 
              className="pl-9 bg-background/50 border-input"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
             {filters.map((filter) => (
               <Button 
                 key={filter} 
                 variant={activeFilter === filter ? "secondary" : "ghost"}
                 size="sm"
                 onClick={() => setActiveFilter(filter)}
                 className="whitespace-nowrap"
               >
                 {filter}
               </Button>
             ))}
             <Button variant="outline" size="icon">
               <Filter className="w-4 h-4" />
             </Button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEMPLATES.map((template) => (
            <Card key={template.id} className="group hover:border-primary/50 transition-all duration-300 bg-card/40 backdrop-blur-sm border-border/50">
              <CardHeader className="p-0">
                <div className="h-32 bg-gradient-to-br from-primary/10 to-secondary/50 p-6 relative overflow-hidden">
                   <div className="absolute top-4 right-4 bg-background/50 backdrop-blur-md p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-background">
                     <Bookmark className="w-4 h-4 text-muted-foreground hover:text-primary" />
                   </div>
                   <div className="p-3 bg-background/80 backdrop-blur-sm rounded-xl w-fit shadow-lg group-hover:scale-105 transition-transform">
                      <Zap className="w-6 h-6 text-primary" />
                   </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary" className="text-xs font-normal opacity-70">
                    {template.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs font-medium text-yellow-500">
                    <Star className="w-3 h-3 fill-current" /> {template.rating}
                  </div>
                </div>
                
                <h3 className="font-heading font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {template.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {template.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {template.tags.map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                      #{tag}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex justify-between items-center text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                   <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] text-white">
                      {template.author.charAt(0)}
                   </div>
                   {template.author}
                </span>
                <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform p-0 hover:bg-transparent hover:text-primary">
                  Use Template <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
