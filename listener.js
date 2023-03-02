const {hre} = require("hardhat");

// const {deployProduct} = require("deploy")

async function main(){
    const productContract = await hre.ethers.getContractFactory('TrackProduct');
    const contract = await productContract.attach(0x5FbDB2315678afecb367f032d93F642f64180aa3);
    console.log("contract", contract);
    contract.on("new product", (productId, name)=>{
        console.log("productId, name", productId, name );
    })
    console.log(productDetail);
}

main();
