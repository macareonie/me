import React from "react";

export default function Welcome() {
  return (
    <div className="relative min-h-screen flex items-center justify-center dark:bg-gray-900">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "",
        }}
      >
        <div className="absolute inset-0 bg-white dark:bg-gray-800 opacity-50"></div>
      </div>
      <div className="relative z-10 flex flex-col items-center text-center text-black dark:text-white p-8">
        <h1 className="text-6xl font-bold mb-6">Welcome!</h1>
        <p className="text-xl mb-8 max-w-2xl">
          No idea why you are browsing this site but welcome anyways! This small
          summer project is my way of learning web development and new
          technologies and also doubles down as a medium for sharing about
          myself. Expect all kinds of things:
        </p>
        <ul className="list-disc list-inside text-left text-lg max-w-md mb-8">
          <li>University course reviews</li>
          <li>Current games and shows I'm following</li>
          <li>Projects I am part of or have completed</li>
          <li>
            A food blog with simple recipes and tips I picked up from my home
            cooking interest
          </li>
        </ul>
        <p className="text-xl max-w-2xl">
          If anything piques your interest and you wish to contact me whether
          for a friendly conversation or constructive criticism on how to
          improve, feel free to contact me via any of the means below! Do enjoy
          browsing!
        </p>
      </div>
    </div>
  );
}
