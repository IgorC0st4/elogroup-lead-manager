import React from 'react';
import {
  Navigate,
} from 'react-router-dom';
import UserController from '../../controllers/UserController';

function PrivateRoute({ children }) {
  let user;
  try {
    user = UserController.fetchUser();
  } catch (error) {
    user = null;
  }
  if (user) {
    return children;
  }
  return (<Navigate to="/" replace />);
}

export default PrivateRoute;
