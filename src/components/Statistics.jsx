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
      <div className="border border-slate-700 p-3 flex flex-col items-start  pl-20">
        <h2 className="text-2xl font-semibold">Statistics - {month}</h2>

        <section className=" bg-yellow-200 p-4 rounded-xl mt-5 ">
          <p className="flex justify-between ">
            Total sale
            <span className="mx-6">{statistics?.totalSaleAmount}</span>
          </p>
          <p className="flex justify-between">
            Total sold item
            <span className="mx-6">{statistics?.totalSoldItems}</span>{" "}
          </p>
          <p className="flex justify-between">
            Total not sold item
            <span className="mx-6">{statistics?.totalNotSoldItems}</span>
          </p>
        </section>
      </div>
    </>
  );
};

export default Statistics;
