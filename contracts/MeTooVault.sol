pragma solidity ^0.4.17;

//noinspection ALL
contract MeTooVault {

	struct Memory {
		uint timestamp;
		string memoryString;
	}

	mapping (uint => Memory) _memories;
    mapping (string => uint) memoryid_lookup;

    string last_hash;


	function MeTooVault() {
		last_hash = "uninitialized";
	}

	function embedMemory(string memoryString) returns (int result) {
        account_hash = 
        if (bytes(memoryString).length > 10000) {
			result = -2;
		} else {
			_memories[_numberOfMemories].timestamp = now;
			_memories[_numberOfMemories].memoryString = memoryString;
			_numberOfMemories++;
			result = 0; // success
		}
	}

	function getMemory(string memoryHash) constant returns (string memoryString, uint timestamp) {
		// returns two values
		memoryString = _memories[memoryHash].memoryString;
		timestamp = _memories[memoryHash].timestamp;
	}

	function getLatestMemory() constant returns (string memoryString, uint timestamp, uint numberOfMemories) {
		// returns three values
        if(keccak256(last_hash) == keccak256("uninitialized")){
            memoryString = "Nothing";
            timestamp = 0;
            _numberOfMemories = 0;
        }
        else{
            memoryString = _memories[last_hash].memoryString;
            timestamp = _memories[last_hash].timestamp;
            numberOfMemories = _numberOfMemories;
        }

	}

	function getNumberOfMemories() constant returns (uint numberOfMemories) {
		return _numberOfMemories;
	}

}