import React from 'react';
import { Route } from 'react-router-dom';
import MyComponent from '../API/MyComponent'; 

const Routes = () => {
    return (
        <>
            
            <Route path="/my-component" element={<MyComponent />} />
            
        </>
    );
};

export default Routes;
