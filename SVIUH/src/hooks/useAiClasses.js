/* src/hooks/useAiClasses.js */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";
import { invalidateAllClassQueries } from "./useClasses";  

/* ---- GPT: xem trước ---- */
export const useAiPreview = () =>
  useMutation({
    mutationFn: (payload) =>
      api.post("/ai-classes?dryRun=true", payload).then((r) => r.data),
  });

/* ---- GPT: lưu lớp ---- */
export const useAiFinalize = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      api.post("/ai-classes", payload).then((r) => r.data),
    onSuccess: () => invalidateAllClassQueries(qc),        
  });
};

export const useAiGenerate = () => useAiFinalize();
