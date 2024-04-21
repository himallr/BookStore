import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, ProgressBar, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { getOrderItemsById, ratings } from '../../Services/Apihelpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const OrderDescriptions = () => {
    const id = useParams().id;
    const [order, setOrders] = useState([]);
    const userID = localStorage.getItem("UserID")

    useEffect(() => {
        getOrderItemsById(id)
            .then((data) => {
                setOrders(data.order);
            })
    }, [userID, id]);

    console.log(order);

    //convert date
    const convertDate = (date) => {
        const dateObject = new Date(date);

        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        const formattedDate = dateObject.toLocaleString('en-US', options);

        // Add suffix to the day

        const day = dateObject.getDate();
        const daySuffix = getDaySuffix(day);
        const finalFormattedDate = formattedDate.replace(/\d+/, (match) => match + daySuffix);

        return finalFormattedDate;

        // Function to get day suffix (st, nd, rd, th)
        function getDaySuffix(day) {
            if (day >= 11 && day <= 13) {
                return 'th';
            }
            const lastDigit = day % 10;
            switch (lastDigit) {
                case 1:
                    return 'st';
                case 2:
                    return 'nd';
                case 3:
                    return 'rd';
                default:
                    return 'th';
            }
        }
    }

    let shippinDate = new Date(new Date(order.createdAt));
    console.log(shippinDate.getDate() + 2);
    shippinDate.setDate(shippinDate.getDate() + 1);

    const progressData = [
        { label: 'Ordered', surLabel: 'Ordered', date: order.createdAt },
        { label: 'Shipped', surLabel: 'Shipping', date: shippinDate },
        { label: 'Delivered', surLabel: 'Delivery', date: order.delivered && order.delivered.deliveredAt },
    ];

    //Ratings
    const [rating, setRating] = useState(0);
    const handleStarClick = (selectedRating) => {
        setRating(selectedRating);
    };
    const [comment, setComment] = useState('');
    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleAddComment = () => {
        ratings(userID, order.books[0]._id, rating, comment)
        window.location.reload()
    };

    return (
        <Container className='mt-5'>
            {/* <ToastContainer position="top-center" autoClose="500" /> */}
            <Row className='mx-2'>
                <Card>
                    <Row noGutters>
                        <Col xs={12} sm={3} lg={2} className="d-flex justify-content-center justify-content-sm-start mt-3">
                            <Card.Img src={order.length !== 0 && order.books[0].image} style={{ width: '200px', height: '230px' }} />

                        </Col>
                        <Col xs={12} sm={6} lg={4}>
                            <Card.Body className="d-flex flex-column justify-content-center justify-content-sm-start">
                                <Card.Title>{order.length !== 0 && order.books[0].BookName}</Card.Title>
                                <Card.Subtitle>Author: {order.length !== 0 && order.books[0].Author}</Card.Subtitle>
                                <Card.Text>Rs.{order.length !== 0 && order.books[0].Price * order.quantity}</Card.Text>

                            </Card.Body>
                        </Col>
                        {/* <Col xs={12} sm={3} lg={1}>
                            <Card.Body className="d-flex justify-content-center justify-content-sm-start">
                                <Card.Text>Rs.{order.length !== 0 && order.books[0].Price * order.quantity}</Card.Text>
                            </Card.Body>
                        </Col> */}
                        {
                            order.length !== 0 && order.delivered.status &&
                            <Col xs={12} sm={12} lg={6}>
                                <Card.Body>
                                    <h4>Provide Your Ratings:    </h4>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <FontAwesomeIcon
                                            key={star}
                                            icon={faStar}
                                            className={star <= rating ? 'star-filled' : 'star'}
                                            onClick={() => handleStarClick(star)}
                                            style={{ height: '25px' }}
                                        />
                                    ))}
                                    <textarea
                                        className="comment-input mt-3"
                                        placeholder="Add a comment..."
                                        value={comment}
                                        onChange={handleCommentChange}
                                    ></textarea>
                                    <Button variant='success' className="add-comment-button mt-3" onClick={handleAddComment}>
                                        Add Comment
                                    </Button>
                                </Card.Body>
                            </Col>
                        }
                    </Row>
                </Card>
            </Row >
            <Row className='mx-2 py-4'>
                <Card>
                    <Card.Body>
                        <Card.Title>Tracking Details</Card.Title>
                        <ProgressBar style={{ height: '8px' }}>
                            {progressData.map((item, index) => (
                                <ProgressBar
                                    key={index}
                                    variant={index === progressData.length - 1 ? 'success' : ''}
                                    now={order.length !== 0 && order.delivered.status ? 100 : 50}
                                />
                            ))}
                        </ProgressBar>
                        <div className="d-flex justify-content-between mt-2">
                            {progressData.map((item, index) => (
                                <div key={index} className="text-center">
                                    <div>
                                        {
                                            order.length !== 0 && order.delivered.status ?
                                                item.label : item.surLabel
                                        }
                                    </div>
                                    {
                                        order.length !== 0 && order.delivered.status ?
                                            <div>{convertDate(item.date)}</div>
                                            :
                                            <div>
                                                {
                                                    (item.label === "Delivered" || item.surLabel === "Delivery") ?
                                                        <>delivery to be on {convertDate(item.date)}</>
                                                        :
                                                        <div>{convertDate(item.date)}</div>
                                                }
                                            </div>
                                    }
                                </div>
                            ))}
                        </div>
                    </Card.Body>
                </Card>
            </Row>
            {/* {
                order.length !== 0 && order.delivered.status &&
                <Row className='mx-2 pt-4'>
                    <Card>
                        <Card.Body>
                            <h4>Provide Your Ratings</h4>
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
                            <Button variant='success' className="add-comment-button mt-3" onClick={handleAddComment}>
                                Add Comment
                            </Button>
                        </Card.Body>
                    </Card>
                </Row>
            } */}
        </Container >
    )
}

export default OrderDescriptions
