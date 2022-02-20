import classes from "./PortfolioSummary.module.css";
import ArrowUp from "../../../icons/token/arrowupgreen.svg";
import ArrowDown from "../../../icons/token/arrowdownred.svg";
import AllChains from "../../../icons/chains/all-chains.svg";
import Ethereum from "../../../icons/chains/ethereum.svg";
import Avalanche from "../../../icons/chains/avalanche.svg";
import Polygon from "../../../icons/chains/polygon.svg";
import UserContext from "../../../context/UserContext";
import { useContext } from "react";

const PortfolioSummary = (props) => {
  const userCtx = useContext(UserContext);
  let chainIcon;

  switch (userCtx.selectedChain) {
    case "ethereum":
      chainIcon = Ethereum;
      break;
    case "avalanche":
      chainIcon = Avalanche;
      break;
    case "polygon":
      chainIcon = Polygon;
      break;
    case "all":
      chainIcon = AllChains;
  }

  const portfolioValue =
    userCtx.selectedCurrencySymbol +
    props.portfolioValue.toLocaleString("en-US", { maximumFractionDigits: 2 });
  let profitLoss = props.profitLoss;
  let arrowImage;
  let percentageDifference;
  let previousDayPortfolioValue = props.portfolioValue + profitLoss;

  //increase
  if (profitLoss >= 0) {
    percentageDifference =
      ((previousDayPortfolioValue - props.portfolioValue) /
        previousDayPortfolioValue) *
      100;
    profitLoss =
      "+$" + profitLoss.toLocaleString("en-US", { maximumFractionDigits: 2 });
    arrowImage = ArrowUp;
    percentageDifference =
      "+" +
      userCtx.selectedCurrencySymbol +
      percentageDifference.toLocaleString("en-US", {
        maximumFractionDigits: 1,
      }) +
      "%";
  } else {
    //decrease
    profitLoss =
      "-" +
      userCtx.selectedCurrencySymbol +
      Math.abs(profitLoss).toLocaleString("en-US", {
        maximumFractionDigits: 2,
      });
    percentageDifference =
      ((props.portfolioValue - previousDayPortfolioValue) /
        previousDayPortfolioValue) *
      100;
    arrowImage = ArrowDown;
    percentageDifference =
      "-" +
      percentageDifference.toLocaleString("en-US", {
        maximumFractionDigits: 1,
      }) +
      "%";
  }

  return (
    <>
      <div className={classes["portfolio-summary"]}>
        <div className={classes["top-area"]}>
          <div className={classes["top-row"]}>
            <h2 className={classes["balance-title"]}>Your Balance</h2>
            <img src={chainIcon} className="chain"></img>
          </div>
          <h1 className={classes["total-value"]}>{portfolioValue}</h1>
        </div>
        <div className={classes["bottom-row"]}>
          <div className={classes["daily-profit-container"]}>
            <h4 className={classes["daily-profit-title"]}>Todays Profit</h4>
            <h3 className={classes["daily-profit-amount"]}>{profitLoss}</h3>
          </div>
          <div className={classes["daily-percentage-container"]}>
            <div className={classes["daily-percentage"]}>
              <h5>{percentageDifference}</h5>
              <img src={arrowImage}></img>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PortfolioSummary;
