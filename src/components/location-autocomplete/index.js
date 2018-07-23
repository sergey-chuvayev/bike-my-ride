import React from 'react';
import PropTypes from 'prop-types';
import PlacesAutocomplete from 'react-places-autocomplete';
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';

class LocationAutocomplete extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      address: ''
    }
  }

  static propTypes = {
    setLatlng: PropTypes.func.isRequired
  }
  
  handleChange = address => {
    this.setState({ address });
  }

  handleSelect = address => {
    geocodeByAddress(address)
    .then(results => getLatLng(results[0]))
    .then(latLng => {
      this.props.setLatlng(latLng);
    })
    .catch(error => console.error('Error', error));
  }

  render() {
    return (
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
    );
  }
}

export default LocationAutocomplete;