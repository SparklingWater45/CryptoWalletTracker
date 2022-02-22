import classes from './WalletIcon.module.css';
import { useContext } from 'react';
import BlockieImage from './BlockieImage';
import UserContext from '../../../context/UserContext';
import Unknown from '../../../icons/token/questionmark.svg';

const WalletIcon = () => {

  const userCtx = useContext(UserContext);

  if (userCtx.selectedWallet == null || userCtx.selectedWallet == undefined) {
    return (
      <div className={classes['wallet-icon']}>
        <img src={Unknown} />
      </div>
    )
  } else {
    return (
      <div className={classes['wallet-icon']}>
        <BlockieImage address={userCtx.selectedWallet} diameter={50} />
      </div>
    )
  }
}

export default WalletIcon;