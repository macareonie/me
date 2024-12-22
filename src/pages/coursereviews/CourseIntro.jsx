import React from "react";

const CourseIntro = () => {
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
        <h1 className="text-6xl font-bold mb-6">University Course Reviews</h1>
        <p className="text-xl mb-8 max-w-2xl">
          Welcome to my university course review page! Here, you can find
          reviews on courses I have taken in NUS. Expect my unfiltered thoughts
          and opinions, alongside the classic description on the course content,
          delivery and assessment breakdown.
        </p>
        <p className="text-xl max-w-2xl">
          Some of these reviews were written quite some time after I took the
          course, so do take them with a pinch of salt. Also, do not expect
          god-like reviews because this is basically a medium for me to record
          some of my thoughts and potentially vent. I'll try my best to make
          them cohesive and readable but do forgive rambling or bad writing. I
          am only human after all.
        </p>
      </div>
      <div>
        <img
          src="https://media1.tenor.com/m/tj73wUceSzAAAAAd/im-only-human-after-all.gif"
          alt="A relevant GIF from Tenor"
          className="mt-8 max-w-full rounded-lg opacity-90"
        />
      </div>
    </div>
  );
};

export default CourseIntro;
