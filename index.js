var express = require('express');

var router = express.Router();

var {add, view} = require("../../scripts/interact.js");

router.get('/', async function(req, res, next ) {
    res.render('index',{title: 'Express'} );
});

router.get('/addProduct', async function(req, res, next ) {
  res.render('add',{title: 'Express'} );
});

router.post('/viewProduct', async function(req, res, next ){
    var num = Number(req.body['pid']);
    console.log("num", num);
    var txnOp = await view(num);
    // console.log("txnOp", txnOp);
    res.render('view', {output: "txnOp"});
})

router.post('/addProduct', async function(req, res, next) {
    var productId = Number(req.body['pid']);
    var name= req.body['name'];
    var brand= req.body['brand'];
    var mfd= req.body['mfd'];
    var mrp= Number(req.body['mrp']);
    var exp= req.body['exp_date'];
    var coldStorage= Number(req.body['req_cold_st']);
    var Temp= Number(req.body['product_temp']);
    var LOC= req.body['product_loc'];
    var status= Number(req.body['status']);
// console.log("productId, name, brand, mfd, mrp, exp, coldStorage, Temp, LOC, status", productId, name, brand, mfd, mrp, exp, coldStorage, Temp, LOC, status);
    var txnOp = await add(productId, name, brand, mfd, mrp, exp, coldStorage, Temp, LOC, status);
    // console.log("txnOp", txnOp);
    // console.log("productId, name", productId);
    res.render('add', {output: txnOp})
})

module.exports = router;