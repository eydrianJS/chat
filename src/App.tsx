import { Container } from '@material-ui/core';
import Box from '@material-ui/core/Box/Box';
import { useRef } from 'react';
import { Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import routeBuilders from './shared/routeBuilders';
import './shared/styles/globalStyles.css';
import background from './shared/assets/cloud-chat-bg.svg';

function App() {
  const routes = useRef({
    login: routeBuilders.login(),
    register: routeBuilders.register(),
  }).current;

  return (
    <Container maxWidth='lg' style={{ display: 'flex' }}>
      <Route exact path={routes.register}>
        <Register />
      </Route>
      <Route path={routes.login}>
        <Login />
      </Route>
      <Box
        flex='1'
        className='background'
        style={{ backgroundImage: `url(${background})` }}
      />
    </Container>
  );
}

export default App;
