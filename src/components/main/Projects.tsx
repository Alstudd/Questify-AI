import React from "react";
import ProjectCard from "../sub/ProjectCard";

const Projects = () => {
  return (
    <div
      className="w-[90%] mx-auto flex flex-col items-center justify-center pb-10"
      id="projects"
    >
      <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
        Our Features
      </h1>
      <div className="h-full w-full grid md:grid-cols-3 md:flex-row gap-10 px-10">
        <ProjectCard
          src="/compare.jpeg"
          title="User Friendly UI"
          description="Easy to use and understand UI for all age groups"
        />
        <ProjectCard
          src="/chatbot.png"
          title="AI Chatbot"
          description="24/7 educational support with AI chatbot"
        />
        <ProjectCard
          src="/checker.png"
          title="Quiz & Course Generator"
          description="Create your own quiz and course with our easy to use generator"
        />
      </div>
    </div>
  );
};

export default Projects;