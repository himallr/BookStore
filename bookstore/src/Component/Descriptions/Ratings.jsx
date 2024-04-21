import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Ratings = (props) => {

    const id = localStorage.getItem("UserID");
    console.log(props);

    return (
        <div>
            <div className='col-md-12'>
                <h2>Ratings:</h2>
                {
                    props.ratings && props.ratings.length !== 0 ? props.ratings.map((datas) => {
                        return (
                            <>
                                <h5>{datas.postedby && datas.postedby._id===id ? <>You</> : datas.postedby.Name.toUpperCase()}</h5>
                                {/* <h6>Rating:</h6> */}
                                {
                                    Array.from({ length: 5 }, (_, index) => (
                                        <FontAwesomeIcon
                                            key={index + 1}
                                            icon={faStar}
                                            className={index < datas.star ? 'star-filled' : 'star'}
                                        />
                                    ))
                                }
                                <h6>Comments: <span className='text-bold'>{datas.comment}</span></h6>
                                <hr></hr>
                            </>
                        )
                    })
                        :
                        <h1>No Ratings</h1>
                }
            </div>
        </div>
    )
}

export default Ratings
