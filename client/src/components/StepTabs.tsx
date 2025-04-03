import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

type StepTabsProps = {
  currentStep: number;
  totalSteps: number;
  onStepChange: (step: number) => void;
};

export default function StepTabs({ currentStep, totalSteps, onStepChange }: StepTabsProps) {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);
  
  return (
    <div className="flex px-4 py-2 bg-gray-100 border-b border-gray-200">
      <div className="flex space-x-2">
        {steps.map(step => (
          <Button
            key={step}
            variant={step === currentStep ? "default" : "ghost"}
            size="icon"
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === currentStep 
                ? "bg-gray-200 text-gray-700"
                : "text-gray-400"
            } font-semibold`}
            onClick={() => onStepChange(step)}
          >
            {step}
          </Button>
        ))}
      </div>
      <div className="ml-auto">
        <Button variant="ghost" size="icon" className="text-primary">
          <Zap className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}