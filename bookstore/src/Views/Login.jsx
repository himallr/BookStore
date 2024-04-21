import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Login = ({ onSubmit, isAdmin }) => {
    const [signin, setSignin] = useState(true);
    const [inputs, setInput] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handlechange = (e) => {
        e.preventDefault();
        setInput((prevstate) => ({
            ...prevstate, [e.target.name]: e.target.value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        onSubmit({ inputs, signup: isAdmin ? false : signin })

    }

    console.log("Is Admin", isAdmin);

    return (
        <div className='container d-flex justify-content-center my-5'>
            <div className='row'>
                <div className='col-md-12'>
                    {signin ? <div className='h3 text-center'>LOGIN PAGE</div> : <div className='h3 text-center'>SIGNUP PAGE</div>}

                    <form className='text-center' onSubmit={handleSubmit}>
                        {!signin &&
                            <div class="form-outline mb-4">
                                <input type="text" id="form2Example1" class="form-control" placeholder='Enter Name...' value={inputs.name} onChange={handlechange} name='name' />
                            </div>
                        }
                        <div class="form-outline mb-4">
                            <input type="email" id="form2Example1" class="form-control" placeholder='Enter email...' value={inputs.email} onChange={handlechange} name='email' />
                        </div>

                        <div class="form-outline mb-4">
                            <input type="password" id="form2Example2" class="form-control" placeholder='Enter Password...' value={inputs.password} onChange={handlechange} name='password' />
                        </div>
                        <div class="row mb-4 mx-0">
                            {!isAdmin ? <>
                                {signin ?
                                    <div class="col">
                                        Create an account? <Link to="" onClick={() => setSignin(false)}>Signup</Link>
                                    </div>
                                    :
                                    <div class="col">
                                        Already have an account?<Link onClick={() => setSignin(true)}>login</Link>
                                    </div>
                                }
                            </>

                                :
                                <></>
                            }
                        </div>

                        <button type="submit" class="btn btn-primary btn-block mb-4 text-center" >{signin ? <span>login</span> : <span>signup</span>}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
