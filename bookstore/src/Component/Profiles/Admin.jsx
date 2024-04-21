import React from 'react'
import Login from '../../Views/Login'
import { adminActions } from '../../Store/store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addAdmin } from '../../Services/Apihelpers';
import { ToastContainer, toast } from 'react-toastify'

const Admin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const resrecieve = (data) => {
        console.log(data);
        if (data.message === "No Admin Found!" || data.message === "Wrong Pasword!") {
            toast.warning(data.message);
        }
        else {
            dispatch(adminActions.login())
            localStorage.setItem("adminID", data.id);
            localStorage.setItem("Token", data.token);
            navigate("/");
        }
    }
    const getData = (datas) => {
        console.log("Admin", datas);
        addAdmin(datas.inputs).then(resrecieve)
            .catch((e) => console.log(e))
    }
    const isAdmin = true
    return (
        <div>
            <Login onSubmit={getData} isAdmin={true} />
            <ToastContainer position='top-center' autoClose="500" />
        </div>
    )
}

export default Admin
