import classes from "./Main.module.css";

import TransactionsDisplay from "./Transactions/TransactionsDisplay";
import PortfolioDisplay from "./Portfolio/PortfolioDisplay";
import GasStats from "./GasStats/GasDisplay";

//handles all the body components (BodyDisplay)
const MainDisplay = () => {
  return (
    <div className={classes["main-container"]}>
      <div className={classes["transactions-display-container"]}>
        <TransactionsDisplay />
      </div>
      <div className={classes["portfolio-display-container"]}>
        <PortfolioDisplay />
      </div>
      <div className={classes["gas-stats-container"]}>
        <GasStats />
      </div>
    </div>
  );
};

export default MainDisplay;
