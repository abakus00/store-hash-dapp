const StoreHash = artifacts.require('./StoreHash.sol')
//const truffleAssert = require('truffle-assertions')

// test suite
contract('StoreHash', (accounts) => {
  // Contract instance
  let StoreHashInstance

  // A few owner accounts
  const owner = accounts[0]
  const bob = accounts[1]
  const sally = accounts[2]
  const emptyAddress = '0x0000000000000000000000000000000000000000'

  // Imaage 1 details
  const ipfsHash1 = 'QmbPSVB2ygxiwnzBiE3HJyzHpfXcoEiownSKkC9UGu81pW'
  const title1 = 'Metamask'
  const description1 = 'Metamask logo'
  const tags1 = 'web3, Ethereum, Smart Contract'

  // Imaage 2 details
  const ipfsHash2 = 'QmbWEMLmvx7Dr3Cd3AjeN5n1ymKXMVcnQTJCUchowdLPZU'
  const title2 = 'Yummy Cake'
  const description2 = 'Delicious Cake'
  const tags2 = 'Food, Cake, Treat'

  // Create a new instance of the contract before each test
  beforeEach(async () => {
      Instance = await StoreHash.new()
  })


  before(async () => {
    StoreHashInstance = await StoreHash.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await StoreHash.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })


  })

  // It should have an owner
  it('has an owner', async () => {
    assert.equal(await StoreHashInstance.owner(), owner, 'has an owner')
  })


  // It should return details of an image previously stored on the blockchain
  it('should return image details', async () => {
    await StoreHashInstance.sendHash(
      ipfsHash1,
      title1,
      description1,
      tags1,
      {
        from: owner,
      }
    )

    const image = await StoreHashInstance.getHash(owner, 0)

    assert.equal(
      image[0],
      ipfsHash1,
      'the IPFS hash does not match the expected value'
    )
    assert.equal(
      image[1],
      title1,
      'the title does not match the expected value'
    )
    assert.equal(
      image[2],
      description1,
      'the description does not match the expected value'
    )
    assert.equal(image[3], tags1, 'the tags do not match the expected value')
    assert.notEqual(image[4], 0, 'the uploadedOn date should be non-zero')
  })



  // It should require a valid IPFS hash
  it('should require a valid IPFS hash when uploading an image', async () => {
    const badIPFSHash = ipfsHash1.slice(0, ipfsHash1.length / 2)

    try {
      await StoreHashInstance.sendHash('', title1, description1, tags1, {
        from: owner,
      })
      assert.fail('Expected throw not received')
    } catch (error) {
      assert(
        error.message.indexOf('revert') >= 0,
        'error message must contain revert'
      )
    }

    try {
      await StoreHashInstance.sendHash(
        badIPFSHash,
        title1,
        description1,
        tags1,
        {
          from: owner,
        }
      )
      assert.fail('Expected throw not received')
    } catch (error) {
      assert(
        error.message.indexOf('revert') >= 0,
        'error message must contain revert'
      )
    }
  })

  // It should require a valid title where the length cannot be greater than 256
  it('should require a valid title when uploading an image', async () => {
    try {
      await StoreHashInstance.sendHash(
        ipfsHash1,
        '',
        description1,
        tags1,
        {
          from: owner,
        }
      )
      assert.fail('Expected throw not received')
    } catch (error) {
      assert(
        error.message.indexOf('revert') >= 0,
        'error message must contain revert'
      )
    }

    try {
      await StoreHashInstance.sendHash(
        ipfsHash1,
        'X'.repeat(257),
        description1,
        tags1,
        {
          from: owner,
        }
      )
      assert.fail('Expected throw not received')
    } catch (error) {
      assert(
        error.message.indexOf('revert') >= 0,
        'error message must contain revert'
      )
    }
  })

  // It should require a valid description where the length cannot be greater than 1024
  it('should require a valid description when uploading an image', async () => {
    try {
      await StoreHashInstance.sendHash(ipfsHash1, title1, '', tags1, {
        from: owner,
      })
    } catch (error) {
      assert.fail('Unexpected throw received')
    }

    try {
      await StoreHashInstance.sendHash(
        ipfsHash1,
        title1,
        'X'.repeat(1025),
        tags1,
        {
          from: owner,
        }
      )
      assert.fail('Expected throw not received')
    } catch (error) {
      assert(
        error.message.indexOf('revert') >= 0,
        'error message must contain revert'
      )
    }
  })

  // It should require tags where the combined list length cannot be greater than 256
  it('should require tags when uploading an image', async () => {
    try {
      await StoreHashInstance.sendHash(
        ipfsHash1,
        title1,
        description1,
        '',
        {
          from: owner,
        }
      )
      assert.fail('Expected throw not received')
    } catch (error) {
      assert(
        error.message.indexOf('revert') >= 0,
        'error message must contain revert'
      )
    }

    try {
      await StoreHashInstance.sendHash(
        ipfsHash1,
        title1,
        description1,
        'X'.repeat(257),
        {
          from: owner,
        }
      )
      assert.fail('Expected throw not received')
    } catch (error) {
      assert(
        error.message.indexOf('revert') >= 0,
        'error message must contain revert'
      )
    }
  })



})
