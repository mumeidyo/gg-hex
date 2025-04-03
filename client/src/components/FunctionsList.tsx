import { ScriptFunction } from "@shared/schema";
import { Button } from "@/components/ui/button";

type FunctionsListProps = {
  functions: ScriptFunction[];
  onDelete: (id: number) => void;
  isDeleting: boolean;
};

export default function FunctionsList({ functions, onDelete, isDeleting }: FunctionsListProps) {
  if (!functions || functions.length === 0) {
    return null;
  }
  
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-3">追加された機能:</h2>
      
      <div className="border border-gray-200 rounded-md divide-y">
        {functions.map((func) => (
          <div key={func.id} className="p-3">
            <div className="flex justify-between">
              <span className="font-medium">{func.functionName}</span>
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 text-sm h-auto p-0"
                onClick={() => onDelete(func.id)}
                disabled={isDeleting}
              >
                削除
              </Button>
            </div>
            <div className="text-sm text-gray-500 mt-1">
              <div>Before: <span className="font-mono">{func.beforeHex}</span></div>
              <div>After: <span className="font-mono">{func.afterHex}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
