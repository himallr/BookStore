import React, { useEffect, useState } from "react";
import { getBookType } from "../../Services/Apihelpers";
import Book from "../Books/Book";
import "../../Views/Style.css";
import Skeleton from "../../Loading/Skeleton";

const HP = () => {
  const [filterbooks, setFilterBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getBookType("Fiction")
      .then((data) => {
        setFilterBooks(data.books);
        console.log(data);
        setIsLoading(false);
      })
      .catch((e) => console.log("error"));
  }, []);

  console.log(filterbooks);

  return (
    <div className="container my-5">
      {isLoading ? (
        <>
          <h2 className="font-weight-bold gradient-text text-center mb-4">
            <Skeleton width="300px" height="50px" />
          </h2>
          <Skeleton width="250px" height="400px" count={4} marginLeft="40px" />
        </>
      ) : (
        <div className="row">
          <div className="col-md-12">
            <h2 className="font-weight-bold gradient-text text-center mb-4">
              Fictional Books!
            </h2>
            <div className="row">
              {filterbooks &&
                filterbooks.map((item, index) => {
                  return (
                    <div className="col-xl-3 col-md-4 col-sm-6">
                      <Book
                        id={item._id}
                        BookName={item.BookName}
                        key={index}
                        Price={item.Price}
                        image={item.image}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HP;
