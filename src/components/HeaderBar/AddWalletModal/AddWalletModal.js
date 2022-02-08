
import { useContext, useRef } from "react";
import UserContext from "../../../context/UserContext";
import MetaMaskButton from "../Navbar/MetaMaskButton";
import classes from "./AddWalletModal.module.css";
import Modal from "./Modal";


//Wallet add allows you to search for a wallet location and click add 
//Adds the wallet to list of drop down wallets
const AddWalletModal = (props) => {
  const userCtx = useContext(UserContext);




  console.log('loading');

  const walletAddressRef = useRef();

  const addNewWalletAddressHandler = (event) => {
    event.preventDefault();
    const enteredWalletAddress = (walletAddressRef.current.value).trim();
    userCtx.addWallet(enteredWalletAddress);
  }

  const walletsSavedHandler = () => {
    console.log(userCtx)
    console.log('active wallet address =', userCtx.selectedWallet)
  }


  const addMetaMaskWallet = (walletAddress) => {
    userCtx.addWallet(walletAddress);

  }


  return (
    <Modal>
      <form onSubmit={addNewWalletAddressHandler} className={classes.container}>
        <h1>Add Wallet Address</h1>
        <input type='text' ref={walletAddressRef} ></input>
        <button type="submit">Submit</button>
        <button onClick={userCtx.hideModal}>Close</button>
        <MetaMaskButton addWallet={addMetaMaskWallet}/>
      </form>
    </Modal>
  )
};

export default AddWalletModal;