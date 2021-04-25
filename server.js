const express = require("express");
const bodyParser = require("body-parser");
const Database = require('better-sqlite3-with-prebuilds');

const app = express();
app.use(express.json());

const db = new Database('/home/kamal/workspace/shoppingcart16apr/react-shopping-cart.db', { verbose: console.log });

app.get('/api/products',(req,res)=>{
    let products = db.prepare("select * from products");
    let getProducts = products.all();
    res.send(getProducts);
})

app.get('/api/orders',(req,res)=>{
    let orders = db.prepare("select *from orderProduct");
    let getOrders = orders.all();
    res.send(getOrders);
})

app.post('/api/orders',(req,res)=>{

    if(!req.body.name,
        !req.body.email,
        !req.body.address,
        !req.body.total,
        !req.body.cartItems)
       {
           return res.send({message:"Data is Required"})
       } 
    let inputOrder = {
        name:req.body.name,
        email:req.body.email,
        address:req.body.address,
        total:req.body.total,
        cartItems:req.body.cartItems,
    }
    let insertOrder = db.prepare('insert into orderProduct(email,name,address,total,cartItems) values(?,?,?,?,?)');
    let saveOrders = insertOrder.run(inputOrder.email,inputOrder.name,inputOrder.address,inputOrder.total,inputOrder.cartItems);
  
    res.send(saveOrders);
})       

const port = process.env.port || 5000;
app.listen(port, ()=> console.log(`Listening to port ${port}`))