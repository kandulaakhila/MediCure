import React from "react";

const TopLoadingBar = ({ message = "Loading..." }) => {
  return (
    <div className="relative w-full">
      {/* Animated loading bar */}
      <div className="h-1 w-0 bg-primary absolute top-0 left-0 z-40 animate-expandWidth opacity-100"></div>

      {/* Optional message (hidden on small screens) */}
      <p className="absolute top-2 left-2 text-xs text-gray-600 sm:block hidden">
        {message}
      </p>
    </div>
  );
};

export default TopLoadingBar;
