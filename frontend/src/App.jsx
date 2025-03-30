import { useState, useEffect } from 'react';
import"prismjs/themes/prism-tomorrow.css";
import Editor from"react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
console.log(rehypeHighlight); 
import "highlight.js/styles/atom-one-dark.css";
import axios from "axios";

function App() {
  const[code, setCode] = useState("");
  const[review, setReview] = useState("");
  console.log(review);

useEffect(() => {
prism.highlightAll();

  },[]);

  async function reviewCode(){
   const response = await axios.post("http://localhost:3000/ai/get-review/", {code});
    setReview(response.data);

  }
  function restartApp() {
    setCode(""); // Clear the code editor
    setReview(""); // Clear the review

  }


  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCode(e.target.result);
      };
      reader.readAsText(file);
    }
  }



  return (
<div className="flex flex-col items-center h-screen w-full overflow-auto bg-[url('https://img.lovepik.com/background/20211021/large/lovepik-artificial-intelligence-technology-background-image_400098950.jpg')] bg-cover bg-center text-white p-6 gap-6">
  {/*Header*/}
<header className="w-full bg-[url('https://img.freepik.com/premium-photo/screen-with-black-background-that-says-x_1130457-8704.jpg')] text-center py-4 text-3xl font-bold  font-serif  shadow-lg rounded-lg">AI Code Reviewer🤖</header>
<div className="flex flex-row gap-6 w-full max-w-6xl">
<div className="w-1/2  h-screen bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 overflow-auto">

{/*file upload button*/}
<input type="file" accept=".js, .py, .css, .cpp, .cs, .ts, .html, .json, .java" onChange={handleFileUpload} className="mb-4   text-sm text-gray-400 rounded-lg cursor-pointer bg-gray-700 p-2 "></input>
<button onClick={reviewCode} className="w-auto   p-3 ml-12 bg-[url('https://www.shutterstock.com/image-vector/abstract-ai-circuit-board-background-600nw-2471339475.jpg')] font-serif   py-2 text-lg font-semibold text-white  rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow">Review Code 🤖 </button>
 {/* Restart Button }
<button
onClick={restartApp}
className=" w-auto   p-5 font-serif   py-2 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-500 hover:to-blue-600 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow"
>
Restart 🔄
</button>*/}
{/*code editor*/}
<div className=" border border-gray-600  rounded-lg h-screen  p-4 bg-gray-900 overflow-auto"><Editor value={code} onValueChange={(code) =>setCode(code)} highlight={(code)=>prism.highlight(code,prism.languages.javascript, "javascript")} padding={10} style = {{fontFamily : "Fire code, monospace", fontsize: 16}}></Editor></div>

{/*<button onClick={reviewCode} className="w-full mt-4 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-500 hover:to-blue-600 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow">Review Code 🤖 </button>*/}


{/* Restart Button */}
<button
onClick={restartApp}
className=" w-full   mt-4 font-serif bg-[url('https://www.shutterstock.com/image-vector/abstract-ai-circuit-board-background-600nw-2471339475.jpg')]  py-3 text-lg font-semibold text-white rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow"
>
Restart 🔄
</button>

</div>
<div className="w-1/2 h-screen bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 overflow-auto">
<button  className="w-full  mb-4 bg-[url('https://www.shutterstock.com/image-vector/abstract-ai-circuit-board-background-600nw-2471339475.jpg')] py-3 text-lg font-semibold text-white  rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow">Output </button>

<div
className="w-full  h-screen bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 overflow-auto "><Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>  


</div>
</div>
</div>

</div>

  );
}

export default App
