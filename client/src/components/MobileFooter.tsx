import { ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

type MobileFooterProps = {
  onComplete: () => void;
};

export default function MobileFooter({ onComplete }: MobileFooterProps) {
  return (
    <div className="bg-gray-200 px-4 py-2 flex items-center justify-between border-t border-gray-300">
      <Button variant="ghost" size="icon" className="text-gray-500">
        <ChevronUp className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon" className="text-gray-500">
        <ChevronDown className="h-5 w-5" />
      </Button>
      <Button variant="ghost" className="text-gray-700" onClick={onComplete}>
        完了
      </Button>
    </div>
  );
}
