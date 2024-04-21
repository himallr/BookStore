import React, { useEffect, useState } from "react";
import { fetchBooksfromOrders } from "../../Services/Apihelpers";
import "react-toastify/dist/ReactToastify.css";
import "./Orders.css";
import OrderBookItems from "./OrderBookItems";
import { Card, Col, Row } from "react-bootstrap";
import Skeleton from "../../Loading/Skeleton";

const Orders = () => {
  let [books, setBooks] = useState([]);

  let userID = localStorage.getItem("UserID");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBooksfromOrders(userID).then((data) => {
      setBooks(data);
      console.log(data);
      setIsLoading(false);
    });
  }, [userID]);

  console.log(books);
  return (
    <div className="container">
      {isLoading ? (
        <>
          <h2 className="text-success text-bold mt-5 mb-4 text-center">
            <Skeleton width="200px" height="50px" />
          </h2>
          {Array.from({ length: 3 }, (_, index) => (
            <Card className="mb-3" style={{ backgroundColor: "gray" }}>
              <Row>
                <Col>
                  <Skeleton
                    width="150px"
                    height="170px"
                    borderRadius="10%"
                    margin="10px"
                    marginLeft="10px"
                  />
                </Col>
                <Col>
                  <Row>
                    <Card.Body>
                      <Skeleton
                        width="100px"
                        height="30px"
                        count={1}
                        borderRadius="10%"
                        marginLeft="30px"
                      />
                    </Card.Body>
                  </Row>
                </Col>
                <Col>
                  <Skeleton
                    width="150px"
                    height="50px"
                    borderRadius="10%"
                    margin="10px"
                    marginLeft="100px"
                  />
                </Col>
                <Col>
                  <Col>
                    <Skeleton
                      width="200px"
                      height="50px"
                      borderRadius="10%"
                      margin="10px"
                      count={2}
                      marginLeft="100px"
                    />
                  </Col>
                  <Col>
                    <Skeleton
                      width="100px"
                      height="50px"
                      borderRadius="10%"
                      margin="10px"
                      marginLeft="100px"
                    />
                  </Col>
                </Col>
              </Row>
            </Card>
          ))}
        </>
      ) : (
        <Row>
          <h2 className="text-success text-bold mt-5 mb-4 text-center">
            My Orders
          </h2>
          {books.length !== 0 ? (
            books.map((datas) => {
              return (
                <OrderBookItems
                  orderid={datas._id}
                  books={datas.books}
                  quantity={datas.quantity}
                  createdAt={datas.createdAt}
                  delivered={datas.delivered}
                />
              );
            })
          ) : (
            <h4 className="mt-5 mb-4 text-center">No Book Orders!</h4>
          )}
        </Row>
      )}
    </div>
  );
};

export default Orders;
