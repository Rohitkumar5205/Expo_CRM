import React from "react";

const HeaderComponent = ({ title, buttons }) => {
  return (
    <div className="w-full bg-white shadow-md border-b flex flex-col sm:flex-row justify-between items-center px-4 py-3 fixed">
      <h1 className="text-xl font-semibold text-gray-700 mb-2 sm:mb-0">{title}</h1>
      <div className="flex flex-wrap gap-2 justify-center">
        {buttons &&
          buttons.map((button, index) => (
            <button
              key={index}
              onClick={button.onClick}
              className={button.className || "bg-gray-500 hover:bg-gray-600 text-white px-3 py-1.5 rounded-sm text-sm font-medium cursor-pointer"}
            >
              {button.label}
            </button>
          ))}
      </div>
    </div>
  );
};

export default HeaderComponent;