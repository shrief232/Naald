import React, { useEffect } from 'react';
import { Navigate } from 'react-router';
import { useRecoilState } from 'recoil';
import { $isAuthorized } from '../../Atoms/authAtom';

function IsNotLoggedin({ children }) {
    const [isAuthorized] = useRecoilState($isAuthorized);
    if (!isAuthorized.isAuth) {
         <Navigate to="/" />;
    }   
    return(
        <>{children}</>
    )
}

export default IsNotLoggedin;
