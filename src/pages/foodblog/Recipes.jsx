import { useState } from "react";
import ExpandableCard from "../../components/universal/ExpandableCard";

export default function Recipes() {
  const [expandedCard, setExpandedCard] = useState(null);

  const handleExpand = (card) => {
    setExpandedCard(expandedCard === card ? null : card);
  };

  return (
    <div className="p-8 pb-32">
      {" "}
      {/* Increased bottom padding */}
      <div className="flex flex-col md:flex-row justify-center gap-8 mb-16">
        <ExpandableCard
          title="R1"
          isExpanded={expandedCard === "r1"}
          onExpand={() => handleExpand("r1")}
        >
          <p>step 1</p>
        </ExpandableCard>
        <ExpandableCard
          title="R2"
          isExpanded={expandedCard === "r2"}
          onExpand={() => handleExpand("r2")}
        >
          <p>step 1</p>
        </ExpandableCard>

        <ExpandableCard
          title="R3"
          isExpanded={expandedCard === "r3"}
          onExpand={() => handleExpand("r3")}
        >
          <p>step 1</p>
        </ExpandableCard>

        <ExpandableCard
          title="R4"
          isExpanded={expandedCard === "r4"}
          onExpand={() => handleExpand("r4")}
        >
          <p>step 1</p>
        </ExpandableCard>
      </div>
    </div>
  );
}
