import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as SubjectAPI from "../api/subject";

/* ----------- Danh sách môn ----------- */
export const useSubjectList = () =>
  useQuery({
    queryKey: ["subjects"],
    queryFn: () => SubjectAPI.getSubjects().then((r) => r.data.data),
  });

/* ----------- Helper refetch ----------- */
const useInvalidateSubjectList = () => {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ queryKey: ["subjects"] });
};

/* ----------- CRUD ----------- */
export const useCreateSubject = () => {
  const invalidate = useInvalidateSubjectList();
  return useMutation({
    mutationFn: SubjectAPI.createSubject,
    onSuccess: invalidate,
  });
};

export const useUpdateSubject = () => {
  const invalidate = useInvalidateSubjectList();
  return useMutation({
    mutationFn: ({ id, ...body }) => SubjectAPI.updateSubject(id, body),
    onSuccess: invalidate,
  });
};

export const useDeleteSubject = () => {
  const invalidate = useInvalidateSubjectList();
  return useMutation({
    mutationFn: SubjectAPI.deleteSubject,
    onSuccess: invalidate,
  });
};
