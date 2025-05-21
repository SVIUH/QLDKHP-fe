import { DataGrid } from "@mui/x-data-grid";
import { Box, Chip } from "@mui/material";

const SubjectTable = ({ subjects, onRowClick }) => {
  const columns = [
    { field: "subject_id", headerName: "ID", width: 100 },
    { field: "subject_name", headerName: "Tên môn học", width: 250 },
    { field: "credits", headerName: "Số tín chỉ", width: 120 },
    {
      field: "isRequired",
      headerName: "Bắt buộc",
      width: 120,
      renderCell: (params) =>
        params.value ? <Chip label="Bắt buộc" color="primary" /> : <Chip label="Tự chọn" variant="outlined" />,
    },
    { field: "term", headerName: "Học kỳ", width: 110 },
    { field: "theory", headerName: "LT", width: 80 },
    { field: "practice", headerName: "TH", width: 80 },
    {
      field: "status",
      headerName: "Đã qua",
      width: 110,
      renderCell: (params) =>
        params.value ? <Chip label="Đã qua" color="success" /> : <Chip label="Chưa qua" color="warning" />,
    },
    {
      field: "prerequisites",
      headerName: "Học phần tiên quyết",
      width: 200,
      valueGetter: (params) => {
        const prerequisites = params.row?.prerequisites || [];
        return prerequisites.length > 0
          ? prerequisites.map((p) => p.prerequisite_subject_id).join(", ")
          : "Không";
      },
    },
  ];

  return (
    <Box height={600}>
      <DataGrid
        rows={subjects.map((s) => ({ id: s.subject_id, ...s }))}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 20, 50]}
        onRowClick={onRowClick}
      />
    </Box>
  );
};

export default SubjectTable;
