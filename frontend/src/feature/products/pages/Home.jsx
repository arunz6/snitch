import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useproduct } from '../hook/use.product';
import { useNavigate } from 'react-router-dom';

// Ebon & Gilt palette
const COLORS = {
  primary: '#EAB308',   // gold accent
  secondary: '#0A0A0A', // near-black background
  tertiary: '#60C5FF',  // blue hover/links
  neutral: '#FFFFFF',   // text
};

const Home = () => {
  const products = useSelector((state) => state.product.allproducts);
  const { handlgetallproductuser } = useproduct();
  const navigate = useNavigate();

  useEffect(() => {
    handlgetallproductuser();
  }, []);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Hanken+Grotesk:wght@300;400;600&display=swap"
        rel="stylesheet"
      />

      <div
        className="min-h-screen selection:bg-[#EAB308]/30"
        style={{ backgroundColor: COLORS.secondary, fontFamily: "'Hanken Grotesk', sans-serif" }}
      >
        <div className="max-w-7xl mx-auto px-8 lg:px-16 xl:px-24">
          {/* ── Hero / Header ── */}
          <div className="pt-20 pb-20 text-center flex flex-col items-center">
            <span
              className="text-[10px] uppercase tracking-[0.24em] font-medium mb-6"
              style={{ color: COLORS.primary }}
            >
              The Collection
            </span>
            <h1
              className="text-5xl lg:text-7xl font-light leading-tight mb-6"
              style={{ fontFamily: "'Playfair Display', serif", color: COLORS.neutral }}
            >
              Curated Archive
            </h1>
            <p className="max-w-xl mx-auto text-sm leading-relaxed text-white/60">
              Discover our latest curation of premium minimalist pieces, meticulously
              designed for effortless elegance and enduring quality.
            </p>
          </div>

          {/* ── Product Grid ── */}
          {products && products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16 pb-32">
              {products.map((product) => {
                const imageUrl =
                  product.Images && product.Images.length > 0
                    ? product.Images[0].url
                    : '/snitch_editorial_warm.png';

                return (
                  <div
                    onClick={() => navigate(`/product/${product._id}`)}
                    key={product._id}
                    className="group cursor-pointer flex flex-col"
                  >
                    {/* Image Container */}
                    <div
                      className="aspect-[4/5] overflow-hidden mb-6 border border-white/10"
                      style={{ backgroundColor: '#141414' }}
                    >
                      <img
                        src={imageUrl}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col gap-2">
                      <h3
                        className="text-xl leading-snug transition-colors duration-300 group-hover:text-[#60C5FF]"
                        style={{ fontFamily: "'Playfair Display', serif", color: COLORS.neutral }}
                      >
                        {product.title}
                      </h3>

                      <p className="text-[12px] line-clamp-2 leading-relaxed text-white/50">
                        {product.description}
                      </p>

                      <div className="mt-2">
                        <span
                          className="text-[10px] uppercase tracking-[0.2em] font-medium"
                          style={{ color: COLORS.primary }}
                        >
                          {product.price?.currency} {product.price?.amount?.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-24 text-center flex flex-col items-center">
              <h2
                className="text-2xl mb-4"
                style={{ fontFamily: "'Playfair Display', serif", color: COLORS.neutral }}
              >
                No pieces available.
              </h2>
              <p className="max-w-md mx-auto text-sm leading-relaxed text-white/50">
                We are currently preparing our next collection. Please check back later.
              </p>
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <footer className="border-t border-white/10 py-12 text-center">
          <span
            className="text-[10px] uppercase tracking-[0.35em]"
            style={{ fontFamily: "'Playfair Display', serif", color: COLORS.primary }}
          >
            Snitch. © {new Date().getFullYear()}
          </span>
        </footer>
      </div>
    </>
  );
};

export default Home;