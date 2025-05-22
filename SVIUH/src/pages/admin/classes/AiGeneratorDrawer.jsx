import { useState } from "react";
import { Drawer, TextField, MenuItem, CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { useSubjectList } from "../../../hooks/useSubjects";
import { useClassList } from "../../../hooks/useClasses";
import { useAiPreview } from "../../../hooks/useAiClasses";
import { useCreateClass } from "../../../hooks/useClasses";

import FormDrawer from "./FormDrawer";

/* ---------------- helper: GPT draft ➜ FormDrawer shape ---------------- */
function draftToForm(draft) {
  const detailFrom = (item) => {
    const [, type] = item.study_time.match(/^(LT|TH)/) || [];
    const [, day] = item.study_time.match(/- (Thứ [0-7])/u) || [];
    const [, start, end] = item.study_time.match(/T(\d+)\s*->\s*T(\d+)/) || [];

    const [, block, floor, room] =
      item.room_name.match(/^([A-Z])(\d)\.(\d{2})$/) || [];

    return {
      type,
      day,
      start: Number(start),
      end: Number(end),
      block,
      floor: Number(floor),
      room_no: room,
      group_practice: item.group_practice,
    };
  };

  return {
    ...draft,
    subject_id: Number(draft.subject_id),
    year: Number(draft.year),
    term: Number(draft.term),
    max_capacity: Number(draft.max_capacity),
    details: draft.classDetails.map(detailFrom),
  };
}

/* ===================================================================== */
export default function AiGeneratorDrawer({ open, onClose }) {
  /* ---------- chọn môn / năm / kỳ ---------- */
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      subject_id: "",
      year: new Date().getFullYear(),
      term: 1,
    },
  });

  /* ---------- dữ liệu phụ ---------- */
  const { data: subjects = [] } = useSubjectList();
  const { data: existing = [] } = useClassList({
    subject_id: watch("subject_id") || undefined,
    year: watch("year"),
    term: watch("term"),
  });

  /* ---------- hooks gọi API ---------- */
  const { mutateAsync: preview, isPending: loadingPreview } = useAiPreview();
  const { mutateAsync: createClass, isPending: savingDraft } = useCreateClass();

  /* ---------- local state ---------- */
  const [drafts, setDrafts] = useState([]);
  const [editing, setEditing] = useState(null);

  /* ---------- STEP-1: yêu cầu GPT (dry-run) ---------- */
  async function handleGenerate(form) {
    if (!form.subject_id) return toast.warn("Chọn môn học trước!");

    const payload = {
      subject_id: Number(form.subject_id),
      year: Number(form.year),
      term: Number(form.term),
      existing_classes: existing.map((c) => ({
        class_name: c.class_name,
        classDetails: c.details?.map((d) => d.study_time) ?? [],
      })),
    };

    try {
      const res = await preview(payload);
      if (res.length === 0) {
        toast.info("Đã đủ 4 lớp, không cần tạo thêm");
        return;
      }
      setDrafts(res);
      setEditing(draftToForm(res[0])); // tự mở bản đầu
    } catch {
      toast.error("Tạo lớp bằng AI thất bại");
    }
  }
  async function persistOne(formData) {
    try {
      await createClass(formData);
      toast.success("Đã lưu lớp HP!");

      setDrafts((prev) =>
        prev.filter((d) => d.class_name !== formData.class_name)
      );
      setEditing(null);
      if (drafts.length === 1) onClose();
    } catch {
      toast.error("Lưu thất bại");
    }
  }
  /* ---------------- UI ---------------- */
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <form
        onSubmit={handleSubmit(handleGenerate)}
        className="w-[380px] p-6 flex flex-col gap-4"
      >
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">⚡ Tạo nhanh lớp HP</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-black text-xl leading-none"
            aria-label="Đóng"
          >
            ×
          </button>
        </div>

        {/* --- Môn học --- */}
        <TextField
          select
          label="Môn học"
          size="small"
          {...register("subject_id")}
        >
          {subjects.map((s) => (
            <MenuItem key={s.subject_id} value={s.subject_id}>
              {s.subject_name}
            </MenuItem>
          ))}
        </TextField>

        {/* --- Năm / Kỳ --- */}
        <div className="flex gap-3">
          <TextField
            type="number"
            label="Năm"
            size="small"
            {...register("year")}
            sx={{ flex: 1 }}
          />
          <TextField select label="Học kỳ" size="small" {...register("term")}>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3 (Hè)</MenuItem>
          </TextField>
        </div>

        <p className="text-sm text-gray-500">
          Đã có <b>{existing.length}</b>/4 lớp trong kỳ này
        </p>

        {drafts.length === 0 ? (
          <button
            type="submit"
            disabled={loadingPreview}
            className="bg-emerald-600 text-white py-2 rounded disabled:opacity-60"
          >
            {loadingPreview ? <CircularProgress size={20} /> : "Sinh lớp"}
          </button>
        ) : (
          <>
            <h4 className="font-medium mt-4">
              Nhấn “✏️” để chỉnh sửa rồi lưu ({drafts.length})
            </h4>
            <ul className="list-disc pl-5 text-sm">
              {drafts.map((d) => (
                <li key={d.class_name} className="flex items-center gap-2">
                  {d.class_name}
                  <button
                    type="button"
                    className="text-blue-600 text-xs"
                    onClick={() => setEditing(draftToForm(d))}
                  >
                    ✏️
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}

        {editing && (
          <FormDrawer
            open={true}
            onClose={() => setEditing(null)}
            defaultValues={editing}
            onSubmitOverride={persistOne}
          />
        )}
      </form>
    </Drawer>
  );
}
