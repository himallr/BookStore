import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Form, FormLabel, Row } from 'react-bootstrap'
import { updateDeliveredStatus } from '../Services/Apihelpers';

const Books = (props) => {

    const [deliveryStatusMap, setDeliveryStatusMap] = useState({});

    const [deliveredStatus, setDeliveredStatus] = useState({
        status: false,
        deliveredAt: null,
    });

    const handleCheckboxChange = (orderId) => {

        const currentStatus = deliveryStatusMap[orderId] || { status: false, deliveredAt: null };

        const newStatus = !currentStatus.status;
        const newDeliveredAt = newStatus ? new Date().toISOString() : null;

        const updatedStatusMap = {
            ...deliveryStatusMap,
            delivered: {
                status: newStatus,
                deliveredAt: newDeliveredAt,
            },
        };

        setDeliveryStatusMap(updatedStatusMap);

        updateDeliveredStatus(orderId, deliveryStatusMap.delivered)
            .then(() => {
                alert("successfully Updated");
                window.location.reload();
            })
    };
    console.log(deliveryStatusMap.delivered);

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

    return (
        <Container>
            <Row>
                <Col>
                    <hr></hr>
                    <h2>Books Ordered</h2>
                    {
                        props.booksInOrder && props.booksInOrder.map((data, index) => {
                            const orderId = data.orderId;
                            const currentStatus = deliveryStatusMap[orderId] || { status: false, deliveredAt: null };
                            return (
                                <div>
                                    <Row>
                                        <Col md={12} sm={12}>
                                            <Card className='py-0 my-2'>
                                                <Card.Header>ID:ORD{data.bookDetails._id}</Card.Header>
                                                <Card.Body className=''>
                                                    <Row>
                                                        <Col md={3}>
                                                            <Card.Img src={data.bookDetails.image} height={200} width={100}></Card.Img>
                                                        </Col>
                                                        <Col md={5}>
                                                            <Card.Text className='pt-2 h5'>{data.bookDetails.BookName}</Card.Text>
                                                            <Card.Subtitle className='pt-4'>Author:{data.bookDetails.Author}</Card.Subtitle>
                                                            <Card.Subtitle className='pt-3'>Released Date:{convertDate(data.bookDetails.yearPublished)}</Card.Subtitle>
                                                            <Card.Subtitle className='pt-3'>Price: &#8377;{data.bookDetails.Price}</Card.Subtitle>
                                                            <Card.Subtitle className='pt-3'>Rating: {data.bookDetails.rating > 0 ? data.bookDetails.rating : <>N/A</>}</Card.Subtitle>
                                                        </Col>
                                                        <Col className='d-flex flex-column align-items-center justify-content-center'>
                                                            <h5>Delivery Status</h5>
                                                            {
                                                                !data.delivered.status ?
                                                                    <Form.Group controlId={`formCheckbox-${data.orderId}`}>
                                                                        <Form.Label>Not yet delivered!</Form.Label>
                                                                        <Form.Check
                                                                            type="checkbox"
                                                                            label="Delivery"
                                                                            id={`custom-checkbox-${data.orderId}`}
                                                                            custom
                                                                            checked={currentStatus.status}
                                                                            onChange={() => handleCheckboxChange(data.orderId)}
                                                                        />
                                                                    </Form.Group>
                                                                    :
                                                                    <h6 className='text-success'>Delivered Successfully</h6>
                                                            }
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                </div>
                            )
                        })
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default Books
