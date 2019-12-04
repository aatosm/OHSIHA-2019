import React, {Component} from 'react';
import {connect} from 'react-redux';
import {logoutUser} from '../actions/authentication';
import {withRouter} from 'react-router-dom';
import {Container, Menu} from 'semantic-ui-react';

class Navbar extends Component {
  onLogout(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  }

  render() {
    const {isAuthenticated, user} = this.props.auth;

    const authLinks = (
      <Container>
        <Menu.Item header href="/">
                    WeatherBUDDY
        </Menu.Item>
        <Menu.Item position="right"> Logged in as: {user.name}</Menu.Item>
        <Menu.Item onClick={ this.onLogout.bind(this) }>
                    Logout
        </Menu.Item>
      </Container>
    );

    const guestLinks = (
      <Container>
        <Menu.Item href="/" header>
                    WeatherBUDDY
        </Menu.Item>
        <Menu.Item href="/register" position="right">Register</Menu.Item>
        <Menu.Item href="/login">Login</Menu.Item>
      </Container>
    );

    return (
      <div>
        <Menu size='huge' fixed='top' inverted>
          { isAuthenticated ? authLinks : guestLinks }
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, {logoutUser})(withRouter(Navbar));
