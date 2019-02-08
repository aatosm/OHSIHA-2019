import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, List } from 'semantic-ui-react'
import { getCurrencies, addToFavorites } from '../actions/datafetching';

class CurrencyList extends Component {

    constructor() {
        super();
        this.state = {
            currencies: [],
            selectedCurrency: {}
        }
        this.selectCurrency = this.selectCurrency.bind(this);
        this.show = this.show.bind(this);
        this.addToFavorites = this.addToFavorites.bind(this);
    }

    selectCurrency = (e) => {
        const fields = e.target.innerText.split(", ");
        this.setState({selectedCurrency: {short: fields[0], full: fields[1] }});
    }

    show = (e) => {
        e.preventDefault();
        // action
    }

    addToFavorites = (e) => {
        e.preventDefault();
        this.props.addToFavorites(this.props.auth.user.name, this.state.selectedCurrency);
    }

    componentDidMount() {
        this.props.getCurrencies();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            currencies: nextProps.currencies
        });
    }

    render() {    
        
        let currencies = this.state.currencies.map( currency => {
            return (
                <List.Item key={currency.short} onClick={this.selectCurrency} value={currency}>
                    <List.Content>
                        <List.Header>
                            { currency.short }, {currency.full}
                        </List.Header>
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
                        <Button type='submit' onClick={this.addToFavorites}>ADD TO FAVORITES</Button>
                    </div>
                </div>
                <div>

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

CurrencyList.propTypes = {
    /*loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired*/
    auth: PropTypes.object.isRequired,
    getCurrencies: PropTypes.func.isRequired,
    currencies: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    /*auth: state.auth,
    errors: state.errors*/
    auth: state.auth,
    currencies: state.currencies
})

const mapDispatchToProps = { getCurrencies, addToFavorites }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CurrencyList))