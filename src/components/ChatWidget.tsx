// Improved ChatWidget UI with formatted lists & bold support
// (You can modify markdown rendering later if needed)

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Bot, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content:
        "Halo! 👋 Saya Mofy AI Assistant. Ada yang bisa saya bantu tentang layanan website atau AI kami?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    let id = localStorage.getItem("chatUserId");
    if (!id) {
      id =
        "user-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
      localStorage.setItem("chatUserId", id);
    }
    setUserId(id);

    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  useEffect(() => {
    if (messages.length > 1) {
      localStorage.setItem("chatMessages", JSON.stringify(messages));
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");

    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://n8n-dy5n5yszihx8.pisang.sumopod.my.id/webhook/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: userMessage,
            userId: userId,
            timestamp: new Date().toISOString(),
          }),
        }
      );

      if (!response.ok) throw new Error("Network issue");

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content:
            data.message || data.response ||
            "Maaf, terjadi kesalahan. Silakan coba lagi.",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content:
            "Maaf, koneksi ke server terputus. Silakan coba lagi atau hubungi kami via WhatsApp.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: "bot",
        content:
          "Halo! 👋 Saya Mofy AI Assistant. Ada yang bisa saya bantu tentang layanan website atau AI kami?",
      },
    ]);
    localStorage.removeItem("chatMessages");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[9999] w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-black hover:scale-110 transition-all duration-300 border border-gray-700"
      >
        {isOpen ? <X className="w-7 h-7" /> : <MessageCircle className="w-7 h-7" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-28 right-6 z-[9999] w-[22rem] md:w-[26rem] max-h-[75vh] rounded-2xl border border-gray-300 bg-white overflow-hidden flex flex-col">
          <div className="flex items-center justify-between p-4 bg-gray-900 text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold text-base">Mofy AI Assistant</p>
                <p className="text-xs text-gray-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Online
                </p>
              </div>
            </div>
            <button
              onClick={clearChat}
              className="text-xs text-gray-300 hover:text-white underline px-2 py-1 rounded"
            >
              Clear
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed border whitespace-pre-line ${
                    msg.role === "user"
                      ? "bg-gray-900 text-white border-transparent"
                      : "bg-white text-gray-900 border-gray-300"
                  }`}
                >
   
                   <ReactMarkdown remarkPlugins={[remarkGfm]}>
    {msg.content}
  </ReactMarkdown>

                  
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-300 rounded-2xl px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-gray-900" />
                    <span className="text-sm text-gray-600">Mengetik...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="px-4 py-3 bg-white border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {["Lihat Paket & Harga", "Cara Pemesanan", "Portfolio"].map((reply) => (
                <button
                  key={reply}
                  onClick={() => {
                    setInput(reply);
                    setTimeout(() => handleSend(), 100);
                  }}
                  disabled={isLoading}
                  className="text-xs px-3 py-2 bg-gray-100 hover:bg-gray-900 hover:text-white rounded-full transition disabled:opacity-50"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 bg-white border-t border-gray-200 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ketik pesan..."
              onKeyDown={handleKeyPress}
              disabled={isLoading}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-gray-900 text-sm"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-black disabled:opacity-50 transition"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>

          <div className="px-4 py-2 bg-gray-900 border-t border-gray-800">
            <p className="text-xs text-gray-400 text-center">Powered by Mofy AI • Response time ~2s</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
