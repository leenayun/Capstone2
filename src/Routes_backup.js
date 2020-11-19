import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home/Home';
// import Login from './pages/Login/Login';
// import AgendaList from './pages/Agenda/AgendaList';
import Conference from './pages/Conference/Conference';
// import Admin from './pages/Admin/Admin';
import MyPage from './pages/MyPage/MyPage';

import About from './About';
import Profile from './Profile';
import NotFound from './NotFound';
import LoginForm from './components/auth/LoginForm';
import LogoutButton from './LogoutButton';
import { signIn } from './components/auth/auth';
import AuthRoute from './components/auth/AuthRoute';

const Routes = () => {
  const [user, setUser] = useState(null);
  const authenticated = user != null;

  const login = ({ aptName, dong, houseHold, password }) =>
    setUser(signIn({ aptName, dong, houseHold, password }));
  const logout = () => setUser(null);

  return (
    <BrowserRouter>
      <Switch>
        {/* <Route path="/" component={Home} /> */}
        {/* <Route path="/login" component={Login} />
        <Route path="/conference" component={Conference} />
        <Route path="/agendaList" component={AgendaList} />
        <Route path="/admin" component={Admin} />
        <Route path="/MyPage" component={MyPage} /> */}

        <Route
          path="/login"
          render={(props) => (
            <LoginForm
              exact
              authenticated={authenticated}
              login={login}
              {...props}
            />
          )}
        />
        <AuthRoute
          authenticated={authenticated}
          path="/"
          render={(props) => <Home exact user={user} {...props} />}
        />
        <AuthRoute
          authenticated={authenticated}
          path="/conference"
          render={(props) => <Conference exact user={user} {...props} />}
        />

        <AuthRoute
          authenticated={authenticated}
          path="/mypage"
          render={(props) => <MyPage exact user={user} {...props} />}
        />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
