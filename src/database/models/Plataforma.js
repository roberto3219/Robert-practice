module.exports = (sequelize,dataTypes) => {
    let alias = "Plataforma"
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
        updatedAt: 'fecha_up',
        deleteAt: false,
        tableName: 'plataforma'
    }
    const Plataforma = sequelize.define(alias,cols,config)
    
        Plataforma.associate = function(models){

            Plataforma.hasMany(models.Product,{
                as:"products",
                foreignKey:"id_plataforma"
            })

        }

    return Plataforma
}