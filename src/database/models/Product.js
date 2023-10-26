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

    return Product
}