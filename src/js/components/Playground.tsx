import React from 'react';

import { LCDClient, Coin } from '@terra-money/terra.js';

// connect to bombay testnet
const terra = new LCDClient({
  URL: 'https://bombay-lcd.terra.dev',
  chainID: 'bombay-12',
});

// get the current swap rate from 1 TerraUSD to TerraKRW
const offerCoin = new Coin('uusd', '1000000');
terra.market.swapRate(offerCoin, 'ukrw').then(c => {
  console.log(`${offerCoin.toString()} can be swapped for ${c.toString()}`);
});


const Playground = (): JSX.Element => {
  return (
    <div>
      Playground
    </div>
  )
}

export default Playground;
