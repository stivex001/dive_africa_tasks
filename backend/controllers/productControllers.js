let products = require("../models/productModel");

const getProducts = (req, res) => {
  const response = {
    success: true,
    message: "Products Fecthed Successfully",
    data: { products },
  };
  res.status(200).send(response);
};

const getProductById = (req, res) => {
  const productId = req.params.id;

  const product = products.find((p) => p.id === parseInt(productId));
  if (!product) {
    const response = {
      success: false,
      message: `Product not found`,
    };
    return res.status(404).send(response);
  }
  const response = {
    success: true,
    message: `Product fetched`,
    data: { product },
  };

  res.send(response);
};

const createProduct = (req, res) => {
  const { name, price, desc } = req.body;
  if (!name || !price) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  const existingProduct = products.find((product) => product.name === name);

  if (existingProduct) {
    const response = {
      success: false,
      message: `Product ${name} already exist`,
    };
    return res.status(409).send(response);
  }

  const newProduct = {
    id: products.length + 1,
    name,
    price,
    desc,
  };

  products.push(newProduct);
  const response = {
    success: true,
    message: "Product successfully created",
    data: { product: newProduct },
  };
  res.status(201).send(response);
};

// @desc Update a product
// @route PUT /api/products/:id
const updateProduct = (req, res) => {
  const productId = req.params.id;

  const product = products.find((p) => p.id === parseInt(productId));

  if (!product) {
    const response = {
      success: false,
      message: `Product not found`,
    };
    return res.status(404).send(response);
  }

  const { name, price, desc } = req.body;

  const newProduct = {
    name,
    price,
    desc,
  };

  const productIndex = products.findIndex((prod) => product.id === prod.id);
  products[productIndex] = newProduct;

  const response = {
    success: true,
    message: `Product Updated successfully`,
    data: { product: newProduct },
  };

  res.send(response);
};

const deleteProduct = (req, res) => {
  const productId = req.params.id;

  const product = products.find((prd) => prd.id === parseInt(productId));
  console.log(product)

  if (!product) {
    const response = {
      success: false,
      message: `Product not found`,
    };
    return res.status(404).send(response);
  }

  const newProducts = products.filter((prd) => prd.id !== product.id);
  products = newProducts;

  const response = {
    success: true,
    message: `Product is successfully deleted`,
  };

  res.send(response);
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
