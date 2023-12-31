// Módulos
const fs = require("fs");
const express = require("express");
const app = express();
const methodOverride = require("method-override");
const session = require('express-session')
const cookieParser = require('cookie-parser')

// Middlewares

var logMiddleware = require("./src/middlewares/logMiddleware");

// Rutas

const mainRoutes = require("./src/routes/mainRoutes");
const productRoutes = require("./src/routes/productRoutes");
const cartRoutes = require("./src/routes/cartRoutes");
const userRoutes = require("./src/routes/userRoutes");
//Cookie

app.use(cookieParser())

// Sesiones

app.use(session({
  secret: "Shhh, It's a secret",
  resave: false,
  saveUninitialized: false,
}))

// Post

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Variables
const port = 5580;

// Servidor

app.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`));

// Configuracion HTTP

app.use(methodOverride("_method"));

app.use(express.json())

// Configuracion de carpetas

app.use(express.static("public"));
app.set("views", "./src/views");
// Configuracion de motor de plantillas

app.set("view engine", "ejs");

// Middlewares

app.use(logMiddleware);

// Ruteo

app.use("/", mainRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/users", userRoutes);

//Error 404

app.use((req, res, next) => {
  res.status(404).render("error404");
});
