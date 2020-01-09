import React from "react";
import { withRouter } from "react-router-dom";
import { renderChangePercent } from "../../helpers";
import PropTypes from "prop-types";

const Table = ({ currencies, history }) => {
  return (
    <div className="Table-container">
      <table className="Table">
        <thead className="Table-head">
          <tr>
            <th>Cryptocurrency</th>
            <th>Price</th>
            <th>Market Cap</th>
            <th>24H change</th>
          </tr>
        </thead>
        <tbody className="Table-body">
          {currencies.map(currency => (
            <tr
              key={currency.id}
              onClick={() => history.push(`/currency/${currency.id}`)}
            >
              <td>
                <span className="Table-rank">{currency.rank}</span>
                {currency.name}
              </td>
              <td>
                <span className="Table-dollar">$</span>
                {currency.price}
              </td>
              <td>
                <span className="Table-rank">{currency.marketCap}</span>
              </td>
              <td>{renderChangePercent(currency.percentChange24h)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
Table.propTypes = {
  currencies: PropTypes.array.isRequired
};
export default withRouter(Table);
