pragma solidity ^0.4.18;

//noinspection ALL
contract MeTooVault {

	struct Memory {
		uint timestamp;
		string memoryString;
	}

    uint _numberOfMemories;

	mapping (string => Memory[]) _memories;
	mapping (address => string[]) address_to_pass;


	function MeTooVault() {
	    _numberOfMemories = 0;
	}

	function embedMemory(string accountId, string memoryString) returns (int result) {
        if (bytes(memoryString).length > 10000) {
			result = -2;
		} else {
		    Memory memory _memory;
            _memory.timestamp = now;
            _memory.memoryString = memoryString;
            _memories[accountId].push(_memory);
			_numberOfMemories+=1;
			result = 0;
		}
	}

	function getLatestMemory(string accountId) constant returns (string memoryString, uint timestamp) {
		if (_memories[accountId].length > 0)
		{
		    return (_memories[accountId][0].memoryString, _memories[accountId][0].timestamp);
		}
	}

	function getLatestMemory(string address) constant returns (Memory[] memories) {
    		if (_memories[address].length > 0)
    		{
    		    return _memories[address]
    		}
    }

	function getNumberOfMemories() constant returns (uint numberOfMemories) {
		return _numberOfMemories;
	}

	function getGlobalNumberOfMemories() constant returns (uint numberOfMemories) {
		return _numberOfMemories;
	}

}