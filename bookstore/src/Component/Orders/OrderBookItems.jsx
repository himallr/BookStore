import React from 'react'
import OrderItems from './OrderItems'

const OrderBookItems = (props) => {
    return (
        <div>
            {
                props.books && props.books.map((datas) => {
                    return (
                        <OrderItems orderid={props.orderid} id={datas._id} BookName={datas.BookName} BookNo={datas.BookNo} Author={datas.Author} BookType={datas.BookType} Price={datas.Price} image={datas.image} totalRating={datas.totalRating} quantity={props.quantity} createdAt={props.createdAt} delivered={props.delivered} />
                    )
                })
            }
        </div>
    )
}

export default OrderBookItems
