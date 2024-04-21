import React, { useState } from 'react';
import { BsBoxArrowLeft, BsPerson, BsCart, BsBarChart, BsStar, BsGear, BsList } from 'react-icons/bs'; // Import Bootstrap icons
import './Sidebar.css';
import SideBars from './SideBars';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const sideele = [
        {
            Name: "Customers",
            To: "Dashboard/Cust",
            Logo: BsPerson
        },
        {
            Name: "Order",
            To: "Dashboard/Order",
            Logo: BsCart
        },
        {
            Name: "Reviews",
            To: "Dashboard/Reviews",
            Logo: BsStar
        },
        {
            Name: "Settings",
            To: "Dashboard/Settings",
            Logo: BsGear
        },
        {
            Name: "Statistics",
            To: "Dashboard/Statistics",
            Logo: BsBarChart
        },

    ];

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <button onClick={toggleSidebar} className="toggle-button">
                {isOpen ? <BsBoxArrowLeft /> : <BsList />}
                {isOpen ? null : <span className="sr-only">Toggle Sidebar</span>}
            </button>
            {
                sideele && sideele.map((data) => {
                    return (
                        <>
                            <SideBars name={data.Name} to={data.To} Logo={data.Logo} isOpen={isOpen} />
                        </>
                    )
                })
            }
        </div>
    );
};

export default Sidebar;
