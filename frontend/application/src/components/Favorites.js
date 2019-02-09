import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, List } from 'semantic-ui-react'
import { getFavorites, removeFromFavorites } from '../actions/datafetching';

import ItemView from './ItemView';

class Favorites extends Component {

    constructor() {
        super();
        this.state = {
            favorites: [],
            selectedCurrency: {}
        }
    }


    selectCurrency = (e) => {
        const fields = e.target.innerText.split(", ");
        const wantedObject = this.state.favorites.find(item => {
            return item.short === fields[0];
        })
        this.setState({selectedCurrency: wantedObject});
    }


    show = (e) => {
        e.preventDefault();
        console.log("SHOW");
    }


    remove = (e) => {
        e.preventDefault();
        this.props.removeFromFavorites(this.props.auth.user.name, this.state.selectedCurrency);
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
        else if(typeof nextProps.favorites === "string"){
            // TODO FIX RETURN VALUE LATER, THIS IS DUMB
            this.props.getFavorites(this.props.auth.user.name);
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

        let currencies = this.state.favorites.map( currency => {
            return (
                <List.Item key={currency.id} onClick={this.selectCurrency} value={currency.id}>
                    <List.Content>
                        <List.Header>
                            { currency.short }, { currency.full }
                        </List.Header>
                        <div></div>
                    </List.Content>
                </List.Item>
            );
        });

        return(
            <div>
                <div>
                    <h4>SELECTED: {this.state.selectedCurrency.full}</h4>
                    <div>
                        <Button type='submit' onClick={this.show}>SHOW</Button>
                        <Button type='submit' onClick={this.remove}>REMOVE FROM FAVORITES</Button>
                    </div>
                </div>
                <div>
                    <List divided relaxed>
                        {currencies}
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


const mapDispatchToProps = { getFavorites, removeFromFavorites }

export  default connect(mapStateToProps, mapDispatchToProps)(Favorites)