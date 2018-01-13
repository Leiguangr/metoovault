module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "2018011331415", // Match any network id
      from: "161dcaa4bc9efd1a1afd6178d3f25fe92d9deea4",
      gas: 4712388
    }
  }
};
