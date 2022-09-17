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
        to: User.email,
        subject: "CAMBIO DE CONTRASEÑA",
        text: "Ha solicitado un cambio de contraseña"
    }
sendMail(mailop)

}
const passwordrecover = (email) =>{

    mailop ={

        from: "kustomssports@hotmail.com",
        to: email,
        subject: "RECUPERA TU CONTRASEÑA",
        text: "Ha solicitado la recuperaciòn de su contraseña"
    }
sendMail(mailop)
}

const newuseremail = (email) => {

    mailop = {
        from: "kustomssports@hotmail.com",
        to: email,
        subject: "USUARIO CREADO",
        text: "Gracias por suscribirse a KustomsSports!"
    }
    sendMail(mailop)
}


const offers = (email) => {

    mailop = {
        from: "kustomssports@hotmail.com",
        to: email,
        subject: "HOT SALE!",
        text: "Tenemos estos descuentos para usted!"
    }
    sendMail(mailop)
}

//probar si estàn bien, crear la confirmaciòn de la orden cuando el carrito este terminado, 
export default {passwordchange, newuseremail,passwordrecover, offers}; 





