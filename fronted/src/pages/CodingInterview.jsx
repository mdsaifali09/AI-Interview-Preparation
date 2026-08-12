import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
//import { runCode } from "../services/codingService";
import { reviewCode } from "../services/codingReviewService";
import { generateCodingQuestion } from "../services/codingQuestionService";
import {submitCodingSolution,} from "../services/codingSubmissionService";
import { useLocation } from "react-router-dom";

function CodingInterview() {

  const [language, setLanguage] = useState("java");

  const [code, setCode] = useState("");

//const [output, setOutput] = useState("");
//const [running, setRunning] = useState(false);

const [review, setReview] = useState(null);
const [reviewLoading, setReviewLoading] = useState(false);

const [category, setCategory] = useState("Arrays");

const [difficulty, setDifficulty] = useState("Easy");

const [question, setQuestion] = useState(null);

const [loadingQuestion, setLoadingQuestion] = useState(false);
const [submitting, setSubmitting] = useState(false);

const [submissionResult, setSubmissionResult] = useState(null);




const location = useLocation();

useEffect(() => {

  if (location.state?.question) {

    setQuestion(location.state.question);

    if (

      location.state.question.starterCode?.[language]

    ) {

      setCode(

        location.state.question.starterCode[language]

      );

    }

  }

}, []);


useEffect(() => {

  if (
    question &&
    question.starterCode?.[language]
  ) {

    setCode(
      question.starterCode[language]
    );

  }

}, [language, question]);


const scoreColor = (score) => {
  if (score >= 90) return "text-green-600";
  if (score >= 70) return "text-yellow-500";
  return "text-red-500";
};








// const handleRun = async () => {

//   try {

//     setRunning(true);

//     const result =
// await runCode(
// language,
// code
// );

//    setOutput(result.output);

//   } catch (error) {

//     setOutput(
//   error.response?.data?.message || error.message
// );
//   }

//   setRunning(false);

// };


const handleReview = async () => {

  try {

    setReviewLoading(true);

    const result = await reviewCode(

question._id,

language,

code

)

    setReview(result.review);

  } catch {

    alert("Review Failed");

  }

  setReviewLoading(false);

};


const handleGenerateQuestion = async () => {

  try {

    setLoadingQuestion(true);

    const result = await generateCodingQuestion(
      category,
      difficulty
    );

    setQuestion(result.question);

    if (result.question.starterCode?.[language]) {

      setCode(
        result.question.starterCode[language]
      );

    } else {

      setCode("");

    }

  } catch (error) {

    console.log(error);

    alert("Question Generation Failed");

  }

  setLoadingQuestion(false);

};




const handleSubmit = async () => {

  try {

    setSubmitting(true);

    setSubmissionResult(null);

    const result =
      await submitCodingSolution(
        question?._id,
        language,
        code
      );

    setSubmissionResult({

      verdict:
        result.evaluation?.verdict ||
        result.submission?.verdict ||
        "Unknown",

      passed:
        result.submission?.passed || 0,

      total:
        result.submission?.total || 1,

      score:
        result.evaluation?.score ||
        result.submission?.score ||
        0,

      correctness:
        result.evaluation?.correctness || 0,

      timeComplexity:
        result.evaluation?.timeComplexity || "",

      spaceComplexity:
        result.evaluation?.spaceComplexity || "",

      feedback:
        result.evaluation?.feedback || "",

    });

  } catch (error) {

    console.log(
      "SUBMIT ERROR:",
      error
    );

    setSubmissionResult({

      verdict:
        error.response?.data?.message ||
        "Submission Failed",

      passed: 0,

      total: 1,

      score: 0,

    });

  } finally {

    setSubmitting(false);

  }

};



  return (

    <div className="p-8 bg-slate-100 min-h-screen">

      <h1 className="text-4xl font-bold mb-8">

        💻 AI Coding Interview

      </h1>


      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

<h2 className="text-2xl font-bold">

Generate Coding Question

</h2>

<div className="flex gap-4 mt-6">

<select

value={category}

onChange={(e)=>setCategory(e.target.value)}

className="border rounded-lg px-4 py-2"

>

<option>Arrays</option>

<option>Strings</option>

<option>Linked List</option>

<option>Stack</option>

<option>Queue</option>

<option>Tree</option>

<option>Graph</option>

<option>Dynamic Programming</option>

<option>Java</option>

<option>OOP</option>

</select>

<select

value={difficulty}

onChange={(e)=>setDifficulty(e.target.value)}

className="border rounded-lg px-4 py-2"

>

<option>Easy</option>

<option>Medium</option>

<option>Hard</option>

</select>

<button

onClick={handleGenerateQuestion}

className="bg-indigo-600 text-white px-6 rounded-lg"

>

{

loadingQuestion

?

"Generating..."

:

"Generate"

}

</button>

</div>

</div>

      <div className="bg-white rounded-2xl shadow-lg p-6">

        <h2 className="text-3xl font-bold">

{

question

?

question.title

:

"Generate a Coding Question"

}

</h2>

<p className="mt-4 text-gray-700 leading-8">

{

question

?

question.description

:

"No Question Generated"

}

</p>


{

question && (

<>

<div className="mt-6">

<h3 className="font-bold">

Example Input

</h3>

<div className="bg-slate-100 rounded-lg p-4 mt-2">

{

question.inputExample

}

</div>

</div>

<div className="mt-6">

<h3 className="font-bold">

Example Output

</h3>

<div className="bg-slate-100 rounded-lg p-4 mt-2">

{

question.outputExample

}

</div>

</div>

<div className="mt-6">

<h3 className="font-bold">

Constraints

</h3>

<div className="bg-slate-100 rounded-lg p-4 mt-2">

{

question.constraints

}


{/* Test Cases */}

<div className="mt-8">

  <h2 className="text-2xl font-bold mb-5">
    🧪 Test Cases
  </h2>

  {question.testCases &&
  question.testCases.filter(
    (test) => !test.hidden
  ).length > 0 ? (

    <div className="space-y-4">

      {question.testCases
        .filter((test) => !test.hidden)
        .map((test, index) => (

          <div
            key={index}
            className="border rounded-xl p-4 bg-slate-50"
          >

            <h3 className="font-semibold mb-3">
              Test Case {index + 1}
            </h3>

            <div className="grid md:grid-cols-2 gap-4">

              <div>

                <p className="text-sm text-gray-500 mb-1">
                  Input
                </p>

                <pre className="bg-gray-900 text-green-400 rounded-lg p-3 overflow-x-auto">
                  {test.input}
                </pre>

              </div>

              <div>

                <p className="text-sm text-gray-500 mb-1">
                  Expected Output
                </p>

                <pre className="bg-gray-900 text-blue-400 rounded-lg p-3 overflow-x-auto">
                  {test.expectedOutput}
                </pre>

              </div>

            </div>

          </div>

        ))}

    </div>

  ) : (

    <div className="bg-gray-100 rounded-xl p-4 text-gray-500">
      No visible test cases available.
    </div>

  )}

</div>



</div>

</div>


</>

)
}

        <select

          value={language}

          onChange={(e)=>setLanguage(e.target.value)}

          className="border rounded-lg px-4 py-2 mt-6"

        >

          <option value="java">

            Java

          </option>

          <option value="cpp">

            C++

          </option>

          <option value="python">

            Python

          </option>

          <option value="javascript">

            JavaScript

          </option>

        </select>

        <div className="mt-6">

          <Editor

            height="500px"

            language={language}

            theme="vs-dark"

            value={code}

            onChange={(value)=>setCode(value)}

          />

        </div>

    



{submissionResult && (

  <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">

    <h2 className="text-2xl font-bold mb-4">
      Submission Result
    </h2>

    <div className="grid md:grid-cols-3 gap-4">

      <div className="bg-green-50 rounded-xl p-4">
        <p className="text-gray-500">
          Verdict
        </p>

        <h3 className="text-xl font-bold text-green-600">
          {submissionResult.verdict}
        </h3>
      </div>

      <div className="bg-blue-50 rounded-xl p-4">
        <p className="text-gray-500">
          Passed
        </p>

        <h3 className="text-xl font-bold">
          {submissionResult.passed}
          {" / "}
          {submissionResult.total}
        </h3>
      </div>

      <div className="bg-purple-50 rounded-xl p-4">
        <p className="text-gray-500">
          Score
        </p>

        <h3 className="text-xl font-bold">
          {submissionResult.score}%
        </h3>
      </div>

    </div>

  </div>

)}






   {review && (

<div className="mt-8 bg-white rounded-2xl shadow-lg p-8">

<h2 className="text-3xl font-bold mb-8">

🤖 AI Code Review

</h2>

{/* Overall Score */}

<div className="flex justify-between items-center border-b pb-6">

<div>

<p className="text-gray-500">

Overall Score

</p>

<h1
className={`text-6xl font-bold ${scoreColor(review.overallScore)}`}
>

{review.overallScore}/100

</h1>

</div>

<div className="text-right">

<p>

Time Complexity

</p>

<h2 className="font-bold text-xl">

{review.timeComplexity}

</h2>

<p className="mt-4">

Space Complexity

</p>

<h2 className="font-bold text-xl">

{review.spaceComplexity}

</h2>

</div>

</div>

{/* Metrics */}

<div className="grid md:grid-cols-3 gap-6 mt-8">

<div className="bg-slate-100 rounded-xl p-6">

<h3 className="font-bold">

✅ Correctness

</h3>

<h1
className={`text-5xl mt-4 font-bold ${scoreColor(review.correctness)}`}
>

{review.correctness}

</h1>

</div>

<div className="bg-slate-100 rounded-xl p-6">

<h3 className="font-bold">

📖 Readability

</h3>

<h1
className={`text-5xl mt-4 font-bold ${scoreColor(review.readability)}`}
>

{review.readability}

</h1>

</div>

<div className="bg-slate-100 rounded-xl p-6">

<h3 className="font-bold">

⚡ Optimization

</h3>

<h1
className={`text-5xl mt-4 font-bold ${scoreColor(review.optimization)}`}
>

{review.optimization}

</h1>

</div>

</div>

{/* Strengths */}

<div className="mt-10">

<h2 className="text-2xl font-bold">

💪 Strengths

</h2>

<ul className="mt-4 space-y-3">

{review.strengths.map((item, index) => (

<li
key={index}
className="bg-green-50 border border-green-200 rounded-xl p-4"
>

✅ {item}

</li>

))}

</ul>

</div>

{/* Improvements */}

<div className="mt-10">

<h2 className="text-2xl font-bold">

🎯 Improvements

</h2>

<ul className="mt-4 space-y-3">

{review.improvements.map((item, index) => (

<li
key={index}
className="bg-red-50 border border-red-200 rounded-xl p-4"
>

⚡ {item}

</li>

))}

</ul>

</div>

{/* Feedback */}

<div className="mt-10 bg-indigo-50 border border-indigo-200 rounded-xl p-6">

<h2 className="text-2xl font-bold mb-4">

🤖 Detailed AI Feedback

</h2>

<p className="leading-8 text-gray-700">

{review.feedback}

</p>

</div>

</div>

)}



        <div className="flex gap-4 mt-6">




      <button
  onClick={handleReview}
  disabled={reviewLoading}
  className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-xl"
>
  {reviewLoading ? "Reviewing..." : "🤖 AI Review"}
</button>


<button
  onClick={handleSubmit}
  disabled={submitting}
  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-xl"
>
  {submitting ? "Submitting..." : "✅ Submit Solution"}
</button>

        </div>

      </div>

    </div>

  );

}

export default CodingInterview;