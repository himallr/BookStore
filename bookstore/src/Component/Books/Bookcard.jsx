import React, { useEffect, useState } from 'react'
import img1 from "../../Assets/1.jpg";
import img2 from "../../Assets/2.jpg";
import img3 from "../../Assets/3.jpg"
import "./Bookcard.css";
import { Link } from 'react-router-dom';
import { getBookType } from '../../Services/Apihelpers';

const Bookcard = () => {

    const [filterbooks, setFilterBooks] = useState([])

    useEffect(() => {
        getBookType()
            .then((data) => {
                setFilterBooks(data.filterbooks)
            })
    }, []
    )

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-4 imgs1'>
                    <Link to="/diffbook">
                        <div className='card'>
                            <img className='card-img-top image' src={img1}></img>
                            <div class="middle1">
                                <div class="text">Shop here</div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className='col-md-4 imgs1'>
                    <Link to="/hp">
                        <div className='card'>
                            <img className='card-img-top image' src={img2}></img>
                            <div class="middle1">
                                <div class="text">Shop here</div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className='col-md-4 imgs1'>
                    <Link to="/Offer">
                        <div className='card'>
                            <img className='card-img-top image' src={img3}></img>
                            <div class="middle1">
                                <div class="text">Shop here</div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Bookcard
