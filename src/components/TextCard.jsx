import React, { useState } from "react";

export const TextCard = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Limita el texto a 200 caracteres
  const truncatedText = text.length > 200 ? text.slice(0, 200) + "..." : text;

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className="card">
      <p>{isExpanded ? text : truncatedText}</p>
      {text.length > 200 && (
        <button onClick={toggleExpansion} className="text-blue-600">
          {isExpanded ? "Ver menos" : "Ver más"}
        </button>
      )}
    </div>
  );
};
