import { useEffect, useState } from "react";
import "./App.css";
import Circle from "./components/Circle";
import axiosInstance from "./utils/axiosInstance";
import TableData from "./components/TableData";
import Statistics from "./components/Statistics";
import Chart from "./components/Chart";

function App() {
  const thStyle = "border border-slate-600";

  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [month, setMonth] = useState("March");
  const [loading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    //Timer for Debounced Search
    const timer = setTimeout(() => {
      getFeed();
      console.log(search);
    }, 220);

    return () => {
      clearTimeout(timer);
    };
  }, [page, search]);

  const getFeed = async () => {
    try {
      const data = await axiosInstance.get(
        `/transactions/feed?page=${page}&limit=10&search=${search}`
      );
      setTransactions(data?.data);
      setIsLoading(false);
    } catch (error) {
      console.log("error", error);
      setIsError(true);
      setIsLoading(false);
    }
  };

  const handleMonth = (selectedMonth) => {
    setMonth(selectedMonth);
    setPage(1);
  };

  if (loading) {
    return <h1 className="text-2xl font-semibold">Loading...</h1>;
  }

  if (isError) {
    return (
      <h1 className="text-2xl font-semibold">
        Something went wrong please try again
      </h1>
    );
  }

  return (
    <>
      <main>
        <section className="p-6 bg-gradient-to-r from-sky-50 via-sky-100 to-sky-50 rounded-lg shadow-md flex flex-col items-center">
          <Circle />

          <div className="flex flex-col sm:flex-row justify-between w-full my-8 gap-4">
            <input
              type="text"
              onChange={(e) => {
                setSearch(e.target.value), setPage(1);
              }}
              placeholder="Search by title, description, price"
              className="border-2 border-slate-300 bg-white text-slate-700 placeholder-gray-500 p-3 rounded-lg w-full sm:w-4/12 focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
            //select month
            <select
              onChange={(e) => {
                handleMonth(e.target.value);
              }}
              value={month}
              className="border-2 border-slate-300 bg-white text-slate-700 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
            >
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="border-collapse border border-slate-300 table-auto w-full bg-white shadow-sm rounded-lg">
              <thead className="bg-sky-100">
                <tr>
                  <th className={thStyle}>ID</th>
                  <th className={thStyle}>Title</th>
                  <th className={thStyle}>Description</th>
                  <th className={thStyle}>Price</th>
                  <th className={thStyle}>Category</th>
                  <th className={thStyle}>Sold</th>
                  <th className={thStyle}>Image</th>
                </tr>
              </thead>
              <tbody>
                {transactions?.transactions?.map((transaction) => (
                  <TableData key={transaction?._id} transaction={transaction} />
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-lg gap-4 w-full">
            <p className="text-slate-600 font-medium">
              Page No: {transactions?.currentPage}
            </p>

            <div className="flex items-center">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="bg-sky-600 text-white p-2 px-4 rounded-lg disabled:bg-slate-400"
              >
                Previous
              </button>
              <span className="mx-3 font-bold text-xl text-slate-700">-</span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page * 10 >= transactions?.totalDocuments}
                className="bg-sky-600 text-white p-2 px-4 rounded-lg disabled:bg-slate-400"
              >
                Next
              </button>
            </div>

            <p className="text-slate-600 font-medium">
              Per Page: {transactions?.transactions?.length}
            </p>
          </div>
        </section>

        <section>
          <Statistics month={month} />
        </section>

        <section>
          <Chart month={month} />
        </section>
      </main>
    </>
  );
}

export default App;
