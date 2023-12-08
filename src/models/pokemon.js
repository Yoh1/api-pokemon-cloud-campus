export const pokemon_model = (sequelize, DataTypes) => {
    return sequelize.define('POKEMON',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            hp: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate:{
                    isInt:{msg:"utilise seulement un nombre"},
                    notNull:{"msg":"non null"}
                }
            },
            cp: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            picture: {
                type: DataTypes.STRING,
                allowNull: false
            },
            types: {
                type: DataTypes.STRING,
                allowNull: false,
                get() {
                    return this.getDataValue('types').split(',');
                },
                set(types) {
                    this.setDataValue('types',types.join())
                }
            }

        }, {
            timestamps: true,
            createdAt: 'created',
            updatedAt: false
        })
}