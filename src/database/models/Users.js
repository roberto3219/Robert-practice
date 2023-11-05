module.exports = (sequelize,dataTypes) => {
    let alias = "Users"
    let cols = {
        id_users:{
            type: dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:true
        },
        name:{
            type:dataTypes.STRING(45),
            allowNull:true,
        },
        last_name:{
            type:dataTypes.STRING(45),
            allowNull:true
        },
        dirreccion:{
            type:dataTypes.STRING(200),
            default:null,
            allowNull:true,
            unique:true,
        },
        url_img:{
            type:dataTypes.STRING(255),
            allowNull:true
        },
        password:{
            type:dataTypes.STRING(200),
            allowNull:true
        }
    }
    let config = {
        timestamps:true,
        createdAt: 'create_user',
        updatedAt: 'update_at',
        deleteAt: false,
        tableName: 'users'
    }
    const Users = sequelize.define(alias,cols,config);

        /* Users.associate = function(models){
            Users.belongsToMany(models.Products,{
                as:"products",
                through:"juegos_usuarios",
                foreignKey:"usuarios_id",
                otherKey:"juegos_id",
                timestamps:false
            }) 
        }*/
    return Users
}