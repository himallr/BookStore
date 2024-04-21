import React, { useEffect, useState } from "react";
import Book from "../Books/Book.jsx";
import { getOfferBooks } from "../../Services/Apihelpers.js";
import "../../Views/Style.css";
import Skeleton from "../../Loading/Skeleton.jsx";

const Offer = () => {
  const [filterbooks, setFilterBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getOfferBooks("true")
      .then((data) => {
        setFilterBooks(data.offers);
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
            <h2 className="font-weight-bold text-center mb-4 gradient-text">
              Offer Zones!
            </h2>
            <div className="row">
              {filterbooks &&
                filterbooks.map((item, index) => {
                  return (
                    <div className="col-lg-3 col-md-4 col-sm-6 col-sx-12">
                      <Book
                        id={item._id}
                        BookName={item.BookName}
                        key={index}
                        Price={item.Price}
                        image={item.image}
                        Offer={item.Offer}
                        Discount={item.Discount}
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

export default Offer;
