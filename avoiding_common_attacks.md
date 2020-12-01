# Avoiding Common Attacks

***

## Summary

Measures taken to ensure the contract is not susceptible to common attacks. This contract is relatively safe because there are no value transfers.

Common race condition attacks do not apply here, including:
  - Reentrancy
  - Cross-function Race Conditions
  - Pitfalls in Race Condition Solutions

* __OpenZeppelin library for smart contract imports:__  Contracts in the OpenZeppelin smart contract library were selected as they are verified and audited and known to work on the main net without issues.



## Restrict Access

* __Ownable contract:__  Provides the contract owner with basic authorisation functions

* __onlyAdmin:__ Allows the contract owner to pause or delete the contract



## Circuit Breaker

* __Pausable contract:__ for emergency stop functionality.

* __self_destruct function:__ to allow the contract to be deleted.

* __Stop_in_Emergency function__ Also called in emergencies

* __toogleContractActive__ To allow the Admin to pause the contract (toggle contract on/off)



### Integer Overflow and Underflow

All mathematic operations in this contract use the zeppelin standard `SafeMath` library.

***
