const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const {Products} = require('./src/db.js');
const { products } = require( './src/bulk/products.json' );
//stripe:
// const express = require("express");
// const Stripe = require("stripe");
// const stripe = new Stripe("sk_test_51Lj7u9Dukzk6GqlmiBb7Ni7KQkYghO7iUja0Sqsavauw8kQVMdOy1vTv5vN1pCduc6cRUjFzzK67KI3fnIALrvr100twGDWyWu");
// const cors = require("cors");
// const app = express();

// app.use(cors({ origin: "http://localhost:3000" }));
// app.use(express.json());

// app.post("/api/checkout", async (req, res) => {
//   // you can get more data to find in a database, and so on
//   const { id, amount } = req.body;

//   try {
//     const payment = await stripe.paymentIntents.create({
//       amount,
//       currency: "USD",
//       description: "Gaming Keyboard",
//       payment_method: id,
//       confirm: true, //confirm the payment at the same time
//     });

//     //console.log(payment);

//     return res.status(200).json({ message: "Successful Payment" });
//   } catch (error) {
//     //console.log(error);
//     return res.json({ message: error.raw.message });
//   }
// });

//Fin Stripe

conn.sync({ force: true }).then(() => {
  server.listen(process.env.PORT || 3001, () => {
    console.log('%s listening at 3001'); 

     const bulkCharge = async function () {
      let bulkState = await Products.findAll();
      // console.log("bulkState:",bulkState)
      console.log("bulkState.length:",bulkState.length)
      if ( bulkState.length === 0 ) {await Products.bulkCreate( products )}
      }
      bulkCharge();

  });
});
