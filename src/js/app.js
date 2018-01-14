App = {
    web3Provider: null,
    contracts: {},

    init: function() {
        // Load pets.
        $.getJSON('../pets.json', function(data) {
            var petsRow = $('#petsRow');
            var petTemplate = $('#petTemplate');

            for (i = 0; i < data.length; i ++) {
                petTemplate.find('.btn-adopt').attr('data-id', data[i].id);
                petsRow.append(petTemplate.html());
            }
        });

        return App.initWeb3();
    },

    initWeb3: function() {
        // Is there an injected web3 instance?
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider;
        } else {
            // If no injected web3 instance is detected, fall back to Ganache
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
        }
        web3 = new Web3(App.web3Provider);

        return App.initContract();
    },

    initContract: function() {
        $.getJSON('TweetAccount.json', function(data) {
            // Get the necessary contract artifact file and instantiate it with truffle-contract
            var VaultArtifact = data;
            App.contracts.Vault = TruffleContract(VaultArtifact);

            // Set the provider for our contract
            App.contracts.Vault.setProvider(App.web3Provider);

            // Use our contract to retrieve and mark the adopted pets
            //return App.EncryptAndPersist();
        });

        return App.bindEvents();
    },

    bindEvents: function() {
        $(document).on('click', '.btn-adopt', App.encryptAndPersist);
    },

    markAdopted: function(adopters, account) {
        var adoptionInstance;

        App.contracts.Adoption.deployed().then(function(instance) {
            adoptionInstance = instance;

            return adoptionInstance.getAdopters.call();
        }).then(function(adopters) {
            for (i = 0; i < adopters.length; i++) {
                if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
                    $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);
                }
            }
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    encryptAndPersist: function(event) {
        event.preventDefault();



        var vaultInstance;

        web3.eth.getAccounts(function(error, accounts) {
            if (error) {
                console.log(error);
            }
            var account = accounts[0];

            var pub1 = document.getElementById('Age1').value;
            var pub2 = document.getElementById('Gender1').value;
            var pub3 = document.getElementById('Ethnicity1').value;
            var pub4 = document.getElementById('Sexual').value;
            var pub5 = document.getElementById('Age').value;
            var pub6 = document.getElementById('Gender').value;
            var pub7 = document.getElementById('Ethnicity').value;
            var pub8 = document.getElementById('Incident').value;
            var pub9 = document.getElementById('Cities').value;
            var pub10 = document.getElementById('Incident').value;
            var pub11 = document.getElementById('Cities').value;


            var private1 = document.getElementById('yourname').value;
            var private2 = document.getElementById('nameofvictim').value;
            var private3 = document.getElementById('nameofabuser').value;
            var private4 = document.getElementById('cityofabuser').value;
            var private5 = document.getElementById('tellyourstory').value;

            var message = {story: [pub1, pub2, pub3, pub4,
            pub5, pub6, pub7, pub8, pub9, pub10, pub11,
            private1, private2, private3, private4, private5]};

            var messageJson = JSON.stringify(message);

            var abiDefinition = JSON.parse('[{"constant":true,"inputs":[],"name":"getLatestTweet","outputs":[{"name":"tweetString","type":"string"},{"name":"timestamp","type":"uint256"},{"name":"numberOfTweets","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tweetId","type":"uint256"}],"name":"getTweet","outputs":[{"name":"tweetString","type":"string"},{"name":"timestamp","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getNumberOfTweets","outputs":[{"name":"numberOfTweets","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"tweetString","type":"string"}],"name":"tweet","outputs":[{"name":"result","type":"int256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]');
            var VaultClass = web3.eth.contract(abiDefinition);
            var VaultInstance = VaultClass.at('0x901d35ab95269e0f777a6b2e284ff9e4f4ce367b');
            VaultInstance.tweet(messageJson, (error, result) => (console.log(result)));

           // myContract.(message).call({from: account}).then(console.log);

            /*
            App.contracts.Vault.deployed().then(function(instance) {
                vaultInstance = instance;
                // Execute adopt as a transaction by sending account
                return vaultInstance.tweet(message, {from: account});
            }).then(function(result) {
                console.log(vaultInstance.getTweet());
            }).catch(function(err) {
                console.log(err.message);
            }); */



        });

    }

};

$(function() {
    $(window).load(function() {
        App.init();
    });
});
