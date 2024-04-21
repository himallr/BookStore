import React, { useState } from 'react'
import img from "../../Assets/img.avif"
import { addBooks } from '../../Services/Apihelpers';
import { ToastContainer, toast } from 'react-toastify';
const Addbook = () => {
    const [inputs, setInputs] = useState({
        BookNo: "",
        description: "",
        BookName: "",
        BookType: "",
        Author: "",
        pages: "",
        Price: "",
        yearPublished: "",
        rating: "",
        image: null,
        Offer: "",
        discount: ""
    });

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const convertToB64 = (e) => {
        const file = e.target.files[0];

        if (file) {
            var reader = new FileReader();

            reader.onload = () => {
                setInputs((prevInputs) => ({
                    ...prevInputs,
                    image: reader.result,
                }));
            };

            reader.readAsDataURL(file);
        }
    };

    const showSuccessToast = (message) => {
        toast.success(message);
    };

    console.log(inputs);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        addBooks({ ...inputs })
            .then((res) => {
                console.log(res);
                showSuccessToast("Successfully added")
            })
            .catch((err) => console.log(err));
    };

    return (
        <section classNameName="h-100 bg-dark">
            <ToastContainer
                position="top-center"
                autoClose="500"
            />
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col">
                        <div className="card card-registration my-4">
                            <form className="row g-0" onSubmit={handleSubmit}>
                                <div className="col-xl-6 d-none d-xl-block">
                                    <img src={img}
                                        alt="Sample photo" className="img-fluid"
                                        style={{ "borderTopLeftradius": "0.25rem", "border-bottom-left-radius": ".25rem" }} />
                                </div>
                                <div className="col-xl-6">
                                    <div className="card-body p-md-5 text-black">
                                        <h3 className="mb-5 text-uppercase text-center">Add Book</h3>

                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <input value={inputs.title} onChange={handleChange} name="BookNo" type="number" id="form3Example1m" className="form-control form-control-lg" />
                                                    <label className="form-label" for="form3Example1m">Book No.</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <input value={inputs.BookName} onChange={handleChange} name="BookName" type="text" id="form3Example1n" className="form-control form-control-lg" />
                                                    <label className="form-label" for="form3Example1n">Book name*</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <input value={inputs.BookType} onChange={handleChange} name="BookType" type="text" id="form3Example1m1" className="form-control form-control-lg" />
                                                    <label className="form-label" for="form3Example1m1">Book Type*</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <input value={inputs.Author} onChange={handleChange} name="Author" type="text" id="form3Example1n1" className="form-control form-control-lg" />
                                                    <label className="form-label" for="form3Example1n1">Author's name*</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <input value={inputs.pages} onChange={handleChange} name="pages" type="number" id="form3Example1m" className="form-control form-control-lg" />
                                                    <label className="form-label" for="form3Example1m">Pages</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <input value={inputs.Price} onChange={handleChange} name="Price" type="number" id="form3Example1n" className="form-control form-control-lg" />
                                                    <label className="form-label" for="form3Example1n">Price*</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <input value={inputs.yearPublished} onChange={handleChange} name="yearPublished" type="number" id="form3Example1m" className="form-control form-control-lg" />
                                                    <label className="form-label" for="form3Example1m">Year Published</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <input value={inputs.rating} onChange={handleChange} name="rating" type="number" id="form3Example1n" className="form-control form-control-lg" />
                                                    <label className="form-label" for="form3Example1n">Rating</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <input value={inputs.Offer} onChange={handleChange} name="Offer" type="text" id="form3Example1m" className="form-control form-control-lg" />
                                                    <label className="form-label" for="form3Example1m">Offer(true/false)*</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <input value={inputs.discount} onChange={handleChange} name="discount" type="number" id="form3Example1n" className="form-control form-control-lg" />
                                                    <label className="form-label" for="form3Example1n">Discount Rate</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input value={inputs.description} onChange={handleChange} name="description" type="text" id="form3Example8" className="form-control form-control-lg" />
                                            <label className="form-label" for="form3Example8">Description</label>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input onChange={convertToB64} name="image" type="file" id="form3Example8" className="form-control form-control-lg" />
                                            <label className="form-label" for="form3Example8">image*</label>
                                        </div>

                                        <div className="d-flex justify-content-center pt-3">
                                            <button type="submit" className="btn btn-success btn-lg ms-2">Add</button>
                                        </div>

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Addbook
