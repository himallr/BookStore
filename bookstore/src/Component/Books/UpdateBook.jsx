import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateBook, getBookDetails } from '../../Services/Apihelpers';
import { Button, Form, FormLabel } from 'react-bootstrap';

const UpdateBook = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [book, setBook] = useState({
        BookNo: '',
        BookName: '',
        description: '',
        BookType: '',
        Author: '',
        Price: '',
    });

    console.log(book);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const bookDetails = await getBookDetails(id);
                setBook(bookDetails);
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        fetchBookDetails();
    }, [id]);

    const handleChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            await updateBook(id, book);
            navigate("/Dashboard/ProfileAdmin")
        } catch (error) {
            console.error('Error updating book:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className='text-success text-bold mt-5 mb-4 text-center'>Update Book - {book.BookNo}</h2>
            <Form>
                <div className="mb-3">
                    <FormLabel htmlFor="bookName" className="form-label">Book Name</FormLabel>
                    <input type="text" className="form-control" id="bookName" name="BookName" value={book.BookName} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <FormLabel htmlFor="description" className="form-label">Description</FormLabel>
                    <textarea className="form-control" rows={5} id="description" name="description" value={book.description} onChange={handleChange}></textarea>
                </div>
                <div className="mb-3">
                    <FormLabel htmlFor="bookType" className="form-label">Book Type</FormLabel>
                    <input type="text" className="form-control" id="bookType" name="BookType" value={book.BookType} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <FormLabel htmlFor="author" className="form-label">Author</FormLabel>
                    <input type="text" className="form-control" id="author" name="Author" value={book.Author} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input type="number" className="form-control" id="price" name="Price" value={book.Price} onChange={handleChange} />
                </div>
                <div className='d-flex justify-content-center'>
                    <Button variant='success' type="button" className="mx-auto" onClick={handleUpdate}>Update Book</Button>
                </div>
            </Form>
        </div>
    );
};

export default UpdateBook;
