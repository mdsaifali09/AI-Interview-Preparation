import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { generateInterviewQuestion, evaluateInterviewAnswer,} from "../services/interviewService";
import {
  saveInterview,
}
from "../services/interviewHistoryService";


import SpeechRecognition, {useSpeechRecognition,} from "react-speech-recognition";

function MockInterview() {
// const [question, setQuestion] = useState("");
// const [loading, setLoading] = useState(false);
// const [evaluating, setEvaluating] = useState(false);
// const [evaluation, setEvaluation] = useState(null);


  const [category, setCategory] = useState("Java");

   const [difficulty, setDifficulty] = useState("Medium");

//   const [started, setStarted] = useState(false);
//   const [answer, setAnswer] = useState("");



const [started, setStarted] = useState(false);
const [question, setQuestion] = useState("");
const [answer, setAnswer] = useState("");

const [loading, setLoading] = useState(false);
const [evaluating, setEvaluating] = useState(false);
const [evaluation, setEvaluation] = useState(null);

const TOTAL_QUESTIONS = 5;

const [currentQuestion, setCurrentQuestion] = useState(1);
const [interviewResults, setInterviewResults] = useState([]);
const [showFinalResult, setShowFinalResult] = useState(false);
const [generatingNext, setGeneratingNext] = useState(false);
const [voiceEnabled, setVoiceEnabled] = useState(true);
const [isSpeaking, setIsSpeaking] = useState(false);

const [wordsPerMinute, setWordsPerMinute] = useState(0);

const [confidence, setConfidence] = useState(0);

const [fluency, setFluency] = useState("Good");

const QUESTION_TIME = 120;

const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);


const {
  transcript,
  listening,
  resetTranscript,
  browserSupportsSpeechRecognition,
} = useSpeechRecognition();



useEffect(() => {
  setAnswer(transcript);
}, [transcript]);


useEffect(() => {

  return () => {

    speechSynthesis.cancel();

  };

}, []);


useEffect(() => {

  if(question){

    speakQuestion(question);

  }

}, [question]);


{/*useEffect(() => {

  setTimeLeft(QUESTION_TIME);

}, [question]);*/}





useEffect(() => {

  if (!question) return;

  if (timeLeft <= 0) {

  stopListening();

  alert("⏰ Time is over! Please submit your answer.");

  return;

}

  const timer = setInterval(() => {

    setTimeLeft((prev) => prev - 1);

  }, 1000);

  return () => clearInterval(timer);

}, [timeLeft, question]);


    
  const handleStartInterview = async () => {
  try {
    setLoading(true);

    const data = await generateInterviewQuestion(
      category,
      difficulty
    );

    setQuestion(data.question);
   {/* speakQuestion(data.question);*/}
    setStarted(true);

  } catch (error) {
    console.error(error);
    alert("Unable to generate interview question.");
  } finally {
    setLoading(false);
  }
};

  
const handleSubmitAnswer = async () => {
  calculateAnalytics();

  if (!answer.trim()) {
    alert("Please write your answer first.");
    return;
  }

  try {
    setEvaluating(true);

    const data = await evaluateInterviewAnswer({
      category,
      difficulty,
      question,
      answer,
    });

    const result = data.evaluation;

    setEvaluation(result);

    setInterviewResults((prev) => [
      ...prev,
      {
        questionNumber: currentQuestion,
        question,
        answer,
        evaluation: result,
      },
    ]);

  } catch (error) {
    console.error("Evaluation Error:", error);

    alert(
      error.response?.data?.message ||
      "Unable to evaluate answer."
    );
  } finally {
    setEvaluating(false);
  }
};



const handleNextQuestion = async () => {
  try {
    setGeneratingNext(true);

    setEvaluation(null);
    setAnswer("");

    const data = await generateInterviewQuestion(
      category,
      difficulty
    );

    setQuestion(data.question);
    {/*speakQuestion(data.question);*/}

    setCurrentQuestion((prev) => prev + 1);

  } catch (error) {
    console.error(
      "Next Question Error:",
      error
    );

    alert(
      error.response?.data?.message ||
      "Unable to generate next question."
    );
  } finally {
    setGeneratingNext(false);
  }
};

