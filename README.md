# IPFS Simple Storage dApp

## Summary

This is a project submission for the *Consensys Blockchain Developer Online Bootcamp 2020*.

This Ethereum Decentralised Application (dApp), smart contract, addresses the challenge of storing digital assets such as images and files on the Ethereum Public Blockchain. The problem has been that storing any serious amount of data on the Ethereum blockchain is really prohibitive. Calculations estimate the cost of storing 1MB is over $600 at today's prices! 

That's where IPFS comes in. The digital assets can be stored on IPFS and the cryptographic hashes can be stored on a blockchain to offer an immutable, permanent record  that is timestamped and secure..

This dApp is a simple application that allows a user to select a digital asset, enter some details about the asset and then confirm the asset should be stored. The image is stored on IPFS. The descriptive data input by the user and the IPFS hash are sent to the the Ethereum Blockchain for storage. Once the IPFS hash is sent to the Ethereum blockchain the user can request a transaction receipt and also View the image on IPFS.

By combining IPFS and the Ethereum Blockchain the dApp affords the following benefits:
1. IPFS, a file sharing system that stores and shares large files efficiently.
2. Ethereum Blockchain, permanent, immutable storage of the IPFS hash generated when the user submits the file for upload.
3. A Transaction Receipt which serves as indisputable proof that the image existed and was uploaded and published.

The transaction receipt includes the following details:
    *  Ethereum account of the signed in user
    *  IPFS hash
    *  Ethereum blockchain transaction hash
    *  Block number



# User Interface and Live Demo

![User Interface](public/ipfs_simple_storage_dapp_ui.png?raw=true)
wrapped in a link
[Demo of Smart Contract](https://drive.google.com/file/d/1sctuTr1ksgw2VqQ84Ya5bJaNiQLGIOIC/view?usp=sharing "Demo of smart contract")



## Technical Stack involved

  * React - Front end library
  * Solidity — The language used to build smart contracts that runs on Ethereum
  * IPFS — Decentralised storage for the images via Infura
  * Infura -  API access to Ethereum network and IPFS
  * Metamask — the web3 provider
  * Node.js - JavaScript runtime environment
  * Truffle - for development and testing framework
  * Ganache - To run the development Blockchain
  * OpenZeppelin library -  Access to secure, smart contracts built to reduce vulnerabilities


# Usage
## Upload Image

  1. Click  *Choose file* to select an image to upload to IPFS and the blockchain.
  2. The file selected will be displayed.
  3. Enter a title, description and at least one tag to store with the image
  4. Click *Submit* to upload the image to IPFS
  5. Confirm the transaction to Ethereum Blockchain when Metamask appears.
  6. The IPFS has and the details entered by the user are written on the Ethereum Blockchain
  7. The IPFS hash the Ethereum contract address and the transaction hash are displayed as confirmation.


## Get Transaction Receipt
  1. Click *Transaction Receipt* for the remaining details on the transactions
  2. The block number and Gas Used for the transaction will be reported.


# Getting Started

## Installation

1. Install IPFS and start IPFS Daemon locally
```
$ npm install ipfs-api
$ ipfs init

```

2. Install Truffle Framework and Ganache CLI globally. Note, the Ganache GUI can be used too.
```
    $ npm install -g truffle
    $ npm install -g ganache-cl
```

3. Open a terminal to the development Blockchain *and keep it running*
```
    $ ganache-cli
```

4. Open another a second terminal and clone the repository and install its dependencies:
```
    $ git clone https://github.com/abakus00/CA_2020_final_project.git
    $ cd simple-storage-dapp
    $ npm install
```

5. To interact with the smart contract, compile and then migrate it:
```
    $ truffle compile --reset
    $ truffle migrate --reset
```

Alternatively, you can combine the two commands above into the single command below:

```
    $ truffle migrate --reset ---compile-all
```


## Testing

1. Enter the following command at the terminal to run the unit tests
```
    $ truffle test
```

2. You should see the following:

```
  Add test output here:
    ✓ testAddItem (90ms)
    ✓ testGetItem (153ms)

```

## How to run

1. Run the following command to start the dApp:
```
    npm run start
```

2. Navigate to http://localhost:3000/ in your browser.

3. Make sure MetaMask is connected to one of your local Ganache Ethereum accounts

Note: Connect to Localhost 8545



## Deploy to Testnet
The following steps will deploy the smart contrcat to TestNet

1. Get an Infura API key. You can sign up for free.

2. Create a .env file in the root directory if it doesn't exist
```
    cd simple-storage-dapp
    touch .env
```
3. Update the .env file with your MetaMask mnenomic and Infura API Key
```
    MNENOMIC = '<Your MetaMask recovery words>'
    INFURA_API_KEY = '<Your Infura API Key after its registration>'
```
4. Deploy to a Testnet with truffle migrate --reset --compile-all *--network*
```
    $ truffle migrate --reset --compile-all --network rinkeby
```
5. Run the application as described in section *How to run* above

## Troubleshooting Tips
  * Check Ganache is running
  * Check the MetaMask account is one of the Ganache accounts listed.
  * Did you truffle compile and migrate after starting your local network or making changes to the smart contract?


## FAQ

* __Why is there both a truffle.js file and a truffle-config.js file?__

    Truffle requires the truffle.js file be named truffle-config on Windows machines. Feel free to delete the file that doesn't correspond to your platform.

* __Why do I get an error when I use the Ganache GUI instead of Ganache-cli?__

     In `Metamask`, enter details for `Custom RPC` in New RPC URL as `http://0.0.0.0:8545` (You may need to log out and import using seed given by ganache) and verify the accounts addresses are similar to what are displayed in ganache
    https://stackoverflow.com/questions/52363977/how-to-run-ganache-cli-from-vagrant-box

## Future Enhancements
* Improve the cosmetics of the User Interface
* Add functionality to search for any file that has been stored on IPFS and the Ethereum blockchain
* Add an option to display the list of all files stored by any user, with URLs to their location in IPFS
* Allow video uploads



## Design Considerations
For all the design pattern decisions, please see here

## Avoiding Common Attacks
For the steps taken to avoid known common attacks, please see here

## Library/Contracts Imported
Contracts in thhe OpenZeppelin library were used.


## Requirements the project satisfies
### Smart contract
  * Is Truffle project
  * Smart contract calls at least one library function
  * Has a circuit breaker design pattern and at least one other design pattern
  * Five units tests for each smart contract
  * Smart contract is deployed to testnet

### Frontend
  * Has a development server the frontend interaction
  * Work with webs.js, Infura and MetaMask

### Bonus Points
  * Users can dynamically upload documents to IPFS that are referenced via their smart contract

# Acknowledgements
  * To the amazing teaching staff and mentors at Consensys Academy. Simply the best!!
  * To all the students I was able to interact with on Slack and on the ETHOnline Hackathon 2020
