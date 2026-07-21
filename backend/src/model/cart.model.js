import mongoose from "mongoose";
import priceSchema from "./price.schema.js";
const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
      variant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product.variants",
      },
      quantity: {
        type: Number,
        default: 1,
        min: 1,
      },
      price: {
        type: priceSchema,
        required: true,
      },
    },
  ],
});

const cartmodel = mongoose.model("cart", cartSchema);

export default cartmodel;
