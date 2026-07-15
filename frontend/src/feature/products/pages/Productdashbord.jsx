import React, { useEffect } from "react";
import { useproduct } from "../hook/use.product";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProductDashboard = () => {
  const { handleGetProducts } = useproduct();
  const navigate = useNavigate();
  const sellerproduct = useSelector((state) => state.product.sellersproduct);
  useEffect(() => {
    handleGetProducts();
  }, []);

  return (
    <div className="min-h-screen bg-background text-on-background px-margin-mobile md:px-margin-desktop py-16 max-w-container-max mx-auto">
      {/* Header */}
      <button
        onClick={() => navigate(-1)}
        className="text-lg leading-none transition-colors duration-200"
        style={{ color: "#B5ADA3" }}
        aria-label="Go back"
        onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A96E")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#B5ADA3")}
      >
        ←
      </button>
      <section className="mb-16">
        <div className="flex justify-between items-center">
        <div className="leftt">
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-4 text-on-surface">
            Your Collection
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Manage and curate your listed pieces. Each entry represents our
            commitment to automotive excellence and luxury detailing services.
          </p>
        </div>
            <div className="right">
          <button
            className="mt-8 px-6 py-3 rounded-lg bg-primary text-primary-container font-medium hover:bg-primary/90 transition-colors duration-200"
            onClick={() => {
              navigate("/seller/createProduct");
            }}
          >
            List New Piece
          </button>
        </div>
         
        </div>
       <div className="mt-12 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </section>

      {/* Empty state */}
      {sellerproduct?.length === 0 && (
        <p className="font-label-caps text-label-caps text-on-surface-variant">
          NO PRODUCTS LISTED YET
        </p>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {sellerproduct?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}

        {/* Add New Card */}
        <div
          className="group flex flex-col justify-center items-center gap-4 cursor-pointer border border-dashed border-outline-variant p-4 hover:bg-surface-container-lowest transition-all duration-500 min-h-[500px]"
          onClick={() => {
            navigate("/seller/createProduct");
          }}
        >
          <div className="w-16 h-16 rounded-full border border-primary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all duration-300">
            <span className="material-symbols-outlined text-3xl">add</span>
          </div>
          <span className="font-label-caps text-label-caps tracking-widest text-on-surface-variant group-hover:text-primary">
            LIST NEW PIECE
          </span>
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product }) => {
  // Images is capitalized in the API response — easy to miss
  const image = product.Images?.[0];
  const formattedPrice = new Intl.NumberFormat("en-IN").format(
    product.price.amount,
  );
  const navigate = useNavigate();
  return (
    <div
      className="group relative flex flex-col gap-6 cursor-pointer border border-transparent hover:border-outline-variant p-4 transition-all duration-500"
      onClick={() => navigate(`/seller/Sellerproductdetails/${product._id}`)}
    >
      <div className="aspect-square overflow-hidden bg-surface-container-low">
        <img
          src={image?.url}
          alt={image?.alt || product.title}
          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-label-caps text-label-caps text-primary">
          {product.description?.length > 20
            ? `${product.description.slice(0, 20).toUpperCase()}...`
            : product.description?.toUpperCase() || "SERVICE"}
        </span>
        <h3 className="font-headline-sm text-headline-sm text-on-surface">
          {product.title}
        </h3>
        <p className="font-body-md text-body-md text-on-surface-variant">
          {product.description}
        </p>
        <div className="mt-4 pt-4 border-t border-outline-variant flex justify-between items-center">
          <span className="font-label-caps text-body-lg text-primary">
            {formattedPrice} {product.price.currency}
          </span>
          <span className="material-symbols-outlined text-primary group-hover:translate-x-2 transition-transform duration-300">
            arrow_right_alt
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductDashboard;
