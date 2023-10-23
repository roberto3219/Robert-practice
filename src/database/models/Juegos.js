module.exports= (sequelize, dataTypes) => {
    let alias = "Juegos";
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
        createdAT: 'fecha_estreno',
        updatedAT: ' fecha_modificacion',
        deleteAt: false,
        tableName: 'juegos'
    }
    const Album = sequelize.define(alias, cols, config);
    Album.associate = function(models) {

    } 
    return Album  
}