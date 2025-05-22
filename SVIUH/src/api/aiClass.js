import { api } from "./index";

/** POST /ai-classes – body: {subject_id, year, term, existing_classes[]} */
export const generateAiClasses = (payload) => api.post("/ai-classes", payload);
