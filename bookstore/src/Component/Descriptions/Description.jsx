import React from 'react'

const Description = (props) => {
    return (
        <div className='container mb-5'>
            <div className='row'>
                <div className='col-md-12'>
                    <h2>Descriptions</h2>
                    <div className='card'>
                        <div className='card-body'>
                            <p className='card-text h6'>{props.description}</p>
                        </div>
                        <hr />
                        <div className='d-flex flex-column justify-content-between p-3'>
                            <div>
                                <h3 style={{color: "#508D69"}}>Book Author</h3>
                                <p className='text-muted h5'>{props.Author}</p>
                            </div>
                            <hr />
                            <div>
                                <h3 style={{color: "#508D69"}}>Type of Book</h3>
                                <p className='text-muted h5'>{props.BookType}</p>
                            </div>
                            <hr />
                            <div>
                                <h3 style={{color: "#508D69"}}>Language</h3>
                                <p className='text-muted h5'>English</p>
                            </div>
                            <hr />
                            <div>
                                <h3 style={{color: "#508D69"}}>Pages</h3>
                                <p className='text-muted h5'>{props.pages}</p>
                            </div>
                            <hr />
                            <div>
                                <h3 style={{color: "#508D69"}}>Year Published</h3>
                                <p className='text-muted h5'>{new Date(props.yearPublished).getFullYear()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Description
