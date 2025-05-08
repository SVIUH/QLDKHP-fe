import { Drawer } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  useCreateClass,
  useUpdateClass,
} from "../../../hooks/useClasses";          // <-- 3 chấm lên đúng cấp
import { useSubjectList } from "../../../hooks/useSubjects";

/* ---------- validate ---------- */
const schema = yup
  .object({
    class_name: yup.string().required("Tên lớp bắt buộc"),
    subject_id: yup.number().required("Chọn môn"),
    professor_name: yup.string().required("Tên GV?"),
    year: yup.number().required("Năm?"),
    term: yup.number().required("Học kỳ?"),
    max_capacity: yup.number().min(1).required("Sĩ số tối đa?"),
  })
  .required();

/* ---------- component ---------- */
export default function FormDrawer({ open, onClose, defaultValues }) {
  const isEdit = !!defaultValues;

  /* Lấy danh sách môn */
  const { data: subjects = [] } = useSubjectList();

  /* react-hook-form */
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const create = useCreateClass();
  const update = useUpdateClass();

  const onSubmit = (data) => {
    const action = isEdit
      ? update.mutateAsync({ id: defaultValues.class_id, ...data })
      : create.mutateAsync(data);

    action
      .then(() => {
        reset();          // clear form
        onClose();
      })
      .catch(() => {});   // toast lỗi đã có interceptor
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
          placeholder="Tên lớp"
          {...register("class_name")}
          className="border p-2 rounded"
        />
        <p className="text-red-600 text-sm">{errors.class_name?.message}</p>

        {/* Chọn môn */}
        <Controller
          name="subject_id"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              className="border p-2 rounded"
              defaultValue=""
            >
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

        {/* Giảng viên */}
        <input
          placeholder="Giảng viên"
          {...register("professor_name")}
          className="border p-2 rounded"
        />

        {/* Năm & Học kỳ */}
        <div className="flex gap-3">
          <input
            placeholder="Năm"
            type="number"
            {...register("year")}
            className="border p-2 rounded flex-1"
          />
          <input
            placeholder="Học kỳ"
            type="number"
            {...register("term")}
            className="border p-2 rounded flex-1"
          />
        </div>

        {/* Sĩ số tối đa */}
        <input
          placeholder="Sĩ số tối đa"
          type="number"
          {...register("max_capacity")}
          className="border p-2 rounded"
        />

        {/* Nút hành động */}
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
