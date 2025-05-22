import { api } from "./index";

/* --- LIST --- */
export const getClasses = (params) =>
  api.get("/admin/class", { params });                 

/* --- SINGLE CLASS (có details) --- */
export const getClass = (id) =>
  api.get(`/admin/class/${id}`);                       

/* --- CRUD --- */
export const createClass  = (body)        => api.post ("/admin/class", body);
export const updateClass  = (id, body)    => api.patch(`/admin/class/${id}`, body);
export const deleteClass  = (id)          => api.delete(`/admin/class/${id}`);

export const getClassesBySubject = (subjectId) =>
  api.get(`/classes/subject/${subjectId}`);
