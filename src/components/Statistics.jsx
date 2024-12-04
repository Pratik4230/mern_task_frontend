import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const Statistics = ({ month }) => {
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    getStatistics();
  }, [month]);

  const getStatistics = async () => {
    try {
      const data = await axiosInstance.get(
        `/transactions/statistics?month=${month}`
      );
      console.log("data");

      setStatistics(data?.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  console.log("statistics", statistics);

  return (
    <>
      <div className="border border-slate-300 p-6 flex flex-col items-start bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-slate-800">
          Statistics - <span className="text-sky-600">{month}</span>
        </h2>

        <section className="bg-yellow-100 p-5 rounded-xl mt-5 w-full">
          <div className="flex justify-between items-center border-b border-yellow-300 pb-3 mb-3">
            <span className="text-lg text-slate-700 font-medium">
              Total Sale
            </span>
            <span className="text-lg text-slate-900 font-bold">
              {statistics?.totalSaleAmount}
            </span>
          </div>
          <div className="flex justify-between items-center border-b border-yellow-300 pb-3 mb-3">
            <span className="text-lg text-slate-700 font-medium">
              Total Sold Items
            </span>
            <span className="text-lg text-slate-900 font-bold">
              {statistics?.totalSoldItems}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg text-slate-700 font-medium">
              Total Not Sold Items
            </span>
            <span className="text-lg text-slate-900 font-bold">
              {statistics?.totalNotSoldItems}
            </span>
          </div>
        </section>
      </div>
    </>
  );
};

export default Statistics;
