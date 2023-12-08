import express, {Router} from "express";
import {pokemons} from "../db/pokemons-mocks.js";
import {success} from "../helper.js";

 export const routeUpdate = Router();


routeUpdate.put("/pokemon/update/:id",express.json(),(req, res, next) => {
    if(req.method === "PUT") {
        const id = Number(req.params.id);
        const pokemonUpdate = {...req.body,id:id};

        pokemons[id] = pokemonUpdate;

        const message = `le pokemon ${pokemonUpdate.name} a été modifier`;
        res.json(success(message,pokemonUpdate))
    } else {
        next()
    }
})