import { Drawer, Autocomplete, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  useCreateClass,
  useUpdateClass,
  useClassList, // ← để lấy danh sách GV
} from "../../../hooks/useClasses";
import { useSubjectList } from "../../../hooks/useSubjects";

/* ---------- validate ---------- */
const today = new Date();
const currentYear = today.getFullYear();
const isTermPast = (term, year) => {
  const start = new Date(
    year,
    term === 1 ? 7 : term === 2 ? 0 : 4, // 7=Aug, 0=Jan, 4=May
    1
  );
  return start < today;
};
const schema = yup.object({
  class_name: yup
    .string()
    .max(100, "Tối đa 100 ký tự")
    .matches(/^[\p{L}\d\s\-]+$/u, "Không dùng ký tự đặc biệt")
    .required("Tên lớp bắt buộc"),

  subject_id: yup.number().required("Chọn môn"),

  professor_name: yup
    .string()
    .max(100, "Tối đa 100 ký tự")
    .required("Chọn / nhập giảng viên"),

  year: yup
    .number()
    .min(currentYear, `Không nhỏ hơn ${currentYear}`)
    .max(2100)
    .required(),

  term: yup
    .number()
    .oneOf([1, 2, 3], "Chỉ 1, 2 hoặc 3")
    .required()
    .test(
      "term-start-not-past",
      "Đã quá thời điểm bắt đầu học kỳ",
      function (value) {
        if (!value) return false;
        const y = this.parent.year || currentYear;
        const start = new Date(
          y,
          value === 1 ? 7 : value === 2 ? 0 : 4, // Aug=7, Jan=0, May=4
          1
        );
        return start >= today;
      }
    ),

  max_capacity: yup.number().min(1).max(500).required("Sĩ số tối đa?"),
});

/* ---------- component ---------- */
export default function FormDrawer({ open, onClose, defaultValues }) {
  const isEdit = !!defaultValues;

  /* Danh sách môn & giảng viên */
  const { data: subjects = [] } = useSubjectList();
  const { data: allClasses = [] } = useClassList({}); // lấy toàn bộ
  const professorOptions = [
    ...new Set(allClasses.map((c) => c.professor_name)),
  ];

  /* react-hook-form */
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      year: currentYear,
      term: today.getMonth() >= 7 ? 1 : today.getMonth() >= 4 ? 3 : 2, // gợi ý kỳ phù hợp hiện tại
      ...defaultValues,
    },
  });

  const create = useCreateClass();
  const update = useUpdateClass();
  const watchedYear = watch("year", currentYear);
  const onSubmit = (data) => {
    const action = isEdit
      ? update.mutateAsync({ id: defaultValues.class_id, ...data })
      : create.mutateAsync(data);

    action
      .then(() => {
        reset();
        onClose();
      })
      .catch(() => {}); // interceptor sẽ toast lỗi
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[420px] p-6 flex flex-col gap-4"
      >
        <h2 className="text-xl font-bold">
          {isEdit ? "Cập nhật lớp" : "Thêm lớp"}
        </h2>

        {/* Tên lớp */}
        <input
          {...register("class_name")}
          placeholder="Tên lớp"
          className="border p-2 rounded"
        />
        <p className="text-red-600 text-sm">{errors.class_name?.message}</p>

        {/* Chọn môn */}
        <Controller
          name="subject_id"
          control={control}
          render={({ field }) => (
            <select {...field} className="border p-2 rounded" defaultValue="">
              <option value="" disabled>
                -- Chọn môn --
              </option>
              {subjects.map((s) => (
                <option key={s.subject_id} value={s.subject_id}>
                  {s.subject_name}
                </option>
              ))}
            </select>
          )}
        />
        <p className="text-red-600 text-sm">{errors.subject_id?.message}</p>

        {/* Giảng viên – autocomplete */}
        <Controller
          name="professor_name"
          control={control}
          render={({ field }) => (
            <Autocomplete
              freeSolo
              options={professorOptions}
              value={field.value || null}
              onChange={(_, val) => field.onChange(val)}
              onInputChange={(_, val) => field.onChange(val)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Giảng viên"
                  size="small"
                  error={!!errors.professor_name}
                  helperText={errors.professor_name?.message}
                />
              )}
            />
          )}
        />

        {/* Năm & Học kỳ */}
        <div className="flex gap-3">
          {" "}
          <input
            type="number"
            min={currentYear}
            {...register("year")}
            className="border p-2 rounded flex-1"
          />
          <select {...register("term")} className="border p-2 rounded flex-1">
            {[1, 2, 3].map((t) => (
              <option key={t} value={t} disabled={isTermPast(t, watchedYear)}>
                {t === 3 ? "3 (Hè)" : t}
              </option>
            ))}
          </select>
        </div>
        <p className="text-red-600 text-sm">{errors.year?.message}</p>
        <p className="text-red-600 text-sm">{errors.term?.message}</p>

        {/* Sĩ số tối đa */}
        <input
          type="number"
          {...register("max_capacity")}
          placeholder="Sĩ số tối đa"
          className="border p-2 rounded"
        />
        <p className="text-red-600 text-sm">{errors.max_capacity?.message}</p>

        {/* Nút */}
        <div className="flex gap-3 mt-4">
          <button
            type="submit"
            className="flex-1 bg-indigo-600 text-white py-2 rounded"
          >
            {isEdit ? "Lưu" : "Tạo"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-300 py-2 rounded"
          >
            Huỷ
          </button>
        </div>
      </form>
    </Drawer>
  );
}
