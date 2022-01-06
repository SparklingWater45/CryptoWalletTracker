import { createContext } from "react";

const UserContext = createContext({
  //Can leave the object blank , just helps with autocompletion when referencing the UserContext component
  wallets: [],
  isModalShowing: false,
  selectedWallet: null,
  selectedChain: null,
  showModal: () => { },
  hideModal: () => { },
  addWallet: (walletAddress) => { },
  changeDataRetrievedStatus: () => { },
});

export default UserContext;