import {
Mic,
MicOff,
Sparkles,
Volume2,
MessageCircle,
Bot,
ShieldCheck,
Waves,
User,
Square,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";

function TalkWithAI() {
const [isListening, setIsListening] = useState(false);
const [isSpeaking, setIsSpeaking] = useState(false);
const [transcript, setTranscript] = useState("");
const [messages, setMessages] = useState([]);
const [isLoading, setIsLoading] = useState(false);

const recognitionRef = useRef(null);

// =====================================================
// AI CHAT API
// =====================================================

const askAI = async (text) => {
try {
setIsLoading(true);


  const response = await fetch(
    "https://ai-interview-preparation-qg9x.onrender.com/api/ai-chat",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },

      body: JSON.stringify({
        message: text,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "AI request failed"
    );
  }

  const aiReply =
    data.reply ||
    data.message ||
    data.response ||
    data.answer ||
    "Sorry, I could not generate a response.";

  // Add AI message
  setMessages((prev) => [
    ...prev,
    {
      role: "ai",
      text: aiReply,
    },
  ]);

  // Speak AI response
  speakAI(aiReply);

} catch (error) {
  console.error("AI CHAT ERROR:", error);

  setMessages((prev) => [
    ...prev,
    {
      role: "ai",
      text:
        "Sorry, I couldn't connect to the AI right now. Please try again.",
    },
  ]);
} finally {
  setIsLoading(false);
}


};

// =====================================================
// AI VOICE OUTPUT
// =====================================================

const speakAI = (text) => {
if (!window.speechSynthesis) {
console.log(
"Speech synthesis is not supported."
);
return;
}


window.speechSynthesis.cancel();

const speech =
  new SpeechSynthesisUtterance(text);

// Indian English works well for English/Hinglish.
speech.lang = "en-IN";
speech.rate = 1;
speech.pitch = 1;
speech.volume = 1;

speech.onstart = () => {
  setIsSpeaking(true);
};

speech.onend = () => {
  setIsSpeaking(false);
};

speech.onerror = () => {
  setIsSpeaking(false);
};

window.speechSynthesis.speak(speech);


};

// =====================================================
// STOP AI VOICE
// =====================================================

const stopSpeaking = () => {
if (window.speechSynthesis) {
window.speechSynthesis.cancel();
}


setIsSpeaking(false);


};

// =====================================================
// MICROPHONE
// =====================================================

const handleMic = () => {
const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;


if (!SpeechRecognition) {
  alert(
    "Speech recognition is not supported in this browser. Please use Google Chrome or Microsoft Edge."
  );

  return;
}

// Stop listening
if (isListening) {
  recognitionRef.current?.stop();

  setIsListening(false);

  return;
}

// Stop previous AI speech
stopSpeaking();

const recognition =
  new SpeechRecognition();

recognition.continuous = false;
recognition.interimResults = false;

// English + Indian accent.
// Browser can still understand Hinglish reasonably well.
recognition.lang = "en-IN";

recognition.onstart = () => {
  setIsListening(true);
  setTranscript("");
};

recognition.onresult = async (event) => {
  const text =
    event.results[0][0].transcript;

  if (!text.trim()) return;

  setTranscript(text);

  // Add user message
  setMessages((prev) => [
    ...prev,
    {
      role: "user",
      text,
    },
  ]);

  console.log("User said:", text);

  await askAI(text);
};

recognition.onerror = (event) => {
  console.log(
    "Speech recognition error:",
    event.error
  );

  setIsListening(false);
};

recognition.onend = () => {
  setIsListening(false);
};

recognitionRef.current = recognition;

recognition.start();


};

// =====================================================
// CLEANUP
// =====================================================

useEffect(() => {
return () => {
recognitionRef.current?.stop();


  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
};


}, []);

return ( <div className="min-h-screen bg-slate-50 text-slate-900">


  {/* ================================================= */}
  {/* HEADER */}
  {/* ================================================= */}

  <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">

    <div className="flex min-h-[72px] items-center justify-between px-4 sm:px-6 lg:px-8">

      {/* Brand */}

      <div className="flex items-center gap-3">

        <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 shadow-lg shadow-indigo-200">

          <Sparkles
            size={21}
            className="text-white"
          />

          <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-emerald-400" />

        </div>

        <div>

          <h1 className="text-lg font-bold tracking-tight sm:text-xl">
            Talk with AI
          </h1>

          <p className="hidden text-xs text-slate-500 sm:block">
            Your intelligent voice assistant
          </p>

        </div>

      </div>

      {/* Status */}

      <div
        className={`flex items-center gap-2 rounded-full border px-3 py-1.5 ${
          isListening
            ? "border-red-200 bg-red-50"
            : isSpeaking
            ? "border-indigo-200 bg-indigo-50"
            : "border-emerald-200 bg-emerald-50"
        }`}
      >

        <span
          className={`h-2 w-2 rounded-full ${
            isListening
              ? "animate-pulse bg-red-500"
              : isSpeaking
              ? "animate-pulse bg-indigo-500"
              : "bg-emerald-500"
          }`}
        />

        <span
          className={`text-xs font-semibold ${
            isListening
              ? "text-red-700"
              : isSpeaking
              ? "text-indigo-700"
              : "text-emerald-700"
          }`}
        >
          {isListening
            ? "Listening"
            : isSpeaking
            ? "Speaking"
            : "AI Online"}
        </span>

      </div>

    </div>

  </header>

  {/* ================================================= */}
  {/* MAIN */}
  {/* ================================================= */}

  <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">

    {/* Intro */}

    <div className="mb-7 text-center sm:mb-9">

      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2">

        <Waves
          size={15}
          className="text-indigo-600"
        />

        <span className="text-xs font-semibold text-indigo-700">
          Real-time AI Conversation
        </span>

      </div>

      <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">

        Speak naturally.

        <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
          Get intelligent answers.
        </span>

      </h2>

      <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
        Talk to your AI assistant about interviews,
        coding, careers, technology, or anything
        you want to learn.
      </p>

    </div>

    {/* ================================================= */}
    {/* AI CARD */}
    {/* ================================================= */}

    <div className="mx-auto max-w-5xl overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-2xl shadow-slate-200/70">

      {/* AI EXPERIENCE */}

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 px-5 py-12 sm:px-8 sm:py-16">

        {/* Background Glow */}

        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />

        {/* Badge */}

        <div className="relative mx-auto mb-8 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur-md">

          <Bot
            size={16}
            className="text-indigo-300"
          />

          <span className="text-xs font-semibold text-white/80">
            AI Voice Assistant
          </span>

        </div>

        {/* Avatar */}

        <div className="relative mx-auto flex h-44 w-44 items-center justify-center">

          {/* Listening ring */}

          <div
            className={`absolute inset-0 rounded-full border transition-all duration-700 ${
              isListening
                ? "scale-125 border-indigo-400/50 animate-pulse"
                : isSpeaking
                ? "scale-110 border-purple-400/40 animate-pulse"
                : "border-white/10"
            }`}
          />

          {/* Outer ring */}

          <div
            className={`absolute -inset-4 rounded-full border transition-all duration-700 ${
              isListening || isSpeaking
                ? "scale-110 border-purple-400/30 animate-pulse"
                : "border-white/5"
            }`}
          />

          {/* Glow */}

          <div
            className={`absolute inset-6 rounded-full bg-indigo-500/30 blur-3xl ${
              isListening || isSpeaking
                ? "animate-pulse"
                : ""
            }`}
          />

          {/* Avatar */}

          <div
            className={`relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-fuchsia-500 shadow-2xl shadow-indigo-500/40 transition-all duration-500 ${
              isListening || isSpeaking
                ? "scale-110"
                : ""
            }`}
          >

            <Sparkles
              size={50}
              strokeWidth={1.7}
              className="text-white"
            />

          </div>

        </div>

        {/* Status */}

        <div className="relative mt-8 text-center">

          <h3 className="text-2xl font-bold text-white sm:text-3xl">

            {isListening
              ? "I'm listening..."
              : isSpeaking
              ? "I'm speaking..."
              : isLoading
              ? "Thinking..."
              : "Hi, I'm your AI Assistant"}

          </h3>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-300">

            {isListening
              ? "Speak naturally. I'm ready to understand you."
              : isSpeaking
              ? "Listen to my response."
              : isLoading
              ? "I'm preparing the best answer for you."
              : "Press the microphone and start a conversation with me."}

          </p>

        </div>

        {/* Mic */}

        <div className="relative mt-10 flex flex-col items-center">

          <button
            type="button"
            onClick={handleMic}
            disabled={isLoading}
            className={`group relative flex h-20 w-20 items-center justify-center rounded-full transition-all duration-300 ${
              isListening
                ? "scale-110 bg-red-500 text-white shadow-2xl shadow-red-500/40"
                : isLoading
                ? "cursor-not-allowed bg-slate-400 text-white"
                : "bg-white text-indigo-700 shadow-2xl shadow-white/20 hover:scale-110 hover:bg-indigo-50"
            }`}
            aria-label={
              isListening
                ? "Stop listening"
                : "Start talking"
            }
          >

            {isListening && (
              <span className="absolute inset-0 animate-ping rounded-full bg-red-400/40" />
            )}

            <span className="relative">

              {isListening ? (
                <MicOff size={30} />
              ) : (
                <Mic size={30} />
              )}

            </span>

          </button>

          <p className="mt-4 text-xs font-medium text-slate-400">

            {isListening
              ? "Tap to stop"
              : isLoading
              ? "AI is thinking..."
              : "Tap microphone to speak"}

          </p>

        </div>

        {/* Stop Speaking */}

        {isSpeaking && (
          <button
            type="button"
            onClick={stopSpeaking}
            className="relative mx-auto mt-5 flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
          >
            <Square size={13} fill="currentColor" />
            Stop AI Voice
          </button>
        )}

        {/* Feature Pills */}

        <div className="relative mt-10 flex flex-wrap justify-center gap-2">

          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300">
            🎙 Voice Input
          </span>

          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300">
            ⚡ Fast Response
          </span>

          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300">
            🌎 Multiple Languages
          </span>

          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300">
            🔊 Voice Reply
          </span>

        </div>

      </section>

      {/* ================================================= */}
      {/* CONVERSATION */}
      {/* ================================================= */}

      <section className="p-5 sm:p-7">

        <div className="mb-5 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <MessageCircle size={19} />
            </div>

            <div>

              <h3 className="text-sm font-bold text-slate-900">
                Conversation
              </h3>

              <p className="text-xs text-slate-500">
                Your AI conversation
              </p>

            </div>

          </div>

          <div className="hidden items-center gap-1.5 text-xs text-slate-400 sm:flex">
            <ShieldCheck size={15} />
            Private & Secure
          </div>

        </div>

        {/* Conversation */}

        {messages.length === 0 ? (

          <div className="flex min-h-[180px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 text-center">

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
              <Volume2
                size={22}
                className="text-slate-400"
              />
            </div>

            <p className="mt-4 text-sm font-medium text-slate-600">
              No conversation yet
            </p>

            <p className="mt-1 max-w-sm text-xs leading-5 text-slate-400">
              Tap the microphone and start talking
              with your AI assistant.
            </p>

          </div>

        ) : (

          <div className="max-h-[430px] space-y-4 overflow-y-auto rounded-2xl bg-slate-50 p-4 sm:p-5">

            {messages.map((message, index) => (

              <div
                key={index}
                className={`flex gap-3 ${
                  message.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                {/* AI Avatar */}

                {message.role === "ai" && (

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-md">
                    <Bot size={17} />
                  </div>

                )}

                {/* Message */}

                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${
                    message.role === "user"
                      ? "rounded-br-md bg-indigo-600 text-white"
                      : "rounded-bl-md border border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  {message.text}
                </div>

                {/* User Avatar */}

                {message.role === "user" && (

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-600">
                    <User size={17} />
                  </div>

                )}

              </div>

            ))}

          </div>

        )}

        {/* Latest transcript */}

        {transcript && (
          <div className="mt-4 rounded-2xl border border-indigo-100 bg-indigo-50 p-4">

            <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-indigo-600">
              Latest voice input
            </p>

            <p className="text-sm leading-6 text-indigo-950">
              {transcript}
            </p>

          </div>
        )}

      </section>

    </div>

  </main>

</div>

);
}

export default TalkWithAI;
