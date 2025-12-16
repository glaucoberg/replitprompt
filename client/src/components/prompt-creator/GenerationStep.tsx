import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Copy, 
  RefreshCw, 
  Share2, 
  Terminal, 
  Wand2,
  Edit,
  CheckCircle2,
  Zap,
  Maximize2
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GenerationStepProps {
  data: any;
  onRestart: () => void;
}

export function GenerationStep({ data, onRestart }: GenerationStepProps) {
  const [isGenerating, setIsGenerating] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isGenerating) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsGenerating(false);
            return 100;
          }
          return prev + 1; // Slower generation for "realism"
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [isGenerating]);

  // Advanced Mock Generation Logic
  const getPrompt = () => {
    const tone = data.advanced?.tone || "Professional, Authoritative, and Clear";
    const audience = data.advanced?.audience || "Expert-level professionals";
    const model = data.model || "GPT-4";
    const context = data.text || "Create a comprehensive strategy.";

    if (data.category === "image") {
      return `/imagine prompt: 
**Subject**: ${context}
**Style**: Cinematic, Photorealistic, 8k Resolution, Unreal Engine 5 Render
**Lighting**: Volumetric lighting, Golden Hour, Dramatic shadows, Ray Tracing
**Camera**: Shot on Sony A7R IV, 35mm lens, f/1.8 aperture, ISO 100
**Composition**: Rule of thirds, Center focus, Depth of field
**Color Palette**: Cyberpunk neon, Deep blues and magentas, High contrast
--ar 16:9 --v 6.0 --s 750 --style raw --q 2`;
    }

    return `### SYSTEM ROLE
You are a world-class expert in **${data.category}** with over 20 years of experience. You are known for your ability to provide highly detailed, accurate, and actionable outputs. Your goal is to assist the user in achieving their objective with maximum precision.

### CONTEXT & OBJECTIVE
The user requires assistance with the following request:
"${context}"

**Target Audience**: ${audience}
**Tone of Voice**: ${tone}

### STEP-BY-STEP INSTRUCTIONS
1.  **Analyze the Request**: Deeply understand the core requirements and implicit needs.
2.  **Structure the Response**: Use clear headings, bullet points, and logical flow.
3.  **Draft the Content**:
    *   Ensure all technical terms are used correctly.
    *   Avoid fluff; be concise yet comprehensive.
    *   Include real-world examples where applicable.
4.  **Review & Refine**: Check against the constraints below.

### CONSTRAINTS & GUIDELINES
*   **Format**: Use Markdown for clear hierarchy (H1, H2, Bold, Code Blocks).
*   **Depth**: Do not provide surface-level advice. Go deep into the "how" and "why".
*   **Safety**: Ensure all content is safe, ethical, and unbiased.
*   **Model Optimization**: This prompt is optimized for ${model}.

### OUTPUT FORMATTING
Please provide the final output in the following structure:
*   **Executive Summary**: A high-level overview.
*   **Detailed Analysis/Content**: The core response.
*   **Actionable Next Steps**: A checklist for implementation.
*   **FAQ/Troubleshooting**: Potential issues and solutions.

### FEW-SHOT EXAMPLES (Style Reference)
[Input]: "Explain quantum computing."
[Output]: "Quantum computing harnesses the laws of quantum mechanics to solve problems too complex for classical computers..." (Concise, technical, accurate).

---
**BEGIN GENERATION**`;
  };

  return (
    <div className="h-full flex flex-col lg:flex-row gap-6 h-[calc(100vh-200px)]">
      
      {/* Left Panel: Controls & Analysis */}
      <div className="w-full lg:w-1/3 space-y-4 flex flex-col">
        <Card className="p-5 bg-card/50 border-border/50 backdrop-blur-sm shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading font-semibold text-lg flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              Prompt Quality Score
            </h3>
            <Badge variant="outline" className="font-mono text-green-400 border-green-400/30 bg-green-400/10">
              98/100
            </Badge>
          </div>
          
          <div className="space-y-6">
            <ScoreBar label="Completeness" score={98} color="bg-green-500" delay={0.2} />
            <ScoreBar label="Specificity" score={92} color="bg-blue-500" delay={0.4} />
            <ScoreBar label="Structure" score={100} color="bg-purple-500" delay={0.6} />
            <ScoreBar label="Clarity" score={88} color="bg-orange-500" delay={0.8} />
          </div>

          <div className="mt-6 pt-6 border-t border-border/50">
             <h4 className="text-sm font-medium mb-3 text-muted-foreground">AI Suggestions</h4>
             <div className="space-y-2">
               <div className="flex items-start gap-2 text-xs p-2 rounded bg-primary/5 border border-primary/10">
                 <CheckCircle2 className="w-3 h-3 text-primary mt-0.5" />
                 <span>Great job including specific constraints.</span>
               </div>
               <div className="flex items-start gap-2 text-xs p-2 rounded bg-yellow-500/5 border border-yellow-500/10">
                 <Wand2 className="w-3 h-3 text-yellow-500 mt-0.5" />
                 <span>Try adding a "Persona" to refine the tone further.</span>
               </div>
             </div>
          </div>
        </Card>

        <Card className="flex-1 p-4 bg-card/50 border-border/50 flex flex-col shadow-xl">
          <h3 className="font-heading font-semibold mb-4 text-sm">Refinement Chat</h3>
          <div className="flex-1 bg-background/30 rounded-lg p-4 mb-3 text-sm overflow-y-auto border border-border/30">
             <div className="flex gap-3 mb-4">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-[10px] text-primary-foreground font-bold shadow-lg shadow-primary/20">AI</div>
                <div className="bg-muted/50 p-3 rounded-2xl rounded-tl-none text-muted-foreground text-xs leading-relaxed">
                  I've engineered a highly detailed prompt based on your inputs. I added a "Step-by-Step" section to ensure the model follows a logical flow. Would you like me to make it more concise?
                </div>
             </div>
          </div>
          <div className="flex gap-2 relative">
             <input 
               type="text" 
               placeholder="e.g. Make it more formal..." 
               className="flex-1 bg-background/50 border border-input rounded-full px-4 py-2 text-xs focus:ring-1 focus:ring-primary outline-none transition-all"
             />
             <Button size="icon" className="rounded-full w-8 h-8 absolute right-1 top-1 shadow-lg">
               <Wand2 className="w-3 h-3" />
             </Button>
          </div>
        </Card>
      </div>

      {/* Right Panel: Output */}
      <div className="w-full lg:w-2/3 flex flex-col">
        <Card className="flex-1 border-border bg-[#1e1e1e] flex flex-col overflow-hidden shadow-2xl relative group rounded-xl border-2 border-border/50">
          
          {/* Editor Toolbar */}
          <div className="h-10 border-b border-white/10 flex items-center justify-between px-4 bg-[#252526]">
            <div className="flex items-center gap-2">
              <Terminal className="w-3 h-3 text-blue-400" />
              <span className="text-xs font-mono text-gray-400">final_prompt.md</span>
            </div>
            <div className="flex items-center gap-1">
              <Button size="icon" variant="ghost" className="h-6 w-6 text-gray-400 hover:text-white hover:bg-white/10">
                <Maximize2 className="w-3 h-3" />
              </Button>
            </div>
          </div>

          {/* Editor Content */}
          <div className="flex-1 p-6 font-mono text-sm overflow-y-auto relative bg-[#1e1e1e] text-[#d4d4d4]">
            {isGenerating ? (
               <div className="flex flex-col items-center justify-center h-full gap-6 opacity-80">
                 <div className="relative">
                   <div className="w-16 h-16 border-4 border-primary/20 rounded-full" />
                   <div className="w-16 h-16 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin absolute top-0 left-0" />
                 </div>
                 <div className="text-center space-y-2">
                   <p className="text-primary font-medium tracking-wide animate-pulse">OPTIMIZING PROMPT STRUCTURE...</p>
                   <p className="text-xs text-gray-500">Injecting expert persona constraints...</p>
                 </div>
                 <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden mt-4">
                   <motion.div 
                     className="h-full bg-primary" 
                     style={{ width: `${progress}%` }} 
                   />
                 </div>
               </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="whitespace-pre-wrap leading-relaxed selection:bg-primary/30"
              >
                {getPrompt()}
              </motion.div>
            )}
            
            {/* Line Numbers Sidebar (Visual only) */}
            <div className="absolute left-0 top-6 bottom-0 w-10 border-r border-white/5 bg-[#1e1e1e] flex flex-col items-center pt-0 text-xs text-gray-600 font-mono select-none pointer-events-none">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="h-5 leading-relaxed">{i + 1}</div>
              ))}
            </div>
          </div>

          {/* Action Bar */}
          <div className="p-4 border-t border-white/10 bg-[#252526] flex justify-between items-center">
             <Button variant="ghost" onClick={onRestart} className="text-gray-400 hover:text-white hover:bg-white/10 text-xs">
                <Edit className="w-3 h-3 mr-2" />
                Edit Inputs
             </Button>
             <div className="flex gap-2">
                <Button variant="secondary" onClick={() => setIsGenerating(true)} className="bg-white/10 hover:bg-white/20 text-white border-0">
                   <RefreshCw className="w-3 h-3 mr-2" />
                   Regenerate
                </Button>
                <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
                   <Copy className="w-3 h-3 mr-2" />
                   Copy to Clipboard
                </Button>
             </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function ScoreBar({ label, score, color, delay }: { label: string, score: number, color: string, delay: number }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs font-medium">
        <span className="text-muted-foreground">{label}</span>
        <span className={cn("font-mono", color.replace("bg-", "text-").replace("500", "400"))}>{score}%</span>
      </div>
      <div className="h-2 w-full bg-secondary/50 rounded-full overflow-hidden">
        <motion.div 
          className={cn("h-full", color)}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ delay, duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function Badge({ children, variant, className }: any) {
  return (
    <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium border", className)}>
      {children}
    </span>
  );
}
