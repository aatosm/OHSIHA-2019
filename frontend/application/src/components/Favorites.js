import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, List } from 'semantic-ui-react'
import { getFavorites, removeFromFavorites } from '../actions/datafetching';

class Favorites extends Component {

    constructor() {
        super();
        this.state = {
            favorites: [],
            selectedCity: {name: ""} // FIX
        }
        this.setStateFinished = this.setStateFinished.bind(this);
    }
    

    selectCity = (e) => {
        
        const fields = e.target.innerText.split(", ");
        const wantedObject = this.state.favorites.find(item => {
            return item.name === fields[0];
        })
        this.setState({selectedCity: wantedObject}, () => {
            this.setStateFinished();
        });
    }

    setStateFinished = () => {
        //this.props.getLatest(this.state.selectedCurrency.short);
        
    }


    show = (e) => {
        e.preventDefault();
        
    }


    remove = (e) => {
        e.preventDefault();
        this.props.removeFromFavorites(this.props.auth.user.name, this.state.selectedCity);
    }


    componentDidMount() {
        this.props.getFavorites(this.props.auth.user.name);
    }


    componentWillReceiveProps(nextProps) {
        if(nextProps.favorites){
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
    }


    render() {

        let cities = this.state.favorites.map( city => {
            return (
                <List.Item key={city.id} onClick={this.selectCity} value={city.id}>
                    
                        <List.Content>
                            <List.Header>
                                { city.name }, { city.country }
                            </List.Header>
                            <div>
                                
                            </div>
                        </List.Content>
                    
                </List.Item>
            );
        });

        return(
            <div>
                <div>
                    <h4>SELECTED: {this.state.selectedCity.name}</h4>
                    <div>
                        <Button basic color='primary' href={`/view/${this.state.selectedCity.name}`}>SHOW</Button>
                        <Button basic color='red' type='submit' onClick={this.remove}>REMOVE FROM FAVORITES</Button>
                    </div>
                </div>
                <div>
                    <List divided relaxed style={{overflow: 'auto', maxHeight: 600 }}>
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


const mapDispatchToProps = { getFavorites, removeFromFavorites}

export  default connect(mapStateToProps, mapDispatchToProps)(withRouter(Favorites))