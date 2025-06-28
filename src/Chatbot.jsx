import React, { useState } from "react";
import axios from "axios";
import "./index.css";

const ChatbotPage = () => {
  const [question, setQuestion] = useState("");
  const [file, setFile] = useState(null);
  const [chatLog, setChatLog] = useState([]);

  const handleSend = async () => {
    const form = new FormData();
    form.append("question", question);
    if (file) form.append("pdf", file);

    try {
      const res = await axios.post("http://localhost:5000/chatbot", form);
      setChatLog(prev => [...prev, { user: question, bot: res.data.answer }]);
      setQuestion("");
      setFile(null);
    } catch {
      alert("Failed to contact chatbot.");
    }
  };

  return (
    <div className="page-container">
      <h2>🤖 Insurance Chatbot</h2>
      <div className="chat-box">
        {chatLog.map((msg, i) => (
          <div key={i} className="chat-entry">
            <div className="chat-user"><b>You:</b> {msg.user}</div>
            <div className="chat-bot"><b>Bot:</b> {msg.bot}</div>
          </div>
        ))}
      </div>
      <textarea
        placeholder="Ask your insurance question..."
        rows={2}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default ChatbotPage;
