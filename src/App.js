import { useContext, useEffect, useState, useCallback } from 'react';
import classes from './App.module.css';
import Main from "./components/BodyDisplay/Main";
import Navbar from "./components/HeaderBar/Navbar/Navbar";
import AddWalletModal from "./components/HeaderBar/AddWalletModal/AddWalletModal";
import UserContext from './context/UserContext';
import Card from './components/UI/Card';
import useFetch from './hooks/useFetch';

const App = () => {
  const userCtx = useContext(UserContext);
  
  //SELECTED WALLET IS GIVING NULL!
  const { erc20TokenData, nativeTokenData, isLoading, error } = useFetch();
  console.log(erc20TokenData)
  return (
    <>
      {userCtx.isModalShowing && <AddWalletModal />}
      <Navbar />
      {!userCtx.selectedWallet && <Card><h1>NO WALLET SELECTED</h1></Card>}
      {userCtx.selectedWallet && <div>
        {isLoading && <Card><h1 className={classes.loading}>Loading...</h1></Card>}
        {error && <h1>Error encountered</h1>}
        {!isLoading && <Main erc20TokenData={erc20TokenData} nativeTokenData={nativeTokenData} />}
      </div>}
    </>
  );

};
export default App;
