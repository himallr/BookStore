import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SideBars = (props) => {
    const [selectedItem, setSelectedItem] = useState(null);

    const handleItemClick = (name) => {
        setSelectedItem(name);
    };

    return (
        <div>
            <ul>
                <li>
                    <Link className={`text-decoration-none link ${selectedItem === props.name ? 'selected' : ''}`} to={`/${props.to}`} onClick={() => handleItemClick(props.name)}>
                        {props.isOpen ?
                            <>
                                <span className="icon">
                                    <props.Logo />
                                </span>
                                {props.name}
                            </>
                            :
                            <span className="icon">
                                <props.Logo />
                            </span>
                        }
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default SideBars
