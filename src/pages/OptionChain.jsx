import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";

function OptionChain() {
  const [posts, setPosts] = useState([]); // Step 3: Initialize state to store fetched data

  const calculateReturns = (index) => {
    let collateral = 100 * posts.strike[index];
    let returns = (posts.bid[index] / collateral) * 100;
    let annualizedReturns = (returns / posts.dte[index]) * 365 * 100;
    //console.log(annualizedReturns);
    return annualizedReturns.toFixed(2);
  };

  //const [returns, setReturns] = useState(0);

  const [toggleState, setToggleState] = useState("call");

  function toggleSide(side) {
    setToggleState(side);
    //handleCalculate();
  }

  const [toggleDetails, setToggleDetails] = useState(false);

  const toggleClass = (index) => {
    setToggleDetails(toggleDetails === index ? null : index);
  };

  useEffect(() => {
    axios
      .get(`https://api.marketdata.app/v1/options/chain/AAPL/`, {
        params: {
          side: toggleState,
        },
      })
      .then((res) => {
        setPosts(res.data); // Step 3: Store the fetched data in state
        //handleCalculate(); // Call your function here
      })
      .catch((err) => {
        console.log(err);
      });
  }, [toggleState]);

  const handleCalculate = () => {
    setReturns(calculateReturns());
    // console.table(
    //   `Symbol: ${symbol}`,
    //   `Expiration Year: ${expirationYear}`,
    //   `Expiration Month: ${expirationMonth}`,
    //   `Expiration Day: ${expirationDay}`
    // );
  };

  return (
    <div className="container">
      <Header />
      <section className="oc">
        <header className="oc__header">
          <nav className="option-toggle">
            <button
              className={`btn btn--alt ${
                toggleState === "call" ? "active" : ""
              }`}
              onClick={() => toggleSide("call")}
            >
              Call
            </button>
            <button
              className={`btn btn--alt ${
                toggleState === "call" ? "" : "active"
              }`}
              onClick={() => toggleSide("put")}
            >
              Put
            </button>
          </nav>
          <div className="oc__table-header">
            <h4>Strike Price</h4>
            <h4>% Change</h4>
            <h4>Change</h4>
            <h4>Ask Price</h4>
            <h4>Calculated Returns</h4>
          </div>
        </header>
        <div className="oc__group">
          {posts.s === "ok" &&
            posts.optionSymbol.map((post, index) => (
              <div
                className={
                  toggleDetails === index ? "oc__list active" : "oc__list"
                }
                key={index}
                onClick={() => toggleClass(index)}
              >
                <div className="oc__table">
                  <div className="oc__inner">
                    <span className="ov ov--strike">
                      ${posts.strike[index]}
                    </span>
                  </div>
                  <div className="oc__inner">
                    <span className="ov ov--change ov--temp">%21</span>
                  </div>
                  <div className="oc__inner">
                    <span className="ov ov--change ov--temp">+0.09</span>
                  </div>
                  <div className="oc__inner">
                    <span className="ov ov--ask">${posts.ask[index]}</span>
                  </div>
                  <div className="oc__inner">
                    <span className="ov ov--returns">
                      {calculateReturns(index)}%
                    </span>
                  </div>
                </div>
                <div className="oc__details">
                  <div className="oc_details-header">
                    <h5>
                      {posts.underlying[index]}{" "}
                      {new Date(
                        posts.expiration[index] * 1000
                      ).toLocaleDateString()}
                    </h5>
                  </div>
                  <ul>
                    <li>
                      <span className="option-key">Side: </span>
                      <span className="option-value">{posts.side[index]}</span>
                    </li>
                    <li>
                      <span className="option-key">Strike: </span>
                      <span className="option-value">
                        {posts.strike[index]}
                      </span>
                    </li>
                    <li>
                      <span className="option-key">First Traded: </span>
                      <span className="option-value">
                        {new Date(
                          posts.firstTraded[index] * 1000
                        ).toLocaleDateString()}
                      </span>
                    </li>
                    <li>
                      <span className="option-key">DTE: </span>
                      <span className="option-value">{posts.dte[index]}</span>
                    </li>
                    <li>
                      <span className="option-key">Updated: </span>
                      <span className="option-value">
                        {new Date(
                          posts.updated[index] * 1000
                        ).toLocaleDateString()}
                      </span>
                    </li>
                    <li>
                      <span className="option-key">Bid: </span>
                      <span className="option-value">${posts.bid[index]}</span>
                    </li>
                    <li className="hidden">
                      <span className="option-key">Bid Size: </span>
                      <span className="option-value">
                        {posts.bidSize[index]}
                      </span>
                    </li>
                    <li className="hidden">
                      <span className="option-key">Mid: </span>
                      <span className="option-value">${posts.mid[index]}</span>
                    </li>
                    <li>
                      <span className="option-key">Ask: </span>
                      <span className="option-value">${posts.ask[index]}</span>
                    </li>
                    <li className="hidden">
                      <span className="option-key">Ask Size: </span>
                      <span className="option-value">
                        {posts.askSize[index]}
                      </span>
                    </li>
                    <li>
                      <span className="option-key">Last: </span>
                      <span className="option-value">${posts.last[index]}</span>
                    </li>
                    <li>
                      <span className="option-key">Volume: </span>
                      <span className="option-value">
                        {Number(posts.volume[index]).toLocaleString()}
                      </span>
                    </li>
                    <li>
                      <span className="option-key">Open Interest: </span>
                      <span className="option-value">
                        {Number(posts.openInterest[index]).toLocaleString()}
                      </span>
                    </li>
                    <li>
                      <span className="option-key">In the Money: </span>
                      <span className="option-value">
                        {posts.inTheMoney[index] === true ? "Yes" : "No"}
                      </span>
                    </li>
                    <li>
                      <span className="option-key">Intrinsic Value: </span>
                      <span className="option-value">
                        {posts.intrinsicValue[index]}
                      </span>
                    </li>
                    <li>
                      <span className="option-key">Extrinsic Value: </span>
                      <span className="option-value">
                        {posts.extrinsicValue[index]}
                      </span>
                    </li>
                    <li>
                      <span className="option-key">Underlying Price: </span>
                      <span className="option-value">
                        {posts.underlyingPrice[index]}
                      </span>
                    </li>
                    <li>
                      <span className="option-key">IV: </span>
                      <span className="option-value">
                        {posts.iv[index].toFixed(4) * 100 + "%"}
                      </span>
                    </li>
                    <li>
                      <span className="option-key -greeks">The Greeks</span>
                      <ul className="option-greeks">
                        <li>
                          <span className="option-key">Delta:</span>
                          <span className="option-value">
                            {posts.delta[index].toFixed(2)}
                          </span>
                        </li>
                        <li>
                          <span className="option-key">Gamma: </span>
                          <span className="option-value">
                            {posts.gamma[index].toFixed(2)}
                          </span>
                        </li>
                        <li>
                          <span className="option-key">Theta: </span>
                          <span className="option-value">
                            {posts.theta[index].toFixed(2)}
                          </span>
                        </li>
                        <li>
                          <span className="option-key">Vega: </span>
                          <span className="option-value">
                            {posts.vega[index].toFixed(2)}
                          </span>
                        </li>
                        <li>
                          <span className="option-key">Rho: </span>
                          <span className="option-value">
                            {posts.rho[index].toFixed(2)}
                          </span>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}

export default OptionChain;
