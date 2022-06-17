import type { NextPage } from 'next'

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
        onClick={addToken}
      >Add Token</button>
    </div>
  )
}

export default Home
