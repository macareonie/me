import { useState } from "react";
import ExpandableCard from "../../components/universal/ExpandableCard";
import infoCardsData from "../../data/infocards.json";

export default function InfoCards() {
  const [expandedCard, setExpandedCard] = useState(null);

  const handleExpand = (card) => {
    setExpandedCard(expandedCard === card ? null : card);
  };

  return (
    <div className="p-8 pb-32 bg-gray-100">
      <div className="flex flex-col md:flex-row justify-center gap-8 mb-16">
        {infoCardsData.map((card, index) => (
          <ExpandableCard
            key={index}
            title={card.title}
            isExpanded={expandedCard === card.title}
            onExpand={() => handleExpand(card.title)}
          >
            <ul className="list-disc list-inside text-gray-700">
              {card.content.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </ExpandableCard>
        ))}
      </div>
    </div>
  );
}
