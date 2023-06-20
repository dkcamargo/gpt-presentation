import React, { useEffect } from 'react'


import './customSlide.css';

function Slide({title, children}) {
    
    useEffect(() => {
        console.log(title);
    }, [])

    return (
        <div className="slide">
            <h2>{ title }</h2>
            <div className="body">{ children }</div>
        </div>
    )
}

export default Slide