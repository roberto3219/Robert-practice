// Modulos de control de archivos

const path = require("path");
const fs = require("fs");
const db = require("../database/models")
const Op=db.Sequelize.Op


// Encriptador

const bcrypt = require("bcryptjs");

// Validador de resultados

const { validationResult } = require("express-validator");
const { render } = require("ejs");


// Controlador de usuarios

const controller = {
  register: (req, res) => {
    res.render("users/register", { errores: [] });
  },
  saveRegister: (req, res) => {
    let errors = validationResult(req);
/*     res.send(errors) 
 */
   /*  console.log(req.file); */
  
    if (errors.isEmpty() /*  errors.length <= 0  */ ) {
  
        //Hash de la contraseña
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);

        // Agregar los datos del nuevo registro al arreglo de usuarios
      
        db.Users.create({
          name:req.body.name,
          last_name:req.body.lastName,
          dirreccion:req.body.correo,
          url_img:"images/users/"+req.file.filename,
          password:hashedPassword
        })

        res.redirect("/users/login");
    } else {
     
      res.render("users/register", { errors: errors.mapped()/* errors.array() */,old: req.body,file: req.file 
      });
    }
  },
  login: (req, res) => {
    res.render("users/login", { error: null });
  },
  loadLogin: (req, res) => {
/*     let usuario = users.find((user) => user['email'] === req.body.correo);
 */    let correo=req.body.correo
    db.Users.findOne({
      where:{
        
        dirreccion:correo
      }
    }).then(function(usuario){
     /*  console.log("usuario"+usuario) */
    if (usuario) {
      let validarPass = bcrypt.compareSync(req.body.password, usuario.password);
/*        console.log("dsadsad--------"+validarPass) 
 */      if (validarPass) {
        delete usuario.password;
        req.session.userLogged = usuario
/*       console.log("saiudhiushdi hola -------"+ req.session.userLogged)
 */        res.redirect("/");
      }

      res.render('users/login', { error: 'Las credenciales son inválidas.'})
    }})
    .catch(function(error){
    res.render('users/login', { error: 'No existe este usuario.' })
    })
  },
  list:function(req,res){
    db.Users.findAll()
    .then(function(users){
      res.render('users/listUser',{users:users ,usuario:req.session.userLogged })
    })
    .catch(function(errors){
      console.log(errors)
      res.render("error404",{errors:errors})
    }) 
  },
  perfil:function(req,res){

  }
};

module.exports = controller;
