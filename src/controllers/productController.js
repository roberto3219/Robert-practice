// Controlador de productos

const fs = require("fs");
const path = require("path");
const db = require("../database/models")
const Op=db.Sequelize.Op


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
    db.Product.findAll({
      include:[{association:"categorias"},{association:"plataforma"}]
    })
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
         //Validacion de imagen
    let imageFile = req.file;
    console.log(imageFile)
    let id_categorias=0;
    let id_plataformas=0
    switch (req.body.tag) {
      case "accion":
        id_categorias=1
        break;
      case "terror":
        id_categorias=2
        break;
      case "sexual":
        id_categorias=3
        break;
      case "aventura":
        id_categorias=4
        break;
      case "RPG":
        id_categorias=5
        break;
      case "lucha":
        id_categorias=6
        break;
      case "carrera":
        id_categorias=7
        break;
      default:
        console.log("no existe esa categoria")
        break;
    }
    switch (req.body.plataforma) {
      case "pc":
        id_plataformas=1
        break;
      case "xbox":
        id_plataformas=2
        break;
      case "play":
        id_plataformas=3
        break;
      case "nintendo":
        id_plataformas=4
        break;
      default:
        console.log("no existe esa plataforma")
        break;
    }
    if (imageFile !== undefined) {
      db.Product.create({
        name:req.body.nombre,
         precio:req.body.precio,
         descuento:req.body.descuento,
         descripcion:req.body.descripcion,
         url_img:"images/products/"+req.file.filename,
         id_categoria:id_categorias,
         id_plataforma:id_plataformas
   })
     console.log("Descripcion:"+req.body.descripcion)
     console.log("-----------------------")
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
      url_img:"images/products/"+req.file.filename
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
