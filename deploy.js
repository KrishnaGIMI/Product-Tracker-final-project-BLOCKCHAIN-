const hre = require("hardhat")
async function deployProduct(){
    const productContract = await hre.ethers.getContractFactory("TrackProduct");
    const contractDeploy = await productContract.deploy();
    await contractDeploy.deployed();
    await console.log("contractDeploy.address", contractDeploy.address);
    // return contractDeploy.address;
}
deployProduct()

module.exports = {
    deployProduct
}
