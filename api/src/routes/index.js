const { Router } = require('express');
const chargeproducts = require('./post-products.js')
const productsId = require('./get-products-id.js')
const productsquery = require('./get-products-query.js')
const productsdate = require('./get-products-date.js')
const productsnavbar = require('./get-products-navbar.js')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.use('/', dogRutas )
router.use('/navbar', productsnavbar)
router.use('/date', productsdate)
router.use('/', chargeproducts)
router.use('/', productsId)
router.use('/', productsquery)





module.exports = router;
