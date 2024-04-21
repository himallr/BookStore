import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Ratings = (props) => {

    const onChange = (star) => {
        let eachStars = Array.from({ length: 5 }, (_, index) => (
            <FontAwesomeIcon
                key={index + 1}
                icon={faStar}
                className={index < star ? 'star-filled' : 'star'}
                style={{ height: "15px" }}
            />
        ));
        return eachStars
    }


    return (
        <Container>
            <Row>
                <Col>
                    <hr></hr>
                    <h2>Ratings</h2>
                    {
                        props.ratings && props.ratings.map((data, index) => {
                            return (
                                <div>
                                    <Card className='py-0'>
                                        <Card.Body>
                                            <Card.Text className='text-bold h5 my-0'>{data.postedby.Name.charAt(0).toUpperCase() + data.postedby.Name.slice(1).toLowerCase()}</Card.Text>

                                            <div className="star-rating my-0">
                                                {onChange(data.star)}
                                            </div>
                                            <Card.Text className='my-0'>{data.comment}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </div>
                            )
                        })
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default Ratings