const overallScore =
  interviewResults.length > 0
    ? Math.round(
        interviewResults.reduce(
          (total, item) =>
            total + Number(item.evaluation.overallScore),
          0
        ) / interviewResults.length
      )
    : 0;



    const handleFinishInterview = async () => {
  try {
    await saveInterview({
      category,
      difficulty,
      overallScore,
      interviews: interviewResults,
    });

    setShowFinalResult(true);

  } catch (error) {
    console.log(error);
    alert("Unable to save interview history.");
  }
};



const startListening = () => {

  resetTranscript();

  SpeechRecognition.startListening({

    continuous: true,

    language: "en-US",

  });

};

const stopListening = () => {

  SpeechRecognition.stopListening();

};



const speakQuestion = (text) => {

  if (!voiceEnabled || !text) return;

  speechSynthesis.cancel();

  const speech = new SpeechSynthesisUtterance(text);

  speech.lang = "en-US";
  speech.rate = 0.95;
  speech.pitch = 1;
  speech.volume = 1;

  speech.onstart = () => {

    setIsSpeaking(true);

  };

  speech.onend = () => {

    setIsSpeaking(false);

    startListening();

  };

  speechSynthesis.speak(speech);

};



const formatTime = (seconds) => {

  const minutes = Math.floor(seconds / 60);

  const sec = seconds % 60;

  return `${minutes}:${sec.toString().padStart(2, "0")}`;

};



