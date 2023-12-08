import {User} from "../db/sequelize.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import {private_key} from "../auth/private_key.js";
export function userLogin(app) {
    app.post('/api/login',(req,res) => {
        User.findOne({
            where:{username:req.body.username}
        })
            .then(user => {
                if(!user){
                    const message ="l'utilisateur est incrorect"
                  return  res.status(404).json({message:message,data:"undefined"})
                }
                bcrypt.compare(req.body.password,user.password)
                    .then(isValidPassword => {
                        if(!isValidPassword){
                            const message = "mot de passe incorect"
                            res.status(401).json({message:message,data:"undefined"})
                        }
                    })
                    const token = jwt.sign(
                        {userId:user.id},
                        private_key,
                        {expiresIn:"24h"}
                    )
                const message = "l'utilisateur est correct"
              return  res.json({message:message,data:user,token})
            })
            .catch(error => {
                const message = `Erreur sur l'identification ${error}`
                res.status(500).json({message:message,data:error})
            })
    })
}