import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { getDashDatas } from '../../Services/Apihelpers';
import Ratings from './Ratings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Reviews = (props) => {

    const [dash, setDash] = useState();
    useEffect(() => {
        getDashDatas().
            then((data) => {
                setDash(data);
            })
    }, [])

    const [selectedId, setSelectedId] = useState(null);

    const handleViewMoreClick = (id) => {
        setSelectedId((prevId) => (prevId === id ? null : id));
    };

    const onChange = (star) => {
        let stars = Array.from({ length: 5 }, (_, index) => (
            <FontAwesomeIcon
                key={index + 1}
                icon={faStar}
                className={index < star ? 'star-filled' : 'star'}
            />
        ));
        return stars;
    }

    return (
        <Container>
            <Row>
                <Col lg={12} className='mt-4'>
                    <Card className='px-4 py-3'>
                        <Card.Title className=''>Reviews List:</Card.Title>
                        {
                            dash && dash.reviews.map((data, index) => {
                                return (
                                    <div>
                                        <Row>
                                            <Col lg={5} className='mt-2'>
                                                <Card.Title>{data.BookName}</Card.Title>
                                                <Card.Subtitle>ID:{data._id}</Card.Subtitle>
                                            </Col>
                                            <Col>
                                                <div className="star-rating my-0">
                                                    {onChange(data.totalRating)}
                                                </div>
                                            </Col>
                                            <Col lg={2} className='mt-2'>
                                                <Button variant='outline-success' onClick={() => handleViewMoreClick(data._id)}>View More</Button>
                                            </Col>
                                        </Row>
                                        {selectedId === data._id &&
                                            <Ratings ratings={data.ratings} totalRating={data.totalRating} />
                                        }
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

export default Reviews
