import React from "react";
import { handleResponse } from "../../helpers";
import { API_URL } from "../../config";
import "./Table.css";
import Loading from "../common/loading";
import Table from "./Table";
import Pagination from "./Pagination";
class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      currencies: [],
      error: null,
      totalPages: 0,
      page: 1
    };
    this.handlePaginationClick = this.handlePaginationClick.bind(this);
  }
  componentDidMount() {
    this.fetchCurrencies();
  }
  fetchCurrencies() {
    this.setState({ loading: true });
    fetch(`${API_URL}cryptocurrencies?page=${this.state.page}&perPage=20`)
      .then(response => {
        // handleResponse(response);
        return response.json().then(json => {
          return response.ok ? json : Promise.reject(json);
        });
      })
      .then(data => {
        //console.log("Success", data.currencies);
        this.setState({
          loading: false,
          currencies: data.currencies,
          totalPages: data.totalPages
        });
      })
      .catch(error => {
        this.setState({ error: error.errorMessage, loading: false });
        // console.log("Error", error);
      });
  }

  handlePaginationClick(direction) {
    let nextPage = this.state.page;
    nextPage = direction === "next" ? nextPage + 1 : nextPage - 1;
    this.setState({ page: nextPage }, this.fetchCurrencies);
  }
  render() {
    if (this.state.loading) {
      return (
        <div className="loading-container">
          <Loading />
        </div>
      );
    }
    if (this.state.error) {
      return <div className="error">{this.state.error}</div>;
    }
    return (
      <div>
        <Table currencies={this.state.currencies} />
        <Pagination
          page={this.state.page}
          totalPages={this.state.totalPages}
          handlePaginationClick={this.handlePaginationClick}
        />
      </div>
    );
  }
}
export default List;
