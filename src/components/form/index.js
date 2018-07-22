import React from 'react';
import PropTypes from 'prop-types';
import PlacesAutocomplete from 'react-places-autocomplete';
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';
import style from './style.scss';

class Form extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = { address: '' };
  }

  static propTypes = {
    setDestination: PropTypes.func
  }
  
  componentDidMount() {
    
  }
  
  handleChange = address => {
    this.setState({ address });
  };
  
  handleSelect = address => {
    geocodeByAddress(address)
    .then(results => getLatLng(results[0]))
    .then(latLng => {
      console.log('Success', latLng);
      this.props.setDestination(latLng);
    })
    .catch(error => console.error('Error', error));
  };
  
  render() {
    return (
      <div className={style['form-container']}>
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: 'Search Places ...',
                  className: 'location-search-input',
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                    >
                    <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </div>
    );
  }
}


export default Form;