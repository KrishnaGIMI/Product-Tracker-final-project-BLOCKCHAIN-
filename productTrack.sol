// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

contract TrackProduct{
    
    address public owner;

    enum status{
        enroute,
        delivered,
        packing,
        shipped,
        cancelled
    }
    
    //model the product
    struct product{
        status productStatus;
        string name;
        string brand;
        string mfd;
        uint8 mrp;
        string expDate;
        bool coldStorage;
        uint8 temp;
        string currentLoc;
    }

    //events
    event locationUpdate(uint256 productID, string location);
    event tempUpdate(uint256 productID, uint8 location);
    event newProduct(uint256 productID, string name);

    //mapping
    mapping(uint256 => product) public product_Map;
    mapping(uint256 => address) public productOwnership;


    function addProduct(        
        uint256 _productId,
        string memory _name,
        string memory _brand,
        string memory _mfd,
        uint8 _mrp,
        string memory _expDate,
        bool _coldStorage,
        uint8 _temp,
        string memory _currentLoc,
        status productStatus)
     public {
         emit newProduct(_productId, _name);
        product_Map[_productId] = product(productStatus, _name, _brand, _mfd, _mrp, _expDate, _coldStorage, _temp, _currentLoc);
        productOwnership[_productId] = msg.sender;
    }
    function viewProduct(uint256 _productId) public view returns(product memory){
        return product_Map[_productId];
    }
    function updateLocation(uint256 _productId, string memory _newLocation) public{

        product memory productDetail = product_Map[_productId];
        productDetail.currentLoc = _newLocation;
        product_Map[_productId] = productDetail;
        emit locationUpdate(_productId, _newLocation);

    }
    function updateTemp(uint256 _productId, uint8 _temp) public isOwner(_productId){
         product memory productDetail = product_Map[_productId];
        productDetail.temp = _temp;
        product_Map[_productId] = productDetail;
        emit tempUpdate(_productId, _temp);
    }
    function deleteProduct(uint256 _productId) public isOwner(_productId){
        delete product_Map[_productId];
        delete productOwnership[_productId];
    }

    modifier isOwner(uint256 _productId){
        require(productOwnership[_productId] == msg.sender," Only owners can make money");
        _;
    }
}