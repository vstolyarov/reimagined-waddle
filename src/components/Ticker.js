import React from 'react';
import PropTypes from 'prop-types';

class Ticker extends React.Component {
  static propTypes = {
    pair: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    buy: PropTypes.func,
  };

  static defaultProps = {
    buy: () => {},
  };

  state = {
    agreeGiven: false,
  };

  giveAgreement = () => {
    this.setState({ agreeGiven: true });
  };

  render() {
    const { price, pair, buy } = this.props;
    const { agreeGiven } = this.state;
    return (
      <div
        style={{
          width: 300,
          heigh: 200,
          border: 'solid black 1px',
          textAlign: 'center',
          margin: 10,
        }}
      >
        <h1>{pair}</h1>
        {!agreeGiven && (
          <label>
            <input type="checkbox" onChange={this.giveAgreement} />I agree
          </label>
        )}
        {price < 1000 &&
          agreeGiven && (
            <div>
              <button className="buyIndicator" onClick={buy}>
                buy
              </button>
            </div>
          )}
        <hr />
        <h2>Price {price}</h2>
      </div>
    );
  }
}

export default Ticker;
