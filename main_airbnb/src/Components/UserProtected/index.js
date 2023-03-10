import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom'

const UserProtected = ( {children} ) => {
    const { user } = useSelector(state => state.auth);
    const location = useLocation();

    if (!user) {
        const url = location.pathname;
        return <Navigate to={`/signin?redirect=${url}`} replace/>
    }
    return children;
}

export default UserProtected