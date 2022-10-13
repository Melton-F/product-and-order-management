const Product = require("../models/productMdl");
const mongoose = require("mongoose");
// const multer = require('multer')

// const fileUpload = multer({dest:'uploads/'})

const getPrdcts = (req, res, next) => {
  Product.find()
    .select("name price _id productImage")
    .then((doc) => {
      // console.log(doc);
      if (doc.length > 0) {
        res.status(200).json({
          message: "All products showed",
          count: doc.length,
          products: doc.map((doc) => {
            return {
              name: doc.name,
              price: doc.price,
              _id: doc._id,
              productImage: doc.productImage,
              request: {
                type: "GET",
                url: "http//localhost:3000/products/" + doc._id,
              },
            };
          }),
        });
      } else {
        res.status(404).json({
          message: "no datas available",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        Error: err,
      });
    });
};

const createPrdcts = (req, res, next) => {
  console.log(req.body);
  console.log(req.file);
  // const product = await Product.create(req.body)
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path,
  });

  product
    .save()
    .then((resolve) => {
      console.log(resolve);
      res.status(201).json({
        message: "product created",
        createdProduct: resolve,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        Error: error.message,
      });
    });
};

const getbyID = (req, res, next) => {
  Product.findById(req.params.id)
    .then((resolved) => {
      console.log(resolved);
      if (resolved) {
        res.status(200).json({
          createdProduct: resolved,
        });
      } else {
        res.status(404).json({
          message: "invalid ID entered",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        Error: err,
      });
    });
};

const updatebyID = (req, res, next) => {
  Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((result) => {
      res.status(200).json({
        message: "product updated",
      });
    })
    .catch((err) => {
      res.status(500).json({
        Error: err,
      });
    });
};

const deletebyID = (req, res, next) => {
  //which means if the id generated in mongoose is equalent to the params id then remove the id details
  const id = req.params.id;
  Product.remove({ _id: id })
    .then((result) => {
      res.status(200).json({
        message: "the id deleted",
        result: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        Error: err,
      });
    });
};

module.exports = {
  getPrdcts,
  createPrdcts,
  getbyID,
  updatebyID,
  deletebyID,
};
