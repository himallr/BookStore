import React, { useEffect, useState } from 'react';
import CartItems from './CartItems';
import { getCartItems } from '../../Services/Apihelpers';
import { Button, Card, CardHeader, CardSubtitle, CardText, Col, Row } from 'react-bootstrap';
import { cartActions } from '../../Store/store';
import { useDispatch } from 'react-redux';

const Cart = () => {
    const userID = localStorage.getItem("UserID");

    const dispatch = useDispatch();
    //Getting Cart Items
    const [cartItems, setCartItems] = useState([]);
    useEffect(() => {
        getCartItems()
            .then((datas) => {
                setCartItems(datas.carts)

                if (datas.carts.users) {
                    const filteredUsers = datas.carts.users.filter((user) => user._id === userID);

                    console.log('Filtered Users:', filteredUsers); // Log filtered users to inspect

                    dispatch(cartActions.addToCart(filteredUsers));
                }
            })
    }, [dispatch])
    console.log(cartItems);

    let Price;
    
    Price = cartItems.reduce((accumulator, currentItem) => {
        const bookPrice = currentItem.books ? currentItem.books.Price : 0;

        if (currentItem.users && currentItem.users._id === userID) {
            console.log(bookPrice);
            return accumulator + (bookPrice * currentItem.quantity);
        }
        else {
            return accumulator;
        }
    }, 0);

    const totalPrice = cartItems.reduce((accumulator, book) => {
        const bookQuantity = book.quantity || 0; // If quantity is undefined, default to 0
        const bookPrice = (book.books && book.books.Price) || 0; // If Price is undefined, default to 0
        const discount = (book.books && book.books.Discount) || 0; // If Discount is undefined, default to 0
        const discountedprice = bookPrice - bookPrice * (discount) / 100
        const Discounted = bookPrice * (discount) / 100
        
        const totalPriceForBook = Math.floor(discountedprice * bookQuantity);

        if (book.users && book.users._id === userID) {
            console.log(totalPriceForBook);
            return accumulator + totalPriceForBook;
        }
        else {
            return accumulator
        }

    }, 0);

    console.log('Total Price for all books:', Price);

    const [isFixed, setIsFixed] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const threshold = 175; // Adjust this value based on your needs

            setIsFixed(scrollPosition > threshold);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className='container'>
            <h2 className='text-success text-bold mt-5 mb-4 text-center'>My Cart Items</h2>
            <ul className='list-unstyled'>
                <Row>
                    <Col sm="12" md="8">
                        {cartItems.map(item => (
                            <li key={item.books._id}>
                                <CartItems id={item.users._id} cartid={item._id} bookid={item.books._id} img={item.books.image} BookName={item.books.BookName} Author={item.books.Author} BookNo={item.books.BookNo} Price={item.books.Price} quantity={item.quantity} discount={item.books.Discount} offer={item.books.Offer} />
                            </li>
                        ))}
                    </Col>
                    <Col sm={12} md={4} style={{ position: isFixed ? 'fixed' : 'static', right: 0, top: isFixed ? 120 : 0 }}>
                        <Card style={{ padding: '20px' }}>
                            <CardHeader className='bg-white h4 text-mute'>Total Price Details</CardHeader>
                            <Row className="mb-2 mt-3">
                                <Col md="9" className="d-flex justify-content-start">
                                    <CardText className="text-bold">Price items</CardText>
                                </Col>
                                <Col md="3" className="d-flex justify-content-end">
                                    <CardText className="text-bold">&#8377;{Price}</CardText>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col md="9" className="d-flex justify-content-start">
                                    <CardText className="text-bold">Discount</CardText>
                                </Col>
                                <Col md="3" className="d-flex justify-content-end">
                                    <CardText className='text-success'>-&#8377;{Price - totalPrice}</CardText>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col md="9" className="d-flex justify-content-start">
                                    <CardText className="text-bold">Delivery Charge</CardText>
                                </Col>
                                <Col md="3" className="d-flex justify-content-end">
                                    {Price >= 1000 && Price === 0 ? (
                                        <CardText className="">
                                            <span className='text-mute' style={{ textDecoration: 'line-through' }}>&#8377;50</span>
                                            <span className='text-success text-bold'>Free</span>
                                        </CardText>
                                    ) : (
                                        <CardText className="text-bold">&#8377;50</CardText>
                                    )}
                                </Col>
                            </Row>
                            <hr></hr>
                            <Row>
                                <Col md="9" className="d-flex justify-content-start">
                                    <CardText className="text-bold">Total Amount</CardText>
                                </Col>
                                <Col md="3" className="d-flex justify-content-end">
                                    <CardText className="text-bold">&#8377;{totalPrice}</CardText>
                                </Col>
                            </Row>
                            {(Price - totalPrice) === 0 ? <></> :
                                <CardSubtitle className='mt-3 text-success'>You will save &#8377;{Price - totalPrice} for this order</CardSubtitle>
                            }
                            <Button className='mt-3' variant='success'>Place Order</Button>
                        </Card>
                    </Col>
                </Row>
            </ul>
        </div>
    );
};

export default Cart;
