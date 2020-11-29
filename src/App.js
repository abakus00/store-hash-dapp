import { Button, Form } from 'react-bootstrap';
import React, { Component } from 'react';
import web3 from './web3';
import ipfs from './ipfs';
import StoreHash from './StoreHash';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props)

    this.state =
    {
      ipfsHash:null,
      title:'',
      description:'',
      tags:'',
      buffer:'',
      buffer2:'',
      ethAddress:'',
      accountAddress:'',
      ipfsHashIndex:'',
      checkIpfsHash: '',
      blockNumber:'',
      transactionHash:'',
      gasUsed:'',
      txReceipt: '',
    }
    this.captureFile = this.captureFile.bind(this);
    this.captureFile2 = this.captureFile2.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);

}


async componentDidMount() {
  const accounts = await web3.eth.getAccounts();

  this.setState({
    accountAddress: accounts[0]
  });
}
instantiateContract() {

  //const contract = require('truffle-contract')

  StoreHash.setProvider(this.state.web3.currentProvider)

  // Get accounts.
  this.state.web3.eth.getAccounts((error, accounts) => {
    StoreHash.deployed().then((instance) => {
      this.StoreHashInstance = instance
      this.setState({ accountAddress: accounts[0] });

    }).then((ipfsHash) => {
      // Update state with the result.
      this.setState({ ipfsHash })
    })
  })
}


//Take file input from user
captureFile(event) {
  event.preventDefault()
  const file = event.target.files[0]
  const reader = new window.FileReader()
  reader.readAsArrayBuffer(file)
  reader.onloadend = () => {
    this.setState({ buffer: Buffer(reader.result) })
    console.log('buffer', this.state.buffer)

    ipfs.files.add(this.state.buffer, (error, result) => {
      if(error) {
        console.error(error)
        return
      }
      this.setState({ ipfsHash: result[0].hash })
      })
    }
  }




  captureFile2(event) {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ buffer2: Buffer(reader.result) })
      console.log('buffer', this.state.buffer2)

      ipfs.files.add(this.state.buffer2, (error, result) => {
        if(error) {
          console.error(error)
          return
        }
        this.setState({ checkIpfsHash: result[0].hash })
        })
      }
    }


  onClick = async () =>
  {
      try
      {
        this.setState({blockNumber:"waiting.."});
        this.setState({gasUsed:"waiting..."});

        // get Transaction Receipt in console on click
        // See: https://web3js.readthedocs.io/en/1.0/web3-eth.html#gettransactionreceipt
        await web3.eth.getTransactionReceipt(this.state.transactionHash, (err, txReceipt)=>{
          console.log(err,txReceipt);
          this.setState({txReceipt});
        }); //await for getTransactionReceipt

        await this.setState({blockNumber: this.state.txReceipt.blockNumber});
        await this.setState({gasUsed: this.state.txReceipt.gasUsed});
      } //try
    catch(error)
    {
      console.log(error);
    } //catch
  } //onClick

  onSubmit = async (event) =>
  {
      event.preventDefault();

      //bring in user's metamask account address
            const accounts = await web3.eth.getAccounts();

      console.log('Sending from Metamask account: ' + accounts[0]);

      //obtain contract address from StoreHash.js
      const ethAddress= await StoreHash.options.address;
      this.setState({ethAddress});

      //save document to IPFS,return its hash#, and set hash# to state
      //https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#add
      await ipfs.add(this.state.buffer, (err, ipfsHash) =>
      {
        console.log(err,ipfsHash);
        //setState by setting ipfsHash to ipfsHash[0].hash
        this.setState({ ipfsHash:ipfsHash[0].hash });

        // call Ethereum contract method "sendHash" and .send IPFS hash to etheruem contract
        //return the transaction hash from the ethereum contract
        //see, this https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#methods-mymethod-send

        StoreHash.methods.sendHash(this.state.ipfsHash,this.state.title,this.state.description,this.state.tags).send({
          from: accounts[0]
        }, (error, transactionHash) => {
          console.log(transactionHash);
          this.setState({transactionHash});
        }); //StoreHash
      }) //await ipfs.add
    }; //onSubmit


    async onCheck(event) {
      event.preventDefault()

      // Get IPFS hasd address stored on blockchain
      const n = (await StoreHash.methods.getAddressFromHash(this.state.checkIpfsHash).call()).toString()

      console.log('Returning IPFS Hash')
      console.log(n)
      console.log(this.state.checkIpfsHash)
    }

    render()
    {
       console.log(this.state)
       return(<div className="App">

          <h1> IPFS File Upload and Storage dApp </h1>

          <h2> Uploads Images to Inter Planetary File System (IPFS) and Ethereum Blockchain </h2>

          <Form onSubmit={this.onSubmit} >
            <h4>Upload Image</h4>
            <img src={`https://ipfs.io/ipfs/${this.state.ipfsHash}`} alt=""/>
            <br/>
            <input type='file' onChange={this.captureFile} />
            <br/>
            <br/>
            <label htmlFor="Title"> Enter Title  </label>
            <input type='text' value={this.state.tile} onChange={event => this.setState({title: event.target.value})} />

            <label htmlFor="Description"> Enter Description  </label>
            <input type='text' value={this.state.description} onChange={event => this.setState({description: event.target.value})} />

            <label htmlFor="Tags"> Enter Tags </label>
            <input type='text' value={this.state.tags} onChange={event => this.setState({tags: event.target.value})} />
            <br/>
            <br/>
            <button type="submit"> Upload </button>
            <br/>
            <br/>
          </Form>


          <hr/>
              <table className="center">
               <thead>
                  <tr>
                    <th>Transaction Receipt</th>
                    <th>Values</th>
                  </tr>
               </thead>

               <tbody>
                  <tr>
                    <td>Current MetaMask Account: </td>
                    <td>{this.state.accountAddress}</td>
                  </tr>

                  <tr>
                    <td>IPFS Hash Number on Blockchain: </td>
                    <td>{this.state.ipfsHash}</td>
                  </tr>
                  <tr>
                    <td>Ethereum Contract Address: </td>
                    <td>{this.state.ethAddress}</td>
                  </tr>

                  <tr>
                    <td>Transaction Hash Number: </td>
                    <td>{this.state.transactionHash}</td>
                  </tr>

                  <tr>
                    <td>Block Number: </td>
                    <td>{this.state.blockNumber}</td>
                  </tr>

                  <tr>
                    <td>Gas Used</td>
                    <td>{this.state.gasUsed}</td>
                  </tr>
               </tbody>
              </table>

          <Button onClick = {this.onClick}> Get Transaction Receipt </Button>
          <hr />
          <h4>Check Image</h4>
            <form onSubmit={this.onCheck}>
               <img src={`https://ipfs.io/ipfs/${this.state.checkIpfsHash}`} alt=""/>
               <br/>
               <input type='file' onChange={this.captureFile2} />
               <br/>
               <p >IPFS Hash Address: </p> <p style={{ color: 'blue'}}> {this.state.checkIpfsHash}</p>
            </form>

        </div>
        );
     } //render
}

export default App;
