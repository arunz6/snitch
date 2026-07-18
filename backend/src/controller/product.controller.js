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

export async function getAllProducts(req, res, next) {
  try {
    const products = await productModel.find({});

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

export async function getProductDeta(req, res, next) {
  const { id } = req.params;
  try {
    const product = await productModel.findById(id);
    return res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      product,
     })
  }
  catch(error){
    console.log(error);
    return res.status(500).json({message : error.message || "Internal server error"});
  }
  
}

export async function addVariant(req, res) {
  const { id } = req.params;
  const { stock, priceAmount, priceCurrency, attributes } = req.body;

  try {
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized to modify this product" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "At least one variant image is required" });
    }

    const uploadResults = await Promise.all(
      req.files.map((file) => uploadFile(file.buffer, file.originalname))
    );

    const images = uploadResults.map((result) => ({
      url: result.url,
    }));

    let parsedAttributes = {};
    if (attributes) {
      try {
        parsedAttributes = typeof attributes === "string" ? JSON.parse(attributes) : attributes;
      } catch (e) {
        return res.status(400).json({ success: false, message: "Invalid attributes JSON format" });
      }
    }

    const newVariant = {
      images,
      stock: Number(stock) || 0,
      attributes: parsedAttributes,
      price: {
        amount: Number(priceAmount) || 0,
        currency: priceCurrency || "INR",
      },
    };

    product.variants.push(newVariant);
    await product.save();

    return res.status(200).json({
      success: true,
      message: "Variant added successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message || "Internal server error" });
  }
}

export async function updateVariantStock(req, res) {
  const { id, variantId } = req.params;
  const { stock } = req.body;

  try {
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized to modify this product" });
    }

    const variant = product.variants.id(variantId);
    if (!variant) {
      return res.status(404).json({ success: false, message: "Variant not found" });
    }

    variant.stock = Number(stock);
    await product.save();

    return res.status(200).json({
      success: true,
      message: "Variant stock updated successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message || "Internal server error" });
  }
}

export async function deleteVariant(req, res) {
  const { id, variantId } = req.params;

  try {
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized to modify this product" });
    }

    product.variants.pull({ _id: variantId });
    await product.save();

    return res.status(200).json({
      success: true,
      message: "Variant deleted successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message || "Internal server error" });
  }
}
