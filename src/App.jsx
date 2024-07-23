import { useEffect, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  //   const [count, setCount] = useState(0);
  const [posts, setPosts] = useState([]);
  const [calculate, setCalculate] = useState(false);

  const calculateReturns = () => {
    let collateral = 100 * posts.strike;
    let returns = (posts.bid / collateral) * 100;
    let annualizedReturns = (returns / posts.dte) * 365 * 100;
    console.log(annualizedReturns);
    return annualizedReturns.toFixed(2);
  };

  const [returns, setReturns] = useState(0);

  useEffect(() => {
    setReturns(calculateReturns());
  }, [posts]);

  //   let symbol = "AAPL";
  let symbol;
  let year = "24";
  let month = "08";
  let day = "23";
  let contract = "C";
  let strike = "225";

  useEffect(() => {
    axios
      .get(
        `https://api.marketdata.app/v1/options/quotes/${symbol}${year}${month}${day}${contract}00${strike}000/?dateformat=timestamp`
      )
      .then((res) => {
        setPosts(res.data);
      });
  }, []);

  return (
    <div className="container">
      <h1>Option Wheeling</h1>
      <section className="selection">
        <p>Please select the option that you would like to view:</p>
        <div className="option-form">
          <div className="form-selection">
            <label htmlFor="symbol" className="form-label">
              Symbol
            </label>
            <input
              className="form-control"
              type="text"
              id="symbol"
              name="symbol"
              minLength={4}
              maxLength={4}
              onChange={(e) => {
                symbol = e.target.value;
              }}
            />
          </div>
          <div className="form-selection">
            <label htmlFor="expiration" className="form-label">
              Expiration
            </label>
            <select className="form-select" name="expiration" id="expiration">
              <option value="240823">August 9</option>
              <option value="240823">August 23</option>
              <option value="240823">August 30</option>
              <option value="240823">September 20</option>
            </select>
          </div>
        </div>
        <button onClick={() => setCalculate(true)} className="btn">
          Calculate
        </button>
      </section>
      <section className={`info ${calculate ? "show" : "hidden"}`}>
        <ul className="option-details">
          <li>
            <span className="option-value">Symbol: </span>
            {posts.optionSymbol}
          </li>
          <li>
            <span className="option-value">Underlying: </span>
            {posts.underlying}
          </li>
          <li>
            <span className="option-value">Expiration: </span>
            {posts.expiration}
          </li>
          <li>
            <span className="option-value">Side: </span>
            {posts.side}
          </li>
          <li>
            <span className="option-value">Strike: </span>
            {posts.strike}
          </li>
          <li>
            <span className="option-value">First Traded: </span>
            {posts.firstTraded}
          </li>
          <li>
            <span className="option-value">DTE: </span>
            {posts.dte}
          </li>
          <li>
            <span className="option-value">Updated: </span>
            {posts.updated}
          </li>
          <li>
            <span className="option-value">Bid: </span>
            {posts.bid}
          </li>
          <li>
            <span className="option-value">Bid Size: </span>
            {posts.bidSize}
          </li>
          <li>
            <span className="option-value">Mid: </span>
            {posts.mid}
          </li>
          <li>
            <span className="option-value">Ask: </span>
            {posts.ask}
          </li>
          <li>
            <span className="option-value">Ask Size: </span>
            {posts.askSize}
          </li>
          <li>
            <span className="option-value">Last: </span>
            {posts.last}
          </li>
          <li>
            <span className="option-value">Open Interest: </span>
            {posts.openInterest}
          </li>
          <li>
            <span className="option-value">Volume: </span>
            {posts.volume}
          </li>
          <li>
            <span className="option-value">In The Money: </span>
            {posts.inTheMoney ? "Yes" : "No"}
          </li>
          <li>
            <span className="option-value">Intrinsic Value: </span>
            {posts.intrinsicValue}
          </li>
          <li>
            <span className="option-value">Extrinsic Value: </span>
            {posts.extrinsicValue}
          </li>
          <li>
            <span className="option-value">Underlying Price: </span>
            {posts.underlyingPrice}
          </li>
          <li>
            <span className="option-value">IV: </span>
            {posts.iv}
          </li>
          <li>
            <span className="option-value">Delta: </span>
            {posts.delta}
          </li>
          <li>
            <span className="option-value">Gamma: </span>
            {posts.gamma}
          </li>
          <li>
            <span className="option-value">Theta: </span>
            {posts.theta}
          </li>
          <li>
            <span className="option-value">Vega: </span>
            {posts.vega}
          </li>
          <li>
            <span className="option-value">Rho: </span>
            {posts.rho}
          </li>
        </ul>
      </section>
      <section className={`calculate ${calculate ? "show" : "hidden"}`}>
        <h2>Yield</h2>
        <p className="calculate__desc">
          The yield on the collateral that you are going to put up against this
          cash secured put is
        </p>
        <p>
          <span className="calculate__result">{returns}%</span>
        </p>
      </section>
    </div>
  );
}

export default App;
