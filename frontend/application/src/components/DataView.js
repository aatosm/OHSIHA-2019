import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Chart } from "react-charts";
import {  } from '../actions/datafetching';

class DataView extends Component {

    constructor() {
        super();
        this.state = {
            city: null
        }
    }

    componentDidMount(){
        
    }

    componentWillReceiveProps(nextProps){
        
    }

    render() {

        const lineChart = (
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
                    label: "Series 1",
                    data: [[0.25, 4.75], [1, 2], [2, 4], [3, 2], [4, 7]]
                  }
                ]}
                axes={[
                  { primary: true, type: "linear", position: "bottom" },
                  { type: "linear", position: "left" }
                ]}
              />
            </div>
          );

        return(
            <div>
                <h3>5-day forecast</h3>
                {lineChart}      
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
    values: state.values
})


const mapDispatchToProps = {  }

export default connect(mapStateToProps, mapDispatchToProps)(DataView)