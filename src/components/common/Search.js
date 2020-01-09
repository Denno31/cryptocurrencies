import React from "react";
import { API_URL } from "../../config";
import Loading from "./loading";
import { withRouter } from "react-router-dom";
import "./Search.css";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      searchResults: [],
      loading: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderSearchResults = this.renderSearchResults.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
  }
  handleChange(event) {
    let inputValue = event.target.value;
    this.setState({ [event.target.name]: inputValue });
    if (!inputValue) {
      return "";
    }
    this.setState({ loading: true });
    fetch(
      `https://api.udilia.com/coins/v1/autocomplete?searchQuery=${inputValue}`
    )
      .then(response => {
        return response.json().then(json => {
          return response.ok ? json : Promise.reject(json);
        });
      })
      .then(data => {
        // console.log("Success", data);
        this.setState({ loading: false, searchResults: data });
      })
      .catch(error => {
        console.log("Error", error);
        this.setState({ loading: false });
      });
  }
  renderSearchResults() {
    const { searchResults, searchQuery, loading } = this.state;
    if (!searchQuery) return "";
    if (searchResults.length > 0) {
      return (
        <div className="Search-result-container">
          {searchResults.map(result => (
            <div
              onClick={() => this.handleRedirect(result.id)}
              key={result.id}
              className="Search-result"
            >
              {result.name} ({result.symbol})
            </div>
          ))}
        </div>
      );
    }
    if (!loading) {
      return (
        <div className="Search-result-container">
          <div className="Search-no-result">No results found</div>
        </div>
      );
    }
  }
  handleRedirect(currencyId) {
    this.setState({
      searchQuery: "",
      searchResults: []
    });
    this.props.history.push(`/currency/${currencyId}`);
  }
  render() {
    const { loading, searchQuery } = this.state;
    return (
      <div className="Search">
        {/* <input ref={input => (this.searchQuery = input)} /> */}
        <span className="Search-icon" />
        <input
          className="Search-input"
          type="text"
          name="searchQuery"
          value={searchQuery}
          placeholder="currency name"
          onChange={this.handleChange}
        />
        {loading && (
          <div className="Search-loading">
            <Loading width="12px" height="12px" />
          </div>
        )}
        {this.renderSearchResults()}
      </div>
    );
  }
}
export default withRouter(Search);
