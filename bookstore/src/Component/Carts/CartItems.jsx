import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../Store/store';
import { OrderItems, removeItemFromCart, updateCart } from '../../Services/Apihelpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, ButtonGroup, Card, CardBody, CardHeader, CardImg, CardText, Col, Row } from "react-bootstrap"
import { BsTrash } from 'react-icons/bs';
import '../Carts/CartItems.css'

const CartItems = (props) => {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(props.quantity);
    const userID = localStorage.getItem("UserID");

    useEffect(() => {
        // Call the updateQuantity function when the component mounts or when 'quantity' changes
        updateQuantity(quantity);
    }, [quantity]);

    const removeFromCartHandler = (productId) => {
        removeItemFromCart(productId)
            .then(() => {
                dispatch(cartActions.removeFromCart(productId));
                toast.warning("Successfully removed");
                window.location.reload()
            })
            .catch(error => {
                console.error("Error removing item from cart:", error);
            });
    };

    const delivered = {
        status: false,
        deliveredAt: new Date().toISOString()
    }
    const OrderNow = (productId) => {
        OrderItems(productId, userID, delivered)
            .then(() => {
                toast.success("Successfully Ordered");
            })
            .catch(error => {
                console.error("Error placing order:", error);
            });
    };

    const updateQuantity = (newQuantity) => {
        if (newQuantity >= 1 && newQuantity <= 10) {
            updateCart(props.cartid, newQuantity)
                .then(() => {
                    setQuantity(newQuantity);
                })
                .catch(error => {
                    console.error("Error updating quantity:", error);
                });
        }
    };

    const uniqueModalId = `modal-${props.cartid}`;
    const dis = Math.floor(props.Price - props.Price * (props.discount / 100));

    return (
        <div>
            {props.id === userID &&
                <Card>
                    <CardHeader className='bg-white'>No.{props.BookNo}</CardHeader>
                    <CardBody>
                        <Row>
                            <Col sm="6" md="6" lg="4">
                                <CardImg src={props.img} style={{ width: '200px', height: '200px' }} alt="Book Cover"></CardImg>
                            </Col>
                            <Col sm="6" md="4" lg="8">
                                <Row>
                                    <Col className='d-flex justify-content-start'>
                                        <Card.Title >{props.BookName}</Card.Title>
                                    </Col>
                                    <Col className='d-flex justify-content-end'>
                                        <Button variant='outline-danger' onClick={() => removeFromCartHandler(props.cartid)}><BsTrash /></Button>
                                    </Col>
                                </Row>
                                <CardText>{props.offer ? (<>
                                    <span style={{ textDecoration: 'line-through' }}>&#8377;{props.Price}</span> - <span className='text-success text-bold'>&#8377;{dis}</span>
                                </>) : <>&#8377;{props.Price * quantity}</>}</CardText>
                                <CardText>{props.Author}</CardText>
                                <ButtonGroup aria-label="Basic example">
                                    <Button variant="outline-success" onClick={() => updateQuantity(quantity - 1)}>-</Button>
                                    <Card.Text className='pl-3 pr-3' variant="secondary">{quantity}</Card.Text>
                                    <Button variant="outline-success" onClick={() => updateQuantity(quantity + 1)}>+</Button>
                                </ButtonGroup>
                                <div className='d-flex justify-content-end'>
                                    <Button className='mt-2' variant="outline-success" onClick={() => OrderNow(props.bookid)}>Buy Now</Button>
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            }
            <ToastContainer position="top-center" autoClose="500" />
        </div>
    );
};

export default CartItems;
