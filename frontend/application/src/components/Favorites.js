import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, List } from 'semantic-ui-react'
import { getFavorites } from '../actions/datafetching';

class Favorites extends Component {

    constructor() {
        super();
        this.state = {
            favorites: [],
            selectedCity: ""
        }
    }


    selectCity = (e) => {
        this.setState({selectedCity: e.target.innerText});
    }


    show = (e) => {
        e.preventDefault();
        console.log("SHOW");
    }


    remove = (e) => {
        e.preventDefault();
        console.log("REMOVE");
    }


    componentDidMount() {
        this.props.getFavorites(this.props.auth.user.name);
    }


    componentWillReceiveProps(nextProps) {
        if(Array.isArray(nextProps.favorites)) {
            this.setState({
                favorites: nextProps.favorites
            });
        }
        else {
            let newFavorites = this.state.favorites;
            newFavorites.push(nextProps.favorites);
            this.setState({
                favorites: newFavorites
            });
        }
    }


    render() {

        let cities = this.state.favorites.map( city => {
            return (
                <List.Item key={city.name} onClick={this.selectCity} value={city.name}>
                    <List.Content>
                        <List.Header>
                            { city.name }, {city.country}
                        </List.Header>
                    </List.Content>
                </List.Item>
            );
        });

        return(
            <div>
                <div>
                    <h4>SELECTED: {this.state.selectedCity}</h4>
                    <div>
                        <Button type='submit' onClick={this.show}>SHOW</Button>
                        <Button type='submit' onClick={this.remove}>REMOVE FROM FAVORITES</Button>
                    </div>
                </div>
                <div>
                    <List divided relaxed>
                        {cities}
                    </List>
                </div>            
            </div>
        );
    };   
}


Favorites.propTypes = {
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


const mapDispatchToProps = { getFavorites }

export  default connect(mapStateToProps, mapDispatchToProps)(Favorites)