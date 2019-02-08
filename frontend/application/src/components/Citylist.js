import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, List, Dropdown } from 'semantic-ui-react'
import { getCities, addToFavorites } from '../actions/datafetching';

class Citylist extends Component {

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
        const fields = e.target.innerText.split(',');
        this.setState({selectedCity: {city: fields[0], country: fields[1] }});
    }

    show = (e) => {
        e.preventDefault();
        console.log("SHOW");
    }

    addToFavorites = (e) => {
        e.preventDefault();
        this.props.addToFavorites(this.props.auth.user.name, this.state.selectedCity);
    }

    componentDidMount() {
        this.props.getCities();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            cities: nextProps.cities.data
        });
    }

    render() {

        let cities = this.state.cities.map( city => {
            return (
                <List.Item key={city.city} onClick={this.selectCity} value={city.city}>
                    <List.Content>
                        <List.Header>
                            { city.city },{city.country}
                        </List.Header>
                    </List.Content>
                </List.Item>
            );
        });

        const templateCountries = ["FI", "SWE", "NOR"];
        const temp = () => {
            return(
                <div>
                    <Dropdown placeholder="Select country" selection options={templateCountries}>

                    </Dropdown>
                </div>
            );
        }

        return(
            <div>
                <div>
                    <h4>SELECTED: {this.state.selectedCity.city}, {this.state.selectedCity.country}</h4>
                    <div>
                        <Button type='submit' onClick={this.show}>SHOW</Button>
                        <Button type='submit' onClick={this.addToFavorites}>ADD TO FAVORITES</Button>
                    </div>
                </div>
                <div>

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

Citylist.propTypes = {
    /*loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired*/
    auth: PropTypes.object.isRequired,
    getCities: PropTypes.func.isRequired,
    cities: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    /*auth: state.auth,
    errors: state.errors*/
    auth: state.auth,
    cities: state.cities
})

const mapDispatchToProps = { getCities, addToFavorites }

export default connect(mapStateToProps, mapDispatchToProps)(Citylist)