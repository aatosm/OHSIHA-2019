import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, List } from 'semantic-ui-react'
import { getFavorites } from '../actions/datafetching';

class ItemView extends Component {

    constructor() {
        super();
        this.state = {
            
        }
    }

    render() {

        let cities = this.state.favorites.map( city => {
            return (
                <List.Item key={city.name} onClick={this.selectCity} value={city.name}>
                    <List.Content>
                        <List.Header>
                            { city.name }
                        </List.Header>
                    </List.Content>
                </List.Item>
            );
        });

        return(
            <div>
                {cities}            
            </div>
        );
    };   
}


ItemView.propTypes = {
    /*loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired*/
    auth: PropTypes.object.isRequired,
    getFavorites: PropTypes.func.isRequired,
    favorites: PropTypes.object.isRequired
}


const mapStateToProps = (state) => ({
    /*auth: state.auth,
    errors: state.errors*/
    auth: state.auth,
    favorites: state.favorites
})


const mapDispatchToProps = {  }

export  default connect(mapStateToProps, mapDispatchToProps)(ItemView)