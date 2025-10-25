import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

function SupportPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Hello! I'm CulturaBot. How can I help you today? Here are some common topics:",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickActions = [
    { id: 1, label: 'Track my order', query: 'I want to track my order' },
    { id: 2, label: 'Return an item', query: 'How do I return an item?' },
    { id: 3, label: 'Product information', query: 'Tell me about your products' },
    { id: 4, label: 'Payment issues', query: 'I have a payment issue' }
  ];

  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('track') || lowerMessage.includes('order')) {
      return "I can help you track your order! Please provide your order number (it starts with #), and I'll look it up for you.";
    } else if (lowerMessage.includes('return')) {
      return "Our return policy allows returns within 30 days of purchase. Items must be unused and in original packaging. Would you like me to start a return request for you?";
    } else if (lowerMessage.includes('product') || lowerMessage.includes('handcraft')) {
      return "We offer authentic handcrafted items from artisans around the world! Each product is unique and ethically sourced. What type of handcrafted item are you looking for?";
    } else if (lowerMessage.includes('payment')) {
      return "I'm here to help with payment issues. Could you describe the problem you're experiencing? Common issues include failed transactions, duplicate charges, or payment method updates.";
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! How can I assist you today?";
    } else if (lowerMessage.includes('buy') || lowerMessage.includes('purchase') || lowerMessage.includes('shop')) {
      return "Great! I can help you find the perfect handcrafted item. What are you interested in? We have pottery, textiles, jewelry, home decor, and more!";
    } else {
      return "I understand you're asking about: \"" + userMessage + "\". Let me help you with that! For more specific assistance, you can also speak with one of our agents.";
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing and response
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        text: getBotResponse(inputValue),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickAction = (query) => {
    setInputValue(query);
    handleSendMessage();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
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
            CulturaCart Support
          </h1>
          <p className="text-lg text-gray-600">
            We typically respond in under a minute
          </p>
        </div>

        {/* Chat Container */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border-2 border-sand-200 overflow-hidden">
            {/* Quick Actions - Show only at start */}
            {messages.length === 1 && (
              <div className="p-6 border-b border-sand-200">
                <div className="flex items-start gap-4 mb-6">
                  {/* Bot Avatar */}
                  <div className="w-12 h-12 rounded-full bg-terracotta-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🤖</span>
                  </div>

                  {/* Welcome Message */}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 mb-1">CulturaBot</p>
                    <div className="bg-sand-50 rounded-2xl rounded-tl-sm px-4 py-3">
                      <p className="text-gray-800">{messages[0].text}</p>
                    </div>
                  </div>
                </div>

                {/* Quick Action Buttons */}
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

            {/* Messages Area */}
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.slice(1).map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-4 ${
                    message.type === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'bot'
                      ? 'bg-terracotta-100'
                      : 'bg-sand-500'
                  }`}>
                    <span className="text-xl">
                      {message.type === 'bot' ? '🤖' : '👤'}
                    </span>
                  </div>

                  {/* Message Bubble */}
                  <div className={`flex-1 max-w-md ${message.type === 'user' ? 'flex justify-end' : ''}`}>
                    <div className={`rounded-2xl px-4 py-3 ${
                      message.type === 'bot'
                        ? 'bg-sand-50 rounded-tl-sm'
                        : 'bg-terracotta-500 text-gray-900 rounded-tr-sm'
                    }`}>
                      <p className={message.type === 'bot' ? 'text-gray-800' : 'text-gray-900'}>
                        {message.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-terracotta-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🤖</span>
                  </div>
                  <div className="bg-sand-50 rounded-2xl rounded-tl-sm px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
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
                    placeholder="Search for help on shipping, returns, or product authenticity..."
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

              {/* Speak with Agent */}
              <div className="flex justify-center">
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                  Speak with an Agent
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
