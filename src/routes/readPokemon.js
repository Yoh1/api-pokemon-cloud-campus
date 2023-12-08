import {Router} from "express";
import {pokemons} from "../db/pokemons-mocks.js";
import {success} from "../helper.js";

 export const router = Router();

router.get("/pokemon/:id",(req, res,next) => {
    if(req.method === 'GET'){
        const id = req.params.id;
       const pokemon = pokemons.find((pokemon) => pokemon.id === Number(id));
       const message = "le pokemon a bien était récuperer"
       res.json(success(message,pokemon))
    } else{
        next();
    }
})

