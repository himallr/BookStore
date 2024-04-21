import React, { useEffect, useState } from 'react'
import { fetchBooksfromOrders } from '../../Services/Apihelpers';
import 'react-toastify/dist/ReactToastify.css';
import './Orders.css'
import OrderBookItems from './OrderBookItems';
import { Row } from 'react-bootstrap';

const Orders = () => {

    let [books, setBooks] = useState([]);


    let userID = localStorage.getItem("UserID");

    useEffect(() => {
        fetchBooksfromOrders(userID)
            .then((data) => {
                setBooks(data);
                console.log(data);
            })
    }, [userID]);

    console.log(books);
    return (
        <div className='container'>
            <Row>
                <h2 className='text-success text-bold mt-5 mb-4 text-center'>My Orders</h2>
                {
                    books.length !== 0 ? books.map((datas) => {
                        return (
                            <OrderBookItems orderid={datas._id} books={datas.books} quantity={datas.quantity} createdAt={datas.createdAt} delivered={datas.delivered} />
                        )
                    })
                        :
                        <h4 className='mt-5 mb-4 text-center'>No Book Orders!</h4>
                }
            </Row>
        </div>
    )
}

export default Orders
