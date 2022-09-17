require ('dotenv').config();
const { Router } = require('express');
const axios = require('axios')
const {Users} = require('../db.js');
const {transporter} = require ('../routes/controlers/email-controller.js')

const router = Router();

router.post("/", async (req, res)=>{
  
    let { email, nickname, name, picture }= req.body
    
    if (!email) {
        return res.status(400).json("Email is missing")
}
    
    try {
const finduser = await Users.findOne( {
    where: {
        email : email 
    }

})

if (finduser === null) {
    
        const createuser = await Users.create({
            nickname,
            name,
            email,
            picture

        }
        
       )
         
       await transporter.sendMail(
            {
    
                from: "kustomssports@hotmail.com",
                to: email,
                subject: "REGISTRADO!",
                html: `Gracias por registrarse a KUSTOMS SPORTS!, para entrar a tu cuenta ingrese a este link <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">KUSTOMSSPORTS</a>`
    
            }
    
        
        )
    
    
        return res.status(200).json(createuser)
    }
    return res.status(200).json("usuario ya existe >:C")
    } catch (error) {
        return res.status(400).json(error.message)
    }
})
module.exports = router;