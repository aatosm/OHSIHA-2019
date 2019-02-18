import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react'
import { getCurrent } from '../actions/datafetching';

import DataView from './DataView';

class ItemView extends Component {

    constructor() {
        super();
        this.state = {
            city: null,
            currentData: {
                temperature: null,
                pressure: null,
                humidity: null,
                weatherMain: null,
                windSpeed: null,
            }
        }
    }

    componentDidMount(){
        this.setState({
            city: this.props.match.params.id
        });
        this.props.getCurrent(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps.values);
        this.setState({
            currentData: {
                temperature: nextProps.values.main.temp,
                pressure: nextProps.values.main.pressure,
                humidity: nextProps.values.main.humidity,
                weatherMain: nextProps.values.weather[0].main,
                windSpeed: nextProps.values.wind.speed
            },
            propsReceived: true
        });
    }

    render() {

        const received = (
            <div>
                <h3>Current data</h3>
                <h4>Temperature: {this.state.currentData.temperature} &#8451;</h4> 
                <h4>Wind speed: {this.state.currentData.windSpeed} m/s</h4>
                <h4>{this.state.currentData.weatherMain}</h4> 
                <DataView city={this.state.city}/>
            </div>
        );

        const notReceived = (<div></div>);

        return(
            <div>
                <h2>{ this.state.city }</h2>    
                {this.state.propsReceived ? received : notReceived}  
                <Button basic color='red' href='/'>Back</Button>
            </div>
        );
    };   
}


ItemView.propTypes = {
    /*loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired*/
    auth: PropTypes.object.isRequired
}


const mapStateToProps = (state) => ({
    /*auth: state.auth,
    errors: state.errors*/
    auth: state.auth,
    values: state.values
})


const mapDispatchToProps = { getCurrent }

export default connect(mapStateToProps, mapDispatchToProps)(ItemView)