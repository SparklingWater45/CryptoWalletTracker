import classes from './WalletIcon.module.css';
import { useContext } from 'react';

import UserContext from '../../context/UserContext';


const WalletIcon = () => {

  const userCtx = useContext(UserContext);

  return (
    <img className={classes['wallet-icon']} src="data:image/png;base64,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" alt='unique wallet icon' />
  )
}

export default WalletIcon;