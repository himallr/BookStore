import React, { useEffect, useState } from 'react'
import Bookcard from "../Component/Books/Bookcard"
import Types from "../Component/Books/Types"
import './Style.css';
import { getUserById } from '../Services/Apihelpers';

const Main = () => {

    const [user, setUser] = useState();
    const id = localStorage.getItem("UserID")
    useEffect(() => {
        getUserById(id).then((data) => {
            setUser(data)
        })
            .catch((e) => { console.log(e); })
    }, [id])

    return (
        <div>
            <h1 className='font-weight-bold text-success text-center mb-5 mt-3'>Welcome {user && user.Name}!</h1>
            <Bookcard />
            <Types />
        </div>
    )
}

export default Main
