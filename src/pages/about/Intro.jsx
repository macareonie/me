export default function Intro() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row items-center min-h-screen p-8 bg-white dark:bg-gray-800">
        <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
          <img
            src="/src/assets/icon.png"
            alt="Profile"
            className="w-96 h-96 rounded-full shadow-lg"
          />
        </div>
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl font-bold mb-4 dark:text-gray-100">
            About Me
          </h1>
          <br />
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Hi, I'm Ryan! About to be a 3rd-Year at NUS studying Computer
            Science, my interests include cooking, games and zoning out to lo-fi
            music of any kind. I enjoy the pursuit of knowledge, whether it be
            learning about obscure trivia or contemplating philosophical
            questions.
          </p>
          <br />
          <p className="text-lg text-gray-700 dark:text-gray-300">
            I'm not an outgoing person nor an outdoorsy person, so my ideal day
            is essentially a chill time at home lying in bed watching
            livestreams or anime. Check out what I am up to by clicking on the
            cards below:
          </p>
        </div>
      </div>
    </div>
  );
}
