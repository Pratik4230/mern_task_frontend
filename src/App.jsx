import { useEffect, useState } from "react";
import "./App.css";
import Circle from "./components/Circle";
import axiosInstance from "./utils/axiosInstance";
import TableData from "./components/TableData";

function App() {
  const thStyle = "border border-slate-600";

  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [month, setMonth] = useState("March");

  useEffect(() => {
    const timer = setTimeout(() => {
      getFeed();
      console.log(search);
    }, 170);

    return () => {
      clearTimeout(timer);
    };
  }, [page, search]);

  const getFeed = async () => {
    try {
      const data = await axiosInstance.get(
        `/transactions/feed?page=${page}&limit=10&search=${search}`
      );
      // console.log("api data", data?.data);
      setTransactions(data?.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleMonth = (selectedMonth) => {
    setMonth(selectedMonth);
    setPage(1);
  };

  // console.log("transactions", transactions);
  // console.log("page", page);
  // console.log("search", search);

  return (
    <>
      <main>
        <section className="p-5 bg-sky-50 rounded-lg flex flex-col items-center ">
          <Circle />

          <div className="flex justify-between w-full my-10">
            <input
              type="text"
              onChange={(e) => {
                setSearch(e.target.value), setPage(1);
              }}
              placeholder="search by title, description, price"
              className="border-2 border-slate-200 bg-slate-800 text-white p-2 rounded-xl w-3/12"
            />

            <select
              onChange={(e) => {
                handleMonth(e.target.value);
              }}
              value={month}
              className="border-2 border-slate-200 bg-slate-800 text-white px-1 rounded-xl"
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

          <div>
            <table className="border-collapse border border-slate-400 table-auto ">
              <thead>
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

            <div className="flex justify-between mt-5 text-lg">
              <p> Page No : {transactions?.currentPage}</p>{" "}
              <div>
                {" "}
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  className={`bg-black text-white  p-1 px-2 rounded-lg disabled:bg-slate-700 `}
                >
                  Previos
                </button>
                <span className="mx-2 font-bold text-xl">-</span>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page * 10 >= transactions?.totalDocuments}
                  className={`bg-black text-white  p-1 px-2 rounded-lg  disabled:bg-slate-700 `}
                >
                  Next
                </button>
              </div>
              <p> Per Page : {transactions?.transactions?.length}</p>
            </div>
          </div>
        </section>

        <section>het</section>
      </main>
    </>
  );
}

export default App;
