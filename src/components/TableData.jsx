import React from "react";

const TableData = ({ transaction }) => {
  //   console.log("transaction", transaction.sold);

  const { _id, title, description, price, category, sold, image } = transaction;

  const tdStyle = "  border border-slate-700 p-3  ";
  return (
    <>
      <tr>
        <td className={tdStyle}>{_id}</td>
        <td className={tdStyle}>{title}</td>
        <td className={tdStyle}> {description}</td>
        <td className={tdStyle}>{price}</td>
        <td className={tdStyle}>{category}</td>
        <td className={tdStyle}>{sold.toString()}</td>
        <td className={tdStyle}>
          {" "}
          <img src={image} alt="Image" className="object-contain" />{" "}
        </td>
      </tr>
    </>
  );
};

export default TableData;
