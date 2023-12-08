import jwt from "jsonwebtoken"
import {private_key} from "./private_key.js";
export function authMdlr(req,res,next){
    const authorizationHeader = req.headers.authorization;
    console.log("authorization header = " + authorizationHeader);

    if(!authorizationHeader){
        const message = "aucun jeton authification";
        return res.status(401).json({message:message,data:'undefined'})
    }

    const token = authorizationHeader.split(' ')[1];
    const decodedToken = jwt.verify(token,private_key,(error,decodedToken) => {
        if(error){
            const message = "l'utilisateur n'est pas autorisé"
            return res.status(401).json({message:message,data:error})
        }
        const userId = decodedToken.userId;

        if(req.body.userId && req.body.userId !== userId){
            const message ="l'utilisateur invalide"
            res.status(401).json(message)
        } else {
            next();
        }
    })
}