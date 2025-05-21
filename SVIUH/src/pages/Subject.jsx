import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import SubjectTable from "../components/Subject/SubjectTable";
import ClassModal from "../components/Subject/ClassModal";
import ClassDetail from "../components/Subject/ClassDetail";

const Subject = () => {
  const [subjects, setSubjects] = useState([]);
  const [classList, setClassList] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/subject", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) setSubjects(data.data);
        else console.error("Lỗi API:", data.message || res.statusText);
      } catch (err) {
        console.error("Lỗi lấy danh sách môn học:", err);
      }
    };

    fetchSubjects();
  }, []);

  const handleRowClick = async (params) => {
    const subjectId = params.row.subject_id;
    setSelectedSubject(subjectId);
    setSelectedClass(null);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/classes/subject/${subjectId}/schedules`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok && Array.isArray(data)) {
        setClassList(data);
        setOpenModal(true);
      } else {
        console.error("Dữ liệu lớp lỗi:", data);
      }
    } catch (err) {
      console.error("Lỗi API lớp:", err);
    }
  };

  const handleSelectClass = (cls) => {
    setSelectedClass(cls);
    setOpenModal(false);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Danh sách môn học</Typography>
      <SubjectTable subjects={subjects} onRowClick={handleRowClick} />
      <ClassModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        classes={classList}
        onSelectClass={handleSelectClass}
      />
      <ClassDetail cls={selectedClass} />
    </Box>
  );
};

export default Subject;
