import { Container } from '@material-ui/core';
import { useRef } from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import routeBuilders from './shared/routeBuilders';
import './shared/styles/globalStyles.css';
import Chat from './components/Chat/Chat';

function App() {
  const routes = useRef({
    chat: '/chat/room/:roomId',
  }).current;

  return (
    <Container maxWidth='lg' style={{ display: 'flex', height: '100vh' }}>
      <Auth />
      <Switch>
        <Route path={routes.chat}>
          <Chat />
        </Route>
      </Switch>
    </Container>
  );
}

export default App;
