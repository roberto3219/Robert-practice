module.exports= (sequelize,dataTypes) => {

    let alias = "Categoria"

    let cols = {
        id:{
            type:dataTypes.INTEGER,
            allowNull:true,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type:dataTypes.STRING(45),
            allowNull:null,
        }
    }

    let config = {
        timestamps:true,
        createdAt: 'fecha_create',
        updatedAt: 'fecha_update',
        deleteAt: false,
        tableName: 'categoria'
    }
    const Categoria = sequelize.define(alias,cols,config);

    Categoria.associate = function(models){

        Categoria.hasMany(models.Product,{
            as:"products",
            foreignKey:"id_categoria"
        })
    }

    return Categoria
}