import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { CategoryStep } from "@/components/prompt-creator/CategoryStep";
import { InputStep } from "@/components/prompt-creator/InputStep";
import { ModelStep } from "@/components/prompt-creator/ModelStep";
import { GenerationStep } from "@/components/prompt-creator/GenerationStep";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CreatePrompt() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    category: null,
    text: "",
    model: null,
    advanced: {}
  });

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));
  
  const updateData = (data: any) => setFormData({ ...formData, ...data });

  const renderStep = () => {
    switch (step) {
      case 1:
        return <CategoryStep selectedCategory={formData.category} onSelect={(id) => { updateData({ category: id }); nextStep(); }} />;
      case 2:
        return <InputStep inputData={formData} updateData={(data) => updateData(data)} />;
      case 3:
        return <ModelStep selectedModel={formData.model} onSelect={(id) => { updateData({ model: id }); nextStep(); }} />;
      case 4:
        return <GenerationStep data={formData} onRestart={() => setStep(2)} />;
      default:
        return null;
    }
  };

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto h-full flex flex-col">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-heading font-bold">New Prompt</h1>
            <div className="text-sm text-muted-foreground font-mono">
              Step {step} of 4
            </div>
          </div>
          <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary" 
              initial={{ width: 0 }}
              animate={{ width: `${(step / 4) * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Footer */}
        {step < 4 && (
          <div className="mt-8 flex justify-between pt-6 border-t border-border/50">
            <Button 
              variant="ghost" 
              onClick={prevStep} 
              disabled={step === 1}
              className="text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="w-4 h-4 mr-2" /> Back
            </Button>
            
            {step !== 1 && step !== 3 && ( // Steps 1 and 3 auto-advance
              <Button onClick={nextStep} className="shadow-lg shadow-primary/20">
                Next Step <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
