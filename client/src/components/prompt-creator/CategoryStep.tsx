import { motion } from "framer-motion";
import { CATEGORIES } from "@/lib/mockData";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, Sparkles } from "lucide-react";

interface CategoryStepProps {
  selectedCategory: string | null;
  onSelect: (id: string) => void;
}

export function CategoryStep({ selectedCategory, onSelect }: CategoryStepProps) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-2">
          <Sparkles className="w-3 h-3" />
          <span>Step 1 of 4</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
          What are you creating today?
        </h2>
        <p className="text-lg text-muted-foreground">
          Select a specialized engine to get the most optimized prompt for your use case.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {CATEGORIES.map((category, index) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.id;

          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
            >
              <Card
                className={cn(
                  "h-full p-6 cursor-pointer transition-all duration-300 group relative overflow-hidden border-2 flex flex-col items-center text-center gap-4",
                  isSelected 
                    ? "border-primary bg-primary/5 shadow-xl shadow-primary/10" 
                    : "bg-card/40 border-border/50 hover:border-primary/30 hover:bg-card/60 hover:shadow-lg"
                )}
                onClick={() => onSelect(category.id)}
              >
                {/* Background Glow */}
                <div className={cn(
                  "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/5 to-transparent pointer-events-none",
                  isSelected && "opacity-100 from-primary/10"
                )} />
                
                <div className={cn(
                  "p-4 rounded-2xl ring-1 ring-white/10 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg",
                  isSelected ? "bg-primary text-primary-foreground shadow-primary/20" : "bg-background/80 text-muted-foreground group-hover:text-primary group-hover:bg-background"
                )}>
                  <Icon className="w-8 h-8" />
                </div>
                
                <div className="relative z-10 flex-1 flex flex-col justify-between w-full">
                  <div>
                    <h3 className={cn("font-bold text-base mb-2 group-hover:text-primary transition-colors", isSelected && "text-primary")}>
                      {category.name}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                  
                  <div className={cn(
                    "mt-4 flex items-center justify-center gap-1 text-xs font-medium text-primary opacity-0 transform translate-y-2 transition-all duration-300",
                    (isSelected || "group-hover:opacity-100 group-hover:translate-y-0")
                  )}>
                    Select <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
