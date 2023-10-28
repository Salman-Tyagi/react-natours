import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';

import store from './store';

import Home from './pages/Home';
import Login from './authentication/Login';
import Signup from './authentication/Signup';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './ui/AppLayout';
import Tour from './pages/Tour';
import Account from './authentication/Account';
import ProtectedRoutes from './authentication/ProtectedRoutes';
import Bookings from './pages/Bookings';
import Payments from './pages/Payments';
import ForgotPassword from './authentication/ForgotPassword';
import ResetPassword from './authentication/ResetPassword';

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path='/tour/:slug' element={<Tour />} />
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<Signup />} />
            <Route path='forgot-password' element={<ForgotPassword />} />
            <Route
              path='reset-password/:resetToken'
              element={<ResetPassword />}
            />
            <Route
              path='/account'
              element={
                <ProtectedRoutes>
                  <Account />
                </ProtectedRoutes>
              }
            />
            <Route
              path='/payments'
              element={
                <ProtectedRoutes>
                  <Payments />
                </ProtectedRoutes>
              }
            />
            <Route
              path='/bookings'
              element={
                <ProtectedRoutes>
                  <Bookings />
                </ProtectedRoutes>
              }
            />
            <Route path='*' element={<PageNotFound />} />
          </Route>
        </Routes>
        <Toaster containerStyle={{ fontSize: '1.8rem' }} />
      </BrowserRouter>
    </Provider>
  );
}
