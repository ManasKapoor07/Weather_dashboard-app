import React from "react";

const Skeleton = ({ className = "h-6 w-full rounded bg-gray-700 animate-pulse" }) => {
    return <div className={className}></div>;
  };
  
  export default Skeleton;