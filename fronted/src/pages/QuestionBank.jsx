import { useEffect, useState } from "react";
import { Search, Star, Play, Filter } from "lucide-react";
import { getQuestionBank } from "../services/questionBankService";
import { toggleFavorite } from "../services/favoriteQuestionService";
import { useNavigate } from "react-router-dom";

function QuestionBank() {

  const [questions, setQuestions] = useState([]);

  const [category, setCategory] = useState("All");

  const [difficulty, setDifficulty] = useState("All");

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  

  useEffect(() => {

    loadQuestions();

  }, [category, difficulty]);

  const loadQuestions = async () => {

    try {

      setLoading(true);

      const result = await getQuestionBank(

        category,

        difficulty,

        search

      );

      setQuestions(result.questions);

    } catch (err) {

      console.log(err);

    }

    setLoading(false);

  };

  return (

<div className="min-h-screen bg-slate-100">

{/* Hero */}

<div className="bg-gradient-to-r from-indigo-700 via-blue-700 to-purple-700 text-white p-10 rounded-b-3xl shadow-xl">

<h1 className="text-5xl font-bold">

 AI Coding Question Bank

</h1>

<p className="mt-4 text-lg opacity-90">

Practice AI Generated Coding Questions Like LeetCode

</p>

</div>

{/* Search */}

<div className="max-w-7xl mx-auto mt-8">

<div className="bg-white rounded-2xl shadow-lg p-6">

<div className="flex gap-4 flex-wrap">

<div className="flex-1 relative">

<Search

className="absolute left-4 top-3 text-gray-400"

/>

<input

type="text"

placeholder="Search Questions..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="border w-full rounded-xl py-3 pl-12 pr-4"

/>

</div>

<select

value={category}

onChange={(e)=>setCategory(e.target.value)}

className="border rounded-xl px-5"

>

<option>All</option>

<option>Arrays</option>

<option>Strings</option>

<option>Linked List</option>

<option>Tree</option>

<option>Graph</option>

<option>Stack</option>

<option>Queue</option>

<option>Java</option>

<option>OOP</option>

</select>

<select

value={difficulty}

onChange={(e)=>setDifficulty(e.target.value)}

className="border rounded-xl px-5"

>

<option>All</option>

<option>Easy</option>

<option>Medium</option>

<option>Hard</option>

</select>

<button

onClick={loadQuestions}

className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 rounded-xl"

>

<Search />

</button>

</div>

</div>

{/* Cards */}

<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-10">

{

loading ?

(

<h1>

Loading...

</h1>

)

:

questions.map((item)=>(

<div

key={item._id}

className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 p-6"

>

<div className="flex justify-between">

<span className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full">

{item.category}

</span>

<span

className={`px-4 py-1 rounded-full text-white

${

item.difficulty==="Easy"

?

"bg-green-500"

:

item.difficulty==="Medium"

?

"bg-yellow-500"

:

"bg-red-500"

}

`}

>

{item.difficulty}

</span>

</div>

<h2 className="text-2xl font-bold mt-6">

{item.title}

</h2>

<p className="text-gray-500 mt-4 line-clamp-4">

{item.description}

</p>

<div className="flex gap-3 mt-8">

<button

onClick={()=>navigate(

"/coding",

{

state:{

question:item

}

}

)}

className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl flex justify-center items-center gap-2"

>

<Play size={18}/>

Solve

</button>

<button
  onClick={async () => {

    await toggleFavorite(item._id);

    loadQuestions();

  }}

  className="bg-yellow-400 hover:bg-yellow-500 text-blue px-5 rounded-xl"
>

  <Star
    size={20}
    fill={item.isFavorite ? "yellow" : "none"}
  />

</button>

</div>

</div>

))

}

</div>

</div>

</div>

  );

}

export default QuestionBank;