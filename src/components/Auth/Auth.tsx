import React, { useRef } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../Login/Login';
import Register from '../Register/Register';
import routeBuilders from '../../shared/routeBuilders';

const Auth = () => {
  const routes = useRef({
    login: routeBuilders.login(),
    register: routeBuilders.register(),
  }).current;

  return (
    <>
      <Switch>
        <Route exact path={routes.register}>
          <Register />
        </Route>
        <Route path={routes.login}>
          <Login />
        </Route>
      </Switch>
    </>
  );
};

export default Auth;
