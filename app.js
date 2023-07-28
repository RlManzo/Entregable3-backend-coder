
const productManager = require("./manager")

const productJson = require("./products.json")

const express = require("express");


const app = express();

const PORT = 3001;


const serverExpress = app.listen(PORT, ()=>{
    
    console.log(`el servido esta escuchando en el puerto ${PORT}`)
})

const products = productManager.ProductManager

const product = new products()

product.addProduct("arroz", "marolio", 200, "sin imagen", 123213, 10)
product.addProduct("yerba", "marolio", 500, "sin imagen", 121344, 5)
product.addProduct("fideos", "303", 500, "sin imagen", 1213455, 5)
//product.getProducts()



//Funcion para buscar por query params por cantidad ingresando "?limit=1" o "?limit=2" o cualquier numero.
 app.get('/products',(req,res)=>{
    let limit = parseInt(req.query.limit)
    for(i=0;i<productJson.length;i++){  
  if(limit>productJson.length)break;
     res.send(productJson.slice(0,limit)) 
   }
   
 })

//Funcion para buscar por query params por marca. No se pedia para la entrega pero quise probar como funcionaba.
app.get('/products/marca',(req,res)=>{
    let limit = req.query.limit
   const productLimit = productJson.filter(product => product.description === limit)
    if(limit === "marolio") return res.send(productLimit) 
else{
    return res.send({error:"not found"})
}
  })


//funcion para filtrar por id.
app.get('/products/:pid',(req,res)=>{ 
   const pId = parseInt(req.params.pid)
   const findId = productJson.find(product => product.id === pId)
   if(findId){
     res.json({findId })
   }
   res.send({error:"id no existente"})
    
}) 
