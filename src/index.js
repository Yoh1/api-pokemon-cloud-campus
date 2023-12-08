import express from 'express';
import {dirname, sep} from "path"
import {fileURLToPath} from "url";
import morgan from "morgan"
import dotenv from 'dotenv';
import {initDB,Pokemon} from "./db/sequelize.js";
import * as pokemonsRoutes from "./routes/pokemon-routes.js";
import bodyParser from "body-parser";
import * as userRoutes from "./routes/users-routes.js";
import {authMdlr} from "./auth/authMdlr.js";

dotenv.config()

const port = process.env.PORT || 3000;

const __dirname = dirname(fileURLToPath(import.meta.url)) + sep;
const cfg = {
    port: process.env.PORT || 3000,
    dir: {
        root: __dirname,
        static: __dirname + 'static' + sep,
        public: __dirname + 'public' + sep,
        views: __dirname + 'views' + sep
    }
}

const app = express();
// app.use(morgan('dev'))
app.use(bodyParser.json())
 initDB();

app.get('/',(req,res) => {
    res.status(200).end("bienvenue sur api student")
})
userRoutes.userLogin(app);
app.use(authMdlr)
pokemonsRoutes.findAllPokemons(app)
pokemonsRoutes.findPokemonByPk(app);
pokemonsRoutes.createPokemon(app);
pokemonsRoutes.updatePokemon(app);
pokemonsRoutes.deletePokemon(app);

app.use((req, res) => {
    const message ="Impossible de trouver la ressource demandé"
    res.status(404).json({message});
})

app.listen(cfg.port, () => {
    console.log(`app port listening on port http://localhost:${cfg.port}`);
})



