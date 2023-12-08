import express, {Router} from "express";
import {pokemons} from "../db/pokemons-mocks.js";
import {success} from "../helper.js";

 export const routeCreatePokemon = Router();

routeCreatePokemon.post("/pokemons/create",express.json(), (req, res, next) => {
    if (req.method === 'POST') {
        console.log("Data received:", req.body); // Ajoutez cette ligne pour déboguer

        const idUnique = pokemons.length + 1
        const newPokemon = {
            ...req.body,id:idUnique,created:new Date()
        }
        const message = `Le pokemon ${newPokemon.name} est creer`;
        pokemons.push(newPokemon)
        res.json(success(message,newPokemon))
    } else {
        next();
    }
})