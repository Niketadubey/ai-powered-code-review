const Groq = require('groq-sdk');
const groq = new Groq({apiKey : process.env.GROQ_API_KEY})

async function getResponse(prompt){
const chatCompletion = await groq.chat.completions.create({
model : "deepseek-r1-distill-qwen-32b",
messages: [
  {
    role:"system",
    content: prompt
  },
  {
    role: "system",
    content:  `
  Act as an expert in programming language who has read through many programming advice online for python,Java, C, and c++.
  Can you please help suggest improvements for the given python code, mentioning the existing code line by line with proper indentation?
  Can you also convert the improved code version to java, c, and c++?
  Can you also give time and space complexities for the improved code version?
  While responding, can you use this format?
  Suggestions
  Improved code in python
  Improved code in Java, c, and c++.
  Time and space complexities
  Personalized learning links
   Format the response with appropriate headings as follows:

Suggestions

Improved code in Python

Improved code in Java, C, and C++

Time and Space Complexities

Personalized Learning Links

Little Think Thoughts


    `
  }
]

})
return chatCompletion.choices[0].message.content;
}

module.exports = getResponse