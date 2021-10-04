const productModel = require("../models/productModel");
const usersModel = require("../models/usersModel");
const catagoriesModel = require("../models/catagoriesSchema");
const cartstModel = require("../models/cartsSchema");
exports.getList = async function (req, res) {
  try {
    // const listCatagory = await catagoriesModel.find();
    let product = await productModel.find({
      idCatagories: req.query.idCatagories,
    });
    const listCatagory = await catagoriesModel.find();
    let cartId = req.query.cartId;
    // let userid = await usersModel.find();
    // let listproduct = await productModel.find({});
    let cart = await cartstModel
      .find({ _id: cartId })
      .populate("listProducts.idproduct");
    // console.log(cart.listProducts);
    let listData = {
      product: product,
      cart: cart,
      listCatagory,
      // listproduct: listproduct,
      // iduser: userid,
    };
    // res.json(listData);
    console.log(25, cart);
    res.render("cart.ejs", listData);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

exports.createCatagories = async function (req, res) {
  try {
    let { catagoriesName } = req.body;
    let searchcata = await catagoriesModel.findOne({ catagoriesName });
    if (searchcata) {
      res.json("da co phan loai nay");
    } else {
      let newCatagories = await catagoriesModel.create({
        catagoriesName: catagoriesName,
      });
      res.json("ta thanh cong ", newCatagories);
    }
  } catch (error) {
    res.json(error);
  }
};

exports.uploadcard = async function (req, res) {
  let data = req.body;
  console.log(data);

  let fixcart = await cartstModel.updateOne(
    { _id: req.query.cartId },
    {
      cartsPrice: data.cartsPrice,
      $push: {
        listProducts: {
          idproduct: data.idproduct,
          quantity: data.quantity,
        },
      },
    }
  );
  // res.render("cart.ejs", fixcart);
  res.json(fixcart);
};

exports.updatecarqua = function (req, res) {
  cartstModel
    .updateOne(
      { _id: req.query.cartId, "listProducts.idproduct": req.body.idproduct },
      {
        $pull: {
          listProducts: {
            idproduct: req.body.idproduct,
          },
        },
      }
    )
    .then(() => {
      cartstModel
        .updateOne(
          {
            _id: req.query.cartId,
            // "listProducts.idproduct": req.body.idproduct,
          },
          {
            $push: {
              listProducts: {
                idproduct: req.body.idproduct,
                quantity: req.body.quantity,
              },
            },
          }
        )
        .then((data) => {
          res.json(data);
        });
      // .catch((err) => {
      //   res.json(err);
      // });
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
};

exports.deletacard = async function (req, res) {
  try {
    let detecard = await cartstModel.updateOne(
      { _id: req.query.cartId, "listProducts.idproduct": req.body.idproduct },
      {
        $pull: {
          listProducts: {
            idproduct: req.body.idproduct,
          },
        },
      }
    );
    res.json(detecard);
    console.log(detecard);
  } catch (error) {
    console.log(error);
  }
};

exports.getidcard = async function (req, res) {
  try {
    let userid = req.params.userid;

    let cardid = await cartstModel.find({ iduser: userid });
    // console.log(cardid);
    res.json(cardid[0]._id);
  } catch (error) {
    console.log(error);
  }
};

exports.getidproduct = async function (req, res) {
  let seaidpro = await productModel.find({
    productCode: req.query.namesp,
    productName: req.query.productName,
    color: req.query.color,
    size: req.query.size,
  });
  res.json(seaidpro);
};
