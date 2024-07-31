import React from 'react';
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom'
import { useSelector } from 'react-redux';

import Home from './views/Home/Home';
import SignUp from './views/SignUp/SignUp';
import TopBar from './components/TopBar';
import Contact from './views/Contact/Contact'
import UserPage from './views/UserPage/UserPage';
import Login from './views/Login/Login';
import UserUpdateProfile from './components/UserUpdateProfile';

const App = () => {

  const { isLoggedIn } = useSelector(store => {
    return {
      isLoggedIn : store.isLoggedIn
    }
  });

  return(
    <div>

      <BrowserRouter>

        <TopBar />

        <Routes>
          <Route exact path="/" element={<Home />}/>

          {!isLoggedIn && (
            <Route path="/login" element={<Login />}/>
          )}

          <Route path="/signup" element={<SignUp />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/profile/:email" element={<UserPage />} />

          <Route path="/profile/update/:email" element={<UserUpdateProfile />} />

          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>

      </BrowserRouter>

    </div>
  );

}

export default App;