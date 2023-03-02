const hre = require("hardhat");

// const {deployProduct} = require("./deploy")

// async function main(){
//     const productContract = await hre.ethers.getContractFactory('TrackProduct');
//     const contract = await productContract.attach("0x5FbDB2315678afecb367f032d93F642f64180aa3");

//     const contractAddress = await deployProduct(1, "king", "ad", "asd", 22, "sax", 0, 23, "sxa", 1);
//     console.log("contract", contract);

//     const value = await contract.addProduct();
//     var productDetail = await contract.viewProduct();
//     console.log(productDetail);
// }

async function add(productId, name, brand, mfd, mrp, exp, coldStorage, Temp, LOC, status){

    const productContract = await hre.ethers.getContractFactory('TrackProduct');
    const contract = await productContract.attach("0x5FbDB2315678afecb367f032d93F642f64180aa3");
    // const value = await contract.addProduct( 1, "king", "ad", "asd", 22, "sax", 0, 23, "sxa", 1 );


    const value = await contract.addProduct(productId, name, brand, mfd, mrp, exp, coldStorage, Temp, LOC, status);
    return value;
}

async function view(id){
    const productContract = await hre.ethers.getContractFactory('TrackProduct');
    const contract = await productContract.attach("0x5FbDB2315678afecb367f032d93F642f64180aa3");
    const value = await contract.viewProduct(id);
    console.log("value", value);
    return value;

}
// add(12, "plum", "ad", "asd", 22, "sax", 0, 23, "sxa", 1);
view(4);

module.exports = {
    add,
    view
}