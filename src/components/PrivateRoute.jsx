import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {

    // Check user logged in or not
    if (true) {
        return <Outlet />;
      } else {
          return <Navigate to="/login" replace />;
    }
}

export default PrivateRoute;