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
        $.getJSON('Adoption.json', function(data) {
            // Get the necessary contract artifact file and instantiate it with truffle-contract
            var AdoptionArtifact = data;
            App.contracts.Adoption = TruffleContract(AdoptionArtifact);

            // Set the provider for our contract
            App.contracts.Adoption.setProvider(App.web3Provider);

            // Use our contract to retrieve and mark the adopted pets
            return App.markAdopted();
        });

        return App.bindEvents();
    },

    bindEvents: function() {
        $(document).on('click', '.btn-adopt', App.handleAdopt);
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

    handleAdopt1: function(event) {
        event.preventDefault();

        var petId = parseInt($(event.target).data('id'));
        var adoptionInstance;

        web3.eth.getAccounts(function(error, accounts) {
            if (error) {
                console.log(error);
            }

            var account = accounts[0];

            App.contracts.Adoption.deployed().then(function(instance) {
                adoptionInstance = instance;

                // Execute adopt as a transaction by sending account
                return adoptionInstance.adopt(petId, {from: account});
            }).then(function(result) {
                return App.markAdopted();
            }).catch(function(err) {
                console.log(err.message);
            });
        });
    },


    handleAdopt: function(event) {
        event.preventDefault();

        var petId = parseInt($(event.target).data('id'));
        var adoptionInstance;
        var message = document.getElementById("tellyourstory").value;

        var params = { keyBytes: 32, ivBytes: 16 };
        var dk = window.keythereum.create(params);


        const { randomBytes } = require('crypto');
        const secp256k1 = require('secp256k1')
// or require('secp256k1/elliptic')
//   if you want to use pure js implementation in node

// generate message to sign
        const msg = randomBytes(32)

// generate privKey
        let privKey
        do {
            privKey = randomBytes(32)
        } while (!secp256k1.privateKeyVerify(privKey))

// get the public key in a compressed format
        const pubKey = secp256k1.publicKeyCreate(privKey)

// sign the message
        const sigObj = secp256k1.sign(msg, privKey)

// verify the signature
        console.log(secp256k1.verify(msg, sigObj.signature, pubKey))



        var encrypt = new JSEncrypt();
        encrypt.setPublicKey($('#pubkey').val());
        var encrypted = encrypt.encrypt($('#input').val());

        // Decrypt with the private key...
        var decrypt = new JSEncrypt();
        decrypt.setPrivateKey($('#privkey').val());
        var uncrypted = decrypt.decrypt(encrypted);



    }

};

$(function() {
    $(window).load(function() {
        App.init();
    });
});
