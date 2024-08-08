import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";

function Home() {
  //const [count, setCount] = useState(0);
  const [posts, setPosts] = useState([]);
  const [symbol, setSymbol] = useState("");
  const [expirationYear, setExpirationYear] = useState("");
  const [expirationMonth, setExpirationMonth] = useState("");
  const [expirationDay, setExpirationDay] = useState("");
  const [calculate, setCalculate] = useState(false);

  //   const [inputValue, setInputValue] = useState('');

  //   const handleInputChange = (e) => {
  //     setInputValue(e.target.value);
  //   };

  //   const handleClick = () => {
  //     console.log(inputValue);
  //   };

  //   return (
  //     <div>
  //       <input type="text" value={inputValue} onChange={handleInputChange} />
  //       <button onClick={handleClick}>Click Me</button>
  //     </div>
  //   );

  //   let year = "24";
  //   let day = "23";
  let contract = "C";
  let strike = "245";

  const calculateReturns = () => {
    let collateral = 100 * posts.strike;
    let returns = (posts.bid / collateral) * 100;
    let annualizedReturns = (returns / posts.dte) * 365 * 100;
    console.log(annualizedReturns);
    return annualizedReturns.toFixed(2);
  };

  const [returns, setReturns] = useState(0);

  const handleSymbolChange = (e) => {
    setSymbol(e.target.value);
  };

  const handleExpirationYearChange = (e) => {
    setExpirationYear(e.target.value);
  };

  const handleExpirationMonthChange = (e) => {
    setExpirationMonth(e.target.value);
  };

  const handleExpirationDayChange = (e) => {
    setExpirationDay(e.target.value);
  };

  const handleCalculate = () => {
    setReturns(calculateReturns());
    console.table(
      `Symbol: ${symbol}`,
      `Expiration Year: ${expirationYear}`,
      `Expiration Month: ${expirationMonth}`,
      `Expiration Day: ${expirationDay}`
    );
  };

  useEffect(() => {
    axios
      .get(
        `https://api.marketdata.app/v1/options/quotes/${symbol}${expirationYear}${expirationMonth}${expirationDay}${contract}00${strike}000/?dateformat=timestamp`
      )
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [
    symbol,
    expirationYear,
    expirationMonth,
    expirationDay,
    contract,
    strike,
  ]);
  return (
    <div className="container">
      <Header />
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
              onChange={handleSymbolChange}
              value={symbol}
            />
          </div>
          <div className="form-selection">
            <label htmlFor="expirationYear" className="form-label">
              Expiration Year
            </label>
            <select
              className="form-select"
              name="expirationYear"
              id="expirationYear"
              onChange={handleExpirationYearChange}
              value={expirationYear}
            >
              <option value="24">2024</option>
              <option value="25">2025</option>
              <option value="26">2026</option>
            </select>
          </div>
          <div className="form-selection">
            <label htmlFor="expirationMonth" className="form-label">
              Expiration Month
            </label>
            <select
              className="form-select"
              name="expirationMonth"
              id="expirationMonth"
              onChange={handleExpirationMonthChange}
              value={expirationMonth}
            >
              <option value="01">January</option>
              <option value="02">February</option>
              <option value="03">March</option>
              <option value="04">April</option>
              <option value="05">May</option>
              <option value="06">June</option>
              <option value="07">July</option>
              <option value="08">August</option>
              <option value="09">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </div>
          <div className="form-selection">
            <label htmlFor="expirationDay" className="form-label">
              Expiration Day
            </label>
            <select
              className="form-select"
              name="expirationDay"
              id="expirationDay"
              onChange={handleExpirationDayChange}
              value={expirationDay}
            >
              {/* Add options for 31 days */}
              {Array.from({ length: 31 }, (_, index) => (
                <option
                  key={index + 1}
                  value={index + 1 < 10 ? `0${index + 1}` : index + 1}
                >
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button onClick={handleCalculate} className="btn">
          Calculate
        </button>
      </section>
      {/* <section className={`info ${returns ? "show" : "hidden"}`}>
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
      </section> */}
      <section className={`calculate ${returns ? "show" : "hidden"}`}>
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

export default Home;
