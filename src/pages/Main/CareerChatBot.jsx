import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import TitleText from "../../components/UI/TitleText";
import { getOrCreateSessionId } from "../../components/Utils/session";
import axiosInstance from "../../api/axiosInstance";
import { marked } from "marked";

const CareerChatbot = () => {
  const fileInputRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const sessionId = getOrCreateSessionId();
  // Add this new ref
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    document.title = "Career ChatBot";
  }, []);

  // Change your scroll effect
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    setMessages([
      {
        role: "bot",
        text: "👋 Hi! I'm your Career Assistant. How can I help you today? (e.g., Resume, Cover Letter, Interview Questions)",
        type: "text",
      },
    ]);
  }, []);

  // ✅ Fetch history from n8n Airtable webhook on mount
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axiosInstance.get("/webhook-test/chat-history", {
          params: { session_id: sessionId },
        });

        if (Array.isArray(res.data) && res.data.length > 0) {
          const historyMessages = res.data.map((msg) => {
            const fileUrl = msg.filename
              ? `https://your-file-storage.com/${msg.filename}`
              : null;

            const combinedText =
              msg.filename && msg.message
                ? `${msg.message}<br><a href="${fileUrl}" target="_blank" rel="noopener noreferrer">${msg.filename}</a>`
                : msg.filename
                ? `<a href="${fileUrl}" target="_blank" rel="noopener noreferrer" >${msg.filename}</a>`
                : msg.message || "";

            return {
              role: msg.role?.toLowerCase() === "user" ? "user" : "bot",
              text: combinedText,
              type: msg.filename ? "file" : "text",
              file: fileUrl,
              timestamp: msg.timestampp || null,
            };
          });

          // Sort by timestamp
          historyMessages.sort(
            (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
          );

          // Prepend welcome message if needed
          const hasWelcome = historyMessages.some(
            (m) =>
              m.role === "bot" &&
              m.text.includes("Hi! I'm your Career Assistant")
          );
          setMessages(
            hasWelcome
              ? historyMessages
              : [
                  {
                    role: "bot",
                    text: "👋 Hi! I'm your Career Assistant. How can I help you today? (e.g., Resume, Cover Letter, Interview Questions)",
                    type: "text",
                    timestamp: new Date().toISOString(),
                  },
                  ...historyMessages,
                ]
          );
        } else {
          setMessages([
            {
              role: "bot",
              text: "👋 Hi! I'm your Career Assistant. How can I help you today? (e.g., Resume, Cover Letter, Interview Questions)",
              type: "text",
              timestamp: new Date().toISOString(),
            },
          ]);
        }
      } catch (err) {
        console.error("Error fetching history:", err);
      }
    };

    fetchHistory();
  }, [sessionId]);

  const handleSend = async () => {
    if (!input.trim() && files.length === 0) return;

    setIsLoading(true); // ✅ Move this up so React can render typing bubble first

    const fileMessages = files.map((file) => ({
      role: "user",
      text: file.name,
      type: "file",
      file: URL.createObjectURL(file),
    }));

    const textMessage = input.trim()
      ? { role: "user", text: input, type: "text" }
      : null;

    const newMessages = [...fileMessages];
    if (textMessage) newMessages.push(textMessage);

    setMessages((prev) => [...prev, ...newMessages]);
    setInput("");
    setFiles([]);

    try {
      const formData = new FormData();
      formData.append("message", input || "");
      formData.append("history", JSON.stringify(messages));
      formData.append("session_id", sessionId);

      files.forEach((f, i) => {
        formData.append(`attachment${i}`, f);
      });

      const res = await axiosInstance.post("/webhook-test/chatbot", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const botMessage = { role: "bot", text: res.data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    const pdfFiles = selectedFiles.filter(
      (file) => file.type === "application/pdf"
    );

    if (pdfFiles.length < selectedFiles.length) {
      alert("Only PDF files are allowed.");
    }

    setFiles((prev) => [...prev, ...pdfFiles]);
  };

  const handleRemoveFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-1 items-center justify-center px-4 mt-3 mb-3">
      <div className="max-w-2xl w-full p-6 space-y-4 bg-white rounded-2xl shadow-lg border">
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="bg-blue-600 text-white w-10 h-10 flex items-center justify-center rounded-full font-bold shadow">
            🤖
          </div>
          <TitleText
            variant="h4"
            color="blue-gray"
            className="font-semibold text-blue-gray-900"
          >
            Career Assistant
          </TitleText>
        </div>

        {/* Chat messages */}
        <div
          ref={messagesContainerRef}
          className="border h-[500px] overflow-y-auto bg-white rounded-xl p-4 shadow-inner flex flex-col gap-3"
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-br-none"
                    : "bg-gray-100 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.type === "file" ? (
                  <>
                    <div
                      dangerouslySetInnerHTML={{ __html: marked(msg.text) }}
                    />
                    {msg.file?.match(/\.(jpg|jpeg|png|gif)$/i) && (
                      <img
                        src={msg.file}
                        alt={msg.text}
                        className="mt-1 max-w-full rounded-lg shadow"
                      />
                    )}
                  </>
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: marked(msg.text) }} />
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-500 text-sm px-4 py-2 rounded-2xl italic shadow-sm">
                Bot is typing...
              </div>
            </div>
          )}
        </div>

        {/* File preview chips */}
        {files.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center bg-blue-50 border border-blue-200 px-3 py-1 rounded-full text-sm text-blue-700 shadow-sm"
              >
                📎 {file.name}
                <button
                  onClick={() => handleRemoveFile(index)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Input section */}
        <div className="flex items-center gap-2">
          {/* Upload button */}
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="w-10 h-10 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-xl font-bold text-blue-600 rounded-full flex items-center justify-center shadow-sm transition-colors"
            title="Upload file(s)"
          >
            +
          </button>

          {/* Hidden file input */}
          <input
            type="file"
            multiple
            accept=".pdf"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          {/* Text input */}
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />

          {/* Send button */}
          <button
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm shadow-sm transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default CareerChatbot;
