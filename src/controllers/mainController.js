// Controlador del index
const { where } = require("sequelize");
const db = require("../database/models")
const Op = db.Sequelize.Op

const controller = {
  index: (req, res) => {
    db.Product.findAll({
      where:{
        descuento: {[db.Sequelize.Op.gt]:0}
      },
      order: [
        ["descuento",'DESC']
      ],
      limit:8
  })
      .then(function(productos){
        res.render("index", { productos:productos,usuario: req.session.userLogged });
      })
      .catch(function(error){
        console.log(error)
        res.render("error404")
      })
  },
  
};

module.exports = controller