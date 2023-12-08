import {pokemons} from "./pokemons-mocks.js";
import {DataTypes, Sequelize} from "sequelize";
import {pokemon_model} from "../models/pokemon.js";
import {user_model} from "../models/user.js"
import dotenv from "dotenv";
import bcrypt, {hash} from "bcrypt"

dotenv.config()


const sequelize = new Sequelize(process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD
    , {dialect: process.env.DIALECT});

const Pokemon = pokemon_model(sequelize, DataTypes);
const User = user_model(sequelize, DataTypes);

async function connectDatabase() {
    try {
        const auth = await sequelize.authenticate();
        console.log('Connexion à la base de données MySQL établie avec succès.');
    } catch (e) {
        console.error('Erreur lors de la connexion à la base de données :', e);
    }
}

connectDatabase();

const initDB = (str) => {
    return sequelize.sync({force: true})
        .then(_ => {
            console.log("la synchro du model est reussi")
            pokemons.map(pokemon => {
                Pokemon.create({
                    name: pokemon.name,
                    hp: pokemon.hp,
                    cp: pokemon.cp,
                    picture: pokemon.picture,
                    types: pokemon.types
                })
                    .then(pokemon => console.log(pokemon.toJSON()))
                    .catch(error => console.log(`erreur log de l'insertion pokemon ${error}`))
            })
            console.log('les data sont initialisé')
            bcrypt.hash('pikachu', 10)
                .then(hash => {
                   return  User.create({
                        username: 'pikachu',
                        password: hash,
                    }).then(user => console.log(user.toJSON()))
                }).catch(error => (
                    console.log(`erreur lors de la creation ${error}`)
            ))
        })


}


export {initDB, Pokemon, User}
