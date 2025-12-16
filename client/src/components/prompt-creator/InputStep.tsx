import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Mic, 
  Upload, 
  Type, 
  ChevronDown, 
  ChevronUp, 
  Square,
  Sparkles,
  Command
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface InputStepProps {
  inputData: any;
  updateData: (data: any) => void;
}

export function InputStep({ inputData, updateData }: InputStepProps) {
  const [showAdvanced, setShowAdvanced] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      updateData({ ...inputData, text: "I need a prompt for a futuristic city with flying cars and neon lights, cyberpunk style, cinematic lighting..." });
    } else {
      setIsRecording(true);
      // Mock recording logic would go here
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-2">
          <Sparkles className="w-3 h-3" />
          <span>Step 2 of 4</span>
        </div>
        <h2 className="text-3xl font-heading font-bold">Describe your concept</h2>
        <p className="text-muted-foreground">Provide the raw ideas, we'll handle the engineering.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="text" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4 bg-card/50 border border-border/50 p-1 h-12">
              <TabsTrigger value="text" className="gap-2 h-10 data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                <Type className="w-4 h-4" /> Text Input
              </TabsTrigger>
              <TabsTrigger value="voice" className="gap-2 h-10 data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                <Mic className="w-4 h-4" /> Voice Input
              </TabsTrigger>
              <TabsTrigger value="file" className="gap-2 h-10 data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                <Upload className="w-4 h-4" /> File Upload
              </TabsTrigger>
            </TabsList>

            <TabsContent value="text" className="space-y-4 mt-0">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity" />
                <Textarea 
                  placeholder="Describe what you want to create in detail..."
                  className="min-h-[300px] p-6 text-lg leading-relaxed resize-none bg-card/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 rounded-xl shadow-inner font-sans"
                  value={inputData.text || ""}
                  onChange={(e) => updateData({ ...inputData, text: e.target.value })}
                />
                <div className="absolute bottom-4 right-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1 border border-border/50 px-2 py-1 rounded bg-background/50">
                    <Command className="w-3 h-3" /> + Enter to submit
                  </span>
                  <span>{(inputData.text?.length || 0)} chars</span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="voice" className="h-[300px] flex flex-col items-center justify-center bg-card/30 rounded-xl border border-border/50 border-dashed mt-0 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none" />
              {isRecording ? (
                <div className="flex flex-col items-center gap-6 relative z-10">
                  <div className="flex items-center gap-1 h-16">
                    {[1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1, 2, 3, 4, 5, 4, 3, 2].map((h, i) => (
                      <motion.div
                        key={i}
                        className="w-2 bg-primary rounded-full shadow-[0_0_10px_rgba(var(--primary),0.5)]"
                        animate={{ height: [10, h * 12, 10] }}
                        transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.05 }}
                      />
                    ))}
                  </div>
                  <p className="text-lg font-mono text-primary animate-pulse tracking-widest">RECORDING 00:{recordingTime < 10 ? `0${recordingTime}` : recordingTime}</p>
                  <Button variant="destructive" size="lg" className="rounded-full h-16 w-16 shadow-lg shadow-destructive/20" onClick={toggleRecording}>
                    <Square className="w-6 h-6 fill-current" />
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-6 relative z-10">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-24 w-24 rounded-full border-primary/20 bg-primary/10 hover:bg-primary/20 hover:border-primary/50 hover:scale-105 transition-all"
                      onClick={toggleRecording}
                    >
                      <Mic className="w-10 h-10 text-primary" />
                    </Button>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-medium">Click to Speak</h3>
                    <p className="text-muted-foreground">We'll transcribe your voice to text automatically</p>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="file" className="h-[300px] flex flex-col items-center justify-center bg-card/30 rounded-xl border border-border/50 border-dashed cursor-pointer hover:bg-card/50 transition-colors mt-0 group">
              <div className="flex flex-col items-center gap-4 text-center p-6">
                <div className="p-6 rounded-full bg-primary/5 text-primary mb-2 group-hover:scale-110 transition-transform duration-300 ring-1 ring-primary/20 group-hover:bg-primary/10">
                  <Upload className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Upload Documents</h3>
                  <p className="text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed">
                    Drag & drop PDF, DOCX, or TXT files here to extract context and constraints automatically.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-4">
          <div className="border border-border/50 rounded-xl bg-card/30 overflow-hidden shadow-lg">
            <div className="p-4 border-b border-border/50 bg-card/50">
              <h3 className="font-heading font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Advanced Context
              </h3>
            </div>
            
            <div className="p-5 space-y-5">
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Tone of Voice</Label>
                <select 
                  className="w-full h-10 px-3 rounded-lg bg-background/50 border border-input focus:ring-1 focus:ring-primary outline-none text-sm transition-all hover:bg-background"
                  onChange={(e) => updateData({ ...inputData, advanced: { ...inputData.advanced, tone: e.target.value } })}
                >
                  <option>Professional & Authoritative</option>
                  <option>Casual & Friendly</option>
                  <option>Creative & Abstract</option>
                  <option>Technical & Precise</option>
                  <option>Persuasive & Marketing</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Target Audience</Label>
                <Input 
                  placeholder="e.g. Senior Developers" 
                  className="bg-background/50 text-sm" 
                  onChange={(e) => updateData({ ...inputData, advanced: { ...inputData.advanced, audience: e.target.value } })}
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Specific Constraints</Label>
                <Textarea 
                  placeholder="e.g. No jargon, under 500 words, use bullet points..." 
                  className="bg-background/50 text-sm min-h-[100px] resize-none" 
                />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 leading-relaxed">
            <strong>Pro Tip:</strong> providing a specific target audience increases the relevance of the output by 40%.
          </div>
        </div>
      </div>
    </div>
  );
}
