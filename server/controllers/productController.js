import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";
import Order from "../models/Order.js";

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;

    let imageUrl = "";
    let publicId = "";

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "ecommerce-products",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          )
          .end(req.file.buffer);
      });

      imageUrl = result.secure_url;
      publicId = result.public_id;
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock,
      image: imageUrl,
      public_id: publicId,
    });

    res.status(201).json({
      success: true,
      message: "Product Created Successfully",
      product,
    });
  } catch (error) {

     console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Get All Products

export const getProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 20;

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const category = req.query.category
      ? {
          category: req.query.category,
        }
      : {};

    const totalProducts = await Product.countDocuments({
      ...keyword,
      ...category,
    });

    const products = await Product.find({
      ...keyword,
      ...category,
    })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      products,
      currentPage: page,
      totalPages: Math.ceil(
        totalProducts / limit
      ),
      totalProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Get Single Product

export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Product

export const updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Product

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.public_id) {
      await cloudinary.uploader.destroy(
        product.public_id
      );
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Review Controller

export const addReview = async (req, res) => {

    const { rating, comment } = req.body;

    const product =
        await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found",
        });
    }

    const review = {
    userId: req.user.userId,
    name: req.user.name,
    rating: Number(rating),
    comment,
};

    product.reviews.push(review);

    product.numReviews =
        product.reviews.length;

    product.averageRating =
        product.reviews.reduce(
            (acc, item) =>
                acc + item.rating,
            0
        ) / product.reviews.length;

    await product.save();

    res.json({
        success: true,
        message: "Review Added",
    });
};
