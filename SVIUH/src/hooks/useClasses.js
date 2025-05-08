import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as ClassAPI from "../api/class";     // ← nếu chưa dùng alias, đổi thành "../../api/class"

export const useClassList = (filters) =>
  useQuery({
    queryKey: ["classes", filters],
    queryFn: () => ClassAPI.getClasses(filters).then((r) => r.data),
  });

export const useCreateClass = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ClassAPI.createClass,
    onSuccess: () => qc.invalidateQueries(["classes"]),
  });
};

export const useUpdateClass = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...body }) => ClassAPI.updateClass(id, body),
    onSuccess: () => qc.invalidateQueries(["classes"]),
  });
};

export const useDeleteClass = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ClassAPI.deleteClass,
    onSuccess: () => qc.invalidateQueries(["classes"]),
  });
};
