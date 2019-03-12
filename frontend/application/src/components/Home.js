import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Grid, Segment } from 'semantic-ui-react'

import CityList from './CityList';
import Favorites from './Favorites';

class Home extends Component {
    render() {

        const {isAuthenticated, user} = this.props.auth;

        const authenticated = (
            <div>
                <Grid>
                    <Grid.Row columns={1}>
                        <Grid.Column>
                            <Segment>
                                <h4>Instructions:</h4>
                                <p>On the left there is a list of over 600 biggest cities in the world.</p>
                                <p>You can select city from the list and either show weather data about the city</p>
                                <p>or add the city to your favorites.</p>
                                <p>Favorites are listed on the right side.</p>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <h3>List of cities</h3>
                            <CityList />
                        </Grid.Column>

                        <Grid.Column>
                            <h3>My favorites</h3>
                            <Favorites />
                        </Grid.Column>
                    </Grid.Row>
                    
                </Grid>        
            </div>
        );

        const unauthenticated = (
            <div>
                <h1>Welcome</h1>
                <h3>Register and login to see some content!</h3>
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