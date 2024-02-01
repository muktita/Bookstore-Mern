import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner.jsx";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const Home = () => {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(false); // loading state

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/book")
      .then((res) => {
        setBook(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold my-8">Book List</h1>
        <Link to="/book/create">
          <MdOutlineAddBox className="text-3xl text-green-500" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md">No</th>
              <th className="border border-slate-600 rounded-md">Title</th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Author
              </th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Publish Date
              </th>
              <th className="border border-slate-600 rounded-md">Operations</th>
            </tr>
          </thead>
          <tbody>
            {book.map((book, index) => (
              <tr key={book._id} className="h-8">
                <td className="border border-slate-700 rounded-md text-center">
                  {index + 1}
                </td>
                <td className="border border-slate-700 rounded-md">
                  {book.title}
                </td>
                <td className="border border-slate-700 rounded-md max-md:hidden">
                  {book.author}
                </td>
                <td className="border border-slate-700 rounded-md max-md:hidden">
                  {book.publishDate}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/book/details/${book._id}`}>
                      <BsInfoCircle className="text-2xl text-green-800" />
                    </Link>
                    <Link to={`/book/edit/${book._id}`}>
                      <AiOutlineEdit className="text-2xl text-blue-800" />
                    </Link>
                    <Link to={`/book/delete/${book._id}`}>
                      <MdOutlineDelete className="text-2xl text-red-800" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default Home;
