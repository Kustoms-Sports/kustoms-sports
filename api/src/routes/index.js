const { Router } = require('express');
const chargeproducts = require('./post-products.js')
const productsId = require('./get-products-id.js')
const productsquery = require('./get-products-query.js')
const productsdate = require('./get-products-date.js')
const productsnavbar = require('./get-products-navbar.js')
const createuser = require ('./post-usuario.js')
const pagos = require ('./post-Payment.js')
const addcarros = require ('./post-carrito.js');
const getcarrito = require ('./get-data-carrito.js');
const putcarrito = require ('./remove-prod-cart')
// const postBuy = require ('./post-Payment')
const userallowed = require('./comments/get-user-allowed.js')
const addcomment = require('./comments/post-comment')
const getcomment = require('./comments/get-comments')
const upgusuario = require('./dashboard/admin-upg-user.js')
const banusuario = require('./dashboard/admin-ban-user.js')
const banproduct = require('./dashboard/admin-ban-product.js')
const bancomment = require('./dashboard/admin-ban-comment.js')
const adminpostproduct = require('./dashboard/admin-post-products.js')
const getclosecart = require('./profile/get-close-cart.js')
const getcommemail = require('./profile/get-comm-email.js')
const bestsold = require('./dashboard/admin-best-sold.js')
const userdata = require('./get-user.js')
const productosstock = require("./dashboard/admin-get-stock.js")
const viewcarrousel = require ("./dashboard/carrousel-views.js")
// const prueba = require('./dashboard/admin-search.js')
const usersadmin = require ("./dashboard/admin-get-users.js")
const commentsadmin = require ("./dashboard/Admin-get-comments.js")
const adminproducts = require("./dashboard/admin-get-prod")
const financials = require ("./dashboard/admin-get-finance.js")
const userfavorites = require('./get-user-favorites.js')
const postfavorites = require('./post-user-favorites.js')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.use('/', dogRutas )
router.use("/getUserFavorites", userfavorites)
router.use("/dashboard/financial", financials)
router.use("/dashboard/usersadmin", usersadmin)
router.use("/dashboard/commentsadmin", commentsadmin)
router.use('/dashboard/carrouselview', viewcarrousel)
router.use('/userdata', userdata)
// router.use('/prueba', prueba)
router.use('/allowed', userallowed)
router.use('/getcomments', getcomment)
router.use('/getDatacarrito', getcarrito)
router.use('/profile/getclosecart', getclosecart)
router.use('/profile/getcommemail', getcommemail)
// router.use('/Buy', postBuy)
router.use('/dashboard/productos', productosstock)
router.use('/delFromcart', putcarrito)
router.use('/user', createuser)
router.use('/navbar', productsnavbar)
router.use('/date', productsdate)
router.use('/chargeproducts', chargeproducts)
router.use('/', productsId)
router.use('/', productsquery)
router.use('/api/checkout', pagos)
router.use('/addTocart', addcarros)
router.use('/addcomment', addcomment)
router.use('/dashboard/upgUser', upgusuario)
router.use('/dashboard/banUser', banusuario)
router.use('/dashboard/banProduct', banproduct)
router.use('/dashboard/banComment', bancomment)
router.use('/dashboard/bestsold', bestsold)
router.use('/dashboard/adminpostproduct', adminpostproduct)
router.use('/dashboard/getprod', adminproducts )
router.use('/postfavorites', postfavorites)






module.exports = router;
