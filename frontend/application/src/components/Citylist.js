import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCities } from '../actions/datafetching';

class Citylist extends Component {

    constructor() {
        super();
        this.state = {
            cities: []
        }
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
                <li key={city.city}>{ city.city }</li>
            );
        });

        return(
            <div>
                <ul>
                    {cities}
                </ul>
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

export  default connect(mapStateToProps, { getCities })(Citylist)