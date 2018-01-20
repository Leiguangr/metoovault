pragma solidity ^0.4.17;


contract TweetAccount {
	struct Tweet {
		uint timestamp;
		string tweetString;
	}

	// "array" of all tweets of this account: maps the tweet id to the actual tweet
	mapping (uint => Tweet) _tweets;

	// total number of tweets in the above _tweets mapping
	uint _numberOfTweets;



	// constructor
	function TweetAccount() {
		_numberOfTweets = 0;
	}


	// create new tweet
	function tweet(string tweetString) returns (int result) {

        if (bytes(tweetString).length > 10000) {
			// tweet contains more than 160 bytes
			result = -2;
		} else {
			_tweets[_numberOfTweets].timestamp = now;
			_tweets[_numberOfTweets].tweetString = tweetString;
			_numberOfTweets++;
			result = 0; // success
		}
	}

	function getTweet(uint tweetId) constant returns (string tweetString, uint timestamp) {
		// returns two values
		tweetString = _tweets[tweetId].tweetString;
		timestamp = _tweets[tweetId].timestamp;
	}

	function getLatestTweet() constant returns (string tweetString, uint timestamp, uint numberOfTweets) {
		// returns three values
		tweetString = _tweets[_numberOfTweets - 1].tweetString;
		timestamp = _tweets[_numberOfTweets - 1].timestamp;
		numberOfTweets = _numberOfTweets;
	}

	function getNumberOfTweets() constant returns (uint numberOfTweets) {
		return _numberOfTweets;
	}

}