import type { NextPage } from 'next'
import web3 from 'web3'

declare global {
  interface Window {
    ethereum: any;
  }
}

const Home: NextPage = () => {

  const tokenAddress = '0x17510690C817A7898bfe63B56dE12cAa626f2645';
  const tokenSymbol = 'BCCTEST';
  const tokenDecimals = 0;
  const tokenImage = 'https://ipfs.io/ipfs/QmRmW88atatrZZvjKzvoPEMgxbVqyBnMZoDeSj4x154y2c';

  const addToken = async () => {
    await checkNetwork();
    try {
      const wasAdded = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
            image: tokenImage,
          },
        },
      });
      if (wasAdded) {
        console.log('add token success');
      } else {
        console.log('failed to add token');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const chainId = 80001; // chain id for polygon testnet
  const networkName = 'Matic Mumbai';
  const rpcUrls = ['https://rpc-mumbai.maticvigil.com/'];

  const checkNetwork = async () => {
    if (window.ethereum.networkVersion !== chainId) {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainName: networkName,
            chainId: web3.utils.toHex(chainId),
            nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
            rpcUrls: rpcUrls,
          }
        ]
      });
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
      }}
    >
      <button
        onClick={checkNetwork}
        style={{
          width: '200px',
          padding: '10px',
          borderRadius: '5px',
          margin: '10px',
        }}
      >Check Network</button>
      <button
        onClick={addToken}
        style={{
          width: '200px',
          padding: '10px',
          borderRadius: '5px',
          margin: '10px',
        }}
      >Add Token</button>
    </div>
  )
}

export default Home
