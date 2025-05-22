import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as ClassAPI from "../api/class";

export const invalidateAllClassQueries = (qc) =>
  qc.invalidateQueries({
    predicate: (q) =>
      ["classes", "classes-by-subject", "subjects-has-class"].includes(
        q.queryKey[0]
      ),
  });

export const useClassList = (filters) =>
  useQuery({
    queryKey: ["classes", filters],
    queryFn: () => ClassAPI.getClasses(filters).then((r) => r.data),
    staleTime: 0,          
  });

const useInvalidate = (apiFn) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: apiFn,
    onSuccess: () => {
      invalidateAllClassQueries(qc);     
      qc.refetchQueries({                
        predicate: (q) =>
          ["classes", "classes-by-subject", "subjects-has-class"].includes(
            q.queryKey[0]
          ),
      });
    },
  });
};

export const useCreateClass = () => useInvalidate(ClassAPI.createClass);
export const useUpdateClass = () =>
  useInvalidate(({ id, ...body }) => ClassAPI.updateClass(id, body));
export const useDeleteClass = () => useInvalidate(ClassAPI.deleteClass);


export const useSubjectsHaveClass = (year, term) =>
  useQuery({
    queryKey: ["subjects-has-class", year, term],
    queryFn: () =>
      ClassAPI.getClasses({ year, term }).then((r) => {
        const map = new Map();
        r.data.forEach((c) => map.set(c.subject_id, c.subject));
        return Array.from(map.values());
      }),
  });

export const useClassListBySubject = (subjectId) =>
  useQuery({
    enabled: !!subjectId,
    queryKey: ["classes-by-subject", subjectId],
    queryFn: () =>
      ClassAPI.getClassesBySubject(subjectId).then((r) => r.data),
  });
export const useClassDetail = (classId) =>
  useQuery({
    enabled: !!classId,
    queryKey: ["class-detail", classId],
    queryFn: () => ClassAPI.getClass(classId).then((r) => r.data),
  });