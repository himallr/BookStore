import React, { useEffect, useState } from 'react'
import { getBookType } from '../../Services/Apihelpers'
import Book from '../Books/Book';
import '../../Views/Style.css';


const HP = () => {
    const [filterbooks, setFilterBooks] = useState([]);
    useEffect(() => {
        getBookType("Fiction")
            .then((data) => {
                setFilterBooks(data.books)
                console.log(data);
            })
            .catch((e) => console.log("error"));
    }, [])

    console.log(filterbooks);

    return (
        <div className='container my-5'>
            <div className='row'>
                <div className='col-md-12'>
                <h2 className='font-weight-bold gradient-text text-center mb-4'>Fictional Books!</h2>
                    <div className='row'>
                        {
                            filterbooks && filterbooks.map((item, index) => {
                                return (
                                    <div className='col-xl-3 col-md-4 col-sm-6'>
                                        <Book id={item._id} BookName={item.BookName} key={index} Price={item.Price} image={item.image} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HP
