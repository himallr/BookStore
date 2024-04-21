import React from 'react'
import "./Skeleton.css"

const Skeleton = ({ width, height, variant, count, borderRadius, margin }) => {

    const style = {
        width,
        height,
        borderRadius,
        margin
    }
    return (
        <>
            {
                count ?
                    Array.from({ length: count }, (_, index) => <div className={`skeleton ${variant}`} style={style}>
                    </div>)
                    :
                    <div className={`skeleton ${variant}`} style={style}>
                    </div>
            }
        </>

    )
}

export default Skeleton
