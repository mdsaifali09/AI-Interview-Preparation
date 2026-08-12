
import { useEffect, useRef, useState } from "react";
import { sendChatMessage } from "../services/aiChatService";

function AIChat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! 👋 I'm your AI Interview Assistant. Ask me anything about coding, DSA, MERN, interviews, resumes, or career preparation.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const handleSend = async () => {
    const message = input.trim();

    if (!message || loading) return;

    // Add user message immediately
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: message,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const result = await sendChatMessage(message);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            result?.reply ||
            "Sorry, I couldn't generate a response.",
        },
      ]);
    } catch (error) {
      console.log("AI CHAT ERROR:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "⚠️ Something went wrong while connecting to AI. Please try again.",
          error: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "Chat cleared. 👋 What would you like to learn today?",
      },
    ]);
  };

  const useSuggestion = (text) => {
    setInput(text);
  };

  const suggestions = [
    {
      icon: "💻",
      title: "Coding Help",
      text: "Explain React Hooks with an interview example",
    },
    {
      icon: "🧠",
      title: "DSA Practice",
      text: "Give me an important DSA interview question",
    },
    {
      icon: "🚀",
      title: "MERN Interview",
      text: "Give me 5 important MERN interview questions",
    },
    {
      icon: "📄",
      title: "Resume Help",
      text: "How can I improve my software developer resume?",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-50 flex flex-col">

      {/* ================= HEADER ================= */}

      <header className="sticky top-0 z-30 bg-white/85 backdrop-blur-xl border-b border-gray-200">

        <div className="max-w-7xl mx-auto px-5 md:px-8 py-4 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="relative">

              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 flex items-center justify-center text-2xl shadow-lg">
                🤖
              </div>

              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>

            </div>

            <div>

              <h1 className="text-lg md:text-xl font-bold text-gray-900">
                AI Interview Assistant
              </h1>

              <div className="flex items-center gap-2 mt-0.5">

                <span className="w-2 h-2 rounded-full bg-green-500"></span>

                <span className="text-xs text-gray-500">
                  Online • AI Powered
                </span>

              </div>

            </div>

          </div>


          <button
            onClick={clearChat}
            className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 text-sm font-semibold transition shadow-sm"
          >
            🗑️ <span className="hidden sm:inline">Clear Chat</span>
          </button>

        </div>

      </header>


      {/* ================= CHAT CONTENT ================= */}

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 md:px-6 py-8">

        {/* Welcome */}

        {messages.length === 1 && (

          <div className="text-center mb-10">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-semibold mb-5">
              ✨ AI Powered Learning Assistant
            </div>

            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900">
              What can I help you
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {" "}prepare for?
              </span>
            </h2>

            <p className="max-w-2xl mx-auto text-gray-500 mt-4 text-base md:text-lg">
              Get instant help with coding, DSA, MERN,
              technical interviews and career preparation.
            </p>

          </div>

        )}


        {/* ================= SUGGESTIONS ================= */}

        {messages.length === 1 && (

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">

            {suggestions.map((suggestion) => (

              <button
                key={suggestion.title}
                onClick={() =>
                  useSuggestion(suggestion.text)
                }
                className="group text-left bg-white border border-gray-200 rounded-2xl p-5 hover:border-indigo-300 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
              >

                <div className="flex items-start justify-between gap-4">

                  <div>

                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-xl mb-3">
                      {suggestion.icon}
                    </div>

                    <h3 className="font-bold text-gray-900">
                      {suggestion.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1 leading-5">
                      {suggestion.text}
                    </p>

                  </div>

                  <span className="text-gray-300 group-hover:text-indigo-600 text-xl transition">
                    →
                  </span>

                </div>

              </button>

            ))}

          </div>

        )}


        {/* ================= MESSAGES ================= */}

        <div className="space-y-6">

          {messages.map((message, index) => (

            <div
              key={index}
              className={`flex items-end gap-3 ${
                message.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              {/* AI Avatar */}

              {message.role === "assistant" && (

                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-md">
                  ✨
                </div>

              )}


              {/* Message */}

              <div
                className={`max-w-[88%] md:max-w-[75%] px-5 py-4 shadow-sm ${
                  message.role === "user"
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl rounded-br-md"
                    : message.error
                    ? "bg-red-50 border border-red-200 text-red-700 rounded-2xl rounded-bl-md"
                    : "bg-white border border-gray-100 text-gray-800 rounded-2xl rounded-bl-md"
                }`}
              >

                <p className="whitespace-pre-wrap leading-7 text-[15px]">
                  {message.content}
                </p>

              </div>


              {/* User Avatar */}

              {message.role === "user" && (

                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center shadow-md">
                  👤
                </div>

              )}

            </div>

          ))}


          {/* ================= AI LOADING ================= */}

          {loading && (

            <div className="flex items-end gap-3">

              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-md">
                ✨
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-md px-5 py-4 shadow-sm">

                <div className="flex items-center gap-1.5">

                  <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce"></span>

                  <span
                    className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-bounce"
                    style={{
                      animationDelay: "150ms",
                    }}
                  ></span>

                  <span
                    className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce"
                    style={{
                      animationDelay: "300ms",
                    }}
                  ></span>

                </div>

              </div>

            </div>

          )}

          <div ref={messagesEndRef}></div>

        </div>

      </main>


      {/* ================= INPUT ================= */}

      <div className="sticky bottom-0 z-20 bg-gradient-to-t from-[#f5f7fb] via-[#f5f7fb] to-transparent pt-5 pb-5">

        <div className="max-w-5xl mx-auto px-4 md:px-6">

          <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-2 flex items-end gap-2">

            <textarea
              value={input}
              onChange={(e) =>
                setInput(e.target.value)
              }
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about coding, interviews, DSA..."
              rows={1}
              className="flex-1 resize-none outline-none px-4 py-3 text-gray-700 placeholder-gray-400 max-h-32 bg-transparent"
            />

            <button
              onClick={handleSend}
              disabled={
                !input.trim() || loading
              }
              className="w-12 h-12 flex-shrink-0 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center shadow-md transition-all"
            >
              ➤
            </button>

          </div>

          <p className="text-center text-xs text-gray-400 mt-3">
            AI can make mistakes. Verify important information.
          </p>

        </div>

      </div>

    </div>
  );
}

export default AIChat;

