require("dotenv").config();
const { Router } = require("express");
const axios = require("axios");
const { Users, Carts, Products, cartproducts } = require("../db.js");

const router = Router();

router.post("/", async (req, res) => {
  let { email, id } = req.body;
  try {
    const finduser = await Users.findOne({
      where: { email: email },
    });
    if (!finduser) return res.status(400).send("User is not found");

    const product = await Products.findByPk(id);
    if (product.available === false)
      return res.status(400).send("Product is not found");
    const preciototal = product.price;
    console.log(preciototal);
    console.log(finduser);

    let cart = await Carts.findOne({
      where: { userId: finduser.id, open: "true" },
      include: {
        model: Users,
      },
    });

    console.log(cart);
    if (cart === null) {
      cart = await Carts.create({
        totalamount: 0,
      });
      console.log(cart);
    }

    finduser.addCarts(cart);

    let pricepromotion = Number.parseFloat(
      parseInt(cart.totalamount) +
        (product.promotion
          ? parseInt(product.price) * (1 - parseInt(product.promotion))
          : parseInt(product.price))
    ).toFixed(2);
    cart.addProducts(product);
    await cart.update({
      totalamount: pricepromotion,
    });
    return res.status(200).send("Se agrego el producto");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
