import classNames from "classnames";

const ExpandableCard = ({ title, isExpanded, onExpand, children, image }) => {
  return (
    <div
      className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer mb-8 md:mb-0 transition-all duration-500 ease-in-out"
      onClick={onExpand}
      style={{ maxHeight: isExpanded ? "" : "80px" }}
    >
      <div className="p-6">
        <h3 className="text-center text-2xl font-bold mb-4">{title}</h3>
        <div
          className={classNames("transition-opacity duration-500", {
            "opacity-100": isExpanded,
            "opacity-0": !isExpanded,
          })}
        >
          {image && (
            <div className="flex justify-center items-center w-full mb-4">
              <img src={image} alt={title} className="max-w-full max-h-64" />
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default ExpandableCard;
