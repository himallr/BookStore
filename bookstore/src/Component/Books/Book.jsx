import React, { useState } from 'react'
import "./Book.css";
import { Link, useNavigate } from 'react-router-dom';
import { addToFav } from '../../Services/Apihelpers';
import { ToastContainer, toast } from 'react-toastify';

const Book = ({ books, id, BookName, Price, image, Discount, Offer }) => {
    const [isFavorited, setFavorited] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const userId = localStorage.getItem("UserID");

    const navigate = useNavigate();

    const handleAddToFav = () => {
        addToFav(userId, id)
            .then((data) => {
                console.log(data);
                if (data.Message === "Successfully added To Fav") {
                    navigate("/Fav")
                }
                else {
                    IncorrectMsg("Already exists");
                }

            })
    }

    const IncorrectMsg = (message) => {
        toast.warning(message);
    };

    const dis = Math.floor(Price - Price * (Discount / 100));
    return (

        <div>
            <ToastContainer position='top-center' autoClose="500" />
            <div className={`card-container ${isHovered ? 'hovered' : ''} rounded-4`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                <img src={image} className='card-img-top img-fluid image1' style={{ height: '400px', objectFit: 'cover' }} alt="Book Cover" />
                <div className="middle2 imgs2">
                    <Link to={`/BuyBook/${id}`}>
                        <div className="text">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                        </div>
                    </Link>
                    {
                        userId &&
                        <button
                            className={`heart-btn ${isFavorited ? 'favorited' : ''} text`}
                            onClick={handleAddToFav}
                            style={{ color: isFavorited ? 'red' : 'white', backgroundColor: "gray" }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                            </svg>
                        </button>
                    }

                </div>
                <div className='card-title'>{BookName}</div>
                <div className="card-footer text-muted">
                    {Offer ? <>Rs.{dis}</> : <>Rs.{Price}</>}
                </div>
            </div>
        </div>
    )
}

export default Book
