import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { Card, Col, Container, Row } from 'react-bootstrap'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { cancelOrder } from '../../Services/Apihelpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const OrderItems = (props) => {

    const [arrivals, setArrivals] = useState("Ordered");
    const [showDetails, setShowDetails] = useState(false);

    const handleViewMore = () => {
        setShowDetails(!showDetails);
    };

    if (arrivals === "Delivered") {
        toast.success("Successfully delivered");
    }

    console.log(props);
    const handleCancel = (e) => {
        cancelOrder(props.orderid)
        e.preventDefault();
        setArrivals("Cancelled")
    }

    //convertdate
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

    console.log(props);

    const stars = Array.from({ length: 5 }, (_, index) => (
        <FontAwesomeIcon
            key={index + 1}
            icon={faStar}
            className={index < props.totalRating ? 'star-filled' : 'star'}
            style={{ "height": "20px" }}
        />
    ));

    return (
        // <Card>
        //     <Row>
        //         <Col md="3" className='my-2'>
        //             <Card.Img className='' src={props.image} style={{ height: '200px' }} alt="image"></Card.Img>

        //         </Col>
        //         <Col md="5" className='mt-3 px-5 my-2'>
        //             <Card.Text className='text-bold h5 py-1'>Book Name: <span className='h6 text-italic'>{props.BookName}</span></Card.Text>
        //             <Card.Text className='text-bold h5 py-1'>Author Name: <span className='h6 text-italic'>{props.Author}</span></Card.Text>
        //             <Card.Text className='text-bold h5 py-1'>Price: <span className='h6 text-italic'> &#8377;{props.Price} X {props.quantity}</span></Card.Text>
        //             <Card.Text className='mt-2'>
        //                 <Card.Text> Total Price: <span className='text-success mb-4 h5'>&#8377;{props.Price * props.quantity}</span></Card.Text>
        //             </Card.Text>

        //             {
        //                 arrivals !== "Delivered" &&
        //                 <>
        //                     <Button variant='success' className='my-2 text-center mr-5' onClick={handleCancel}>Cancel Order</Button>
        //                     <Button variant='outline-success' className='view-more-btn' onClick={handleViewMore}>
        //                         View More..
        //                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-down" viewBox="0 0 16 16">
        //                             <path fill-rule="evenodd" d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
        //                             <path fill-rule="evenodd" d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
        //                         </svg>
        //                     </Button>
        //                 </>
        //             }
        //         </Col>
        //         <ToastContainer
        //             position="top-center"
        //         />
        //         {/* {
        //         showDetails &&

        //         <div className="containers">
        //             <header>
        //                 <h1>Tracking Details:</h1>
        //             </header>
        //             <main>
        //                 {
        //                     arrivals === "Ordered" &&
        //                     <>
        //                         <div className="track-info">
        //                             <h3>Ordered details</h3>
        //                             <h5>#946012736537</h5>
        //                             <p><strong>Ordered:</strong> Thurs, Dec 14</p>
        //                             <p>Weight: 0.9lbs</p>
        //                         </div>
        //                         <div className="status">
        //                             <h3>Estimated Delivery</h3>
        //                             <p>Dec 14</p>
        //                             <p class="shipped">Ordered Thurs, Dec 14</p>
        //                             <a href="#">Show Tracking History</a>
        //                         </div>
        //                     </>
        //                 }
        //                 {
        //                     arrivals === "Shipped" &&
        //                     <>
        //                         <div className="track-info">
        //                             <h3>Ordered details</h3>
        //                             <h5>#946012736537</h5>
        //                             <p><strong>Ordered:</strong> Fri, Dec 4</p>
        //                             <p>Weight: 0.9lbs</p>
        //                         </div>
        //                         <div className="status">
        //                             <h3>Estimated Delivery</h3>
        //                             <p>Dec 14</p>
        //                             <p class="shipped">Shipped Tue, Dec 8</p>
        //                             <a href="#">Show Tracking History</a>
        //                         </div>
        //                     </>
        //                 }
        //                 {
        //                     arrivals === "Delivered" &&
        //                     <>
        //                         <div class="track-info">
        //                             <h3>Ordered details</h3>
        //                             <h5>#946012736537</h5>
        //                             <p><strong>Ordered:</strong> Fri, Dec 4</p>
        //                             <p>Weight: 0.9lbs</p>
        //                         </div>
        //                         <div class="status">
        //                             <h3>Estimated Delivery</h3>
        //                             <p>Dec 14</p>
        //                             <p class="delivered">Delivered Thurs, Dec 14</p>
        //                             <a href="#">Show Tracking History</a>
        //                         </div>
        //                     </>
        //                 }
        //             </main>
        //         </div>
        //     } */}
        //         <hr></hr>
        //     </Row >
        // </Card>
        <Container className='mt-2'>
            <ToastContainer position="top-center" autoClose="500" />
            <Row className='ml-5 mr-5'>
                <Link to={`/desc/${props.orderid}`} className='text-decoration-none'>
                    <Card className="mb-3">
                        <Row noGutters>
                            <Col xs={12} sm={12} lg={2} className="d-flex justify-content-center justify-content-sm-start mt-1">
                                <Card.Img src={props.image} style={{ width: '100px', height: '120px' }} />

                            </Col>
                            <Col xs={12} sm={6} lg={3}>
                                <Card.Body className="d-flex flex-column justify-content-center justify-content-sm-start">
                                    <Card.Title>{props.BookName}</Card.Title>
                                    <Card.Subtitle>Author: {props.Author}</Card.Subtitle>
                                    <div className="star-rating">
                                        {stars}
                                    </div>
                                </Card.Body>
                            </Col>
                            <Col xs={12} sm={6} lg={2}>
                                <Card.Body className="d-flex justify-content-sm-start">
                                    <Card.Text>Rs.{props.Price} * {props.quantity}</Card.Text>
                                </Card.Body>
                            </Col>
                            <Col xs={12} sm={12} lg={5}>
                                <Row>
                                    <Col lg={12}>
                                        <Card.Body className="d-flex justify-content-center">
                                            <Card.Text>
                                                {
                                                    props.delivered && props.delivered.status ?
                                                        (<><div className='text-bold'>Delivered on {convertDate(props.delivered.deliveredAt)}</div><div>Your Item has been successfully delivered</div></>)

                                                        :
                                                        arrivals === "Ordered" ?
                                                            (<><div className='text-bold'>Ordered on {convertDate(props.createdAt)}</div><div>Your Item has been successfully ordered</div></>)
                                                            :
                                                            (<><div className='text-bold text-danger'>Cancelled on {convertDate(props.createdAt)}</div><div>Your Item has been Cancelled as per your request</div></>)
                                                }
                                            </Card.Text>
                                        </Card.Body>
                                    </Col>
                                    <Col lg={12} className='d-flex justify-content-center'>
                                        {
                                            props.delivered && props.delivered.status ?
                                                <>
                                                    <Button variant='success' className='my-1 mr-5'>Return</Button>
                                                </>
                                                :
                                                <>
                                                    {
                                                        arrivals === "Ordered" ?
                                                            <>
                                                                <Button variant='success' className='my-2 text-center mr-5' onClick={handleCancel}>Cancel Order</Button>
                                                            </>
                                                            :
                                                            <></>
                                                    }
                                                </>
                                        }
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                </Link>
            </Row>
        </Container>
    )
}

export default OrderItems
