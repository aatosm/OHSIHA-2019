import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Form, Message} from 'semantic-ui-react';
import {withRouter} from 'react-router-dom';
import {registerUser} from '../actions/authentication';

class Register extends Component {
  constructor(props) {
    super();
    this.state = {
      name: '',
      password: '',
      password_confirm: '',
      errors: {}
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = {
      name: this.state.name,
      password: this.state.password,
      password_confirm: this.state.password_confirm
    };
    this.props.registerUser(user, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/');
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div>
        <div>
          <h2>Registration</h2>
          <Form error onSubmit={ this.handleSubmit }>
            <Form.Field width={6}>
              <input
                type="text"
                placeholder="Username"
                name="name"
                onChange={ this.handleInputChange }
                value={ this.state.name }
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
            <Form.Field width={6}>
              <input
                type="password"
                placeholder="Confirm Password"
                name="password_confirm"
                onChange={ this.handleInputChange }
                value={ this.state.password_confirm }
              />
              <Message error content={this.state.errors.password_confirm} />
            </Form.Field>
            <Button type='submit'>Register user</Button>
          </Form>
        </div>
        <div>
          <h4 style={{color: 'red'}}>{this.state.errors.message}</h4>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = {registerUser};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));
