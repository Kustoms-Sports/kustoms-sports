import sendMail from './email/email.js'


var mailop ={

    from: "kustomssports@hotmail.com",
    to: "@gmail.com",
    subject: "REGISTRO CONCRETADO",
    text: "Muchas gracias por registrarse en nuestra pàgina, agradecemos su interès, graciaaas ☻"
}

const passwordchange = (email) =>{

    mailop ={

        from: "kustomssports@hotmail.com",
        to: email,
        subject: "CAMBIO DE CONTRASEÑA",
        text: "Ha solicitado un cambio de contraseña"
    }
sendMail(mailop)

}
export default passwordchange; 





