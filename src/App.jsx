import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [count, setCount] = useState(0);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.marketdata.app/v1/options/quotes/AAPL250117C00150000/?dateformat=timestamp"
      )
      .then((res) => {
        setPosts(res.data);
      });
  }, []);

  return (
    <>
      <h1>Option Wheeling</h1>
      <ul className="option-details">
        <li>Symbol: {posts.optionSymbol}</li>
        <li>Underlying: {posts.underlying}</li>
        <li>Expiration: {posts.expiration}</li>
        <li>Side: {posts.side}</li>
        <li>Strike: {posts.strike}</li>
        <li>First Traded: {posts.firstTraded}</li>
        <li>DTE: {posts.dte}</li>
        <li>Updated: {posts.updated}</li>
        <li>Bid: {posts.bid}</li>
        <li>Bid Size: {posts.bidSize}</li>
        <li>Mid: {posts.mid}</li>
        <li>Ask: {posts.ask}</li>
        <li>Ask Size: {posts.askSize}</li>
        <li>Last: {posts.last}</li>
        <li>Open Interest: {posts.openInterest}</li>
        <li>Volume: {posts.volume}</li>
        <li>In The Money: {posts.inTheMoney}</li>
        <li>Intrinsic Value: {posts.intrinsicValue}</li>
        <li>Extrinsic Value: {posts.extrinsicValue}</li>
        <li>Underlying Price: {posts.underlyingPrice}</li>
        <li>IV: {posts.iv}</li>
        <li>Delta: {posts.delta}</li>
        <li>Gamma: {posts.gamma}</li>
        <li>Theta: {posts.theta}</li>
        <li>Vega: {posts.vega}</li>
        <li>Rho: {posts.rho}</li>
      </ul>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
