import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Form, Message } from 'semantic-ui-react'
import { loginUser } from '../actions/authentication';

class Login extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            password: '',
            errors: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            name: this.state.name,
            password: this.state.password,
        }
        console.log(user);
        this.props.loginUser(user);
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/')
        }
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    render() {
        return(
        <div>
            <h2>Login</h2>
            <Form error onSubmit={ this.handleSubmit }>
                <Form.Field width={6}>
                    <input
                    type="text"
                    placeholder="Username"
                    name="name"
                    onChange={ this.handleInputChange }
                    value={ this.state.email }
                    />
                    <Message error content={this.state.errors.name} />
                </Form.Field>
                <Form.Field width={6}>
                    <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={ this.handleInputChange }
                    value={ this.state.password }
                    />
                    <Message error content={this.state.errors.password} />
                </Form.Field>
                <Button type='submit'>Login user</Button>
            </Form>
        </div>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

const mapDispatchToProps = { loginUser }

export default connect(mapStateToProps, mapDispatchToProps)(Login)