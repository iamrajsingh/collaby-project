import React, { Component } from "react";
import Select from "react-select";

class CountryDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCountry: null,
      countries: [], // Updated to store the fetched countries
    };
  }

  componentDidMount() {
    // Fetch the list of countries from the API
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        // Transform the data to match the format expected by react-select
        const countries = data.map((country) => ({
          value: country.name.common,
          label: country.name.common,
        }));
        this.setState({ countries });
      })
      .catch((error) => console.error(""));
  }

  handleCountryChange = (selectedCountry) => {
    this.setState({ selectedCountry });
    this.props.onChangeCountryProp(selectedCountry.value);
  };

  componentDidUpdate(prevProps, prevState) {
    // Check if the data prop has changed
    if (this.props.selectedCountryProp !== prevProps.selectedCountryProp) {
      // Perform actions or side effects here
      this.setState({
        selectedCountry: {
          value: this.props.selectedCountryProp,
          label: this.props.selectedCountryProp,
        },
      });
    }
  }

  render() {
    return (
      <div className="col-md-6 col-sm-6 col-xs-12">
        <div className="form-group">
          <label htmlFor="country">Country:</label>

          <Select
            name="country"
            options={this.state.countries}
            value={this.state.selectedCountry}
            onChange={this.handleCountryChange}
          />
        </div>
      </div>
    );
  }
}

export default CountryDropdown;
