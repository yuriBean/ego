import { Route, Routes, useLocation } from 'react-router-dom';
import Home from '../pages/home';
import Pricing from '../pages/pricing';
import About from '../pages/about';
import Header from './../components/HomeHeader';
import Footer from './../components/Footer';
import Login from '../components/Authentication/login';
import Register from '../components/Authentication/Register';
import SpinningWheel from '../components/wheel';
import GameManagement from '../pages/GameManagement';
import FlyerCustomization from '../pages/FlyerCustomization';
import CustomerReviews from '../pages/Reviews';
import Faqs from '../pages/faqs';
import Settings from '../pages/Settings';
import PaymentSuccess from '../components/Authentication/PaymentSuccess';
import AccountManagement from '../components/AccountManagement';
import PaymentHistory from '../components/PaymentHistory';
import { useSelector } from 'react-redux'
import VerifyAuth from '../components/VerifyAuth';
import UserManagement from '../pages/UserManagement';
import ResturantPages from '../pages/ResturantPages';
import TrialManagement from '../pages/TrialManagement';
import Subscription from '../pages/Subscription';
import AllLandingPages from '../components/AllLandingPages';
import SpinGame from '../components/SpinGame';
import AdminSettings from './../pages/AdminSettings';
import User from '../pages/Dashboards/User';
import AdminDashboard from '../pages/Dashboards/Admin';
import { useState } from 'react';
import BookADemo from '../pages/Demo';
import ForgotPass from '../components/Authentication/ForgotPass';
import ResetPassword from '../components/Authentication/ResetPassword';

const Index = () => {
  const userId = useSelector(state => state.authentication.userId);
  const accountType = useSelector(state => state.authentication.accountType);
  const isAdmin = useSelector(state => state.authentication.isAdmin);
  const [open, setOpen] = useState(false);
  
  const location = useLocation(); // Get current path

  // Check if the current path matches the SpinGame route
  const isSpinGameRoute = location.pathname.startsWith('/spin/game/');

  return (
    <>
      {/* Conditionally render Header based on the current route */}
      {!userId && !isSpinGameRoute && <Header open={open} setOpen={setOpen} />}
      {
        !open &&
        <Routes>
          <Route path="/" element={userId ? isAdmin ? <AdminDashboard /> : <User />  : <Home />} />
          <Route path="/about" element={!userId ? <About /> : <GameManagement />} />

          <Route path="/pricing" element={!userId ? <Pricing /> : <Pricing userId={userId}/>} /> 

          <Route path="/faqs" element={!userId ? <Faqs /> : <GameManagement />} />
          <Route path="/register" element={!userId ? <Register /> : <GameManagement />} />
          <Route path="/demo" element={!userId ? <BookADemo /> : <GameManagement />} />
          <Route path="/register" element={!userId ? <Register /> : <GameManagement />} />

          <Route path="/login" element={!userId ? <Login /> : <GameManagement />} />
          <Route path="/forgot" element={!userId ? <ForgotPass /> : <GameManagement />} />
          <Route path="/reset-password/:token" element={!userId ? <ResetPassword /> : <GameManagement />} />

          <Route path="/game" element={userId ? accountType === 'main' ? <GameManagement /> : <AllLandingPages /> : <Home />} />
          <Route path="/flyer" element={userId ? accountType === 'main' ? <FlyerCustomization /> : <AllLandingPages /> : <Home />} />
          <Route path="/landing-pages" element={userId ? <AllLandingPages /> : <Home />} />
          <Route path="/game/:id" element={userId ? <GameManagement /> : <Home />} />
          <Route path="/spin/game/:id" element={<SpinGame />} />
          <Route path="/reviews" element={userId ? <CustomerReviews /> : <Home />} />
          <Route path="/settings" element={userId ? <Settings /> : <Home />} />
          <Route path="/admin/settings" element={userId ? <AdminSettings /> : <Home />} />
          <Route path="/all/pages" element={userId ? <ResturantPages /> : <Home />} />
          <Route path="/accounts" element={userId ? <AccountManagement /> : <Home />} />
          <Route path="/history" element={userId ? <PaymentHistory /> : <Home />} />
          <Route path="/success" element={<PaymentSuccess />} />
          <Route path="/verify" element={<VerifyAuth />} />
          <Route path="/dashboard" element={<User />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/dashboard/:id" element={<User />} />
          <Route path="/wheel" element={<SpinningWheel />} />
          <Route path="/user-management" element={userId ? <UserManagement /> : <Home />} />
          <Route path="/trial-management" element={userId ? <TrialManagement /> : <Home />} />
          <Route path="/subscription" element={userId ? <Subscription /> : <Home />} />
        </Routes>
      }
      {/* Conditionally render Footer based on the current route */}
      {!userId && !open && !isSpinGameRoute && <Footer />}
    </>
  )
}

export default Index;
