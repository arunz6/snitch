import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useCart from "../hook/use.cart";
import { useNavigate } from "react-router-dom";
import Navbar from "../../sharedcomponent/pages/Navbar";
const COLORS = {
  primary: "#EAB308",
  secondary: "#0A0A0A",
  tertiary: "#60C5FF",
  neutral: "#FFFFFF",
};

const Cart = () => {
  const cart = useSelector((state) => state.cart.items);
  const { handlegetcart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    handlegetcart();
  }, []);

  const items = cart.cart?.items || [];

  const getVariantImage = (product, variantId) => {
    const variant = product?.variants?.find((v) => v._id === variantId);
    return (
      variant?.images?.[0]?.url ||
      product?.Images?.[0]?.url ||
      "/placeholder.png"
    );
  };

  const getVariantAttributes = (product, variantId) => {
    const variant = product?.variants?.find((v) => v._id === variantId);
    return variant?.attributes || {};
  };

  const subtotal = items.reduce(
    (sum, item) => sum + (item.price?.amount || 0) * item.quantity,
    0,
  );

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: COLORS.secondary,
        fontFamily: "'Hanken Grotesk', sans-serif",
      }}
    >
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-16">
        {/* Header */}
        <div className="mb-12">
          <span
            className="text-[10px] uppercase tracking-[0.24em] font-medium block mb-3"
            style={{ color: COLORS.primary }}
          >
            Your Selection
          </span>
          <h1
            className="text-4xl lg:text-5xl font-light"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: COLORS.neutral,
            }}
          >
            Shopping Bag
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="py-24 text-center flex flex-col items-center">
            <h2
              className="text-2xl mb-4"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: COLORS.neutral,
              }}
            >
              Your bag is empty.
            </h2>
            <p className="max-w-md mx-auto text-sm leading-relaxed text-white/50 mb-8">
              Explore the collection and add pieces you love.
            </p>
            <button
              onClick={() => navigate("/")}
              className="text-[10px] uppercase tracking-[0.2em] font-medium px-8 py-3 border border-white/20 text-white/80 hover:border-[#EAB308] hover:text-[#EAB308] transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Items List */}
            <div className="lg:col-span-2 flex flex-col divide-y divide-white/10">
              {items.map((item) => {
                const product = item.product;
                const attrs = getVariantAttributes(product, item.variant);
                const image = getVariantImage(product, item.variant);

                return (
                  <div key={item._id} className="flex gap-6 py-8 first:pt-0">
                    {/* Image */}
                    <div
                      className="w-28 h-32 sm:w-32 sm:h-40 flex-shrink-0 overflow-hidden border border-white/10"
                      style={{ backgroundColor: "#141414" }}
                      onClick={() => {
                        navigate(`/product/${item.product._id}`);
                      }}
                    >
                      <img
                        src={image}
                        alt={product?.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex flex-col flex-1 justify-between">
                      <div
                        onClick={() => {
                          navigate(`/product/${item.product._id}`);
                        }}
                      >
                        <h3
                          className="text-lg sm:text-xl leading-snug mb-1"
                          style={{
                            fontFamily: "'Playfair Display', serif",
                            color: COLORS.neutral,
                          }}
                        >
                          {product?.title}
                        </h3>

                        {(attrs.size || attrs.color) && (
                          <p className="text-[11px] uppercase tracking-wider text-white/40 mb-3">
                            {attrs.color && <span>{attrs.color}</span>}
                            {attrs.size && (
                              <span> · Size {attrs.size.split(",")[0]}</span>
                            )}
                          </p>
                        )}

                        <span
                          className="text-sm font-medium block"
                          style={{ color: COLORS.primary }}
                        >
                          {item.price?.currency}{" "}
                          {item.price?.amount?.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-white/15">
                          <button className="px-3 py-1 text-white/70 hover:text-[#EAB308] transition-colors">
                            −
                          </button>
                          <span className="px-4 text-sm text-white">
                            {item.quantity}
                          </span>
                          <button className="px-3 py-1 text-white/70 hover:text-[#EAB308] transition-colors">
                            +
                          </button>
                        </div>

                        <button className="text-[10px] uppercase tracking-[0.15em] text-white/40 hover:text-red-400 transition-colors">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="border border-white/10 p-8 sticky top-8">
                <h2
                  className="text-lg mb-6"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: COLORS.neutral,
                  }}
                >
                  Order Summary
                </h2>

                <div className="flex justify-between text-sm text-white/60 mb-3">
                  <span>Subtotal</span>
                  <span>INR {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-white/60 mb-6">
                  <span>Shipping</span>
                  <span className="text-white/40">Calculated at checkout</span>
                </div>

                <div className="border-t border-white/10 pt-6 flex justify-between mb-8">
                  <span
                    className="text-sm uppercase tracking-wider"
                    style={{ color: COLORS.neutral }}
                  >
                    Total
                  </span>
                  <span className="text-lg" style={{ color: COLORS.primary }}>
                    INR {subtotal.toLocaleString()}
                  </span>
                </div>

                <button
                  className="w-full py-4 text-[10px] uppercase tracking-[0.2em] font-medium transition-colors"
                  style={{
                    backgroundColor: COLORS.primary,
                    color: COLORS.secondary,
                  }}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
