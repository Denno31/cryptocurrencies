import React from "react";
import "./Detail.css";
import Loading from "../common/loading";
import { renderChangePercent } from "../../helpers";

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: {},
      loading: false,
      error: null
    };
    this.fetchCurrency = this.fetchCurrency.bind(this);
  }
  componentDidMount() {
    //console.log(this.props);
    const currencyId = this.props.match.params.id;

    this.fetchCurrency(currencyId);
  }
  componentWillReceiveProps(nextProps) {
    //console.log(nextProps);
    console.log(this.props);
    if (this.props.location.pathname !== nextProps.location.pathname) {
      //get new currency id from url
      const newCurrencyId = nextProps.match.params.id;
      this.fetchCurrency(newCurrencyId);
    }
  }
  fetchCurrency(currencyId) {
    this.setState({ loading: true });
    fetch(`https://api.udilia.com/coins/v1/cryptocurrencies/${currencyId}`)
      .then(response => {
        return response.json().then(json => {
          return response.ok ? json : Promise.reject(json);
        });
      })
      .then(data => {
        this.setState({ loading: false, currency: data });
        //console.log("Success", data);
      })
      .catch(error => {
        this.setState({ loading: false, error: error.errorMessage });
        //console.log("Error", error);
      });
  }
  render() {
    const { loading, currency } = this.state;
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
      <div className="Detail">
        <h1 className="Detail-heading">
          {currency.name} ({currency.symbol})
        </h1>
        <div className="Detail-container">
          <div className="Detail-item">
            price <span>$ {currency.price}</span>
          </div>
          <div className="Detail-item">
            Rank <span>{currency.rank}</span>
          </div>
          <div className="Detail-item">
            24H renderChangePercent
            <span className="Detail-value">
              {renderChangePercent(currency.percentChange24h)}
            </span>
          </div>
          <div className="Detail-item">
            <span className="Detail-title">Market cap</span>
            <span className="Detail-Dollar">$</span>
            {currency.marketCap}
          </div>
          <div className="Detail-item">
            <span className="Detail-title">24H volume</span>
            <span className="Detail-Dollar">$</span>
            {currency.volume24h}
          </div>
          <div className="Detail-item">
            <span className="Detail-title">Total supply</span>

            {currency.totalSupply}
          </div>
        </div>
      </div>
    );
  }
}
export default Detail;
