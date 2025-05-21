import { Box, Typography, Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const ClassDetail = ({ cls }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!cls) return null;

  const handleRegister = async () => {
    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('❌ Vui lòng đăng nhập trước khi đăng ký.');
        setLoading(false);
        return;
      }

      const response = await axios.post(
        'http://localhost:3000/enrollments',
        {
          class_id: Number(cls.class_id),
          class_detail_id: Number(cls.class_detail_id),
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true, // Hỗ trợ cookie/session nếu backend yêu cầu
        }
      );

      if (response.data.status === 201) {
        setMessage('✅ Đăng ký thành công!');
      } else {
        setMessage(`❌ Đăng ký thất bại: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      const errorMessage = error.response?.data?.message || 'Lỗi khi đăng ký lớp.';
      setMessage(`❌ ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box mt={4} p={2} border="1px solid #ccc" borderRadius={2}>
      <Typography variant="h6" color="primary">
        Lớp: {cls.class_name}
      </Typography>
      <Typography>Giảng viên: {cls.professor_name}</Typography>
      <Typography>
        Sỉ số: {cls.current_capacity}/{cls.max_capacity}
      </Typography>
      <Typography>Học kỳ: {cls.term} - Năm: {cls.year}</Typography>
      <Typography>
        Trạng thái: {cls.status ? "Hoạt động" : "Không hoạt động"}
      </Typography>
      <Typography>
        Đang tuyển sinh: {cls.isEnrolling ? "Có" : "Không"}
      </Typography>
      <Typography>Số lịch học: {cls.schedules?.length || 0}</Typography>

      <Box mt={2}>
        <Button
          variant="contained"
          color="success"
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Đang đăng ký..." : "Đăng ký"}
        </Button>
        {message && (
          <Typography mt={1} color="secondary">
            {message}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ClassDetail;
