import React, { useState } from "react";
import classNames from "classnames";

const ExpandableCard = ({ title, isExpanded, onExpand, children }) => {
  return (
    <div
      className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer mb-8 md:mb-0 transition-all duration-500 ease-in-out"
      onClick={onExpand}
      style={{ maxHeight: isExpanded ? "400px" : "80px" }} // Adjust maxHeight as needed
    >
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <div
          className={classNames("transition-opacity duration-500", {
            "opacity-100": isExpanded,
            "opacity-0": !isExpanded,
          })}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default ExpandableCard;
