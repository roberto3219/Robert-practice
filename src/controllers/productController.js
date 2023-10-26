// Controlador de productos

const fs = require("fs");
const path = require("path");
const db = require("../database/models")


let productsJSON = fs.readFileSync(
  path.join(__dirname, "../data/products.json"),
  "utf-8"
);

let products = JSON.parse(productsJSON);

const controller = {
  detail: (req, res) => {
    db.Product.findByPk(req.params.id)
      .then(function(producto){
        res.render("productDetail", { producto:producto,usuario: req.session.userLogged });
      })
      .catch(function(error){
        console.log(error)
        res.render("error404")
      })
/*     res.render("productDetail", { usuario: req.session.userLogged });
 */  },
  products: (req, res) => {
    db.Product.findAll()
      .then(function(productos){
        res.render("products",{productos:productos,
          usuario:req.session.userLogged})
      })
      .catch(function(error){
        console.log(error)
        res.render("error404")
      })

   /*  res.render("products", { usuario: req.session.userLogged,
                             products: products }); */
  },
  create: (req, res) => {
    res.render("productCreate", { usuario: req.session.userLogged });
  },
  store: (req, res) => {
    db.Product.create({
      name:req.body.nombre,
      precio:req.body.precio,
      descuento:req.body.descuento,
      descripcion:req.body.descripcion,
    })
    console.log("Descripcion:"+req.body.descripcion)
    console.log("-----------------------")
         //Validacion de imagen
    let imageFile = req.file;
    //console.log(imageFile)
    if (imageFile !== undefined) {
      let product = req.body;
      console.log(product);
      res.redirect("/products");
    } else {
      res.render("productCreate");
    }
  
  },
  edit: (req, res) => {
    db.Product.findByPk(req.params.id)
        .then(function(productsToEdit){
        res.render("productEdit",{usuario:req.session.userLogged, productsToEdit: productsToEdit})
      })
        .catch(function(error){
          console.log(error)
          res.render("error404")
        })
   /*  let idProduct = req.params.id;

    let productsToEdit = products.find((e) => e.id == idProduct);

    res.render("productEdit", { usuario: req.session.userLogged, productsToEdit: productsToEdit}); */
  },
  actualizar: (req, res) => {
    db.Product.update({
      name:req.body.nombre,
      precio:req.body.precio,
      descuento:req.body.descuento,
      descripcion:req.body.descripcion,
    },{
      where:{
        id:req.params.id
      }
    })

    let product = req.body;
    console.log("Producto guardado: ", product);
    res.redirect("/products");
  },
  borrar: (req, res) => {
    db.Product.destroy({
      where:{
        id:req.params.id
      }
    })
   /*  let productId = req.params.id;
    for (let i = 0; i < products.length; i++) {
      if (products[i].id == productId) {
        products.slice(products[i])
      }
      break;
    } */
    console.log("Se borro el producto con ID:",req.params.id);
    res.redirect("/");
  },
};

module.exports = controller;
