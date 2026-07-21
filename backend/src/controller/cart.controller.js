import cartmodel from "../model/cart.model.js";
import productModel from "../model/product.model.js";
import { stockofvarent } from "../dao/product.dao.js";

export const addtocart = async (req, res) => {
  const { productId, variantId } = req.params;
  const { quantity = 1 } = req.body;
  const user = req.user;

  const product = await productModel.findone({
    _id: productId,
    "variants._id": variantId,
  });

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  const stock = await stockofvarent(productId, variantId);

  const cart =
    (await cartmodel.findOne({ user: req.user._id })) ||
    (await cartmodel.create({ user: req.user._id }));

  const isproductareadyincart = cart.items.some(
    (item) =>
      item.product.toString() === productId &&
      item.variant.toString() === variantId,
  );

  if (!isproductareadyincart) {
    const quantityInCart = cart.items.find(
      (item) =>
        item.product.toString() === productId &&
        item.variant?.toString() === variantId,
    ).quantity;

    if (quantityInCart + quantity > stock) {
      return res.status(400).json({
        message: `Only ${stock} items left in stock. and you already have ${quantityInCart} items in your cart`,
        success: false,
      });
    }
    await cartmodel.findOneAndUpdate(
      {
        user: req.user._id,
        "items.product": productId,
        "items.variant": variantId,
      },
      { $inc: { "items.$.quantity": quantity } },
      { new: true },
    );

    return res.status(200).json({
      message: "cart updated sucessfully ",
      success: true,
    });
  }

  if (quantity > stock) {
    return res.status(400).json({
      message: `only ${stock} items left in stock.`,
      success: false,
    });
  }

  cart.items.push({
    product: productId,
    variant: variantId,
    quantity,
    price: product.price,
  });

  await cart.save();

  return res.status(200).json({
    message: "item added to cart successfully",
    success: true,
  });
};
