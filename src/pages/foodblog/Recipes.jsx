import { useState } from "react";
import ExpandableCard from "../../components/universal/ExpandableCard";
import recipesData from "../../data/recipes.json";
export default function Recipes() {
  const [expandedCard, setExpandedCard] = useState(null);

  const handleExpand = (card) => {
    setExpandedCard(expandedCard === card ? null : card);
  };

  return (
    <div className="p-8 pb-32">
      <h2 className="text-4xl font-bold mb-8 text-center">Recipes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {recipesData.map((recipe, index) => (
          <ExpandableCard
            key={index}
            title={recipe.title}
            isExpanded={expandedCard === recipe.title}
            onExpand={() => handleExpand(recipe.title)}
            image={recipe.image}
          >
            <div className="text-gray-700">
              <p className="mb-4">{recipe.intro}</p>
              <h3 className="font-semibold">Ingredients:</h3>
              <ul className="list-disc list-inside mb-4">
                {recipe.ingredients.map((ingredient, idx) => (
                  <li key={idx}>{ingredient}</li>
                ))}
              </ul>
              <h3 className="font-semibold">Steps:</h3>
              <ol className="list-decimal list-inside mb-4">
                {recipe.steps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
              <p>{recipe.closingRemarks}</p>
            </div>
          </ExpandableCard>
        ))}
      </div>
    </div>
  );
}
