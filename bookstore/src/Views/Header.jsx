import React from 'react'
import { Link } from 'react-router-dom';
import { adminActions, userActions } from '../Store/store';
import { useDispatch, useSelector } from 'react-redux';
import "./Header.css"

const Header = () => {
    const dispatch = useDispatch();
    const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
    const { cartItems } = useSelector((state) => state.cart);
    const { favListItems } = useSelector((state) => state.fav);

    const logout = () => {
        dispatch(userActions.logout())
    }

    const Adminlogout = () => {
        dispatch(adminActions.logout())
    }

    return (
        <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-success px-3" style={{ "paddingLeft": "0px", "position": "sticky" }}>
            <Link className="navbar-brand text-white" to="/">E-book</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon color-white"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <form>
                    <ul className="form-inline navbar-nav ml-auto">
                        {isUserLoggedIn &&
                            <ul className='navbar-nav ml-auto'>
                                <li className="nav-item mx-2 my-2">
                                    <Link className="nav-link text-white" to="/Cart">Cart
                                        <span className="pl-1 text-dark">
                                            <sup className="badge">{cartItems && cartItems.length}</sup>
                                        </span>
                                    </Link>
                                </li>
                                <li className="nav-item mx-2 my-2">
                                    <Link className="nav-link text-white" to="/Order">Orders</Link>
                                </li>
                                <li className="nav-item mx-2 my-2">
                                    <Link className="nav-link text-white" to="/Fav">Favourites
                                        <span className="pl-1 text-dark">
                                            <sup className="badge">{favListItems && favListItems.length}</sup>
                                        </span>
                                    </Link>
                                </li>
                                <li className="nav-item mx-2 my-2">
                                    <Link className="nav-link text-white" to="/" onClick={() => { logout() }}>Logout</Link>
                                </li>
                            </ul>
                        }
                        {isAdminLoggedIn &&
                            <ul className='navbar-nav ml-auto'>
                                <li className="nav-item mx-2 my-2">
                                    <Link className="nav-link text-white" to="/addBook">Add Books</Link>
                                </li>
                                <li className="nav-item mx-2 my-2">
                                    <Link className="nav-link text-white" to="/Dashboard">Dashboard</Link>
                                </li>
                                <li className="nav-item mx-2 my-2">
                                    <Link className="nav-link text-white" to="/" onClick={() => { Adminlogout() }}>Logout</Link>
                                </li>
                            </ul>
                        }
                        {!isAdminLoggedIn && !isUserLoggedIn &&
                            <ul className='navbar-nav ml-auto'>
                                <li className="nav-item mx-2 my-2">
                                    <Link className="nav-link text-white" to="/User">Login</Link>
                                </li>
                                <li className="nav-item mx-2 my-2">
                                    <Link className="nav-link text-white" to="/Admin">Admin</Link>
                                </li>

                            </ul>
                        }
                    </ul>
                </form>
            </div>
        </nav>
    )
}

export default Header