const calculateAnalytics = () => {

  const words = answer
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  const totalWords = words.length;

  const timeSpent = QUESTION_TIME - timeLeft;

  if (timeSpent <= 0) return;

  const minutes = timeSpent / 60;

  const wpm = Math.round(totalWords / minutes);

  setWordsPerMinute(wpm);

  let score = 60;

  if (totalWords > 50) score += 10;

  if (totalWords > 100) score += 10;

  if (wpm >= 100 && wpm <= 160) score += 10;

  if (answer.length > 200) score += 10;

  score = Math.min(score, 100);

  setConfidence(score);

  if (score >= 90) {

    setFluency("Excellent");

  } else if (score >= 75) {

    setFluency("Very Good");

  } else if (score >= 60) {

    setFluency("Good");

  } else {

    setFluency("Needs Improvement");

  }

};




  return (
    <div className="flex h-screen bg-slate-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-auto">

        {/* Navbar */}
        <Navbar />

        <main className="p-5 md:p-8">

          {/* Header */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 p-8 md:p-10 text-white shadow-xl">

            <div className="relative z-10">

              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-2xl">
                  🎤
                </div>

                <span className="bg-white/15 px-4 py-2 rounded-full text-sm font-medium">
                  AI Powered
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold">
                AI Mock Interview
              </h1>

              <p className="mt-3 max-w-2xl text-blue-100 text-base md:text-lg">
                Practice real interview questions and get AI-powered feedback
                on your technical knowledge, communication and grammar.
              </p>

            </div>

            {/* Decorative circles */}
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
            <div className="absolute right-20 -bottom-20 h-52 w-52 rounded-full bg-white/10" />

          </div>

          {/* Interview Setup */}
          {!started && (
            <div className="mt-8 grid lg:grid-cols-3 gap-6">

              {/* Left Setup */}
              <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-8">

                <div className="mb-7">

                 <h2 className="mt-6 text-xl md:text-2xl font-bold text-slate-800 leading-relaxed">
  {question || "AI is preparing your question..."}
</h2>

                  <p className="mt-2 text-slate-500">
                    Choose your preferred interview category and difficulty.
                  </p>

                </div>

                <div className="grid md:grid-cols-2 gap-6">

                  {/* Category */}
                  <div>

                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Interview Category
                    </label>

                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl px-4 py-3.5 outline-none bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    >
                      <option value="Java">Java</option>
                      <option value="MERN">MERN Stack</option>
                      <option value="React">React.js</option>
                      <option value="Node">Node.js</option>
                      <option value="DBMS">DBMS</option>
                      <option value="OS">Operating System</option>
                      <option value="CN">Computer Networks</option>
                      <option value="DSA">DSA</option>
                    </select>

                  </div>

                  {/* Difficulty */}
                  <div>

                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Difficulty Level
                    </label>

                    <select
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl px-4 py-3.5 outline-none bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>

                  </div>

                </div>

                {/* Start Button */}
               <button
  type="button"
  onClick={handleStartInterview}
  disabled={loading}
  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-60 text-white px-8 mt-4 py-3.5 rounded-xl font-semibold shadow-lg"
>
  {loading ? "🤖 Generating..." : " Start Mock Interview"}
</button>

              </div>



              {showFinalResult && (

  <div className="mt-8 bg-white rounded-3xl shadow-xl p-6 md:p-8">

    <div className="text-center mb-8">

      <div className="text-5xl mb-4">
        🏆
      </div>

      <h2 className="text-3xl font-bold text-slate-800">
        Interview Completed!
      </h2>

      <p className="text-slate-500 mt-2">
        Here is your complete AI interview performance.
      </p>

    </div>


    {/* Question Results */}

    <div className="space-y-4">

      {interviewResults.map((item) => (

        <div
          key={item.questionNumber}
          className="border border-slate-200 rounded-2xl p-5"
        >

          <div className="flex justify-between items-center gap-4">

            <h3 className="font-bold text-slate-800">
              Question {item.questionNumber}
            </h3>

            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
              {item.evaluation.overallScore}/100
            </span>

          </div>

          <p className="mt-3 text-slate-600">
            {item.question}
          </p>

        </div>

      ))}

    </div>


    {/* Overall Score */}

    <div className="mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white text-center">

      <p className="text-indigo-100">
        Overall Interview Score
      </p>

      <h3 className="text-6xl font-bold mt-3">

        {interviewResults.length
          ? Math.round(
              interviewResults.reduce(
                (total, item) =>
                  total +
                  Number(
                    item.evaluation.overallScore
                  ),
                0
              ) /
              interviewResults.length
            )
          : 0}

        <span className="text-2xl">
          /100
        </span>

      </h3>

    </div>


    {/* Restart */}

    <div className="flex justify-center mt-8">

      <button
        onClick={() => {
          setStarted(false);
          setShowFinalResult(false);
          setCurrentQuestion(1);
          setInterviewResults([]);
          setEvaluation(null);
          setQuestion("");
          setAnswer("");
        }}
        className="bg-slate-900 hover:bg-slate-800 text-white px-7 py-3 rounded-xl font-semibold"
      >
        🔄 Start New Interview
      </button>

    </div>

  </div>

)}

              {/* Right Info */}
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">

                <h3 className="text-xl font-bold text-slate-800">
                  How it works
                </h3>

                <div className="mt-6 space-y-5">

                  <div className="flex gap-4">

                    <div className="h-10 w-10 shrink-0 rounded-xl bg-indigo-100 flex items-center justify-center">
                      🎯
                    </div>

                    <div>
                      <h4 className="font-semibold text-slate-800">
                        Select Topic
                      </h4>

                      <p className="text-sm text-slate-500 mt-1">
                        Choose your interview category and difficulty.
                      </p>
                    </div>

                  </div>

                  <div className="flex gap-4">

                    <div className="h-10 w-10 shrink-0 rounded-xl bg-blue-100 flex items-center justify-center">
                      🤖
                    </div>

                    <div>
                      <h4 className="font-semibold text-slate-800">
                        AI Asks Questions
                      </h4>

                      <p className="text-sm text-slate-500 mt-1">
                        Gemini AI will generate interview questions.
                      </p>
                    </div>

                  </div>

                  <div className="flex gap-4">

                    <div className="h-10 w-10 shrink-0 rounded-xl bg-purple-100 flex items-center justify-center">
                      📊
                    </div>

                    <div>
                      <h4 className="font-semibold text-slate-800">
                        Get Evaluation
                      </h4>

                      <p className="text-sm text-slate-500 mt-1">
                        Receive scores and detailed feedback.
                      </p>
                    </div>

                  </div>

                </div>

              </div>

            </div>
          )}

          {/* Interview Screen */}
          {started && (
            <div className="mt-8">

              {/* Top Status */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                <div>

                  <p className="text-sm text-slate-500">
                    Current Interview
                  </p>

                  <h2 className="text-xl font-bold text-slate-800 mt-1">
                    {category} Interview
                  </h2>

                </div>

                <div className="flex items-center gap-3">

                  <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
                    {difficulty}
                  </span>

                  <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                    Question 1
                  </span>

                </div>

              </div>

          

          <div className="mb-6">

  <div className="flex justify-between items-center mb-2">

    <p className="text-sm font-semibold text-slate-600">
      Question {currentQuestion} of {TOTAL_QUESTIONS}
    </p>

    <p className="text-sm font-semibold text-indigo-600">
      {Math.round(
        (currentQuestion / TOTAL_QUESTIONS) * 100
      )}%
    </p>

  </div>

  <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">

    <div
      className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-500"
      style={{
        width: `${
          (currentQuestion / TOTAL_QUESTIONS) * 100
        }%`,
      }}
    />

  </div>

</div>
          

          <button
  onClick={() => setVoiceEnabled(!voiceEnabled)}
  className="bg-slate-700 text-white px-4 py-2 rounded-xl"
>

  {voiceEnabled ? "🔊 Voice ON" : "🔇 Voice OFF"}

</button>



<div className="flex justify-between items-center mb-6">

  <h2 className="text-2xl font-bold">

    Question {currentQuestion} / {TOTAL_QUESTIONS}

  </h2>

  <div
    className={`font-bold text-xl ${
      timeLeft <= 30
        ? "text-red-600"
        : "text-green-600"
    }`}
  >

    ⏱️ {formatTime(timeLeft)}

  </div>

</div>


{/*<div className="w-full bg-gray-200 rounded-full h-3 mb-8">

  <div

    className="bg-indigo-600 h-3 rounded-full transition-all"

    style={{

      width: `${(currentQuestion / TOTAL_QUESTIONS) * 100}%`

    }}

  />

</div>/*}

              {/* Question Card */}
              <div className="mt-6 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8">

                <div className="flex items-center gap-3">

                  <div className="h-11 w-11 rounded-xl bg-indigo-100 flex items-center justify-center text-xl">
                    💡
                  </div>

                  <div>
                    <p className="text-sm text-indigo-600 font-semibold">
                      Interview Question
                    </p>

                    <p className="text-xs text-slate-400">
                      Question 1 of 5
                    </p>
                  </div>

                </div>

                <h2 className="mt-6 text-xl md:text-2xl font-bold text-slate-800 leading-relaxed">
                  {question}
                </h2>

                {/* Answer */}
                <div className="mt-8">

                  <div className="flex justify-between items-center mb-3">

                    <label className="font-semibold text-slate-700">
                      Your Answer
                    </label>

                    <span className="text-xs text-slate-400">
                      {answer.length} characters
                    </span>

                  </div>

                

                <div className="mb-4">

  {isSpeaking && (

    <div className="text-blue-600 font-semibold">

      🔊 AI is speaking...

    </div>

  )}

  {listening && (

    <div className="text-green-600 font-semibold">

      🎤 Listening...

    </div>

  )}

</div>





                  <textarea
                    value={transcript}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Type your answer here..."
                    rows={8}
                    className="w-full border border-slate-300 rounded-2xl p-5 resize-none outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-slate-700 leading-7"
                  />

                </div>


             
             <textarea
  value={answer}
  onChange={(e) => setAnswer(e.target.value)}
  className="w-full h-48 border rounded-xl p-4"
/>


<div className="mt-8 bg-white rounded-2xl shadow-lg p-6">

  <h2 className="text-2xl font-bold mb-5">

    🎤 Speaking Analytics

  </h2>

  <div className="grid md:grid-cols-4 gap-5">

    <div>

      <h3 className="text-gray-500">

        Words

      </h3>

      <p className="text-3xl font-bold">

        {answer.trim()
          ? answer.trim().split(/\s+/).length
          : 0}

      </p>

    </div>

    <div>

      <h3 className="text-gray-500">

        WPM

      </h3>

      <p className="text-3xl font-bold text-blue-600">

        {wordsPerMinute}

      </p>

    </div>

    <div>

      <h3 className="text-gray-500">

        Confidence

      </h3>

      <p className="text-3xl font-bold text-green-600">

        {confidence}%

      </p>

    </div>

    <div>

      <h3 className="text-gray-500">

        Fluency

      </h3>

      <p className="text-xl font-bold text-indigo-600">

        {fluency}

      </p>

    </div>

  </div>

</div>


<div className="mt-5">

  <div className="w-full bg-gray-200 rounded-full h-4">

    <div

      className="bg-green-500 h-4 rounded-full transition-all"

      style={{

        width: `${confidence}%`

      }}

    />

  </div>

</div>

<div className="flex gap-4 mt-5">

  <button
  onClick={startListening}
  disabled={isSpeaking}
  className="bg-green-600 text-white px-5 py-3 rounded-xl disabled:opacity-50"
>
  🎤 Start Recording
</button>

  <button
  onClick={stopListening}
  disabled={!listening}
  className="bg-red-600 text-white px-5 py-3 rounded-xl disabled:opacity-50"
>
  🛑 Stop Recording
</button>

</div>





                {/* Buttons */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">

                 <button
  onClick={handleSubmitAnswer}
  disabled={evaluating}
  className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white px-7 py-3.5 rounded-xl font-semibold transition"
>


  
  {evaluating
    ? "🤖 AI Evaluating..."
    : "Submit Answer →"}
</button>

                  <button
                    onClick={() => {
                      setStarted(false);
                      setAnswer("");
                    }}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-7 py-3.5 rounded-xl font-semibold transition"
                  >
                    Exit Interview
                  </button>

                </div>

              </div>

              {/* Evaluation Preview */}
              <div className="mt-6 grid md:grid-cols-3 gap-5">

                <div className="bg-white border border-slate-200 rounded-2xl p-5">

                  <p className="text-sm text-slate-500">
                    Technical Score
                  </p>

                  <p className="text-3xl font-bold text-slate-300 mt-2">
                    --
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    AI evaluation pending
                  </p>

                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-5">

                  <p className="text-sm text-slate-500">
                    Communication
                  </p>

                  <p className="text-3xl font-bold text-slate-300 mt-2">
                    --
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    AI evaluation pending
                  </p>

                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-5">

                  <p className="text-sm text-slate-500">
                    Grammar
                  </p>

                  <p className="text-3xl font-bold text-slate-300 mt-2">
                    --
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    AI evaluation pending
                  </p>

                </div>

                {evaluation && (
  <div className="mt-8 space-y-6">

    {/* Overall Score */}
    <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 rounded-3xl p-8 text-white shadow-xl">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

        <div>
          <p className="text-blue-100">
            AI Interview Evaluation
          </p>

          <h2 className="text-3xl font-bold mt-2">
            Your Overall Score
          </h2>

          <p className="text-blue-100 mt-2">
            Keep practicing to improve your interview performance.
          </p>
        </div>

        <div className="h-28 w-28 rounded-full bg-white/15 border-4 border-white/40 flex items-center justify-center">

          <div className="text-center">

            <p className="text-4xl font-bold">
              {evaluation.overallScore}
            </p>

            <p className="text-xs text-blue-100">
              / 100
            </p>

          </div>

        </div>

      </div>

    </div>


    {evaluation && !showFinalResult && (

  <div className="mt-6 flex justify-end">

    {currentQuestion < TOTAL_QUESTIONS ? (

      <button
        onClick={handleNextQuestion}
        disabled={generatingNext}
        className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white px-7 py-3 rounded-xl font-semibold transition"
      >
        {generatingNext
          ? "🤖 Generating..."
          : "Next Question →"}
      </button>

    ) : (

      <button
        onClick={handleFinishInterview}
        className="bg-green-600 hover:bg-green-700 text-white px-7 py-3 rounded-xl font-semibold transition"
      >
        🏆 Finish Interview
      </button>

    )}

  </div>

)}


    {/* Score Cards */}
    <div className="grid md:grid-cols-4 gap-5">

      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

        <p className="text-sm text-slate-500">
          Technical
        </p>

        <p className="text-3xl font-bold text-indigo-600 mt-2">
          {evaluation.technicalScore}
        </p>

        <p className="text-xs text-slate-400 mt-1">
          / 100
        </p>

      </div>


      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

        <p className="text-sm text-slate-500">
          Communication
        </p>

        <p className="text-3xl font-bold text-blue-600 mt-2">
          {evaluation.communicationScore}
        </p>

        <p className="text-xs text-slate-400 mt-1">
          / 100
        </p>

      </div>


      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

        <p className="text-sm text-slate-500">
          Grammar
        </p>

        <p className="text-3xl font-bold text-purple-600 mt-2">
          {evaluation.grammarScore}
        </p>

        <p className="text-xs text-slate-400 mt-1">
          / 100
        </p>

      </div>


      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

        <p className="text-sm text-slate-500">
          Relevance
        </p>

        <p className="text-3xl font-bold text-green-600 mt-2">
          {evaluation.relevanceScore}
        </p>

        <p className="text-xs text-slate-400 mt-1">
          / 100
        </p>

      </div>

    </div>


    {/* Feedback */}
    <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">

      <h3 className="text-xl font-bold text-slate-800">
        🤖 AI Feedback
      </h3>

      <p className="mt-4 text-slate-600 leading-7">
        {evaluation.feedback}
      </p>

    </div>


    {/* Strengths & Improvements */}
    <div className="grid md:grid-cols-2 gap-6">

      {/* Strengths */}
      <div className="bg-white border border-green-200 rounded-3xl p-6 shadow-sm">

        <h3 className="text-xl font-bold text-green-700">
          ✅ Your Strengths
        </h3>

        <div className="mt-5 space-y-3">

          {evaluation.strengths?.map(
            (strength, index) => (

              <div
                key={index}
                className="flex gap-3 bg-green-50 rounded-xl p-4"
              >

                <span className="text-green-600">
                  ✓
                </span>

                <p className="text-slate-700">
                  {strength}
                </p>

              </div>

            )
          )}

        </div>

      </div>


      {/* Improvements */}
      <div className="bg-white border border-orange-200 rounded-3xl p-6 shadow-sm">

        <h3 className="text-xl font-bold text-orange-700">
          🎯 Areas to Improve
        </h3>

        <div className="mt-5 space-y-3">

          {evaluation.improvements?.map(
            (improvement, index) => (

              <div
                key={index}
                className="flex gap-3 bg-orange-50 rounded-xl p-4"
              >

                <span className="text-orange-600">
                  →
                </span>

                <p className="text-slate-700">
                  {improvement}
                </p>

              </div>

            )
          )}

        </div>

      </div>

    </div>

  </div>
)}

              </div>

            </div>
          )}

        </main>

      </div>

    </div>
  );
}

export default MockInterview;