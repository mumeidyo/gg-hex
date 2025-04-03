import { ArrowLeft, Send, ChevronRight, Globe, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MobileKeyboard() {
  return (
    <div className="bg-gray-300 py-2">
      <div className="flex justify-between items-center px-3 mb-2">
        <div className="w-6 text-center">
          <ChevronRight className="h-5 w-5 text-gray-500 mx-auto" />
        </div>
        <div className="text-xs text-gray-600">改行</div>
      </div>

      <div className="grid grid-cols-4 gap-1 px-1 mb-1">
        <Button variant="outline" className="bg-gray-200 rounded py-3 text-center">あ</Button>
        <Button variant="outline" className="bg-gray-200 rounded py-3 text-center">か</Button>
        <Button variant="outline" className="bg-gray-200 rounded py-3 text-center">さ</Button>
        <Button variant="outline" className="bg-gray-200 rounded py-3 text-center">
          <Send className="h-5 w-5 text-gray-500 mx-auto rotate-225" />
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-1 px-1 mb-1">
        <Button variant="outline" className="bg-gray-200 rounded py-3 text-center">
          <ArrowLeft className="h-5 w-5 text-gray-500" />
        </Button>
        <Button variant="outline" className="bg-gray-200 rounded py-3 text-center">た</Button>
        <Button variant="outline" className="bg-gray-200 rounded py-3 text-center">な</Button>
        <Button variant="outline" className="bg-gray-200 rounded py-3 text-center">は</Button>
      </div>

      <div className="grid grid-cols-4 gap-1 px-1 mb-1">
        <Button variant="outline" className="bg-gray-200 rounded py-3 text-center">ABC</Button>
        <Button variant="outline" className="bg-gray-200 rounded py-3 text-center">ま</Button>
        <Button variant="outline" className="bg-gray-200 rounded py-3 text-center">や</Button>
        <Button variant="outline" className="bg-gray-200 rounded py-3 text-center">ら</Button>
      </div>

      <div className="grid grid-cols-4 gap-1 px-1 mb-3">
        <Button variant="outline" className="bg-gray-200 rounded py-3 text-center">
          <span className="text-xl">😊</span>
        </Button>
        <Button variant="outline" className="bg-gray-200 rounded py-3 text-center">
          <span className="text-xl">^^</span>
        </Button>
        <Button variant="outline" className="bg-gray-200 rounded py-3 text-center">わ</Button>
        <Button variant="outline" className="bg-gray-200 rounded py-3 text-center">
          <span className="text-xl">,.?!</span>
        </Button>
      </div>

      <div className="flex justify-between items-center px-3 mb-2">
        <Button variant="ghost" size="icon" className="p-1">
          <Globe className="h-6 w-6 text-gray-500" />
        </Button>
        <div className="bg-gray-200 w-32 h-1 rounded-full"></div>
        <Button variant="ghost" size="icon" className="p-1">
          <Mic className="h-6 w-6 text-gray-500" />
        </Button>
      </div>
    </div>
  );
}
