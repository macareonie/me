import React from "react";

export default function Welcome() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-900">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?t=st=1719867086~exp=1719870686~hmac=30c32415f4aeab223085def4b975691f9dc02c14b9b0539148a04e2a52041082&w=1380)",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative z-10 flex flex-col items-center text-center text-white p-8">
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
