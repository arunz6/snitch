import productModel from "../model/product.model.js";
import { uploadFile } from "../services/storage.service.js";

export async function createProduct(req, res) {
  const { title, description, priceAmount, priceCurrency } = req.body;
  const seller = req.user;

  try {
    const uploadResults = await Promise.all(
      req.files.map((file) => uploadFile(file.buffer, file.originalname)),
    );

    const Images = uploadResults.map((result) => ({
      url: result.url,
      alt: title, // or req.body.alt if you collect it from the client
    }));

    const product = await productModel.create({
      title,
      description,
      price: {
        amount: priceAmount,
        currency: priceCurrency || "INR",
      },
      Images,
      seller: seller._id,
    });

    res.status(200).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: error.message || "Internal server error" });
  }
}

export async function getproducs(req, res, next) {
  const seller = req.user;

  try {
    const products = await productModel.find({ seller: seller._id });

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: error.message || "Internal server error" });
  }
}
