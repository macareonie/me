import { useState } from "react";
import ExpandableCard from "../../components/universal/ExpandableCard";
import coureReviewData from "../../data/coursereview.json";

export default function ReviewCards() {
  const [expandedCard, setExpandedCard] = useState(null);

  const handleExpand = (card) => {
    setExpandedCard(expandedCard === card ? null : card);
  };

  return (
    <div className="bg-gray-100 p-8 pb-32 dark:bg-gray-700">
      <h2 className="text-4xl font-bold mb-8 text-center dark:text-gray-300">
        Courses/Modules
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {coureReviewData.map((review, index) => (
          <ExpandableCard
            key={index}
            title={review.name}
            isExpanded={expandedCard === review.name}
            onExpand={() => handleExpand(review.name)}
            image={review.image}
          >
            <div className="text-gray-700 dark:text-gray-300">
              <h3 className="font-bold"> Taken: {review.taken}</h3>
              <p className="mb-4">{review.intro}</p>
              <h3 className="font-semibold">Assessment Breakdown:</h3>
              <ul className="list-disc list-inside mb-4">
                {review.breakdown.map((x, idx) => (
                  <li key={idx}>{x}</li>
                ))}
              </ul>
              <p className="mb-4">{review.review}</p>
              <p>{review.closingRemarks}</p>
            </div>
          </ExpandableCard>
        ))}
      </div>
    </div>
  );
}
