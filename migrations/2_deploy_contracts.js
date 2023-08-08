const RWD = artifacts.require('RWD');
const Tether = artifacts.require('Tether');
const DecentralBank = artifacts.require('DecentralBank');

module.exports = async function(deployer, network, accounts) {

    //deploy Mock Tether Token
    await deployer.deploy(Tether);
    const tether = await tether.deployed();

    // Deploy RWD Token
    await deployer.deploy(RWD)
    const rwd = await RWD.deployed()

    // Deploy DecentralBank
    await deployer.deploy(DecentralBank, rwd.address, tether.address);
    const decentralBank = await DecentralBank.deployed

    //Transfer all tokens to DecentralBank
    await rwd.transfer(decentralBank.address, '1000000000000000000000000');

    //Transfer 100 mock tether token to invester
    await tether.transfer(accounts[1], '1000000000000000000')

}