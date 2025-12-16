import { AI_MODELS } from "@/lib/mockData";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Check, Sparkles, Zap, Shield } from "lucide-react";
import { motion } from "framer-motion";

interface ModelStepProps {
  selectedModel: string | null;
  onSelect: (id: string) => void;
}

export function ModelStep({ selectedModel, onSelect }: ModelStepProps) {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-heading font-bold">Choose your Engine</h2>
        <p className="text-muted-foreground">Select the AI model optimized for your specific needs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {AI_MODELS.map((model, index) => {
          const isSelected = selectedModel === model.id;
          
          return (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={cn(
                  "relative p-6 cursor-pointer transition-all duration-300 h-full flex flex-col gap-4 border-2",
                  isSelected 
                    ? "border-primary bg-primary/5 shadow-2xl shadow-primary/10" 
                    : "border-border/50 bg-card/50 hover:border-primary/30 hover:bg-card/80"
                )}
                onClick={() => onSelect(model.id)}
              >
                {isSelected && (
                  <div className="absolute -top-3 -right-3 bg-primary text-primary-foreground rounded-full p-1 shadow-lg">
                    <Check className="w-4 h-4" />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", model.color)}>
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-xs font-mono font-medium text-muted-foreground border border-border px-2 py-1 rounded">
                    {model.cost}
                  </div>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-lg">{model.name}</h3>
                  <p className="text-sm text-muted-foreground">{model.provider}</p>
                </div>

                <div className="space-y-2 flex-1">
                  {model.strengths.map((strength) => (
                    <div key={strength} className="flex items-center gap-2 text-sm text-foreground/80">
                      <Zap className="w-3 h-3 text-primary" />
                      {strength}
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground font-mono">
                  <span>Speed: {model.speed}</span>
                  {index === 0 && <span className="text-green-400">Best for Creative</span>}
                  {index === 1 && <span className="text-orange-400">Best for Logic</span>}
                  {index === 2 && <span className="text-blue-400">Best for Data</span>}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
