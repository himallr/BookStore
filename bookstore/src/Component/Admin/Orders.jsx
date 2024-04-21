import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { useLocation } from 'react-router-dom';
import { Button, Card, Col, Container, ModalTitle, Row } from 'react-bootstrap';
import { getDashDatas } from '../Services/Apihelpers';
import Books from './Books';

const Orders = (props) => {

    const id = localStorage.getItem("adminID")
    const [dash, setDash] = useState();
    useEffect(() => {
        getDashDatas().
            then((data) => {
                setDash(data);
            })
    }, [id])

    const [selectedId, setSelectedId] = useState(null);

    const handleViewMoreClick = (id) => {
        setSelectedId((prevId) => (prevId === id ? null : id));
    };

    return (
        <Container>
            <Row>
                <Col lg={12} className='mt-4'>
                    <ModalTitle className='mb-2'>Orders:</ModalTitle>
                    <Card className='px-4 py-3'>
                        {
                            dash && dash.totalSalesResult.map((data, index) => {
                                return (
                                    <div>
                                        <Row>
                                            <Col lg={5} className='mt-2'>
                                                <Card.Title>{data.userName.charAt(0).toUpperCase() + data.userName.slice(1).toLowerCase()}</Card.Title>
                                                <Card.Subtitle>{data.userDetails.Email}</Card.Subtitle>
                                            </Col>
                                            <Col className='mt-2'>
                                                <Card.Title>&#8377;{data.totalSales}</Card.Title>
                                            </Col>
                                            <Col lg={2} className='mt-2'>
                                                <Button variant='outline-success' onClick={() => handleViewMoreClick(data._id)}>View More</Button>
                                            </Col>
                                        </Row>
                                        {selectedId === data._id && <Books booksInOrder={data.booksInOrder} />}
                                        <hr></hr>
                                    </div>
                                )
                            })
                        }

                    </Card>
                </Col>
            </Row>
        </Container >
    )
}

export default Orders
