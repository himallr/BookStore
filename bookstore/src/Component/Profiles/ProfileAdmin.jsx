import React, { useEffect, useState } from 'react'
import { getAdminById, removeBook } from '../../Services/Apihelpers'
import './ProfileAdmin.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ProfileAdmin = () => {
    const navigate = useNavigate();
    const [books, setBooks] = useState();
    const [id, setId] = useState();

    useEffect(() => {
        getAdminById()
            .then((datas) => {
                setBooks(datas)
            })
    }, [])
    console.log(books);
    console.log(id);

    const handleDelete = (id) => {
        removeBook(id)
    }
    const handleUpdate = (id) => {
        navigate(`/updateBook/${id}`)
    }

    const showSuccessToast = (message) => {
        toast.success(message);
    };

    const name = books && books.Name;
    const email = books && books.Email;

    return (
        <div className='container-fluid'>
            <ToastContainer
                position="top-center"
            />
            <div className='row'>
                <div className='col-md-3 my-5'>
                    <div className='d-flex flex-column'>
                        <h4 className='text-bold'>Name:<span className='h5'>{name}</span></h4>
                        <h4 className='text-bold'>Email:<span className='h5'>{email}</span></h4>
                    </div>
                </div>
                <div className='col-md-12'>
                    <h2 className='text-success text-bold mb-4 text-center'>Books Added</h2>
                    <div className='table-responsive'>
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr style={{ background: 'green', color: 'green' }}>
                                    <th>S.No</th>
                                    <th>Book Name</th>
                                    <th>Genre</th>
                                    <th>Updation</th>
                                    <th>Deletion</th>
                                </tr>
                            </thead>
                            {
                                books && books.addedbooks.map((item, index) => {
                                    return (
                                        <tbody>
                                            <tr>
                                                <td className="p-3">{index + 1}</td>
                                                <td className="p-3">{item.BookName}</td>
                                                <td className="p-3">{item.BookType}</td>
                                                <td className="p-3"><button onClick={() => handleUpdate(item._id)} className='btn btn-outline-success'>Edit</button></td>
                                                <td className="p-3"><button onClick={() => handleDelete(item._id)} className='btn btn-danger'>Delete</button></td>
                                            </tr>
                                        </tbody>

                                    )
                                }
                                )
                            }
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileAdmin
