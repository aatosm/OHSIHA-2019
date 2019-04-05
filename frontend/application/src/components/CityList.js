import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, List } from 'semantic-ui-react'
import { getCities, addToFavorites } from '../actions/datafetching';

class CityList extends Component {

    constructor() {
        super();
        this.state = {
            cities: [],
            selectedCity: {}
        }
        this.selectCity = this.selectCity.bind(this);
        this.show = this.show.bind(this);
        this.addToFavorites = this.addToFavorites.bind(this);
    }

    selectCity = (e) => {
        const fields = e.target.innerText.split(", ");
        this.setState({selectedCity: {name: fields[0], country: fields[1] }});
    }

    show = (e) => {
        e.preventDefault();
        // action
    }

    addToFavorites = (e) => {
        e.preventDefault();
        this.props.addToFavorites(this.props.auth.user.name, this.state.selectedCity);
    }

    componentDidMount() {
        if(!this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
        this.props.getCities();
    }

    componentWillReceiveProps(nextProps) {
        if(!this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
        this.setState({
            cities: nextProps.cities
        });
    }

    render() { 
        
        let cities = this.state.cities.map( city => {
            return (
                <List.Item key={city.name} onClick={this.selectCity} value={city}>
                    <List.Content>
                        <List.Header>
                            { city.name }, { city.country }
                        </List.Header>
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
                        <Button type='submit' basic color='green' onClick={this.addToFavorites}>ADD TO FAVORITES</Button>
                    </div>
                </div>
                <div>

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

CityList.propTypes = {
    auth: PropTypes.object.isRequired,
    getCities: PropTypes.func.isRequired,
    cities: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    cities: state.cities
})

const mapDispatchToProps = { getCities, addToFavorites }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CityList))