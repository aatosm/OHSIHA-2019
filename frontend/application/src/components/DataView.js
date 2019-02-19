import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Chart } from "react-charts";
import { getForecast  } from '../actions/datafetching';

class DataView extends Component {

    constructor() {
        super();
        this.state = {
            city: null,
            tempData: [],
            rainData: []

        }
    }

    componentDidMount(){
        console.log(this.props.city);  
        this.props.getForecast(this.props.city)
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps.forecast);
        this.setState({
            tempData: nextProps.forecast.list.map(item => {
                return([new Date((item.dt*1000)), item.main.temp]);
            }),
            rainData: nextProps.forecast.list.map(item => {
                return([new Date((item.dt*1000)), (item.rain["3h"] ? item.rain["3h"] : 0)]);
            })
        });

    }

    render() {
        
        const loader = (
            <div>
                <p>Loading...</p>
            </div>
        );
        
        let tempChart;
        if(this.state.tempData.length === 0){
            tempChart = loader;
        }
        else {
          tempChart = (
            // A react-chart hyper-responsively and continuusly fills the available
            // space of its parent element automatically
            <div
              style={{
                width: "400px",
                height: "300px",
                color: "red"
              }}
            >
              <Chart
                data={[
                  {
                    label: "Temperature",
                    data: this.state.tempData
                  }
                ]}
                axes={[
                  { primary: true, type: "time", position: "bottom" },
                  { type: "linear", position: "left" }
                ]}
              />
            </div>
          );
        }

        let rainChart;
        if(this.state.rainData.length === 0){
            rainChart = loader;
        }
        else {
          rainChart = (
            // A react-chart hyper-responsively and continuusly fills the available
            // space of its parent element automatically
            <div
              style={{
                width: "400px",
                height: "300px"
              }}
            >
              <Chart
                data={[
                  {
                    label: "Rain",
                    data: this.state.rainData
                  }
                ]}
                axes={[
                  { primary: true, type: "time", position: "bottom" },
                  { type: "linear", position: "left" }
                ]}
              />
            </div>
          );
        }

        return(
            <div>
                <h3>Forecast for the next 5 days</h3>
                <div>
                    <h4>Temperature (&#8451;)</h4>
                    {tempChart}
                </div>
                <div>
                    <h4>Rain (millimeters)</h4>
                    {rainChart}
                </div> 
            </div>
        );
    };   
}


DataView.propTypes = {
    /*loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired*/
    auth: PropTypes.object.isRequired
}


const mapStateToProps = (state) => ({
    /*auth: state.auth,
    errors: state.errors*/
    auth: state.auth,
    values: state.values,
    forecast: state.forecast
})


const mapDispatchToProps = { getForecast }

export default connect(mapStateToProps, mapDispatchToProps)(DataView)