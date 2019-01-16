import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Citylist from './Citylist';

class Home extends Component {
    render() {

        const {isAuthenticated, user} = this.props.auth;

        const authenticated = (
            <div>
                <h4>List of cities</h4>
                <Citylist />
            </div>
        );

        const unauthenticated = (
            <div>
                <h1>Welcome</h1>
                <h3>Login to see some content!</h3>
            </div>   
        );

        return(
            <div>
                { isAuthenticated ? authenticated : unauthenticated }               
            </div>
        );
    };   
}

Home.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(withRouter(Home));