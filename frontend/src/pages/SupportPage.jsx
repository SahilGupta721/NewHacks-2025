import { useState, useRef, useEffect } from "react";
import { Send, Menu, Plus, Trash2, MessageSquare } from "lucide-react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { GoogleGenerativeAI } from "@google/generative-ai";

function SupportPage() {
  const [conversations, setConversations] = useState([]);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      text: "Hello! I'm SophoBot — your AI travel companion 🌍. Ask me anything about destinations, local culture, hidden gems, or travel tips!",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const savedConversations = localStorage.getItem('sophobot_conversations');
    if (savedConversations) {
      const parsed = JSON.parse(savedConversations);
      setConversations(parsed);
      if (parsed.length > 0) {
        const lastConv = parsed[parsed.length - 1];
        setCurrentConversationId(lastConv.id);
        setMessages(lastConv.messages);
      }
    } else {
      createNewConversation();
    }
  }, []);

  useEffect(() => {
    const saveConversation = async () => {
      if (currentConversationId) {
        setConversations(prevConversations => {
          const existingConv = prevConversations.find(c => c.id === currentConversationId);
          let title = existingConv?.title || 'New Conversation';

          const updatedConversations = prevConversations.map(conv =>
            conv.id === currentConversationId
              ? { ...conv, messages, updatedAt: new Date().toISOString(), title }
              : conv
          );

          if (!existingConv) {
            updatedConversations.push({
              id: currentConversationId,
              messages,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              title
            });
          }

          localStorage.setItem('sophobot_conversations', JSON.stringify(updatedConversations));
          return updatedConversations;
        });

        if (messages.length === 3) {
          generateConversationTitle(messages).then(newTitle => {
            setConversations(prevConversations => {
              const updated = prevConversations.map(conv =>
                conv.id === currentConversationId
                  ? { ...conv, title: newTitle }
                  : conv
              );
              localStorage.setItem('sophobot_conversations', JSON.stringify(updated));
              return updated;
            });
          });
        }
      }
    };

    saveConversation();
  }, [messages, currentConversationId]);

  // Helper to get conversation title from first user message
  const getConversationTitle = (msgs) => {
    const firstUserMsg = msgs.find(m => m.type === 'user');
    if (firstUserMsg) {
      return firstUserMsg.text.slice(0, 40) + (firstUserMsg.text.length > 40 ? '...' : '');
    }
    return 'New Conversation';
  };

  const generateConversationTitle = async (msgs) => {
    try {
      if (msgs.length < 3) {
        return getConversationTitle(msgs);
      }

      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) return getConversationTitle(msgs);

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
      });

      const conversationText = msgs
        .slice(1, 5)
        .map(m => `${m.type === 'user' ? 'User' : 'Bot'}: ${m.text}`)
        .join('\n');

      const prompt = `Create a short, descriptive title for this travel conversation.
- Maximum 4-5 words
- Use the same language as the user's question (English or Vietnamese)
- Be specific about the topic (e.g., "Vietnam Street Food Tips" or "Hội An Hidden Gems")
- DO NOT include quotes or special characters
- Return ONLY the title

Conversation:
${conversationText}

Title:`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const title = response.text().trim();

      const cleanTitle = title
        .replace(/^["'\`]|["'\`]$/g, '')
        .replace(/^Title:\s*/i, '')
        .replace(/\n/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 50);

      return cleanTitle && cleanTitle !== 'New Conversation' ? cleanTitle : getConversationTitle(msgs);
    } catch (error) {
      console.error('Error generating title:', error);
      return getConversationTitle(msgs);
    }
  };

  // Create new conversation
  const createNewConversation = () => {
    const newId = Date.now().toString();
    const initialMessages = [
      {
        id: 1,
        type: "bot",
        text: "Hello! I'm SophoBot — your AI travel companion 🌍. Ask me anything about destinations, local culture, hidden gems, or travel tips!",
        timestamp: new Date(),
      },
    ];

    setCurrentConversationId(newId);
    setMessages(initialMessages);
  };

  // Load a conversation
  const loadConversation = (convId) => {
    const conv = conversations.find(c => c.id === convId);
    if (conv) {
      setCurrentConversationId(convId);
      setMessages(conv.messages);
      setShowSidebar(false);
    }
  };

  // Delete a conversation
  const deleteConversation = (convId) => {
    const updated = conversations.filter(c => c.id !== convId);
    setConversations(updated);
    localStorage.setItem('sophobot_conversations', JSON.stringify(updated));

    if (convId === currentConversationId) {
      if (updated.length > 0) {
        loadConversation(updated[updated.length - 1].id);
      } else {
        createNewConversation();
      }
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const parseMarkdown = (text) => {
    const lines = text.split('\n');

    return lines.map((line, lineIndex) => {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const parsedLine = parts.map((part, partIndex) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          const boldText = part.slice(2, -2);
          return <strong key={`${lineIndex}-${partIndex}`} className="font-semibold text-gray-900">{boldText}</strong>;
        }
        return <span key={`${lineIndex}-${partIndex}`}>{part}</span>;
      });

      return (
        <span key={lineIndex}>
          {parsedLine}
          {lineIndex < lines.length - 1 && <br />}
        </span>
      );
    });
  };

  const quickActions = [
    { id: 1, label: "Best destinations 2025", query: "What are the best cultural travel destinations for 2025?" },
    { id: 2, label: "Hidden gems", query: "Tell me about hidden cultural gems off the beaten path" },
    { id: 3, label: "Local experiences", query: "What authentic local experiences should I try?" },
    { id: 4, label: "Travel safety tips", query: "Give me practical safety tips for cultural travelers" },
  ];

  const SYSTEM_PROMPT = `You are **SophoBot**, the AI travel assistant for **SophoTravel** — a cultural travel platform helping users discover authentic destinations and meaningful travel experiences.

**Your Mission:**
Guide travelers to **unique, culturally-rich destinations**. Share **insider tips**, cultural stories, and practical travel advice — all in a warm, conversational tone.

**Tone & Personality:**
- Friendly, knowledgeable, and down-to-earth — like a local guide who loves storytelling.
- Use a warm and confident tone; avoid overly flowery or repetitive phrases.
- Write naturally but always prioritize **clarity and structure**.

**Response Format:**
- Begin with **one short, engaging sentence** that sets the tone.
- Then present the main content as **bullet points using dash (-)** (4–6 max).
- ALWAYS use dash (-) at the start of each bullet point, NOT asterisks or other symbols.
- Each bullet should be **1–2 sentences long** and highlight a single key insight.
- Use **bold** for 2–3 important keywords (places, customs, experiences).
- Keep total output under **150 words**.
- Example format (copy this EXACTLY):
  "Vietnam is a land of flavor and tradition. Here's how to experience it best:
  - **Street Food:** Taste authentic **Phở** and **Bánh mì** in Hanoi's bustling markets.
  - **Cultural Heritage:** Visit **Huế's Imperial City** to feel the echoes of Vietnam's royal past.
  - **Local Life:** Take a slow boat through the **Mekong Delta** to meet friendly locals.
  - **Etiquette Tip:** Dress modestly at temples and always smile when greeting elders.
  - **Best Time to Visit:** Spring (Feb–Apr) and autumn (Aug–Oct) offer ideal weather.

  Vietnam invites you to slow down and savor every moment."

IMPORTANT: ALWAYS use dash (-) for bullet points, never use asterisks (*) or other symbols.

**Guidelines:**
- No emojis or exclamation overload.
- Always balance culture + practicality.
- If asked about hotels or booking, politely redirect users to consult with local travel resources.
- Never provide medical or legal advice.
- Encourage users to explore *authentically*, not superficially.`;

  const getBotResponse = async (userMessage) => {
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      console.log("🔑 API Key exists:", !!apiKey);
      console.log("🔑 API Key prefix:", apiKey?.substring(0, 10));

      if (!apiKey) {
        console.error("❌ VITE_GEMINI_API_KEY not found in environment");
        return "Sorry, I'm not configured properly. Please check the API key.";
      }

      console.log("🤖 Initializing Gemini AI...");
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        systemInstruction: SYSTEM_PROMPT,
      });

      console.log("💬 Sending message to Gemini...");
      const result = await model.generateContent(userMessage);
      const response = await result.response;
      const text = response.text();

      console.log("✅ Got response:", text?.substring(0, 50));
      return text || "Hmm... I couldn't think of a reply 😅";
    } catch (error) {
      console.error("❌ Gemini API error:", error);
      console.error("❌ Error name:", error.name);
      console.error("❌ Error message:", error.message);
      console.error("❌ Error stack:", error.stack);

      if (error.message?.includes("API key")) {
        return "Sorry, there's an issue with my configuration. Please check the API key.";
      }

      if (error.message?.includes("quota")) {
        return "Sorry, the API quota has been exceeded. Please try again later.";
      }

      if (error.message?.includes("CORS")) {
        return "Sorry, there's a network configuration issue. Please contact support.";
      }

      return `Sorry, I encountered an error: ${error.message}. Please try again!`;
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
    <div className="min-h-screen bg-gradient-to-b from-background to-sand-50 flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 text-sm font-medium text-terracotta-600 bg-terracotta-50 px-4 py-1.5 rounded-full mb-2">
            <span className="text-lg">🤖</span>
            <span>AI Travel Assistant</span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            SophoTravel AI Assistant
          </h1>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Ask anything about travel, culture, or destinations
          </p>
        </div>

        <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col min-h-0">
          <div className="flex gap-4 flex-1 min-h-0">
            <div className={`${showSidebar ? 'w-72' : 'w-0'} transition-all duration-300 overflow-hidden flex-shrink-0`}>
              <div className="bg-white rounded-3xl shadow-xl border border-sand-200/50 p-4 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-gray-900">Chat History</h2>
                  <button
                    onClick={createNewConversation}
                    className="p-2 hover:bg-sand-100 rounded-lg transition-colors"
                    title="New Chat"
                  >
                    <Plus size={20} className="text-terracotta-600" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-2 scrollbar-hide">
                  {conversations.slice().reverse().map((conv) => (
                    <div
                      key={conv.id}
                      className={`group relative p-3 rounded-xl cursor-pointer transition-all ${
                        conv.id === currentConversationId
                          ? 'bg-terracotta-50 border border-terracotta-200'
                          : 'bg-sand-50 hover:bg-sand-100 border border-transparent'
                      }`}
                      onClick={() => loadConversation(conv.id)}
                    >
                      <div className="flex items-start gap-2">
                        <MessageSquare size={16} className={conv.id === currentConversationId ? 'text-terracotta-600' : 'text-gray-500'} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {conv.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(conv.updatedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteConversation(conv.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded transition-all"
                          title="Delete"
                        >
                          <Trash2 size={14} className="text-red-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col min-h-0">
              <div className="flex gap-2 mb-4 flex-shrink-0">
                <button
                  onClick={() => setShowSidebar(!showSidebar)}
                  className="px-4 py-2 bg-white border-2 border-sand-200 rounded-xl text-sm font-medium text-gray-700 hover:border-terracotta-500 hover:bg-terracotta-50 transition-all flex items-center gap-2"
                >
                  <Menu size={18} />
                  {showSidebar ? 'Hide' : 'Show'} History
                </button>
                <button
                  onClick={createNewConversation}
                  className="px-4 py-2 bg-gradient-to-r from-terracotta-500 to-terracotta-600 text-white rounded-xl text-sm font-semibold hover:from-terracotta-600 hover:to-terracotta-700 transition-all flex items-center gap-2 shadow-md"
                >
                  <Plus size={18} />
                  New Chat
                </button>
              </div>

          <div className="bg-white rounded-3xl shadow-xl border border-sand-200/50 overflow-hidden backdrop-blur-sm flex-1 flex flex-col min-h-0">
            {messages.length === 1 && (
              <div className="p-6 sm:p-8 border-b border-sand-200 bg-gradient-to-b from-sand-50/50 to-white flex-shrink-0">
                <div className="flex items-start gap-4 mb-6 animate-fade-in">
                  <div className="w-12 h-12 rounded-2xl bg-terracotta-500 flex items-center justify-center shrink-0 shadow-md">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-terracotta-600 mb-2">SophoBot</p>
                    <div className="bg-white border border-sand-200 rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm">
                      <div className="text-gray-800 leading-relaxed">{parseMarkdown(messages[0].text)}</div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:ml-16 animate-slide-up">
                  {quickActions.map((action, index) => (
                    <button
                      key={action.id}
                      onClick={() => handleQuickAction(action.query)}
                      style={{ animationDelay: `${index * 100}ms` }}
                      className="px-4 py-3 bg-white border border-sand-200 rounded-xl text-sm font-medium text-gray-700 hover:border-terracotta-500 hover:bg-terracotta-50 hover:shadow-md transition-all duration-300 text-left group"
                    >
                      <span className="group-hover:translate-x-1 inline-block transition-transform duration-300">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 scrollbar-hide min-h-0">
              {messages.slice(1).map((message, index) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-4 animate-message-appear ${message.type === "user" ? "flex-row-reverse" : ""}`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${message.type === "bot" ? "bg-terracotta-500" : "bg-sand-500"}`}>
                    <span className="text-lg">{message.type === "bot" ? "🤖" : "👤"}</span>
                  </div>
                  <div className={`flex-1 max-w-lg ${message.type === "user" ? "flex justify-end" : ""}`}>
                    <div className={`rounded-2xl px-5 py-4 shadow-sm ${message.type === "bot" ? "bg-white border border-sand-200 rounded-tl-sm" : "bg-gradient-to-br from-terracotta-500 to-terracotta-600 text-white rounded-tr-sm"}`}>
                      <div className={`leading-relaxed ${message.type === "bot" ? "text-gray-800" : "text-white"}`}>
                        {message.type === "bot" ? parseMarkdown(message.text) : message.text}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start gap-4 animate-message-appear">
                  <div className="w-10 h-10 rounded-2xl bg-terracotta-500 flex items-center justify-center shrink-0 shadow-md">
                    <span className="text-lg">🤖</span>
                  </div>
                  <div className="bg-white border border-sand-200 rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-gray-800 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2 h-2 bg-gray-800 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2 h-2 bg-gray-800 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="p-6 sm:p-8 border-t border-sand-200 bg-gradient-to-b from-white to-sand-50/50 flex-shrink-0">
              <div className="flex gap-3">
                <div className="flex-1 relative group">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask SophoBot anything about travel or culture..."
                    className="w-full rounded-xl border-2 border-sand-200 bg-white h-14 pl-5 pr-4 placeholder:text-gray-400 text-gray-900 focus:border-terracotta-500 focus:ring-4 focus:ring-terracotta-100 transition-all duration-300 shadow-sm hover:shadow-md"
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="px-6 h-14 rounded-xl bg-gradient-to-r from-terracotta-500 to-terracotta-600 text-white font-semibold hover:from-terracotta-600 hover:to-terracotta-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
                >
                  <Send size={20} />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </div>
            </div>
            </div>
          </div>
        </div>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes message-appear {
          from {
            opacity: 0;
            transform: translateY(15px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }

        .animate-message-appear {
          animation: message-appear 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}

export default SupportPage;
