module.exports = (sequelize,dataTypes) => {
    let alias = "Users"
    let cols = {
        id_users:{
            type: dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
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
        },
        fecha_birthday:{
            type:dataTypes.DATE,
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
    return Users
}