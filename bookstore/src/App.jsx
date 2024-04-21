import { Route, Router, Routes } from 'react-router-dom';
import Header from './Views/Header';
import Main from './Views/Main';
import Login from './Views/Login';
import BuyBook from './Component/Descriptions/Descriptions';
import DiffBooks from './Component/Card1/DiffBooks';
import Addbook from './Component/Books/Addbook';
import User from './Component/Profiles/User';
import Admin from './Component/Profiles/Admin'
import HP from './Component/Card2/HP';
import Cart from './Component/Carts/Cart';
import Offer from './Component/Card3/Offer';
import { useDispatch, useSelector } from 'react-redux';
import { adminActions, userActions } from './Store/store';
import { useEffect } from 'react';
import ProfileAdmin from './Component/Profiles/ProfileAdmin';
import AdminDashboard from './Component/Profiles/AdminDashboard';
import Orders from './Component/Orders/Orders';
import UpdateBook from "./Component/Books/UpdateBook"
import Sidebar from './Sidebar/Sidebar';
import SideBars from './Sidebar/SideBars';
import Scroll from './Scroll';
import OrderItems from './Component/Orders/OrderItems';
import OrderBookItems from './Component/Orders/OrderBookItems';
import Favourites from './Views/Favourites';
import OrderDescriptions from './Component/Orders/OrderDescriptions';
import Customers from './Component/Admin/Customers';
import Reviews from './Component/Admin/Reviews';
import Order from "./Component/Orders/Orders"

function App() {

  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);

  console.log("isUserLoggedIn : " + isUserLoggedIn);
  console.log("isAdminLoggedIn : " + isAdminLoggedIn);

  useEffect(() => {
    if (localStorage.getItem("UserID")) {
      dispatch(userActions.login());
    }
    else if (localStorage.getItem("adminID")) {
      dispatch(adminActions.login());
    }
  }, [dispatch])

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/login" element={<Login />}></Route>
        {/* profiles */}
        <Route path="/User" element={<User />}></Route>
        <Route path="/Admin" element={<Admin />}></Route>
        {isAdminLoggedIn &&
          <Route path='/Dashboard/*' element={<AdminDashboard />}>
            <Route index element={<ProfileAdmin />}></Route>
            <Route path="ProfileAdmin" element={<ProfileAdmin />}></Route>
            <Route path='Cust' element={<Customers />}></Route>
            <Route path='Order' element={<Order />} />
            <Route path='Reviews' element={<Reviews />}></Route>
          </Route>
        }
        {/* books */}
        {isAdminLoggedIn &&
          <Route path="/addBook" element={<Addbook />}></Route>
        }
        <Route path="/DiffBook" element={<DiffBooks />}></Route>
        <Route path="/OrderBookItems" element={<OrderBookItems />}></Route>
        <Route path="/BuyBook/:id" element={<BuyBook />}></Route>
        <Route path="/updateBook/:id" element={<UpdateBook />}></Route>
        <Route path="/hp" element={<HP />}></Route>
        <Route path="/Offer" element={<Offer />}></Route>
        {/* Carts and orders */}
        <Route path="/Cart" element={<Cart />}></Route>
        <Route path="/Order" element={<Orders />}></Route>
        <Route path="/OrderItems" element={<OrderItems />}></Route>
        <Route path="/desc/:id" element={<OrderDescriptions />}></Route>
        {/* sidebars */}
        <Route path="/SideBar" element={<Sidebar />}></Route>
        <Route path="/Scroll" element={<SideBars />}></Route>
        <Route path="/SideBars" element={<Scroll />}></Route>
        {/* favourites */}
        <Route path="/Fav" element={<Favourites />}></Route>
        {/* images */}
        {/* <Route path="/image" element={<AddImage />}></Route> */}
      </Routes>
    </div>
  );
}

export default App;
