import { useState, useContext, useEffect } from "react";
import UserContext from "../context/UserContext";

const useFetch = () => {

  const [tokenData, setTokenData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false)

  const userCtx = useContext(UserContext);

  const fetchWalletDataHandler = async () => {
    //constants for searches

    // const userCtxChains = {
    //   ETHEREUM: 'ethereum',
    //   POLYGON: 'polygon',
    //   AVALANCHE: 'avalanche',
    //   ALL_AVAILABLE: 'all',
    // }



    const MORALIS_CHAIN_NAMES = {
      'ethereum': 'eth',
      'polygon': 'polygon',
      'avalanche': 'avalanche',
    }

    // const MORALIS_CHAIN_NAMES = {
    //   ETHEREUM: 'eth',
    //   POLYGON: 'polygon',
    //   AVALANCHE: 'avalanche',
    // }

    const COINGECKO_ERC20_CHAIN_NAMES = {
      'ethereum': 'ethereum',
      'polygon': 'polygon-pos',
      'avalanche': 'avalanche',
    }

    // const COINGECKO_ERC20_CHAIN_NAMES = {
    //   ETHEREUM: 'ethereum',
    //   POLYGON: 'polygon-pos',
    //   AVALANCHE: 'avalanche'
    // }

    const COINGECKO_NATIVE_CHAIN_NAMES = {
      'ethereum': 'ethereum',
      'polygon': 'matic-network',
      'avalanche': 'avalanche-2',
    }

    // const COINGECKO_NATIVE_CHAIN_NAMES = {
    //   ETHEREUM: 'ethereum',
    //   POLYGON: 'matic-network',
    //   AVALANCHE: 'avalanche-2'
    // }

    const NATIVE_TOKEN_NAMES = {
      'ethereum': 'Ethereum',
      'polygon': 'Matic',
      'avalanche': 'Avax'
    }

    // const NATIVE_TOKEN_NAMES = {
    //   ETHEREUM: 'Ethereum',
    //   POLYGON: 'Matic',
    //   AVALANCHE: 'Avax',
    // }

    const TYPE = {
      NATIVE_TOKEN: 'balance',
      ERC20: 'erc20',
    }

    // var moralisSelectedChainName = userCtx.selectedChain;
    // var coinGeckoErc20ChainName = userCtx.selectedChain;
    // var coinGeckoNativeChainName = userCtx.selectedChain;
    // var nativeTokenName = null;

    // if (moralisSelectedChainName === 'ethereum') {
    //   moralisSelectedChainName = MORALIS_CHAIN_NAMES.ETHEREUM;
    //   nativeTokenName = NATIVE_TOKEN_NAMES.ETHEREUM;
    // };

    // if (coinGeckoErc20ChainName === 'polygon') {
    //   coinGeckoErc20ChainName = COINGECKO_ERC20_CHAIN_NAMES.POLYGON;
    //   coinGeckoNativeChainName = COINGECKO_NATIVE_CHAIN_NAMES.POLYGON;
    //   nativeTokenName = NATIVE_TOKEN_NAMES.POLYGON;
    // };

    // if (coinGeckoErc20ChainName === 'eth') {
    //   coinGeckoErc20ChainName = COINGECKO_ERC20_CHAIN_NAMES.ETHEREUM;
    //   coinGeckoNativeChainName = COINGECKO_NATIVE_CHAIN_NAMES.ETHEREUM;
    // };

    // if (coinGeckoErc20ChainName === 'avalanche') {
    //   coinGeckoNativeChainName = COINGECKO_NATIVE_CHAIN_NAMES.AVALANCHE;
    //   nativeTokenName = NATIVE_TOKEN_NAMES.AVALANCHE;
    // };

    // if (coinGeckoErc20ChainName === 'ethereum') {
    //   nativeTokenName = NATIVE_TOKEN_NAMES.ETHEREUM;
    // };

    console.log(userCtx);

    const moralis_api_call_native = `https://deep-index.moralis.io/api/v2/${userCtx.selectedWallet}/${TYPE.NATIVE_TOKEN}?chain=${MORALIS_CHAIN_NAMES[userCtx.selectedChain]}`
    const moralis_api_call_erc20 = `https://deep-index.moralis.io/api/v2/${userCtx.selectedWallet}/${TYPE.ERC20}?chain=${MORALIS_CHAIN_NAMES[userCtx.selectedChain]}`
    const coingecko_api_native_prices = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${COINGECKO_NATIVE_CHAIN_NAMES[userCtx.selectedChain]}%2C&per_page=100&page=1&sparkline=false&price_change_percentage=24h`

    console.log(moralis_api_call_native)
    console.log(moralis_api_call_erc20)
    console.log(coingecko_api_native_prices)



    const moralisApiHeader = {
      'accept': 'application/json',
      'X-API-Key': `${process.env.REACT_APP_X_API_KEY}`,
    }

    const geckoApiHeader = {
      'accept': 'application/json',
    }

    setIsLoading(true);
    setError(false);
    try {
      const responseNativeBalance = await fetch(moralis_api_call_native, {
        headers: moralisApiHeader,
      });

      console.log(moralis_api_call_native, moralisApiHeader)

      const responseErc20 = await fetch(moralis_api_call_erc20, {
        headers: moralisApiHeader,
      });

      const responseNativePrice = await fetch(coingecko_api_native_prices, {
        headers: geckoApiHeader,
      })

      if (!responseErc20.ok) {
        throw new Error('Error fetching token data')
      }

      //swap around the native and erc20 -> wrong (not changing now due to a different bug)
      const erc20Data = await responseErc20.json();
      const nativeBalanceData = await responseNativeBalance.json();
      const nativePrices = await responseNativePrice.json();

      console.log(nativeBalanceData)
      console.log(nativePrices[0]);

      //converts fetched tokenData data into improved format
      const transformedErc20TokenData = erc20Data.map((tokenData) => {
        return {
          tokenAddress: tokenData.token_address,
          name: tokenData.name,
          balance: tokenData.balance,
          decimals: tokenData.decimals,
          symbol: tokenData.symbol,
          price: null,
          dayChange: null,
          totalValue: null,
          chain: userCtx.selectedChain,
        };
      });



      //handles fetching prices for the different tokens fetched
      //allows filtering out the spam tokens (ones without prices)
      const addresses = transformedErc20TokenData.map(
        token => token.tokenAddress
      );
      const combinedAddresses = addresses.join('%2C')

      const api_prices = `https://api.coingecko.com/api/v3/simple/token_price/${COINGECKO_ERC20_CHAIN_NAMES[userCtx.selectedChain]}?contract_addresses=${combinedAddresses}&vs_currencies=usd&include_24hr_change=true`


      const responsePrices = await fetch(api_prices, {
        headers: geckoApiHeader,
      });

      const erc20PriceData = await responsePrices.json();


      //converts fetched price data into improved format
      const erc20ConvertedPrices = Object.entries(erc20PriceData)
      const erc20NewPrices = erc20ConvertedPrices.map((data) => {
        return {
          tokenAddress: data[0],
          price: data[1]['usd'],
          change: data[1]['usd_24h_change'],
        }
      })

      //adds the price,24hourchange in price to data
      transformedErc20TokenData.forEach((tokenData) => {
        let foundAddress = erc20NewPrices.find((priceData) => priceData.tokenAddress === tokenData.tokenAddress)
        if (foundAddress !== undefined) {
          tokenData.price = foundAddress['price'];
          tokenData.dayChange = foundAddress['change'];
        }
      });

      //combine the native price and balance data into 1 object
      const convertNativeData = (nativePrices, nativeBalanceData) => {
        const updatedNativeData = {}

        updatedNativeData.token_address = 'NATIVE_TOKEN';
        updatedNativeData.name = NATIVE_TOKEN_NAMES[userCtx.selectedChain];
        updatedNativeData.balance = nativeBalanceData.balance;
        updatedNativeData.decimals = 18;
        updatedNativeData.symbol = userCtx.selectedChain;
        updatedNativeData.price = nativePrices.current_price;
        updatedNativeData.totalValue = null;
        updatedNativeData.chainName = userCtx.selectedChain;

        console.log(nativePrices.current_price)

        return updatedNativeData
      }

      if (nativeBalanceData.balance != 0) {
        const convertedNativeData = convertNativeData(nativePrices[0], nativeBalanceData);

        //insert the native token object at the beginning of array of objects 
        transformedErc20TokenData.unshift(convertedNativeData);
      }

      //stores data into state variable
      setTokenData(transformedErc20TokenData)
    } catch (err) {
      console.log('err = ', err)
      setError(true);
    }
    setIsLoading(false);
  }


  useEffect(() => {
    fetchWalletDataHandler()
  }, [userCtx.selectedWallet, userCtx.selectedChain])

  return {
    tokenData,
    isLoading,
    error,
  }

}

export default useFetch;