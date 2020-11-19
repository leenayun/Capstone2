import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home/Home';
// import Login from './pages/Login/Login';
import Agenda from './pages/Agenda/Agenda';
import Conference from './pages/Conference/Conference';
import ConferenceAdd from './pages/Conference/ConferenceAdd';
import ConferenceResultAdd from './pages/Conference/ConferenceResultAdd';
import ConferenceDetail from './pages/Conference/ConferenceDetail';
import AgendaDetail from './pages/Agenda/AgendaDetail';
import Admin from './pages/Admin/Admin';
import Monitering from './pages/Monitering/Monitering';
import MyPage from './pages/MyPage/MyPage';
import Community from './pages/Community/Community';

import NotFound from './NotFound';
import LoginForm from './components/auth/LoginForm';
import LogoutButton from './LogoutButton';
import { signIn } from './components/auth/auth';
import AuthRoute from './components/auth/AuthRoute';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Login" component={LoginForm} />
        <Route exact path="/Conference" component={Conference} />
        <Route exact path="/Conference/Add" component={ConferenceAdd} />
        <Route exact path="/Conference/:id/ResultAdd" component={ConferenceResultAdd} />
        <Route exact path="/Conference/:id" component={ConferenceDetail} />
        <Route exact path="/Agenda" component={Agenda} />
        <Route path="/Agenda/:id" component={AgendaDetail} />
        <Route exact path="/Mypage" component={MyPage} />
        <Route exact path="/Community" component={Community} />{' '}
        <Route exact path="/Admin" component={Admin} />
        <Route exact path="/Monitering" component={Monitering} />
        <Route exact path="/NotFound" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
