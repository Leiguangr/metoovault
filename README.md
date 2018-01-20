# metoovault

# Inspiration
Inspired by #MeToo movement, we create a safe place where victims can tell their story to help in the healing process. The victim's privacy is of the utmost concern, so only they hold the key to their story. It is a place where their story would remain immutably sealed in a time capsule near the time of the event, a story that can be reference down the road, perhaps in a legal setting, if desired as proof of their experience. We hope MeToo Vault becomes a deterrent to future sexual predators, as the evidence sealed in the Blockchain can always be used as sealed testimony regardless of the passage of time.

Oftentimes abusers have a pattern, such was the case of Harvey Weinstein. If victims came forward eventually with written accounts from historical past, this could help prove the repetitive abuse over several years and would help against false stories arising during the point of public accusation.

# What it does
Anonymous entries are submitted, encrypted, and stored immutably on the MeToo Vault blockchain. Victims hold complete power to decide if, or when, to come forward and share their experience, while preserving as much timely information as possible. We hope the adoption of MeToo Vault worldwide creates a deterrent to future perpetrators that will never be safe from future punishment for their crimes. Statements are encrypted to decrease motivation to publish false statements, and preserves anonymity of the victim until the time is ready to come forward (perhaps in 1, 5, or 10+ years) but allowing timestamped, immutable statement to be later corroborated.

# What's next for MeToo Vault
We would like to anonymously collect some statistics to show what kind of abuse occurs (physical assault, rape, molestation, verbal assault, and other) to show how many people suffer from abuse, but just decide not to speak publicly or seek to convict the abuser. It would be great to eventually show these statistics over time to see if the number of abuses decrease or increase.




# Setup for Developers


step 1) 
add metamask extension to chrome browser


step 2) 
go to https://www.myetherwallet.com/
create new wallet and download the wallet



step 3)

ruby -e “$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew tap ethereum/ethereum
brew install ethereum
mkdir vault-chain
cd vault-chain


step 4) 

geth --datadir ./vaultDir/ init vaultGenesis.json 
cp ~/Download/UTC* ./vaultDir/keystore
geth --datadir ./vaultDir --networkid 2018011331415 console 2>> myEth.log
admin.addPeer("enode://[enode of other peer]@[ip of other peer]:30303")



# Server Piece

Checkout the project

step 1)

npm install -g package.json
npm run dev

step 2)

After making sure the blockchain part is running

geth --datadir ./vaultDir --networkid 2018011331415  --rpc --rpcaddr localhost --rpcport 8545 --rpcapi "web3,eth" --rpccorsdomain "http://localhost:8000"


--------------

optional only first time deploying the contract

step 1)

solc --overwrite -o target --bin --abi contracts/MeTooVault.sol


step 2) 

var VaultClass = eth.contract(**content of MeTooVault.abi);
var VaultBinary = "0x" + "**content of MeTooVault.bin";
var deployTransationObject = { from: eth.accounts[0], data: VaultBinary, gas: 1000000 };
personal.unlockAccount(eth.accounts[0])
var VaultInstance = VaultClass.new(deployTransationObject)

** wait a few seconds for contract to appear on the chain

var VaultInstance =  VaultClass.at("**contract address")


