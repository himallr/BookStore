import React from 'react'
import Login from '../../Views/Login'
import { addUser } from '../../Services/Apihelpers'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { favActions, userActions } from "../../Store/store"
import { ToastContainer, toast } from 'react-toastify'

const User = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getData = (datas) => {
        addUser(datas.inputs, datas.signup)
            .then((data) => {
                if (data.message === "Unable to find user" || data.message === "Wrong Pasword!") {
                    IncorrectMsg(data.message)
                }
                else {
                    dispatch(userActions.login())
                    localStorage.setItem("UserID", data.id)
                    navigate("/")
                    console.log(userActions.login());
                }
            })
    }

    const IncorrectMsg = (message) => {
        toast.warning(message);
    };

    return (
        <div>
            <Login onSubmit={getData} isAdmin={false} />
            <ToastContainer position='top-center' autoClose="500" />
        </div>
    )
}

export default User
