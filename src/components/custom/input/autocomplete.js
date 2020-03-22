import React, {Component} from "react";
import PlacesAutocomplete from 'react-places-autocomplete';
import TextInputCustom from "./text";


export default class AutocompleteCustom extends Component {
  render() {

    const {value, onChange, onSelect, searchOptions} = this.props;
    return (
      <PlacesAutocomplete
        value={value}
        onChange={onChange}
        onSelect={onSelect}
        shouldFetchSuggestions={value && value.length >= 3}
        searchOptions={searchOptions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <TextInputCustom
              {...getInputProps({
                placeholder: 'Ingresa tu direccion...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Cargando sugerencias...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#def8fa', cursor: 'pointer' }
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
    )
  }
}
