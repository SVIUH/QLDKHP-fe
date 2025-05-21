import { Box, Typography, Button } from "@mui/material";

const ClassDetail = ({ cls }) => {
  if (!cls) return null;

  return (
    <Box mt={4} p={2} border="1px solid #ccc" borderRadius={2}>
      <Typography variant="h6" color="primary">Lớp: {cls.class_name}</Typography>
      <Typography>Giảng viên: {cls.professor_name}</Typography>
      <Typography>Sỉ số: {cls.current_capacity}/{cls.max_capacity}</Typography>
      <Typography>Học kỳ: {cls.term} - Năm: {cls.year}</Typography>
      <Typography>Trạng thái: {cls.status ? "Hoạt động" : "Không hoạt động"}</Typography>
      <Typography>Đang tuyển sinh: {cls.isEnrolling ? "Có" : "Không"}</Typography>
      <Typography>Số lịch học: {cls.schedules?.length || 0}</Typography>

      <Box mt={2}>
        <Button variant="contained" color="success">Đăng ký</Button>
      </Box>
    </Box>
  );
};

export default ClassDetail;
