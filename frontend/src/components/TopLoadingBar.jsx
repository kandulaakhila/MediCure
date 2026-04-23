import React from "react";

const TopLoadingBar = ({ message = "Loading..." }) => {
  return (
    <div
      role="status"
      className="loading h-1 w-0 bg-primary fixed top-0 left-0 z-40 animate-expandWidth opacity-100"
    >
      <span className="sr-only">{message}</span>
    </div>
  );
};

export default TopLoadingBar;
