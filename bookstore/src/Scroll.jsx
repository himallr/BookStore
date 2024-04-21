import React, { useEffect, useState } from 'react'

const Scroll = () => {
    const [scrolling, setScroll] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 500) {
                setScroll(true)
            }
            else {
                setScroll(false)
            }
        })
    }, [])

    const scrollup = () => {
        window.scrollTo({
            top: 100,
            behavior: "smooth",
            duration: 2000,
        })
    }
    return (
        <div>
            {scrolling && (
                <button style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    height: "70px",
                    width: "70px",
                    fontSize: "24px",
                    backgroundColor: "#9ADE7B",
                    color: "#304D30",
                    borderRadius: "50%",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    transition: "background-color 0.3s ease-in-out",
                    zIndex: 1000,
                }} onClick={scrollup}>^</button>
            )}
        </div>
    )
}

export default Scroll
