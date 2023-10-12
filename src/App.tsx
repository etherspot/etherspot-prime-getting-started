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
    setEoaWalletAddress(randomWallet.address);
    setEoaPrivateKey(randomWallet.privateKey);
}

  const generateEtherspotWallet = async () => {
    // Initialise Etherspot SDK
    const primeSdk = new PrimeSdk({ privateKey: eoaPrivateKey}, { chainId: 80001, projectKey: '' })
    const address: string = await primeSdk.getCounterFactualAddress();
    setEtherspotWalletAddress(address);
    console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet address: ${address}`);
  }

  return (
    <div className="App-header">

      <img className="App-logo" src={logo}></img>
      <h1  className="App-title">Getting started with Etherspot Prime</h1>

      <p> To initialise the SDK, it requires a Key Based Wallet(KBW) to be passed in.</p>

      <button className="App-button" onClick={() => generateRandomEOA()}>
            First click here to generate a random KBW. 
      </button>
      <a href={"https://mumbai.polygonscan.com/address/" + eoaWalletAddress}>
        KBW Address: {eoaWalletAddress}
      </a>

      <p>
        Now we can intialise the SDK with this address as the owner, and create an Etherspot smart contract wallet.
      </p>

      <button className="App-button" onClick={() => generateEtherspotWallet()}>
            Generate Etherspot Smart Contract Wallet
      </button>
      <a href={"https://mumbai.polygonscan.com/address/" + etherspotWalletAddress}>
    
        Etherspot Smart Account Address: {etherspotWalletAddress}
      </a>

      <p>
           
        <a className="App-link" target="_blank" href="https://etherspot.fyi/prime-sdk/intro">
        Now you have a wallet created you can explore what else we can do with the Prime SDK.</a>
      </p>
    </div>
  )
}

export default App;
