import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Button, List} from 'semantic-ui-react';
import {getFavorites, removeFromFavorites} from '../actions/datafetching';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      favorites: [],
      selectedCity: {name: ''}
    };
    this.selectCity = this.selectCity.bind(this);
    this.remove = this.remove.bind(this);
  }


  selectCity(e) {
    const fields = e.target.innerText.split(', ');
    const cityObject = this.props.favorites.find((item) => {
      return item.name === fields[0];
    });
    this.setState({selectedCity: cityObject});
  }


  remove(e) {
    e.preventDefault();
    this.props.removeFromFavorites(this.props.auth.user.name, this.state.selectedCity);
  }


  componentDidMount() {
    this.props.getFavorites(this.props.auth.user.name);
  }


  render() {
    const cities = this.props.favorites.map( (city) => {
      return (
        <List.Item key={city.id} onClick={this.selectCity} value={city.id}>
          <List.Content>
            <List.Header>
              { city.name }, { city.country }
            </List.Header>
          </List.Content>
        </List.Item>
      );
    });

    return (
      <div>
        <div>
          <h4>SELECTED: {this.state.selectedCity.name}</h4>
          <div>
            <Button basic color='blue' href={`/view/${this.state.selectedCity.name}`}>SHOW</Button>
            <Button basic color='red' type='submit' onClick={this.remove}>REMOVE FROM FAVORITES</Button>
          </div>
        </div>
        <div>
          {
            this.props.favorites.length === 0 ?
              <h2>Loading...</h2> :
              <List divided relaxed style={{overflow: 'auto', maxHeight: 600}}>
                {cities}
              </List>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  favorites: state.favorites
});


const mapDispatchToProps = {getFavorites, removeFromFavorites};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Favorites));
