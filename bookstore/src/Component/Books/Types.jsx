import React, { useEffect, useState } from "react";
import Book from "./Book.jsx";
import {
  getBookType,
  getBooks,
  getPagination,
} from "../../Services/Apihelpers.js";
import { Link } from "react-router-dom";
import Skeleton from "../../Loading/Skeleton.jsx";
import "./Types.css";

const Types = () => {
  const [allbooks, setAllBooks] = useState();
  const [filterbooks, setFilterBooks] = useState([]);
  const [pages, setPage] = useState(1);
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const totalPages = allbooks && parseInt(Math.ceil(allbooks.length / 6));

  useEffect(() => {
    getPagination(pages)
      .then((res) => {
        setBooks(res);
        setIsLoading(false);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, [pages]);

  useEffect(() => {
    getBooks().then((data) => {
      setAllBooks(data.books);
    });
  }, []);

  const handleLeftPagination = () => {
    if (pages > 1) {
      setPage(pages - 1);
    }
  };

  const handleRightPagination = () => {
    if (pages < allbooks.length / 6) {
      setPage(pages + 1);
    }
  };
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  console.log("Books:", books);
  console.log("Filter Books:", filterbooks.length);

  return (
    <div className="container-fluid mt-2">
      <div className="row">
        <div style={{ paddingTop: "120px", paddingBottom: "50px" }}>
          {!isLoading ? (
            <div className="row">
              <div className="col-md-3">
                <button className="btn btn-secondary rounded-circle text-center">
                  1
                </button>
                <Link
                  className="text-decoration-none text-dark mx-5"
                  onClick={() =>
                    getBookType("Fantasy").then((data) => {
                      setFilterBooks(data.books);
                    })
                  }
                >
                  Fantasy
                </Link>
                <hr></hr>
              </div>
              <div className="col-md-3">
                <button className="btn btn-secondary rounded-circle text-center">
                  2
                </button>
                <Link
                  className="text-decoration-none text-dark mx-5"
                  onClick={() =>
                    getBookType("Horror").then((data) => {
                      setFilterBooks(data.books);
                    })
                  }
                >
                  Horror
                </Link>
                <hr></hr>
              </div>
              <div className="col-md-3">
                <button className="btn btn-secondary rounded-circle text-center">
                  3
                </button>
                <Link
                  className="text-decoration-none text-dark mx-5"
                  onClick={() =>
                    getBookType("Mystery").then((data) => {
                      setFilterBooks(data.books);
                    })
                  }
                >
                  Mystery
                </Link>
                <hr></hr>
              </div>
              <div className="col-md-3">
                <button className="btn btn-secondary rounded-circle text-center">
                  4
                </button>
                <Link
                  className="text-decoration-none text-dark mx-5"
                  onClick={() =>
                    getBookType("scific").then((data) => {
                      setFilterBooks(data.books);
                    })
                  }
                >
                  sci-Fic
                </Link>
                <hr></hr>
              </div>
            </div>
          ) : (
            <div className="skel">
              {Array.from({ length: 4 }, (_, index) => (
                <>
                  <div className="skel">
                    <div className="left">
                      <Skeleton width="40px" height="40px" borderRadius="50%" />
                    </div>
                    <div>
                      <Skeleton width="150px" height="50px" />
                    </div>
                  </div>
                  <Skeleton width="300px" height="1px" />
                </>
              ))}
              <hr></hr>
            </div>
          )}
        </div>
        {isLoading ? (
          <>
            <Skeleton
              width="250px"
              height="400px"
              count={5}
              marginLeft="40px"
            />
          </>
        ) : (
          <>
            {filterbooks.length !== 0
              ? filterbooks.map((item, index) => {
                  return (
                    <div className="col-xl-2 col-md-3 col-sm-2 pb-3">
                      <Book
                        id={item._id}
                        books={item}
                        BookName={item.BookName}
                        key={index}
                        Price={item.Price}
                        image={item.image}
                      />
                    </div>
                  );
                })
              : books &&
                books.map((item, index) => {
                  return (
                    <div className="col-xl-2 col-md-3 col-sm-2 pb-3">
                      <Book
                        id={item._id}
                        books={item}
                        BookName={item.BookName}
                        key={index}
                        Price={item.Price}
                        image={item.image}
                      />
                    </div>
                  );
                })}
          </>
        )}

        {filterbooks.length === 0 ? (
          <div className="container">
            <div className="d-flex justify-content-between py-4">
              <span className="btn btn-success" onClick={handleLeftPagination}>
                Prev
              </span>
              <div className="d-flex flex-row mx-2">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    type="button"
                    className={`btn btn-success mx-2 ${
                      pages === index + 1 ? "active" : ""
                    }`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              <span className="btn btn-success" onClick={handleRightPagination}>
                Next
              </span>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Types;
