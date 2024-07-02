import { useState } from "react";
import ExpandableCard from "../../components/universal/ExpandableCard";

export default function Intro() {
  const [expandedCard, setExpandedCard] = useState(null);

  const handleExpand = (card) => {
    setExpandedCard(expandedCard === card ? null : card);
  };

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

      {/* Cards Section */}
      <div className="p-8 pb-32">
        {" "}
        {/* Increased bottom padding */}
        <div className="flex flex-col md:flex-row justify-center gap-8 mb-16">
          {/* University Courses Card */}
          <ExpandableCard
            title="Current University Courses"
            isExpanded={expandedCard === "courses"}
            onExpand={() => handleExpand("courses")}
          >
            <ul className="list-disc list-inside text-gray-700">
              <li>Course 1</li>
              <li>Course 2</li>
              <li>Course 3</li>
              <li>Course 4</li>
            </ul>
          </ExpandableCard>

          {/* Games/Shows Card */}
          <ExpandableCard
            title="Games I currently am playing"
            isExpanded={expandedCard === "games"}
            onExpand={() => handleExpand("games")}
          >
            <ul className="list-disc list-inside text-gray-700">
              <li>Game 1</li>
              <li>Game 2</li>
              <li>Game 3</li>
              <li>Game 4</li>
            </ul>
          </ExpandableCard>

          <ExpandableCard
            title="Shows I am currently watching"
            isExpanded={expandedCard === "shows"}
            onExpand={() => handleExpand("shows")}
          >
            <ul className="list-disc list-inside text-gray-700">
              <li>Show 1</li>
              <li>Show 2</li>
              <li>Show 3</li>
              <li>Show 4</li>
            </ul>
          </ExpandableCard>

          <ExpandableCard
            title="Current Projects"
            isExpanded={expandedCard === "project"}
            onExpand={() => handleExpand("project")}
          >
            <ul className="list-disc list-inside text-gray-700">
              <li>Project 1</li>
              <li>Project 2</li>
              <li>Project 3</li>
              <li>Project 4</li>
            </ul>
          </ExpandableCard>
        </div>
      </div>
    </div>
  );
}
