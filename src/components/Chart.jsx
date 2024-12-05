import React from "react";

const Chart = ({ month }) => {
  return (
    <div className="h-24  mt-10">
      <p className="text-xl font-semibold">
        Bar chart Stats - <span className="text-sky-600"> {month} </span>
      </p>
      <p>"I gave it a try, but I could not figure out how to make it." </p>
    </div>
  );
};

export default Chart;
