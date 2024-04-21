import React, { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from "react-router";
import { Button, Col, Container, Nav, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Admin.css';
import { getDashDatas } from '../../Services/Apihelpers';

const AdminDashboard = () => {

    const id = localStorage.getItem("adminID")

    const [activeLink, setActiveLink] = useState(0);
    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    const [dash, setDash] = useState();
    useEffect(() => {
        getDashDatas().
            then((data) => {
                setDash(data);
            })
    }, [id])

    return (
        <Container fluid>
            <Row>
                <Col xs={1} sm={2} md={2}>
                    <div className="sidebar" style={{ width: '150px', height: '100vh', backgroundColor: '#f8f9fa', paddingTop: '20px', maxHeight: '100vh' }}>
                        <Nav className="flex-column">
                            <Nav.Link
                                as={Link}
                                to={{ pathname: '/Dashboard/ProfileAdmin', state: { data: dash } }}
                                className={activeLink === 0 ? 'active' : ''}
                                onClick={() => handleLinkClick(0)}
                                exact
                            >
                                Profile
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to={{ pathname: '/Dashboard/Cust', state: { data: dash } }}
                                className={activeLink === 1 ? 'active' : ''}
                                onClick={() => handleLinkClick(1)}
                                exact
                            >
                                Customers
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to={{
                                    pathname: '/Dashboard/Order',
                                }}
                                className={activeLink === 2 ? 'active' : ''}
                                onClick={() => handleLinkClick(2)}
                                exact
                            >
                                Orders
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to={{ pathname: '/Dashboard/Reviews', state: { data: dash } }}
                                className={activeLink === 3 ? 'active' : ''}
                                onClick={() => handleLinkClick(3)}
                                exact
                            >
                                Reviews
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to={{ pathname: '/Dashboard/Reviews', state: { data: dash } }}
                                className={activeLink === 4 ? 'active' : ''}
                                onClick={() => handleLinkClick(4)}
                                exact
                            >
                                Statistics
                            </Nav.Link>
                        </Nav>
                    </div>

                </Col>
                <Col xs={12} sm={10} md={10}>
                    <Outlet />
                </Col>
            </Row>

        </Container>
    )
}

export default AdminDashboard
