import React from 'react';
import {
  Routes,
  Route,
  BrowserRouter,
} from 'react-router-dom';

import Login from '../pages/Login';
import LeadsDashboard from '../pages/LeadsDashboard';
import RegisterLead from '../pages/RegisterLead';
import PrivateRoute from './PrivateRoute';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={(
            <PrivateRoute>
              <LeadsDashboard />
            </PrivateRoute>
        )}
        />
        <Route
          path="new"
          element={(
            <PrivateRoute>
              <RegisterLead />
            </PrivateRoute>
        )}
        />
      </Routes>
    </BrowserRouter>

  );
}

export default AppRoutes;
