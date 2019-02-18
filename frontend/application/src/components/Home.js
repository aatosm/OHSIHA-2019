import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Grid } from 'semantic-ui-react'

import CityList from './CityList';
import Favorites from './Favorites';

class Home extends Component {
    render() {

        const {isAuthenticated, user} = this.props.auth;

        const authenticated = (
            <div>
                <Grid columns={2}>
                    <Grid.Column>
                        <h3>List of cities</h3>
                        <CityList />
                    </Grid.Column>

                    <Grid.Column>
                        <h3>My favorites</h3>
                        <Favorites />
                    </Grid.Column>
                </Grid>        
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