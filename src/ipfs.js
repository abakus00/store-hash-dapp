// 1. import the ipfs-api module and assign into a variable called IPFS(user defined)
// 2. Assign three parameters host, port, protocol to initialise the ipfs and connect our program to ipfs infura.
// 3. Export file in the name of ipfs.

const IPFS = require('ipfs-api');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

export default ipfs;
