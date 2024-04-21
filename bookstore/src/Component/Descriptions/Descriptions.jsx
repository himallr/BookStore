import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { addCart, getBookDetails, getBookType, getCartItems, ratings } from "../../Services/Apihelpers"
import { cartActions } from '../../Store/store';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './Descriptions.css'
import "../Books/Book.css";
import Ratings from './Ratings';
import Description from './Description';
import SimilarBooks from './SimilarBooks';
import Scroll from '../../Scroll';
import { Col, Container, Row } from 'react-bootstrap';

const BuyBook = () => {

    const navigate = useNavigate();

    const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);

    const dispatch = useDispatch();
    const [books, setBooks] = useState([]);
    const [allbooks, setAllBooks] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    let [quantity, setQuantity] = useState(1);
    const bookid = books && books._id;
    console.log(bookid);
    const userID = localStorage.getItem("UserID")

    const id = useParams().id;

    useEffect(() => {
        getCartItems()
            .then((datas) => {
                setCartItems(datas.carts)
            })

        getBookDetails(id, cartItems).then((res) => {
            setBooks(res);
            getBookType(res.BookType)
                .then((data) => {
                    setAllBooks(data.books)
                })
        })

    }, [bookid, id])

    const addToCartHandler = () => {
        // Dispatch the addToCart action with the product details
        addCart(books._id, localStorage.getItem("UserID"), quantity)
            .then((data) => {
                console.log(data.Message);
                if (data.Message === "Already exists")
                    showWarningToast("Already exists");
                else {
                    showSuccessToast("Successfully added to Cart");
                    navigate("/Cart")
                }
                dispatch(cartActions.addToCart(books));
            })
    };

    const showWarningToast = (message) => {
        toast.warning(message);
    };
    const showSuccessToast = (message) => {
        toast.success(message);
    };

    const dis = Math.floor(books.Price - books.Price * (books.Discount / 100));
    // const max = (Math.floor(Math.random() * 5)) + 1

    //ratings
    const [rating, setRating] = useState(0);
    const handleStarClick = (selectedRating) => {
        setRating(selectedRating);
    };

    //comments
    const [comment, setComment] = useState('');
    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleAddComment = () => {
        ratings(userID, books._id, rating, comment)
        window.location.reload()
    };

    const stars = Array.from({ length: 5 }, (_, index) => (
        <FontAwesomeIcon
            key={index + 1}
            icon={faStar}
            className={index < books.totalRating ? 'star-filled' : 'star'}
        />
    ));

    return (

        <>
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-md-4'>
                        <div className='card'>
                            <img className='card-img' alt='image' height={400} width={100} src={books.image}></img>
                        </div>
                    </div>
                    <div className='col-md-8 mb-4'>
                        <div className='text-bold h3'>{books.BookName}</div>
                        <hr></hr>
                        <div className='container'>
                            <div className="row">
                                <div className="star-rating">
                                    {stars}
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    <div className="d-flex flex-column mx-3 my-2">
                                        <h3>Price:</h3>
                                        {books.Offer === true ? (
                                            <>
                                                <del>&#8377;{books.Price}</del>
                                                <h5 className="text-danger">&#8377;{dis}</h5>
                                            </>
                                        ) : (
                                            <h5>&#8377;{books.Price}</h5>
                                        )}
                                    </div>
                                </div>

                                <div className="col-md-6 col-sm-12">
                                    <div className="d-flex flex-column mx-3 my-2">
                                        <h3>Author:</h3>
                                        <h5>{books.Author}</h5>
                                    </div>
                                </div>
                            </div>

                            {isUserLoggedIn &&
                                <>
                                    <div className='text-bold h5 py-2'>Quantity: <span className='text-italic'>{books.quantity}</span></div>
                                    <div>
                                        <button className='btn btn-dark' onClick={() => {
                                            if (quantity > 1) {
                                                setQuantity(quantity = quantity - 1)
                                            }
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
                                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                                            </svg>
                                        </button>
                                        <span className='text-bold px-3' >{quantity}</span>
                                        <button className='btn btn-dark' onClick={() => {
                                            if (quantity < 10) {
                                                setQuantity(quantity = quantity + 1)
                                            }
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                                            </svg>
                                        </button>
                                    </div>

                                    <button onClick={addToCartHandler} className='btn btn-success my-5'>Add to Cart</button>
                                </>
                            }
                        </div>
                    </div>

                    {/* ToastContainer is required for react-toastify to work */}
                    <ToastContainer
                        position="top-center" autoClose={500}
                    />
                </div>
            </div >
            <hr></hr>
            <div className='container mb-5'>
                <div className='row'>
                    {/* <div className='col-md-7 mb-3'>
                        {isUserLoggedIn &&
                            <>
                                <h2>Comment Your Thoughts:</h2>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <FontAwesomeIcon
                                        key={star}
                                        icon={faStar}
                                        className={star <= rating ? 'star-filled' : 'star'}
                                        onClick={() => handleStarClick(star)}
                                    />
                                ))}
                                <textarea
                                    className="comment-input mt-3"
                                    placeholder="Add a comment..."
                                    value={comment}
                                    onChange={handleCommentChange}
                                ></textarea>
                                <button className="add-comment-button mt-3" onClick={handleAddComment}>
                                    Add Comment
                                </button>

                            </>

                        }
                    </div>
                    <hr></hr> */}
                    <Ratings id={books._id} ratings={books.ratings} />
                </div>
            </div>
            <hr></hr>
            <Description description={books.description} Author={books.Author} BookType={books.BookType} pages={books.pages} yearPublished={books.yearPublished} />
            <Container>
                <Row>
                    <Col md={12}>
                        <h2 className='font-weight-bold text-center mb-4 gradient-text text-decoration-underline'>Similar Kinds of books
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                            </svg>
                        </h2>
                        {
                            allbooks ? allbooks.slice(0, 5).map((index) => {
                                return (
                                    <SimilarBooks books={books} id={index._id} image={index.image} BookName={index.BookName} BookNo={index.BookNo} Author={index.Author} BookType={index.BookType} />
                                )
                            })
                                :
                                <h3>No Such similar books</h3>
                        }

                    </Col>
                </Row>
                <Scroll />
            </Container>
        </>
    )
}

export default BuyBook
