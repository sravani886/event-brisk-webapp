import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import Home from './components/home';
import Public from './components/public';
import Account from './components/account';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Signout from './components/auth/signout'
import RequireAuth from './components/auth/require_auth';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';

import '../style/style.scss'
import EventManage from './components/event_manage';
import VenueManage from './components/venue_manage';
import Venue from './components/venue';
import Service from './components/service';
import ServiceManage from './components/service_manage';
import Event from './components/event';
import ScrollToTop from './scrollToTop';
import Contact from './components/contact';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers)
const token = localStorage.getItem('auth_jwt_token');
const auth_type = localStorage.getItem('auth_type');
// if we have a token, consider the user to be signed in
if (token) {
  store.dispatch({type: AUTH_USER, payload: auth_type})
}
ReactDOM.render(
  <Provider store={store}>
    <HashRouter hashType="noslash">
      <App>
        <ScrollToTop/>
        <Switch>
          <Route path="/venue/:edit_type/:venue_id" component= {RequireAuth(VenueManage)} />
          <Route path="/venue/:edit_type" component= {RequireAuth(VenueManage)} />
          <Route path="/venue/add" component= {RequireAuth(VenueManage)} />
          <Route path="/venue/" component= {RequireAuth(Venue)} />
          <Route path="/service/:edit_type/:service_id" component= {RequireAuth(ServiceManage)} />
          <Route path="/service/:edit_type" component= {RequireAuth(ServiceManage)} />
          <Route path="/service/add" component= {RequireAuth(ServiceManage)} />
          <Route path="/service/" component= {RequireAuth(Service)} />
          <Route path="/public" component= {Public} />
          <Route path="/account" component= {RequireAuth(Account)} />
          <Route path="/signin" component= {Signin} />
          <Route path="/register" component= {Signup} />
          <Route path="/signout" component= {Signout} />
          <Route path="/event/add/:id" component= {RequireAuth(EventManage)} />
          <Route path="/event/add" component= {RequireAuth(EventManage)} />
          <Route path="/event/" component= {RequireAuth(Event)} />
          <Route exact path="/contact" component= {Contact} />
          <Route exact path="/" component= {Home} />
        </Switch>
      </App>
    </HashRouter>
  </Provider>
  , document.getElementById('root'));
