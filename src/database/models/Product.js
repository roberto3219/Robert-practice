module.exports= (sequelize, dataTypes) => {
    let alias = "Product";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: dataTypes.STRING(45),
            allowNull: true
        },
        precio:{
            type:dataTypes.DECIMAL,
            allowNull: true
        },
        descripcion:{
            type: dataTypes.TEXT,
            allowNull: true
        },
        descuento:{
            type: dataTypes.INTEGER,
            allowNull: false
        },
        url_img:{
            type:dataTypes.STRING(255),
            allowNull:true
        }
    }
    let config = {
        timestamps:true,
        createdAt: 'fecha_estreno',
        updatedAt: 'fecha_modificacion',
        deleteAt: false,
        tableName: 'product'
    }
    const Product = sequelize.define(alias, cols, config);

     Product.associate = function(models){
       /*  Product.belongsToMany(models.Users,{
            as:"users",
            through: "juegos_usuarios",
            foreignKey:"juegos_id",
            otherKey:"usuarios_id",
            timestamps:true,
        }) */
        Product.belongsTo(models.Categoria,{
            as:"categorias",
            foreignKey:"id_categoria"
        })
        Product.belongsTo(models.Plataforma,{
            as:"plataforma",
            foreignKey:"id_plataforma"
        }) 
    } 

    return Product
}