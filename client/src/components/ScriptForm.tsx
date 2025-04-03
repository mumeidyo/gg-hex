import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { scriptFunctionSchema } from "@shared/schema";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type ScriptFormProps = {
  onSubmit: (data: z.infer<typeof scriptFunctionSchema>) => void;
  isSubmitting: boolean;
};

export default function ScriptForm({ onSubmit, isSubmitting }: ScriptFormProps) {
  // Set default creator name
  const [creatorName, setCreatorName] = useState("わたる（改造）");
  
  const form = useForm<z.infer<typeof scriptFunctionSchema>>({
    resolver: zodResolver(scriptFunctionSchema),
    defaultValues: {
      creatorName: creatorName,
      functionName: "",
      beforeHex: "",
      afterHex: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof scriptFunctionSchema>) => {
    onSubmit(data);
    
    // Reset form but keep creator name
    setCreatorName(data.creatorName);
    form.reset({
      creatorName: data.creatorName,
      functionName: "",
      beforeHex: "",
      afterHex: "",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="creatorName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">作成者名:</FormLabel>
              <FormControl>
                <Input
                  placeholder="作成者名を入力"
                  {...field}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="functionName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">機能名:</FormLabel>
              <FormControl>
                <Input
                  placeholder="機能の名前"
                  {...field}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="beforeHex"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">書き換え前のHEXコード:</FormLabel>
              <FormControl>
                <Input
                  placeholder="例: 0123456789"
                  {...field}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary font-mono"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="afterHex"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">書き換え後のHEXコード:</FormLabel>
              <FormControl>
                <Input
                  placeholder="例: 9876543210"
                  {...field}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary font-mono"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-blue-600 text-white font-medium py-2.5 px-4 rounded-md transition duration-200"
          disabled={isSubmitting}
        >
          {isSubmitting ? "追加中..." : "機能を追加"}
        </Button>
      </form>
    </Form>
  );
}
