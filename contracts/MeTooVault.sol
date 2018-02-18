pragma solidity ^0.4.18;
import "./strings.sol";
import "./StringUtils.sol";

//noinspection ALL
contract MeTooVault {
	using strings for *;
	using StringUtils for *;

	struct Memory {
		uint timestamp;
		string memoryString;
	}

	uint _numberOfMemories;

	mapping (string => Memory[]) _memories;
	mapping (address => string[]) address_to_pass;
	string delimiter = "###############";


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

	function bytesToString(bytes32 x) constant returns (string) {
		bytes memory bytesString = new bytes(32);
		uint charCount = 0;
		for (uint j = 0; j < 32; j++) {
			byte char = byte(bytes32(uint(x) * 2 ** (8 * j)));
			if (char != 0) {
				bytesString[charCount] = char;
				charCount++;
			}
		}
		bytes memory bytesStringTrimmed = new bytes(charCount);
		for (j = 0; j < charCount; j++) {
			bytesStringTrimmed[j] = bytesString[j];
		}
		return string(bytesStringTrimmed);
	}


	function getAllMemory(string accountId) constant returns (string, string) {


		if (_memories[accountId].length > 0)
		{
			var memory_list = new strings.slice[](_memories[accountId].length);
			var timestamp_list = new strings.slice[](_memories[accountId].length);
			uint i = 0;
			while (i < _memories[accountId].length) {
				memory_list[i] = _memories[accountId][i].memoryString.toSlice();
				timestamp_list[i] = bytesToString(StringUtils.uintToBytes(_memories[accountId][i].timestamp)).toSlice();
				i++;
			}

			return (delimiter.toSlice().join(memory_list), delimiter.toSlice().join(timestamp_list));
			//return memory_list[0].toString();
		}
	}

	function getNumberOfMemories() constant returns (uint numberOfMemories) {
		return _numberOfMemories;
	}

	function getGlobalNumberOfMemories() constant returns (uint numberOfMemories) {
		return _numberOfMemories;
	}

}
