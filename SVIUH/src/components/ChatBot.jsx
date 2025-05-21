import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const ChatBot = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    setError(null);

    try {
      const response = await axios.post('http://localhost:3000/chatbot', {
        question: input,
      });
      setMessages([...newMessages, { sender: 'bot', text: response.data.answer }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Không thể kết nối với server. Vui lòng kiểm tra lại!');
      setMessages([
        ...newMessages,
        { sender: 'bot', text: 'Đã có lỗi xảy ra. Vui lòng thử lại!' },
      ]);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 rounded-lg shadow-lg">
      {/* Nút đóng */}
      <div className="flex justify-between items-center p-3 bg-blue-500 text-white rounded-t-lg">
        <h2 className="text-lg font-semibold">Trợ lý học phần</h2>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 focus:outline-none"
        >
          ✕
        </button>
      </div>
      {/* Thông báo lỗi */}
      {error && (
        <div className="text-red-500 text-sm text-center p-2">{error}</div>
      )}
      {/* Khu vực tin nhắn */}
      <div className="flex-1 overflow-y-auto p-3 bg-white">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex mb-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <span
              className={`inline-block px-3 py-2 rounded-lg max-w-xs ${
                msg.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {/* Input và nút gửi */}
      <div className="flex gap-2 p-3 border-t">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          className="flex-1 border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Nhập câu hỏi của bạn..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Gửi
        </button>
      </div>
    </div>
  );
};

ChatBot.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ChatBot;