export  function user_model(sequelize, Datatypes) {
    return sequelize.define('USER', {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Datatypes.STRING
        },
        password: {
            type: Datatypes.STRING
        }
    })
}