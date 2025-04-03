import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { type ScriptFunction } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { generateScript, downloadScript } from "@/lib/scriptGenerator";

import ScriptForm from "@/components/ScriptForm";
import FunctionsList from "@/components/FunctionsList";
import StepTabs from "@/components/StepTabs";


export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();
  
  // Fetch functions from the server
  const { data: functions, isLoading, refetch } = useQuery<ScriptFunction[]>({
    queryKey: ["/api/functions"],
  });

  // Add function mutation
  const addFunctionMutation = useMutation({
    mutationFn: async (formData: Omit<ScriptFunction, "id">) => {
      const response = await apiRequest("POST", "/api/functions", formData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "機能が追加されました",
        description: "新しい機能が正常に追加されました。",
      });
      refetch();
    },
    onError: (error) => {
      toast({
        title: "エラー",
        description: `機能の追加に失敗しました: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Delete function mutation
  const deleteFunctionMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/functions/${id}`, undefined);
    },
    onSuccess: () => {
      toast({
        title: "機能が削除されました",
        description: "機能が正常に削除されました。",
      });
      refetch();
    },
    onError: (error) => {
      toast({
        title: "エラー",
        description: `機能の削除に失敗しました: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const handleAddFunction = (data: Omit<ScriptFunction, "id">) => {
    addFunctionMutation.mutate(data);
  };

  const handleDeleteFunction = (id: number) => {
    deleteFunctionMutation.mutate(id);
  };
  
  const handleExportScript = () => {
    if (!functions || functions.length === 0) {
      toast({
        title: "エクスポートエラー",
        description: "エクスポートする機能がありません。機能を追加してください。",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const scriptContent = generateScript(functions);
      const fileName = `GameGuardian_スクリプト_${new Date().toISOString().slice(0, 10)}.lua`;
      downloadScript(scriptContent, fileName);
      
      toast({
        title: "エクスポートが完了しました",
        description: "GameGuardian用Luaスクリプトが正常にエクスポートされました。",
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '不明なエラー';
      toast({
        title: "エクスポートエラー",
        description: `スクリプトのエクスポートに失敗しました: ${errorMessage}`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-md h-screen flex flex-col bg-white shadow-lg">
      <StepTabs currentStep={currentStep} totalSteps={5} onStepChange={setCurrentStep} />
      
      <div className="flex-1 overflow-auto p-5">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-xl font-bold">カスタムスクリプト生成機</h1>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1" 
            onClick={handleExportScript}
            disabled={!functions || functions.length === 0}
          >
            <Download className="h-4 w-4" />
            エクスポート
          </Button>
        </div>
        
        <ScriptForm 
          onSubmit={handleAddFunction} 
          isSubmitting={addFunctionMutation.isPending} 
        />
        
        {!isLoading && functions && functions.length > 0 && (
          <FunctionsList 
            functions={functions} 
            onDelete={handleDeleteFunction}
            isDeleting={deleteFunctionMutation.isPending}
          />
        )}
      </div>
      
      <div className="p-4 flex justify-end">
        <Button 
          onClick={() => setCurrentStep(prev => prev < 5 ? prev + 1 : prev)}
          disabled={!functions || functions.length === 0}
        >
          完了
        </Button>
      </div>
    </div>
  );
}
