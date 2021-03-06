import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import jwtDecode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import {setCurrentUser, logoutUser} from './actions/authentication';

import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Navbar from './components/Navbar';
import ItemView from './components/ItemView';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwtDecode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    const sitePadding = {
      'paddingTop': '5%',
      'paddingLeft': '5%',
      'paddingRight': '5%'
    };

    return (
      <Provider store = { store }>
        <Router>
          <div style={sitePadding}>
            <Navbar />
            <Route exact path="/" component = { Home } />
            <div>
              <Route exact path="/register" component = { Register } />
              <Route exact path="/login" component = { Login } />
            </div>
            <Route exact path="/view/:id" component = { ItemView} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
