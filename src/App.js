import { useContext, useEffect, useState, useCallback } from 'react';
import classes from './App.module.css';
import Main from "./components/BodyDisplay/Main";
import Navbar from "./components/HeaderBar/Navbar/Navbar";
import Footer from "./components/FooterBar/Footer";
import AddWalletModal from "./components/HeaderBar/AddWalletModal/AddWalletModal";
import UserContext from './context/UserContext';
import TokenList from './components/BodyDisplay/Portfolio/TokenList';
import Card from './components/UI/Card';

const App = () => {
  console.log('app loading')
  const userCtx = useContext(UserContext);

  //fetches token balances
  const [tokenData, setTokenData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFirstTimeLoad, setIsFirstTimeLoad] = useState(true);

  // const selectedWallet = '0xa9ac72E3BbD107eC40546Fc1C68c5e40fc7A9DD9';

  //displays the first wallet added as the default wallet on first load
  var selectedWallet;
  if (isFirstTimeLoad) {
    selectedWallet = userCtx.wallets[0];
    userCtx.selectWallet(selectedWallet);
  } else {
    selectedWallet = userCtx.selectedWallet;
  }

  const fetchWalletDataHandler = useCallback(async () => {
    //constants for searches
    const CHAIN_NAMES = {
      POLYGON: 'polygon',
      ETHEREUM: 'eth',
      AVALANCHE: 'avalanche',
    }

    const TYPE = {
      NATIVE_TOKEN: 'balance',
      ERC20: 'erc20',
    }

    const moralis_api_call_native = `https://deep-index.moralis.io/api/v2/${selectedWallet}/${TYPE.NATIVE_TOKEN}?chain=${CHAIN_NAMES.POLYGON}`
    const moralis_api_call_erc20 = `https://deep-index.moralis.io/api/v2/${selectedWallet}/${TYPE.ERC20}?chain=${CHAIN_NAMES.POLYGON}`
    
    const moralisApiHeader = {
      'accept': 'application/json',
      'X-API-Key': `${process.env.REACT_APP_X_API_KEY}`,
    }

    setIsLoading(true);
    setError(null);
    console.log('fetchwalletdatahandler!')

    try {
      const responseErc20 = await fetch(moralis_api_call_erc20, {
        headers: moralisApiHeader,
      });
      //native token data
      const erc20Data = await responseErc20.json();

      
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
    userCtx.changeDataRetrievedStatus();
  }, [userCtx.selectedWallet])


  //for testing make this when the wallet button is clicked
  useEffect(() => {
    fetchWalletDataHandler();

    //change first time load to false
    setIsFirstTimeLoad(false);
  }, [fetchWalletDataHandler])

  let content = <h1>NO DATA FOUND!</h1>

  if (tokenData.length > 0) {
    content = <Main tokenData={tokenData} />
  }


  if (error) {
    content = <h1>AN ERROR HAS OCCURED!</h1>
    console.log(error)
  } 

  if (isLoading) {
    content = <Card><h1 className={classes.loading}>Loading...</h1></Card>;
  }

  return (
    <>
      {userCtx.isModalShowing && <AddWalletModal />}
      <Navbar fetchData={fetchWalletDataHandler} />
      {content}
      {/* <Footer /> */}
    </>
  );

};
export default App;
