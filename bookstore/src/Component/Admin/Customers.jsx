import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row, Table } from 'react-bootstrap'
import { getDashDatas } from '../../Services/Apihelpers';
import "./Customer.css"

const Customers = () => {

    const [dash, setDash] = useState();
    useEffect(() => {
        getDashDatas().
            then((data) => {
                setDash(data);
            })
    }, [])

    const totalSalesSum = dash && dash.totalSalesResult.reduce((acc, current) => acc + current.totalSales, 0);
    const totalSalesProfit = dash && dash.totalSalesResult.reduce((acc, current) => acc + current.totalSalesAfterDiscount, 0);

    return (
        <Container fluid>
            <Row className='mt-3'>
                <Col md={6} sm={6} xs={6}>
                    <Card>
                        <Card.Body>
                            <Card.Text className='text-bold my-0'>Total Sales</Card.Text>
                            <Card.Text className='h3'>&#8377;{totalSalesSum}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} sm={6} xs={6}>
                    <Card>
                        <Card.Body>
                            <Card.Text className='text-bold my-0'>Total Profit</Card.Text>
                            <Card.Text>{(totalSalesProfit - totalSalesSum) < 0 ? <h3 className='text-danger'>&#8377;{totalSalesProfit - totalSalesSum}</h3> : <h3 className='text-success'>&#8377;{totalSalesProfit - totalSalesSum}</h3>}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className='mt-3'>
                <Col lg={8} md={9} sm={12} xs={12} className='mt-2'>
                    <table bordered hover className="horizontal-border-table">
                        <thead>
                            <tr>
                                <th>Customer Name</th>
                                <th>Total Books Ordered</th>
                                <th>Total Quantity(ies)</th>
                                <th>Total Sales</th>
                                <th>Profit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dash && dash.totalSalesResult.map((data, index) => {
                                    return (
                                        <tr>
                                            <td>{data.userDetails.Name.charAt(0).toUpperCase() + data.userDetails.Name.slice(1).toLowerCase()}</td>
                                            <td>{data.totalBooksQuantity}</td>
                                            <td>{data.totalQuantity}</td>
                                            <td>&#8377;{data.totalSales}</td>
                                            <td>{(data.totalSales - data.totalSalesAfterDiscount) > 0 ? data.totalSales - data.totalSalesAfterDiscount : <>N/A</>}</td>
                                        </tr>
                                    )
                                })
                            }
                            {/* Add more rows as needed */}
                        </tbody>
                    </table>
                </Col>
                <Col lg={4} md={3} sm={12} xs={12} className='mt-2'>
                    <Card className='px-4 py-3'>
                        <Card.Title className='text-decoration-underline'>Customers List:</Card.Title>
                        {
                            dash && dash.totalSalesResult.map((data, index) => {
                                return (
                                    <div>
                                        <Card.Title>{data.userDetails.Name.charAt(0).toUpperCase() + data.userDetails.Name.slice(1).toLowerCase()}</Card.Title>
                                        <Card.Subtitle>{data.userDetails.Email}</Card.Subtitle>
                                        <hr></hr>
                                    </div>
                                )
                            })
                        }

                    </Card>
                </Col>
            </Row>

        </Container>
    )
}

export default Customers
