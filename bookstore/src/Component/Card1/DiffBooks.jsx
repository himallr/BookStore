import React, { useEffect, useState } from 'react'
import { filterSearch, getBookName, getBookType, getBooks } from '../../Services/Apihelpers';
import Book from '../Books/Book';
import { Col, Container, Form, Nav, Row } from 'react-bootstrap';
import Scroll from '../../Scroll';
import { Button } from 'react-bootstrap';

const DiffBooks = () => {

    const [booknames, setBookNames] = useState([]);
    const [name, setName] = useState('');

    //search of book name
    const handleNameChange = (event) => {
        const names = event.target.value
        setName(event.target.value);
        if (!names.trim()) {
            console.log(booknames);
            setBookNames([]);
            return; // Exit the function early if the search input is empty
        }
        getBookName(names).then((data) => { setBookNames(data.books) })

    };
    console.log(booknames);


    //display all the books
    const [books, setBooks] = useState([]);
    useEffect(() => {
        getBooks()
            .then((data) => {
                setBooks(data.books)
            })
    }, [])


    //search of genre using options
    const genreOpts = ["Choose", "Fiction", "Fantasy", "scific", "Mystery", "Biography", "Comedy", "autobiography", "Horror"]

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };
    const [genres, setGenres] = useState('');
    const storedGenres = localStorage.getItem('genres') || '';
    const storedOffer = localStorage.getItem('offer') || '';
    const storedRating = localStorage.getItem('rating') || '';
    const storedMinPrice = localStorage.getItem('minPrice') || 0;
    const storedMaxPrice = localStorage.getItem('maxPrice') || '';
    const storedMinYearPublished = localStorage.getItem('minYearPublished') || '';
    const storedMaxYearPublished = localStorage.getItem('maxYearPublished') || '';

    const [formData, setFormData] = useState({
        genres: storedGenres,
        offer: storedOffer,
        rating: storedRating,
        minPrice: storedMinPrice,
        maxPrice: storedMaxPrice,
        minYearPublished: storedMinYearPublished,
        maxYearPublished: storedMaxYearPublished
    });
    useEffect(() => {
        localStorage.setItem('genres', formData.genres);
        localStorage.setItem('offer', formData.offer);
        localStorage.setItem('rating', formData.rating);
        localStorage.setItem('minPrice', formData.minPrice);
        localStorage.setItem('maxPrice', formData.maxPrice);
        localStorage.setItem('Recent Min Released', formData.minYearPublished);
        localStorage.setItem('Recent Max Released', formData.maxYearPublished);

        filterSearch(formData.genres, formData.offer, formData.rating, formData.minPrice, formData.maxPrice, formData.minYearPublished, formData.maxYearPublished)
            .then((data) => {
                console.log(data);
                setGenres(data);
            })
    }, [formData.genres, formData.offer, formData.rating, formData.minPrice, formData.maxPrice, formData.minYearPublished, formData.maxYearPublished]);

    const handleClear = () => {
        setFormData({
            genres: '',
            offer: '',
            rating: '',
            minPrice: 0,
            maxPrice: '',
            minYearPublished: '',
            maxYearPublished: ''
        });
    }

    return (
        <Container fluid className='mt-5'>
            <Row>
                <Col md={6} className="mx-auto">
                    <div className='my-3'>
                        <input
                            type="text"
                            id="genre"
                            value={name}
                            onChange={handleNameChange}
                            className='form-control border-3 border-success'
                            placeholder="Search..."
                        />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md={3}>

                    <Nav className="navbar navbar-expand-lg navbar-light px-3" style={{ "paddingLeft": "0px" }}>
                        <Button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#diffbooksnavbar" aria-controls="diffbooksnavbar" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon color-white" ></span>
                        </Button>
                        <div className="collapse navbar-collapse" id="diffbooksnavbar">
                            <Col md={12}>
                                <h3 className='pt-4'>Choose :</h3>
                                <Form>
                                    <Form.Group controlId="source">
                                        <Form.Label>Genre:</Form.Label>
                                        <Form.Select
                                            type="text"
                                            name="genres"
                                            value={formData.genres}
                                            onChange={handleChange}
                                            required
                                        >
                                            {
                                                genreOpts && genreOpts.map((data) => {
                                                    return <option value={data === "Choose" ? '' : data}>{data}</option>
                                                })
                                            }
                                        </Form.Select>
                                    </Form.Group>
                                    <Row>
                                        <Col lg={6} md={12} xs={6}>
                                            <Form.Group controlId="rating" className='mt-4'>
                                                <Form.Label>Rating:</Form.Label>
                                                <Form.Select
                                                    type="text"
                                                    name="rating"
                                                    value={formData.rating}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="">Choose</option>
                                                    <option value="1">1 Star</option>
                                                    <option value="2">2 Stars</option>
                                                    <option value="3">3 Stars</option>
                                                    <option value="4">4 Stars</option>
                                                    <option value="5">5 Stars</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6} md={12} xs={6}>
                                            <Form.Group controlId="offer" className='mt-4'>
                                                <Form.Label>Offer:</Form.Label>
                                                <div>
                                                    <Form.Check
                                                        type="radio"
                                                        label="Yes"
                                                        name="offer"
                                                        id="offer-yes"
                                                        value="true"
                                                        checked={formData.offer === 'true'}
                                                        onChange={handleChange}
                                                        inline
                                                    />
                                                    <Form.Check
                                                        type="radio"
                                                        label="No"
                                                        name="offer"
                                                        id="offer-no"
                                                        value="false"
                                                        checked={formData.offer === 'false'}
                                                        onChange={handleChange}
                                                        inline
                                                    />
                                                </div>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={6} xs={6}>
                                            <Form.Group controlId="minPrice" className='mt-4'>
                                                <Form.Label>Min Price:</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="minPrice"
                                                    value={formData.minPrice}
                                                    onChange={handleChange}
                                                    placeholder="Enter min price"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6} xs={6}>
                                            <Form.Group controlId="maxPrice" className='mt-4'>
                                                <Form.Label>Max Price:</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="maxPrice"
                                                    value={formData.maxPrice}
                                                    onChange={handleChange}
                                                    placeholder="Enter max price"
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={6} md={12} xs={6}>
                                            <Form.Group controlId="minYearPublished" className='mt-4'>
                                                <Form.Label>Min Year Published:</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="minYearPublished"
                                                    value={formData.minYearPublished}
                                                    onChange={handleChange}
                                                    placeholder="Enter min year published"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6} md={12} xs={6}>
                                            <Form.Group controlId="maxYearPublished" className='mt-4'>
                                                <Form.Label>Max Year Published:</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="maxYearPublished"
                                                    value={formData.maxYearPublished}
                                                    onChange={handleChange}
                                                    placeholder="Enter max year published"
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <div className="d-flex justify-content-center mt-3">
                                        <Button variant='secondary' onClick={handleClear}>Clear All</Button>
                                    </div>
                                </Form>
                            </Col>
                        </div>
                    </Nav>
                </Col>
                <Col md={9}>
                    <Row>
                        {(booknames.length === 0 && genres.length === 0
                            ? books
                            : booknames.length !== 0
                                ? booknames
                                : genres
                        ).map((item, index) => (
                            <div className='col-lg-3 col-md-4 col-sm-6 col-sx-6 py-3'>
                                <Book id={item._id} BookName={item.BookName} key={index} Price={item.Price} image={item.image} />
                            </div>
                        ))}
                    </Row>

                </Col>
            </Row>
            <Scroll />
        </Container >
    )
}

export default DiffBooks
