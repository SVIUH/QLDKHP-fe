import React, { useState } from 'react';
import chuongTrinhKhungData from '../data/curriculum.json';
import { Card, CardContent, MenuItem, Select, FormControl, InputLabel, Fab, Dialog } from '@mui/material';
import { MdChat } from 'react-icons/md';
import ChatBot from '../components/ChatBot';

const Curriculum = () => {
  const data = chuongTrinhKhungData;
  const [selectedTerm, setSelectedTerm] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const filteredHocKy = data.hocKy.filter((hocKy) => {
    if (selectedTerm === 'all') return true;
    return hocKy.tenHocKy === selectedTerm;
  });

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  return (
    <div className="space-y-6 p-4">
      {/* Bộ lọc */}
      <div className="flex gap-4 mb-4">
        <FormControl size="small">
          <InputLabel>Học kỳ</InputLabel>
          <Select
            value={selectedTerm}
            label="Học kỳ"
            onChange={(e) => setSelectedTerm(e.target.value)}
            style={{ minWidth: 150 }}
          >
            <MenuItem value="all">Tất cả</MenuItem>
            {data.hocKy.map((hk, idx) => (
              <MenuItem key={idx} value={hk.tenHocKy}>
                {hk.tenHocKy}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small">
          <InputLabel>Loại học phần</InputLabel>
          <Select
            value={selectedType}
            label="Loại học phần"
            onChange={(e) => setSelectedType(e.target.value)}
            style={{ minWidth: 180 }}
          >
            <MenuItem value="all">Tất cả</MenuItem>
            <MenuItem value="required">Bắt buộc</MenuItem>
            <MenuItem value="electives">Tự chọn</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* Hiển thị học phần theo bộ lọc */}
      {filteredHocKy.map((hocKy, index) => (
        <Card key={index} className="shadow-md">
          <CardContent className="space-y-4">
            <h2 className="text-xl font-semibold">{hocKy.tenHocKy}</h2>
            <p className="text-sm text-muted-foreground">
              Tổng số tín chỉ: {hocKy.tongSoTinChi}
            </p>

            {(selectedType === 'all' || selectedType === 'required') && (
              <div>
                <h3 className="text-lg font-medium">Môn học bắt buộc</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Yêu cầu: {hocKy.required.creditRequirement} tín chỉ
                </p>
                <div className="overflow-x-auto">
                  <table className="min-w-full border text-sm">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border px-2 py-1">STT</th>
                        <th className="border px-2 py-1">Mã MH</th>
                        <th className="border px-2 py-1">Tên môn học</th>
                        <th className="border px-2 py-1">Tín chỉ</th>
                        <th className="border px-2 py-1">LT</th>
                        <th className="border px-2 py-1">TH</th>
                        <th className="border px-2 py-1">Học phần trước</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hocKy.required.courses.map((course, i) => (
                        <tr key={i}>
                          <td className="border px-2 py-1 text-center">{course.stt}</td>
                          <td className="border px-2 py-1 text-center">{course.maMonHoc}</td>
                          <td className="border px-2 py-1">{course.tenMonHoc}</td>
                          <td className="border px-2 py-1 text-center">{course.soTinChi}</td>
                          <td className="border px-2 py-1 text-center">{course.soTietLT}</td>
                          <td className="border px-2 py-1 text-center">{course.soTietTH}</td>
                          <td className="border px-2 py-1 text-center">{course.hocPhanHocTruoc || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {(selectedType === 'all' || selectedType === 'electives') && hocKy.electives && (
              <div>
                <h3 className="text-lg font-medium mt-4">Môn học tự chọn</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Yêu cầu: {hocKy.electives.creditRequirement} tín chỉ
                </p>
                <div className="overflow-x-auto">
                  <table className="min-w-full border text-sm">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border px-2 py-1">STT</th>
                        <th className="border px-2 py-1">Mã MH</th>
                        <th className="border px-2 py-1">Tên môn học</th>
                        <th className="border px-2 py-1">Tín chỉ</th>
                        <th className="border px-2 py-1">LT</th>
                        <th className="border px-2 py-1">TH</th>
                        <th className="border px-2 py-1">Học phần trước</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hocKy.electives.courses.map((course, i) => (
                        <tr key={i}>
                          <td className="border px-2 py-1 text-center">{course.stt}</td>
                          <td className="border px-2 py-1 text-center">{course.maMonHoc}</td>
                          <td className="border px-2 py-1">{course.tenMonHoc}</td>
                          <td className="border px-2 py-1 text-center">{course.soTinChi}</td>
                          <td className="border px-2 py-1 text-center">{course.soTietLT}</td>
                          <td className="border px-2 py-1 text-center">{course.soTietTH}</td>
                          <td className="border px-2 py-1 text-center">{course.hocPhanHocTruoc || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      {/* Nút chat cố định */}
      <Fab
        color="primary"
        aria-label="chat"
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
        }}
        onClick={handleOpenChat}
      >
        <MdChat size={24} />
      </Fab>

      {/* Modal chat */}
      <Dialog
        open={isChatOpen}
        onClose={handleCloseChat}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          style: {
            maxHeight: '80vh',
            margin: 0,
            width: '400px',
            height: '500px',
          },
        }}
      >
        <ChatBot onClose={handleCloseChat} />
      </Dialog>
    </div>
  );
};

export default Curriculum;