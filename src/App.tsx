'use client';

import React from 'react';
import { PrimeSdk } from '@etherspot/prime-sdk';
import { ethers } from 'ethers'
import './App.css';
import logo from "./etherspot.png"


const App = () => {

  
  const [etherspotWalletAddress, setEtherspotWalletAddress] = React.useState('0x0000000000000000000000000000000000000000');
  const [eoaWalletAddress, setEoaWalletAddress] = React.useState('0x0000000000000000000000000000000000000000');
  const [eoaPrivateKey, setEoaPrivateKey] = React.useState('');

  const generateRandomEOA = async () => {
    // Create random EOA wallet
    const randomWallet = ethers.Wallet.createRandom();
    // Set address and private key to pass into the Etherspot Prime SDK
    setEoaWalletAddress(randomWallet.address);
    setEoaPrivateKey(randomWallet.privateKey);
}

  const generateEtherspotWallet = async () => {
    // Initialise Etherspot SDK with the private key from the random wallet we created
    // chainId is 80001 (mumbai) for this example
    const primeSdk = new PrimeSdk({ privateKey: eoaPrivateKey}, { chainId: 80001, projectKey: '' })

    // Function to get the Etherspot wallet address
    const address: string = await primeSdk.getCounterFactualAddress();
    setEtherspotWalletAddress(address);
  }

  return (
    <div className="App-header">

      <head>
        <link rel="shortcut icon" type="image/x-icon" href={logo} />
      </head>

      <img className="App-logo" src={logo}></img>

      <h1  className="App-title">Getting started with Etherspot Prime</h1>

      <p> To initialise the SDK, it requires a Key Based Wallet(KBW) to be passed in.</p>

      <button className="App-button" onClick={() => generateRandomEOA()}>
            First click here to generate a random KBW. 
      </button>
      <a className="App-button" target="_blank" href={"https://mumbai.polygonscan.com/address/" + eoaWalletAddress}>
        KBW Address: {eoaWalletAddress}
      </a>

      <p>
        Now we can intialise the SDK with this address as the owner, and create an Etherspot smart contract wallet.
      </p>

      <button className="App-button"  onClick={() => generateEtherspotWallet()}>
            Generate Etherspot Smart Contract Wallet
      </button>
      <a className="App-button" target="_blank" href={"https://mumbai.polygonscan.com/address/" + etherspotWalletAddress}>
    
        Etherspot Smart Account Address: {etherspotWalletAddress}
      </a>

      <p>
        <a className="App-link" target="_blank" href="https://etherspot.fyi/prime-sdk/intro">
        Now you have a wallet created you can explore what else we can do with the Prime SDK.</a>
      </p>

      <p>You can take a look at src/App.tsx to learn how we did this.</p>
    </div>
  )
}

export default App;
