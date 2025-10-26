import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

function SupportPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      text: "Hello! I'm CulturaBot — your travel and culture companion 🤖. Ask me anything about travel, culture, or destinations!",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickActions = [
    { id: 1, label: "Top travel destinations", query: "What are the best travel destinations this year?" },
    { id: 2, label: "Cultural experiences", query: "Tell me about local cultural experiences I can try." },
    { id: 3, label: "Safety tips", query: "Give me travel safety tips for tourists." },
    { id: 4, label: "Food recommendations", query: "What local foods should I try while traveling?" },
  ];

  // Use a backend proxy endpoint instead of calling GoogleGenerativeAI client from the browser.
  // Calling the official @google/generative-ai client in the browser may not work (and exposes your API key).
  // The backend (server/index.js) will make the server-side call and return the assistant text.
  const getBotResponse = async (userMessage) => {
    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || "";
      const res = await fetch(`${apiBase}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("/api/generate returned error:", res.status, text);
        return "Sorry, this feature is still under development.";
      }

      const data = await res.json();
      return data.text || "Hmm... I couldn't think of a reply 😅";
    } catch (error) {
      console.error("Server API error:", error);
      return "Sorry, this feature is still under development.";
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: "user",
      text: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    const botReply = await getBotResponse(userMessage.text);

    const botMessage = {
      id: messages.length + 2,
      type: "bot",
      text: botReply,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleQuickAction = (query) => {
    setInputValue(query);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            SophoTravel AI Assistant
          </h1>
          <p className="text-lg text-gray-600">
            Ask anything about travel, culture, or destinations 🌍
          </p>
        </div>

        {/* Chat Container */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border-2 border-sand-200 overflow-hidden">
            {/* Quick Actions */}
            {messages.length === 1 && (
              <div className="p-6 border-b border-sand-200">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-terracotta-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 mb-1">CulturaBot</p>
                    <div className="bg-sand-50 rounded-2xl rounded-tl-sm px-4 py-3">
                      <p className="text-gray-800">{messages[0].text}</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 ml-16">
                  {quickActions.map((action) => (
                    <button
                      key={action.id}
                      onClick={() => handleQuickAction(action.query)}
                      className="px-4 py-3 bg-white border-2 border-sand-200 rounded-lg text-sm font-medium text-gray-700 hover:border-terracotta-500 hover:bg-terracotta-50 transition-colors text-left"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.slice(1).map((message) => (
                <div key={message.id} className={`flex items-start gap-4 ${message.type === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${message.type === "bot" ? "bg-terracotta-100" : "bg-sand-500"}`}>
                    <span className="text-xl">{message.type === "bot" ? "🤖" : "👤"}</span>
                  </div>
                  <div className={`flex-1 max-w-md ${message.type === "user" ? "flex justify-end" : ""}`}>
                    <div className={`rounded-2xl px-4 py-3 ${message.type === "bot" ? "bg-sand-50 rounded-tl-sm" : "bg-terracotta-500 text-gray-900 rounded-tr-sm"}`}>
                      <p className={message.type === "bot" ? "text-gray-800" : "text-gray-900"}>{message.text}</p>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-terracotta-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🤖</span>
                  </div>
                  <div className="bg-sand-50 rounded-2xl rounded-tl-sm px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-sand-200 bg-sand-50">
              <div className="flex gap-3 mb-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask CulturaBot anything about travel or culture..."
                    className="w-full rounded-lg border-2 border-sand-200 bg-white h-12 pl-4 pr-12 placeholder:text-gray-400 text-gray-900 focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-100 transition-colors"
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="px-6 rounded-lg bg-terracotta-500 text-gray-900 font-medium hover:bg-terracotta-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default SupportPage;
