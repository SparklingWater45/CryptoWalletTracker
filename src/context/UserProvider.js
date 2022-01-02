import { useReducer } from "react";
import UserContext from './UserContext';


const availableActions = {
  DISPLAY: 'DISPLAY',
  HIDE: 'HIDE',
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  SELECTWALLET: 'SELECTWALLET',
  SELECTCHAIN: 'SELECTCHAIN'
}

const availableChains = {
  ETHEREUM: 'ETHEREUM',
  POLYGON: 'POLYGON',
  AVALANCHE: 'AVALANCHE',
}


const initialUserState = {
  wallets: ['0x1', '0x2'],
  isModalShowing: false,
  selectedWallet: null,
  selectedChain: availableActions.ETHEREUM,
};

const userReducer = (state, action) => {
  switch (action.type) {

    case availableActions.DISPLAY: {
      console.log('display!')
      return {
        wallets: state.wallets,
        isModalShowing: true,
        selectedWallet: state.selectedWallet,
        selectedChain: state.selectedChain,
      };
    }

    case availableActions.HIDE: {
      console.log('hide!')
      return {
        wallets: state.wallets,
        isModalShowing: false,
        selectedWallet: state.selectedWallet,
        selectedChain: state.selectedChain,
      };
    }

    case availableActions.ADD: {
      console.log('ADD!')
      const updatedWallets = state.wallets
      updatedWallets.push(action.walletAddress);


      //set new added wallet to be the selected wallet
      const updatedSelectedWallet = action.walletAddress;
      return {
        wallets: updatedWallets,
        isModalShowing: state.isModalShowing,
        selectedWallet: updatedSelectedWallet,
        selectedChain: state.selectedChain,
      }
    }

    case availableActions.SELECTWALLET: {
      console.log('Select wallet');
      const updatedSelectedWallet = action.walletAddress;

      return {
        ...state,
        selectedWallet: updatedSelectedWallet,
        selectedChain: state.selectedChain,
      }
    }


    case availableActions.SELECTCHAIN: {
      console.log('Select Chain');
      const updatedChain = action.chainName;

      return {
        ...state,
        selectedChain: updatedChain,
      }
    }
  }
}

const UserProvider = (props) => {
  const [userState, dispatchUserAction] = useReducer(
    userReducer,
    initialUserState
  );

  const showModalHandler = () => {
    dispatchUserAction({ type: availableActions.DISPLAY })
  }

  const hideModalHandler = () => {
    dispatchUserAction({ type: availableActions.HIDE })
  }

  const addWalletHandler = (walletAddress) => {
    dispatchUserAction({ type: availableActions.ADD, walletAddress: walletAddress })
  }

  const selectedWalletHandler = (walletAddress) => {
    dispatchUserAction({ type: availableActions.SELECTWALLET, walletAddress: walletAddress })
  }

  const selectChainHandler = (chainName) => {
    dispatchUserAction({ type: availableActions.SELECTCHAIN, chainName: chainName })
  }

  // const removeWalletHandler = (walletAddress) => {
  //   dispatchUserAction({ type: 'ADD', walletAddress: walletAddress })
  // }

  const userContext = {
    wallets: userState.wallets,
    isModalShowing: userState.isModalShowing,
    selectedWallet: userState.selectedWallet,
    showModal: showModalHandler,
    hideModal: hideModalHandler,
    addWallet: addWalletHandler,
    selectWallet: selectedWalletHandler,
  }

  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
