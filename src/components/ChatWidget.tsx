import { useState } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content: "Halo! 👋 Saya Mofy AI Assistant. Ada yang bisa saya bantu tentang layanan website atau AI kami?",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([...messages, { role: "user", content: input }]);
    
    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content:
            "Terima kasih atas pertanyaannya! Untuk konsultasi lebih detail, silakan isi form kontak atau hubungi kami via WhatsApp di +62 812-3456-7890. Tim kami siap membantu! 😊",
        },
      ]);
    }, 1000);

    setInput("");
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-foreground text-background flex items-center justify-center shadow-md hover:shadow-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 md:w-96 border-2 border-border bg-background shadow-lg">
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b-2 border-border bg-foreground text-background">
            <div className="w-10 h-10 border-2 border-background/30 flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold">Mofy AI Assistant</p>
              <p className="text-xs text-background/60">Online • Demo Mode</p>
            </div>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 text-sm ${
                    msg.role === "user"
                      ? "bg-foreground text-background"
                      : "border-2 border-border"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t-2 border-border flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ketik pesan..."
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="border-2"
            />
            <Button onClick={handleSend} size="icon" className="flex-shrink-0">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
