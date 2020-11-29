pragma solidity ^0.5.16;


import "@openzeppelin/contracts/ownership/Ownable.sol";
import "@openzeppelin/contracts/lifecycle/Pausable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

/** 
 * @title StoreHash
 * @author Amma Manso (Consensys Bootcamp 2020 
 * @notice This contract stores an image on IPFS. The IPFS hash number of the image, along with user entered descriptive details are stored on the Ethereum blockchain. 
 *      Images are stored on IPFS due to storage limitations on the blockchain
 *      The IPFS hash along with metadata are stored on the Ethereum blockchain.
 */



contract StoreHash is Ownable, Pausable {
    
 	// Initialize Ownable contract
	constructor() public {	
		Ownable(msg.sender);
	}



    /** 
    * @title StoreHash - uploads an image selected by a user to IPFS and stores the Hash on the Ethereum Blockchain. 
    */
    struct Image {
        string ipfsHash;        // IPFS hash
        string title;           // User Entry: - Title to associate with the image
        string description;     // User Entry: - Description to associate with the image
        string tags;            // User Entry: - Image tags in comma separated format to associate with the image
        uint256 uploadedOn;     // Timestamp for date and time the image was uploaded
    }

    // Maps owner to the uploaded images
    mapping (address => Image[]) public ownerToImages;

    // Used by Circuit Breaker pattern to switch contract on / off
    bool private stopped = false;
    address public admin;


    /**
    * @dev Indicates that a user has uploaded a new image
    * @param _owner The owner of the image
    * @param _ipfsHash The IPFS hash
    * @param _title The image title
    * @param _description The image description
    * @param _tags The image tags
    * @param _uploadedOn The upload timestamp
    */
    event LogImageUploaded(
        address indexed _owner, 
        string _ipfsHash, 
        string _title, 
        string _description, 
        string _tags,
        uint256 _uploadedOn
    );
   

    /**
    * @dev Prevents execution in the case of an emergency
    */
    modifier stopInEmergency { 
        require(!stopped); 
        _;
    }

    modifier onlyAdmin {
        require(msg.sender == admin);
        _;
    }

    function toggleContractActive() onlyAdmin public {
    // Stop a contract to be based   
    stopped = !stopped;
    }
    
    // Contract destroy - only way a contract can be deleted
    function destroy() onlyAdmin public {
	selfdestruct(msg.sender);
    }


    /**  
    * @dev This function is called for all messages sent to
    * this contract (there is no other function).
    * Sending Ether to this contract will cause an exception,
    * because the fallback function does not have the `payable`
    * modifier.
    */


    mapping (address => bytes32[]) public addressToHashes;
    
    // List of state variables
    mapping (bytes32 => address) public hashToAddress;
    mapping(bytes32 => string) public hashToTag;

    /** 
        * @notice associate an image entry with the owner i.e. sender address
        * @dev Controlled by circuit breaker
        * @param _ipfsHash The IPFS hash
        * @param _title The image title
        * @param _description The image description
        * @param _tags The image tag(s)
        */
    function sendHash(
        string memory  _ipfsHash, 
        string memory _title, 
        string memory _description, 
        string memory _tags
    ) public stopInEmergency returns (bool _success) {
            
        require(bytes(_ipfsHash).length == 46);
        require(bytes(_title).length > 0 && bytes(_title).length <= 256);
        require(bytes(_description).length < 1024);
        require(bytes(_tags).length > 0 && bytes(_tags).length <= 256);

        uint256 uploadedOn = now;
        Image memory image = Image(
            _ipfsHash,
            _title,
            _description,
            _tags,
            uploadedOn
        );

        ownerToImages[msg.sender].push(image);

        emit LogImageUploaded(
            msg.sender,
            _ipfsHash,
            _title,
            _description,
            _tags,
            uploadedOn
        );

        _success = true;
    }



    /** 
    * @notice Returns the image at index in the ownership array
    * @dev Controlled by circuit breaker
    * @param _owner The owner address
    * @param _index The index of the image to return
    * @return _ipfsHash The IPFS hash
    * @return _title The image title
    * @return _description The image description
    * @return _tags image Then image tags
    * @return _uploadedOn The uploaded timestamp
    */ 
    function getHash(address _owner, uint8 _index) 
        public stopInEmergency view returns (
        string memory _ipfsHash, 
        string memory _title, 
        string memory _description, 
        string memory _tags,
        uint256 _uploadedOn
    ) {

        require(_owner != address(0));
        require(_index >= 0 && _index <= 2**8 - 1);
        require(ownerToImages[_owner].length > 0);

        Image storage image = ownerToImages[_owner][_index];
        
        return (
            image.ipfsHash, 
            image.title, 
            image.description, 
            image.tags, 
            image.uploadedOn
        );
    }


}
