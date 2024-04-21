import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartActions, favActions } from "../Store/store";
import { Card, Row, Col, Button } from "react-bootstrap";
import { addCart, getUserById, removeFromFav } from "../Services/Apihelpers";
import { ToastContainer, toast } from "react-toastify";
import { BsTrash } from "react-icons/bs";
import Skeleton from "../Loading/Skeleton";

const Favourites = () => {
  const [favListItems, setFavListItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const id = localStorage.getItem("UserID");
  const removeItemFromFav = (favItem) => {
    console.log(favItem._id);
    removeFromFav(id, favItem._id).then(() => {
      alert(`Successfully Removed book ${favItem.BookName}`);
      window.location.reload();
    });
  };

  const addToCartHandler = (books) => {
    addCart(books._id, localStorage.getItem("UserID"), 1).then((data) => {
      console.log(data.Message);
      if (data.Message === "Already exists") toast.warning("Already exists");
      else {
        navigate("/Cart");
      }
      dispatch(cartActions.addToCart(books));
    });
  };

  useEffect(() => {
    getUserById(id).then((data) => {
      setFavListItems(data.Favourites);
      dispatch(favActions.setFavListItems(data.Favourites));
      setIsLoading(false);
    });
  }, [dispatch, id]);

  console.log(favListItems);

  return (
    <div className="container mt-5">
      {isLoading ? (
        <h2 className="text-success text-bold mt-5 mb-4 text-center">
          <Skeleton width="200px" height="50px" />
        </h2>
      ) : (
        <h2 className="text-success text-bold mt-5 mb-4 text-center">
          Favourites
        </h2>
      )}
      <ToastContainer position="top-center" autoClose="500" />
      {isLoading ? (
        <>
          {Array.from({ length: 3 }, (_, index) => (
            <Card className="mb-3" style={{ backgroundColor: "gray" }}>
              <Row noGutters>
                <Col>
                  <Skeleton
                    width="150px"
                    height="150px"
                    borderRadius="10%"
                    margin="10px"
                  />
                </Col>
                <Col>
                  <Card.Body className="d-flex justify-content-center justify-content-sm-start">
                    <Skeleton
                      width="100px"
                      height="30px"
                      count={3}
                      borderRadius="10%"
                      marginBottom="20px"
                      marginLeft="30px"
                    />
                  </Card.Body>
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
                  <Skeleton
                    width="50px"
                    height="50px"
                    borderRadius="10%"
                    margin="10px"
                    marginLeft="100px"
                  />
                </Col>
              </Row>
            </Card>
          ))}
        </>
      ) : (
        <Row className="ml-5 mr-5">
          {favListItems.length !== 0 ? (
            favListItems.map((book) => (
              <Card className="mb-3">
                <Row noGutters>
                  <Col
                    xs={12}
                    sm={12}
                    lg={2}
                    className="d-flex justify-content-center justify-content-sm-start mt-3"
                  >
                    <Card.Img
                      src={book.image}
                      style={{ width: "100px", height: "100px" }}
                    />
                  </Col>
                  <Col xs={12} sm={6} lg={2}>
                    <Card.Body className="d-flex justify-content-center justify-content-sm-start">
                      <Card.Title>{book.BookName}</Card.Title>
                    </Card.Body>
                  </Col>
                  <Col xs={12} sm={3} lg={2}>
                    <Card.Body className="d-flex justify-content-center justify-content-sm-start">
                      <Card.Text>{book.Author}</Card.Text>
                    </Card.Body>
                  </Col>
                  <Col xs={12} sm={3} lg={2}>
                    <Card.Body className="d-flex justify-content-center">
                      <Card.Text>Rs.{book.Price}</Card.Text>
                    </Card.Body>
                  </Col>
                  <Col xs={12} sm={6} lg={2}>
                    <Card.Body className="d-flex justify-content-center justify-content-sm-start">
                      <Button
                        variant="success"
                        onClick={() => addToCartHandler(book)}
                      >
                        Add to Cart
                      </Button>
                    </Card.Body>
                  </Col>
                  <Col xs={12} sm={6} lg={2}>
                    <Card.Body className="d-flex justify-content-center justify-content-sm-end">
                      <Button
                        variant="outline-danger"
                        onClick={() => removeItemFromFav(book)}
                      >
                        <BsTrash />
                      </Button>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            ))
          ) : (
            <>
              <h5 className="text-mute mt-5 mb-4 text-center">
                No items found in Favourites!
              </h5>
            </>
          )}
        </Row>
      )}
    </div>
  );
};

export default Favourites;
