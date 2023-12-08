import {Pokemon} from "../db/sequelize.js";
import express from "express";

export function findAllPokemons(app){
    app.get('/api/pokemons',(req,res) => {
        Pokemon.findAll()
            .then(pokemons =>{
                const message ="la liste a bien était récuperer";
                res.json({message,data:pokemons})
            } )
    })
}

export function findPokemonByPk(app){
    app.get('/api/pokemons/:id',(req,res) => {
        const pokemonId = req.params.id;
        Pokemon.findByPk(pokemonId)
            .then(pokemon => {
                if (pokemon === null){
                    const message = "Aucun pokemon trouvé"
                    res.status(500).json({message,data:""})
                }
                const message = "Un pokemon a bien été trouver"
                res.json({message,data:pokemon})
            })
            .catch(error => {
                const message = "Aucun pokemon trouvé"
                res.status(500).json({message,data:error})
            })
        Pokemon.findAll()
            .then(pokemons =>{
                const message ="la liste a bien était récuperer";
                res.json({message,data:pokemons})
            } )
    })
}

export function createPokemon(app){
    app.post('/api/pokemons',(req,res) => {
        console.log(req.body);
        Pokemon.create(req.body)
            .then(pokemon => {
                const message = `Le pokemon ${pokemon.name} est créer`
                res.json({message,data:pokemon})
            })
    })
}

export function updatePokemon(app){
    app.put('/api/pokemons/:id',(req,res) => {
        const pokemonId = req.params.id;
        Pokemon.update(req.body,{
            where:{id:pokemonId}
        }).then(_ => {
           return  Pokemon.findByPk(pokemonId)
                .then(pokemon => {
                    const message = `Le pokemon ${pokemon.name} est modifie`
                    res.json({message:message,data:pokemon})
                })
                .catch(error => {
                    const message = "le pokemon na pas pu etre modifié"
                   res.status(500).res.json({message:message,data:error})
                })
        })
    })
}

export function deletePokemon (app){
    app.delete('/api/pokemons/:id',(req,res) => {
      Pokemon.findByPk(req.params.id)
          .then(pokemon => {
              const pokemondeleted = pokemon;
              Pokemon.destroy({
                  where:{id:pokemon.id}
              })
                  .then(_ => {
                      const message = `Le pokemon avec l'id ${pokemondeleted.id} a bien été détruit `
                      res.json({message:message,data:pokemondeleted})
                  })
          })
    })
}