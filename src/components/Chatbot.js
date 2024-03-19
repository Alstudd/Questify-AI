"use client";
import React, { useRef } from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai";
import md from "markdown-it";
import "../styles/style.css";
import "dotenv/config";

// Initialize the model
console.log(process.env.GEMINI_API_KEY);
const genAI = new GoogleGenerativeAI("AIzaSyCmcf37HTmaJOGD3570miTo8gdaL3FhPjI");

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

let history = [];


async function getResponse(prompt) {
  const chat = await model.startChat({ history: history });
  const result = await chat.sendMessage(prompt);
  const response = await result.response;
  const text = response.text();

  console.log(text);
  return text;
}

// user chat div
export const userDiv = (data) => {
  return `
  <!-- User Chat -->
          <div class="flex items-center gap-2 justify-start my-4">
            <img
              src="user.jpg"
              alt="user icon"
              class="w-10 h-10 rounded-full"
            />
            <p class="bg-transparent border-2 border-white text-black dark:text-white px-4 py-2 rounded-md shadow-md">
              ${data}
            </p>
          </div>
  `;
};

// AI Chat div
export const aiDiv = (data) => {
  return `
  <!-- AI Chat -->
          <div class="flex gap-2 justify-end pl-[130px] my-4">
            <pre class="bg-transparent border-2 border-white text-black dark:text-white px-4 py-2 rounded-md shadow-md whitespace-pre-wrap">
              ${data}
            </pre>
            <img
              src="chat-bot.jpg"
              alt="user icon"
              class="w-10 h-10 rounded-full"
            />
          </div>
  `;
};

const Chatbot = () => {
  let userMessage = useRef()
  let chatArea = useRef()
  let chatForm = useRef()

  async function handleSubmit(event) {
    event.preventDefault();

    var prompt = userMessage.current.value.trim();
    if (prompt === "") {
      return;
    }

    console.log("user message", prompt);

    chatArea.current.innerHTML += userDiv(prompt);
    userMessage.current.value = "";
    const aiResponse = await getResponse(prompt);
    let md_text = md().render(aiResponse);
    chatArea.current.innerHTML += aiDiv(md_text);

    let newUserRole = {
      role: "user",
      parts: prompt,
    };
    let newAIRole = {
      role: "model",
      parts: aiResponse,
    };

    history.push(newUserRole);
    history.push(newAIRole);

    console.log(history);
  }

  function handleKeyup(event) {
    if (event.keyCode === 13) {
      handleSubmit(event);
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col p-6">
      <section>
        <div className="container mx-auto sm:px-4 mt-14">

          <div className="relative flex flex-col min-w-0 break-words border bg-transparent border-1 border-gray-300 shadow-md rounded-xl">
            <div className="flex align-items-center gap-3 mt-6 ml-10">
              <img src='/textlogobg.png' width="30" height="30" />
              <h5 className="text-lg font-medium text-black dark:text-white mb-0">
                IntelliQuest AI Chatbot
              </h5>
            </div>
            <div className="flex-auto p-6">
              <div className="flex flex-col">
                <div id="chat-container" ref={chatArea} className="max-h-[67vh] flex flex-col gap-4"></div>
                <div className="w-full p-2 flex border border- rounded-full py-2 px-4">
                  <form onSubmit={handleSubmit} action="" method="post" className="w-full flex px-3" id="chat-form" ref={chatForm} onKeyUp={handleKeyup}>
                    <input placeholder="Ask your question?" type="text" name="" ref={userMessage} id="prompt" className="w-full p-1 pb-0 outline-none border-none bg-transparent text-black dark:text-white" />
                    <button className="text-black dark:text-white" type="submit">Send</button>
                  </form>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section >
    </div >
  )
}

export default Chatbot