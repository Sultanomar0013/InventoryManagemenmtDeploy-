import React from 'react';
import { Route } from 'react-router-dom';
import MyComponent from '../API/MyComponent'; 

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const url = `${backendUrl}/api/signup`; 
const Routes = () => {
    return (
        <>
            
            <Route path="/my-component" element={<MyComponent />} />
            
        </>
    );
};

export default Routes;
