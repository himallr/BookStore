import React from 'react'
import { Link } from 'react-router-dom'

const SimilarBooks = (props) => {
    return (
        <div>
            <>
                {
                    props.books._id === props.id ?
                        <></>
                        :
                        <div className='row mb-2'>
                            <div className='col-md-4 py-4'>
                                <div className='card border-0'>
                                    <img src={props.image} width={250} className="image1"></img>
                                    <div class="middle2">
                                        <Link to={`/BuyBook/${props.id}`}>
                                            <div className='text'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="success" className="bi bi-search" viewBox="0 0 16 16">
                                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                                </svg>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className='col-md-5 mx-2 py-4'>
                                <div className='text-bold h5 py-2'>Book No: <span className='text-italic'>{props.BookNo}</span></div>
                                <div className='text-bold h5 py-2'>Book Name: <span className='text-italic'>{props.BookName}</span></div>
                                <div className='text-bold h5 py-2'>Author Name: <span className='text-italic'>{props.Author}</span></div>
                                <div className='text-bold h5 py-2'>Genre: <span className='text-italic'>{props.BookType}</span></div>
                            </div>
                            <hr className='py-2'></hr>
                        </div>
                }
            </>
        </div>
    )
}

export default SimilarBooks
