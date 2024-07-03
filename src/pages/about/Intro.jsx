export default function Intro() {
  return (
    <div className="bg-gray-100">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row items-center min-h-screen p-8 bg-white">
        <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
          <img
            src="https://via.placeholder.com/300"
            alt="Profile"
            className="w-64 h-64 rounded-full shadow-lg"
          />
        </div>
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl font-bold mb-4">About Me</h1>
          <br />
          <p className="text-lg text-gray-700">
            Hi, I'm Ryan! About to be a 3rd-Year at NUS studying Computer
            Science, my interests include cooking, games and zoning out to lo-fi
            music of any kind. I enjoy the pursuit of knowledge, whether it be
            learning about obscure trivia or contemplating philosophical
            questions.
          </p>
          <br />
          <p className="text-lg text-gray-700">
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
