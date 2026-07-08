import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useproduct } from '../hook/use.product';

const Productdetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { handlegetproductdetail } = useproduct();
  const product = useSelector((state) => state.product.productdetail);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [openAccordion, setOpenAccordion] = useState(0);

  useEffect(() => {
    if (id) {
      handlegetproductdetail(id);
    }
  }, [id]);

  // Format price to INR
  const formatPrice = (amount) => {
    if (!amount && amount !== 0) return '₹0';
    return `₹${Number(amount).toLocaleString('en-IN')}`;
  };

  const sizes = ['S', 'M', 'L', 'XL'];

  const accordionItems = [
    {
      title: 'Craftsmanship & Materials',
      content: (
        <ul className="py-4 space-y-2 font-body-md text-on-surface-variant text-sm">
          <li className="flex gap-2"><span>—</span> Premium quality materials</li>
          <li className="flex gap-2"><span>—</span> Expert craftsmanship & finishing</li>
          <li className="flex gap-2"><span>—</span> Structural design for perfect drape</li>
          <li className="flex gap-2"><span>—</span> Signature tonal stitching</li>
        </ul>
      ),
    },
    {
      title: 'Shipping & Returns',
      content: (
        <div className="py-4 font-body-md text-on-surface-variant text-sm leading-relaxed">
          Complimentary express shipping on all luxury orders. Delivered in our
          signature sustainable gift packaging. Returns accepted within 14 days
          of delivery.
        </div>
      ),
    },
    {
      title: 'Garment Care',
      content: (
        <div className="py-4 font-body-md text-on-surface-variant text-sm leading-relaxed">
          Handle with care. Follow label instructions for washing and ironing.
          Store properly to maintain structure and quality over time.
        </div>
      ),
    },
  ];

  const images = product?.Images || [];
  const currentImage = images[selectedImage]?.url || '';

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="font-label-caps text-label-caps text-on-surface-variant tracking-widest">
            LOADING
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-on-background font-body-md selection:bg-primary/30 selection:text-on-primary">
      {/* ── TopNavBar ── */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-5 md:px-16 h-20 bg-background/95 backdrop-blur-sm border-b border-outline-variant">
        <div className="flex items-center gap-6 md:gap-12">
          <span
            className="text-3xl md:text-4xl tracking-tighter text-primary cursor-pointer"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
            onClick={() => navigate('/')}
          >
            SNITCH
          </span>
          <div className="hidden md:flex gap-8">
            <a
              className="text-xs font-semibold tracking-[0.15em] uppercase text-primary border-b border-primary pb-1 transition-opacity hover:opacity-80"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
              href="#"
            >
              Collections
            </a>
            <a
              className="text-xs font-semibold tracking-[0.15em] uppercase text-on-surface-variant hover:text-primary transition-colors duration-300"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
              href="#"
            >
              Editorial
            </a>
            <a
              className="text-xs font-semibold tracking-[0.15em] uppercase text-on-surface-variant hover:text-primary transition-colors duration-300"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
              href="#"
            >
              Archive
            </a>
          </div>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <button className="cursor-pointer transition-opacity hover:opacity-80">
            <span className="material-symbols-outlined text-primary">person</span>
          </button>
          <button className="cursor-pointer transition-opacity hover:opacity-80 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">shopping_bag</span>
            <span
              className="hidden sm:inline text-xs font-semibold tracking-[0.15em] uppercase text-primary"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
            >
              BAG (0)
            </span>
          </button>
        </div>
      </nav>

      {/* ── Main Content ── */}
      <main className="pt-28 md:pt-32 pb-20 px-5 md:px-16 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* ── Product Media Gallery ── */}
          <div className="lg:col-span-8 flex flex-col-reverse md:flex-row gap-4 md:gap-6">
            {/* Vertical Thumbnails */}
            <div className="flex md:flex-col gap-3 md:gap-4 overflow-x-auto md:overflow-y-auto md:w-24 shrink-0 hide-scrollbar">
              {images.map((img, index) => (
                <button
                  key={img._id || index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-16 md:w-24 aspect-[3/4] border overflow-hidden shrink-0 transition-all duration-300 hover:opacity-80 ${
                    selectedImage === index
                      ? 'border-primary'
                      : 'border-outline-variant'
                  }`}
                >
                  <img
                    className="w-full h-full object-cover"
                    src={img.url}
                    alt={img.alt || product.title}
                  />
                </button>
              ))}
            </div>

            {/* Main Product Image */}
            <div className="flex-1 relative aspect-[3/4] overflow-hidden bg-surface-container-low group">
              {currentImage ? (
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={currentImage}
                  alt={product.title}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-surface-container">
                  <span className="material-symbols-outlined text-6xl text-outline">image</span>
                </div>
              )}
              <div className="absolute top-4 right-4 md:top-6 md:right-6">
                <span
                  className="bg-background/80 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 text-[10px] md:text-xs font-semibold tracking-widest text-primary border border-primary/20"
                  style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                >
                  LIMITED EDITION
                </span>
              </div>
            </div>
          </div>

          {/* ── Product Info ── */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-8 md:space-y-10">
            <header className="space-y-3 md:space-y-4">
              {/* Breadcrumb */}
              <nav className="flex gap-2 text-[10px] tracking-widest text-on-surface-variant uppercase font-semibold"
                   style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
                <a className="hover:text-primary transition-colors cursor-pointer" onClick={() => navigate('/')}>
                  Home
                </a>
                <span>/</span>
                <a className="hover:text-primary transition-colors" href="#">Collections</a>
                <span>/</span>
                <span className="text-primary">{product.title}</span>
              </nav>

              {/* Title */}
              <h1
                className="text-3xl md:text-4xl lg:text-5xl text-on-surface leading-none"
                style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
              >
                {product.title}
              </h1>

              {/* Price */}
              <p
                className="text-xl md:text-2xl text-primary"
                style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
              >
                {formatPrice(product.price?.amount)}
              </p>
            </header>

            <div className="space-y-6">
              {/* Description */}
              <p
                className="text-sm md:text-base text-on-surface-variant leading-relaxed"
                style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '0.02em' }}
              >
                {product.description}
              </p>

              {/* Size Selector */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span
                    className="text-xs font-semibold tracking-[0.15em] uppercase text-on-surface"
                    style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                  >
                    Select Size
                  </span>
                  <button
                    className="text-[10px] text-primary underline underline-offset-4 tracking-widest font-semibold"
                    style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                  >
                    Size Guide
                  </button>
                </div>
                <div className="flex gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 flex items-center justify-center border text-xs font-semibold tracking-[0.15em] transition-all duration-300 ${
                        selectedSize === size
                          ? 'bg-primary text-on-primary border-primary'
                          : 'border-outline text-on-surface hover:border-primary'
                      }`}
                      style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-4 pt-2 md:pt-4">
              <button
                className="w-full bg-primary text-on-primary h-14 text-xs font-semibold tracking-[0.2em] uppercase hover:opacity-90 transition-opacity"
                style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
              >
                Buy Now
              </button>
              <button
                className="w-full bg-transparent border border-outline text-on-surface h-14 text-xs font-semibold tracking-[0.2em] uppercase hover:border-primary hover:text-primary transition-all duration-300"
                style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
              >
                Add to Bag
              </button>
            </div>

            {/* Accordion */}
            <div className="border-t border-outline-variant pt-4 space-y-0">
              {accordionItems.map((item, index) => (
                <div
                  key={index}
                  className={index > 0 ? 'border-t border-outline-variant' : ''}
                >
                  <button
                    className="w-full flex justify-between items-center py-3 group"
                    onClick={() =>
                      setOpenAccordion(openAccordion === index ? -1 : index)
                    }
                  >
                    <span
                      className="text-xs font-semibold tracking-[0.15em] uppercase text-on-surface group-hover:text-primary transition-colors"
                      style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                    >
                      {item.title}
                    </span>
                    <span
                      className={`material-symbols-outlined text-outline group-hover:text-primary transition-all duration-300 ${
                        openAccordion === index ? 'rotate-180' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-300 ease-out"
                    style={{
                      maxHeight: openAccordion === index ? '200px' : '0px',
                    }}
                  >
                    {item.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Editorial Section ── */}
        <section className="mt-20 md:mt-40 border-t border-outline-variant pt-12 md:pt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
            <div className="space-y-6 md:space-y-8">
              <h2
                className="text-3xl md:text-5xl lg:text-6xl text-on-surface leading-tight"
                style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
              >
                The Art of <br />
                <span className="italic text-primary">Precise</span> Drapery
              </h2>
              <p
                className="text-base md:text-lg text-on-surface-variant max-w-lg leading-relaxed"
                style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '0.03em' }}
              >
                Every SNITCH piece is a dialogue between the wearer and the
                architect. We don't just design clothes; we define the space
                around the body using the world's most opulent materials.
              </p>
              <a
                className="inline-block border-b border-primary text-primary text-xs font-semibold tracking-widest uppercase py-2 hover:opacity-70 transition-opacity"
                style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                href="#"
              >
                Explore the Editorial
              </a>
            </div>
            <div className="relative aspect-video overflow-hidden">
              {images.length > 1 ? (
                <img
                  className="w-full h-full object-cover"
                  src={images[1]?.url || images[0]?.url}
                  alt="Editorial"
                />
              ) : (
                <div className="w-full h-full bg-surface-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-6xl text-outline">movie</span>
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-primary/50 bg-background/20 backdrop-blur-md flex items-center justify-center text-primary hover:scale-110 transition-transform">
                  <span
                    className="material-symbols-outlined text-3xl md:text-4xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    play_arrow
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="w-full py-12 md:py-20 px-5 md:px-16 bg-surface-container-lowest border-t border-outline-variant">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-start gap-10 md:gap-6">
          <div className="space-y-4 md:space-y-6">
            <span
              className="text-3xl md:text-4xl text-primary"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
            >
              SNITCH
            </span>
            <p
              className="text-sm md:text-base text-on-surface-variant max-w-xs leading-relaxed"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '0.02em' }}
            >
              Luxury defined by silence. Editorial precision for the modern
              vanguard.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-20">
            <div className="space-y-4">
              <h4
                className="text-xs font-semibold tracking-[0.15em] uppercase text-on-surface"
                style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
              >
                Company
              </h4>
              <ul className="space-y-2">
                <li><a className="text-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Information</a></li>
                <li><a className="text-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Shipping</a></li>
                <li><a className="text-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Returns</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4
                className="text-xs font-semibold tracking-[0.15em] uppercase text-on-surface"
                style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
              >
                Legal
              </h4>
              <ul className="space-y-2">
                <li><a className="text-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy</a></li>
                <li><a className="text-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Terms</a></li>
              </ul>
            </div>
            <div className="space-y-4 col-span-2 md:col-span-1">
              <h4
                className="text-xs font-semibold tracking-[0.15em] uppercase text-on-surface"
                style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
              >
                Newsletter
              </h4>
              <div className="flex border-b border-outline-variant pb-2">
                <input
                  className="bg-transparent border-none focus:ring-0 focus:outline-none text-on-surface placeholder:text-on-surface-variant text-sm w-full"
                  style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                  placeholder="Email Address"
                  type="email"
                />
                <button className="text-primary">
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto w-full mt-12 md:mt-20 pt-8 md:pt-10 border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <span
            className="text-xs md:text-sm text-on-surface-variant"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '0.02em' }}
          >
            © {new Date().getFullYear()} SNITCH LUXURY EDITORIAL. ALL RIGHTS RESERVED.
          </span>
          <div className="flex gap-6">
            <a className="text-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Instagram</a>
            <a className="text-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Vimeo</a>
            <a className="text-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Threads</a>
          </div>
        </div>
      </footer>

      {/* Inline style for hide-scrollbar utility */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Productdetail;
