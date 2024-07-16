import { useState } from "react";
import ExpandableCard from "../../components/universal/ExpandableCard";
import infoCardsData from "../../data/infocards.json";

export default function InfoCards() {
  const [expandedCard, setExpandedCard] = useState(null);

  const handleExpand = (card) => {
    setExpandedCard(expandedCard === card ? null : card);
  };

  return (
    <div className="p-8 pb-32 bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col md:flex-row flex-wrap justify-center gap-8 mb-16">
        {infoCardsData.map((card, index) => (
          <ExpandableCard
            key={index}
            title={card.title}
            isExpanded={expandedCard === card.title}
            onExpand={() => handleExpand(card.title)}
          >
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              {card.content.map((item, idx) => (
                <li key={idx}>
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 dark:text-blue-400 hover:underline"
                    >
                      {item.text}
                    </a>
                  ) : (
                    item.text
                  )}
                </li>
              ))}
            </ul>
          </ExpandableCard>
        ))}
      </div>
    </div>
  );
}
