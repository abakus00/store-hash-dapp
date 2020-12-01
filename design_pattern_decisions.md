# Design Pattern Decisions

***

## Summary
This smart contract permits users to add and verify an image alongside descriptive details the user inputs.

The design patterns used to implement this smart contract are:


### Checks-Effects-Interaction Pattern
- This pattern was followed starting with a validation of all the arguments and throwing errors. Next, changes were made to the smart contract’s state and finally its interaction with other smart contracts were checked. Most time was spent checking the effects of the upload interaction.


### Curcuit Breaker (Emergency Stop) and Role Based Actions
- Triggers a modifier stopInEmergency if a problem should occur with the image/file upload. The modifier is called in function 'sendHash'.  
- Inherits the `Pausable` and `Ownable` contracts from Openzeppelin. This ensures the execution of functions inside the smart contract can be stopped in an emergency.
- Calls a modifier 'onlyAdmin' to suspend all actions in the contract when a bug is discovered. Only the admin is able to toggle this boolean to pause the contract, and to delete it if ever necessary.


### Balance Limit Pattern
- This pattern monitors the amount of Ether in the users contract, and rejects payments when they exceed the balances predefined maximum. Through testing it was noticed that images of large sizes were immediately rejected by Metamask when the user tried to submit the transaction.
- A User Experience enhancement would be to estimate the cost to upload the image and issue a warning that the action is not permitted immediately the image is selected.


### Speed Bumps – Delay Contract Actions
These checks were not required during testing, but would be highly recommended in a production environment where controls would delay and restrict users from sending too many upload requests to IPFS/Ethereum blockchain.

***
