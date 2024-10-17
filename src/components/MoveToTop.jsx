import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const MoveToTop = () => {
    const Location = useLocation();
    useEffect(()=>{
        window.scrollTo(0, 0)
    }, [Location.pathname])
}

export default MoveToTop
