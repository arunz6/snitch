import { useEffect, useState, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { useproduct } from "../hook/use.product";
import { useNavigate, useParams } from "react-router-dom";

const CURRENCIES = ["INR", "USD", "EUR", "GBP"];
const MAX_IMAGES = 5;

const Sellerproductdetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    handlegetproductdetail,
    handlecreatevariant,
    handleupdatevariantstock,
    handledeletevariant,
  } = useproduct();

  const product = useSelector((state) => state.product.productdetail);

  // Form states for new variant
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [customAttrs, setCustomAttrs] = useState([]); // [{ key: '', value: '' }]
  const [varStock, setVarStock] = useState("");
  const [varPriceAmount, setVarPriceAmount] = useState("");
  const [varPriceCurrency, setVarPriceCurrency] = useState("INR");
  const [varImages, setVarImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  // State to track modified stocks for inline stock management
  const [stockChanges, setStockChanges] = useState({}); // { [variantId]: newStock }
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ type: "", message: "" });

  useEffect(() => {
    if (id) {
      handlegetproductdetail(id);
    }
  }, [id,]);

  // Set default price currency based on parent product when fetched
  useEffect(() => {
    if (product?.price?.currency) {
      setVarPriceCurrency(product.price.currency);
    }
  }, [product]);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 4000);
  };

  // Image Upload helper functions
  const addFiles = useCallback((files) => {
    const remaining = MAX_IMAGES - varImages.length;
    if (remaining <= 0) return;
    const toAdd = Array.from(files).slice(0, remaining);
    const newImages = toAdd.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setVarImages((prev) => [...prev, ...newImages]);
  }, [varImages]);

  const handleFileChange = (e) => {
    addFiles(e.target.files);
    e.target.value = "";
  };

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files.length) {
        addFiles(e.dataTransfer.files);
      }
    },
    [addFiles]
  );

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const removeImage = (index) => {
    setVarImages((prev) => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].preview);
      updated.splice(index, 1);
      return updated;
    });
  };

  // Custom attributes management
  const addCustomAttrField = () => {
    setCustomAttrs((prev) => [...prev, { key: "", value: "" }]);
  };

  const removeCustomAttrField = (index) => {
    setCustomAttrs((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCustomAttrChange = (index, field, val) => {
    setCustomAttrs((prev) => {
      const updated = [...prev];
      updated[index][field] = val;
      return updated;
    });
  };

  // Stock Management (PATCH call)
  const handleUpdateStock = async (variantId, newStock) => {
    try {
      setIsLoading(true);
      await handleupdatevariantstock(id, variantId, newStock);
      showNotification("Stock level updated successfully");
      setStockChanges((prev) => {
        const copy = { ...prev };
        delete copy[variantId];
        return copy;
      });
    } catch (err) {
      showNotification(err.message || "Failed to update stock", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Delete Variant (DELETE call)
  const handleDeleteVariantClick = async (variantId) => {
    if (window.confirm("Are you sure you want to delete this variant?")) {
      try {
        setIsLoading(true);
        await handledeletevariant(id, variantId);
        showNotification("Variant deleted successfully");
      } catch (err) {
        showNotification(err.message || "Failed to delete variant", "error");
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Add Variant (POST call)
  const handleAddVariantSubmit = async (e) => {
    e.preventDefault();
    if (varImages.length === 0) {
      showNotification("Please upload at least one variant image", "error");
      return;
    }
    if (!varPriceAmount || isNaN(Number(varPriceAmount))) {
      showNotification("Please enter a valid price amount", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      const data = new FormData();
      data.append("stock", varStock || 0);
      data.append("priceAmount", varPriceAmount);
      data.append("priceCurrency", varPriceCurrency);

      // Build attributes map
      const attributesObj = {};
      if (size.trim()) attributesObj.size = size.trim();
      if (color.trim()) attributesObj.color = color.trim();
      customAttrs.forEach((attr) => {
        if (attr.key.trim() && attr.value.trim()) {
          attributesObj[attr.key.trim()] = attr.value.trim();
        }
      });
      data.append("attributes", JSON.stringify(attributesObj));

      // Append files
      varImages.forEach((img) => {
        data.append("images", img.file);
      });

      await handlecreatevariant(id, data);
      showNotification("Variant added successfully");

      // Reset form
      setSize("");
      setColor("");
      setCustomAttrs([]);
      setVarStock("");
      setVarPriceAmount("");
      setVarImages([]);
    } catch (err) {
      showNotification(err.message || "Failed to add variant", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Formats price to locale format
  const formatPrice = (amount, currency = "INR") => {
    if (amount === undefined || amount === null) return "—";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="font-label-caps text-label-caps text-on-surface-variant tracking-widest">
            LOADING PRODUCT DETAILS
          </span>
        </div>
      </div>
    );
  }

  const mainImage = product.Images?.[0]?.url;

  return (
    <>
      {/* Dynamic Fonts Import */}
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Hanken+Grotesk:wght@400;600&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap"
        rel="stylesheet"
      />

      <div
        className="min-h-screen bg-background text-on-surface pb-24"
        style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
      >
        {/* Toast Notification Banner */}
        {notification.message && (
          <div
            className={`fixed top-8 right-8 z-50 px-6 py-4 border font-label-caps text-xs tracking-[0.2em] shadow-xl transition-all duration-300 ${
              notification.type === "error"
                ? "bg-[#93000a] text-[#ffdad6] border-[#ffb4ab]"
                : "bg-surface-container-high text-primary border-primary/30"
            }`}
          >
            {notification.message.toUpperCase()}
          </div>
        )}

        {/* Global Loading Spinner for updates */}
        {isLoading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs">
            <div className="flex flex-col items-center gap-4 p-8 bg-surface-container border border-outline-variant">
              <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="font-label-caps text-xs tracking-widest text-primary">
                SYNCING DATA...
              </span>
            </div>
          </div>
        )}

        {/* Top Header Bar */}
        <header className="bg-surface text-primary font-label-caps text-label-caps border-b border-outline-variant sticky top-0 z-40">
          <div className="flex justify-between items-center h-16 px-6 md:px-margin-desktop w-full max-w-container-max mx-auto">
            <div
              className="font-display-lg text-xl tracking-tighter text-primary cursor-pointer"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
              onClick={() => navigate("/seller/productdashbord")}
            >
              SNITCH ARCHIVE
            </div>
            <div className="flex items-center gap-6">
              <span
                className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors text-on-surface-variant"
                onClick={() => navigate("/seller/productdashbord")}
              >
                dashboard
              </span>
              <span className="material-symbols-outlined text-on-surface-variant">
                account_circle
              </span>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="pt-16 px-6 md:px-margin-desktop max-w-container-max mx-auto w-full flex flex-col gap-24">
          
          {/* Section 1: Product Header Display */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start pt-8">
            <div className="col-span-1 md:col-span-5 flex flex-col gap-8">
              <button
                onClick={() => navigate("/seller/productdashbord")}
                className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-label-caps text-xs tracking-widest w-fit bg-transparent border-none outline-none cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                BACK TO COLLECTION
              </button>
              
              <div className="flex flex-col gap-4">
                <span className="font-label-caps text-xs text-primary uppercase tracking-[0.25em]">
                  Curated Masterpiece
                </span>
                <h1
                  className="text-4xl md:text-5xl text-on-surface leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
                >
                  {product.title}
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                  {product.description}
                </p>
                <div className="font-headline-md text-2xl text-on-surface mt-4 border-t border-outline-variant pt-4">
                  {formatPrice(product.price?.amount, product.price?.currency)}{" "}
                  <span className="text-on-surface-variant text-sm tracking-widest font-label-caps ml-2">
                    BASE LISTING PRICE
                  </span>
                </div>
              </div>
            </div>

            {/* Product Hero Image */}
            <div className="col-span-1 md:col-span-7 h-[400px] md:h-[450px] w-full border border-outline-variant overflow-hidden group bg-surface-container-low">
              {mainImage ? (
                <img
                  src={mainImage}
                  alt={product.title}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl text-outline-variant">image</span>
                </div>
              )}
            </div>
          </section>

          {/* Section 2: Manage Stock Table */}
          <section className="flex flex-col gap-8">
            <div className="flex justify-between items-end border-b border-outline-variant pb-4">
              <h2
                className="text-2xl text-primary"
                style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
              >
                Variant Configurations
              </h2>
              <span className="font-label-caps text-xs tracking-widest text-on-surface-variant">
                {product.variants?.length || 0} ACTIVE VARIANTS
              </span>
            </div>

            {product.variants && product.variants.length > 0 ? (
              <div className="w-full overflow-x-auto">
                <div className="min-w-[800px]">
                  {/* Table Header */}
                  <div className="grid grid-cols-12 gap-4 border-b border-outline-variant pb-4 mb-4 font-label-caps text-xs tracking-widest text-on-surface-variant">
                    <div className="col-span-5">VARIANT SUMMARY</div>
                    <div className="col-span-3">SPECIFICATIONS</div>
                    <div className="col-span-2">PRICE ADJUSTMENT</div>
                    <div className="col-span-2">STOCK CONTROL</div>
                  </div>

                  {/* Rows */}
                  {product.variants.map((variant) => {
                    const originalStock = variant.stock || 0;
                    const currentStockVal =
                      stockChanges[variant._id] !== undefined
                        ? stockChanges[variant._id]
                        : originalStock;
                    const isStockChanged = currentStockVal !== originalStock;

                    // Parse attributes map into display text
                    const attrKeys = variant.attributes
                      ? Object.keys(variant.attributes)
                      : [];
                    const specText =
                      attrKeys.length > 0
                        ? attrKeys
                            .map((k) => `${k.toUpperCase()}: ${variant.attributes[k]}`)
                            .join(" / ")
                        : "DEFAULT CONFIGURATION";

                    const varImg = variant.images?.[0]?.url;

                    return (
                      <div
                        key={variant._id}
                        className="grid grid-cols-12 gap-4 py-5 border-b border-outline-variant hover:bg-surface-container-lowest transition-colors items-center group"
                      >
                        {/* Summary */}
                        <div className="col-span-5 flex items-center gap-4">
                          <div className="w-12 h-16 bg-surface-container border border-outline-variant shrink-0 overflow-hidden">
                            {varImg ? (
                              <img
                                src={varImg}
                                alt="Variant thumbnail"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <span className="material-symbols-outlined text-sm text-outline-variant">
                                  image
                                </span>
                              </div>
                            )}
                          </div>
                          <span className="font-body-md text-on-surface">
                            {variant.attributes?.color
                              ? `Obsidian Variant (${variant.attributes.color})`
                              : "Standard Tailored Spec"}
                          </span>
                        </div>

                        {/* Specifications */}
                        <div className="col-span-3 font-body-md text-xs tracking-wider text-on-surface-variant font-mono">
                          {specText}
                        </div>

                        {/* Pricing */}
                        <div className="col-span-2 font-body-md text-on-surface">
                          {formatPrice(variant.price?.amount, variant.price?.currency)}
                        </div>

                        {/* Stock & Delete */}
                        <div className="col-span-2 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <input
                              className="bg-transparent border border-outline-variant text-on-surface font-body-md px-3 py-1 w-20 focus:border-primary focus:ring-0 transition-colors"
                              type="number"
                              min="0"
                              value={currentStockVal}
                              onChange={(e) => {
                                const val = parseInt(e.target.value, 10);
                                setStockChanges((prev) => ({
                                  ...prev,
                                  [variant._id]: isNaN(val) ? 0 : val,
                                }));
                              }}
                            />
                            {isStockChanged && (
                              <button
                                onClick={() => handleUpdateStock(variant._id, currentStockVal)}
                                className="text-primary hover:text-[#eab308] transition-colors p-1"
                                title="Update Stock level"
                              >
                                <span className="material-symbols-outlined text-lg leading-none">
                                  check
                                </span>
                              </button>
                            )}
                          </div>
                          <button
                            onClick={() => handleDeleteVariantClick(variant._id)}
                            className="text-error hover:text-error-container p-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                            title="Remove variant"
                          >
                            <span className="material-symbols-outlined text-lg leading-none">
                              delete
                            </span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="py-12 border border-dashed border-outline-variant text-center">
                <p className="font-label-caps text-xs tracking-widest text-on-surface-variant uppercase">
                  No variant configurations built yet. Setup your first one below.
                </p>
              </div>
            )}
          </section>

          {/* Section 3: Add Variant Form */}
          <section className="bg-surface-container-low border border-outline-variant p-6 md:p-12 flex flex-col gap-10 relative overflow-hidden">
            {/* Left Gold Border Accent */}
            <div className="absolute top-0 left-0 w-[3px] h-full bg-primary"></div>
            
            <div className="flex flex-col gap-2">
              <h2
                className="text-2xl text-primary"
                style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
              >
                Define New Variant
              </h2>
              <p className="text-sm text-on-surface-variant">
                Craft a new combination of size, color, materials, pricing, and stock.
              </p>
            </div>

            <form onSubmit={handleAddVariantSubmit} className="flex flex-col gap-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                
                {/* Left Form Column: Attributes */}
                <div className="flex flex-col gap-8">
                  {/* Preset Size Attribute */}
                  <div className="flex flex-col gap-2">
                    <label className="font-label-caps text-[10px] tracking-widest text-on-surface-variant uppercase">
                      SIZE SPECIFICATION
                    </label>
                    <input
                      className="bg-transparent border-b border-outline-variant text-on-surface py-2 text-sm outline-none focus:border-primary transition-colors"
                      placeholder="e.g. S, M, L, XL, or custom dimensions"
                      type="text"
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                    />
                  </div>

                  {/* Preset Color Attribute */}
                  <div className="flex flex-col gap-2">
                    <label className="font-label-caps text-[10px] tracking-widest text-on-surface-variant uppercase">
                      COLOR SPECIFICATION
                    </label>
                    <input
                      className="bg-transparent border-b border-outline-variant text-on-surface py-2 text-sm outline-none focus:border-primary transition-colors"
                      placeholder="e.g. Obsidian Black, Silk Cream"
                      type="text"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                    />
                  </div>

                  {/* Dynamic Custom Attribute Fields */}
                  {customAttrs.map((attr, idx) => (
                    <div key={idx} className="flex gap-4 items-end">
                      <div className="flex-1 flex flex-col gap-2">
                        <label className="font-label-caps text-[10px] tracking-widest text-on-surface-variant uppercase">
                          CUSTOM ATTRIBUTE {idx + 1} KEY
                        </label>
                        <input
                          className="bg-transparent border-b border-outline-variant text-on-surface py-2 text-sm outline-none focus:border-primary transition-colors"
                          placeholder="e.g. Material"
                          type="text"
                          value={attr.key}
                          onChange={(e) => handleCustomAttrChange(idx, "key", e.target.value)}
                        />
                      </div>
                      <div className="flex-1 flex flex-col gap-2">
                        <label className="font-label-caps text-[10px] tracking-widest text-on-surface-variant uppercase">
                          VALUE
                        </label>
                        <input
                          className="bg-transparent border-b border-outline-variant text-on-surface py-2 text-sm outline-none focus:border-primary transition-colors"
                          placeholder="e.g. 100% Cashmere"
                          type="text"
                          value={attr.value}
                          onChange={(e) => handleCustomAttrChange(idx, "value", e.target.value)}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeCustomAttrField(idx)}
                        className="text-error hover:text-error-container p-2 mb-1"
                        title="Remove custom attribute"
                      >
                        <span className="material-symbols-outlined text-lg">close</span>
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addCustomAttrField}
                    className="flex items-center gap-2 text-primary hover:text-primary-container transition-colors font-label-caps text-xs tracking-widest w-fit bg-transparent border-none outline-none mt-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">add</span>
                    ADD DYNAMIC SPECIFICATION
                  </button>
                </div>

                {/* Right Form Column: Pricing, Stock & Media */}
                <div className="flex flex-col gap-8">
                  <div className="grid grid-cols-3 gap-6">
                    {/* Variant Price */}
                    <div className="col-span-2 flex flex-col gap-2">
                      <label className="font-label-caps text-[10px] tracking-widest text-on-surface-variant uppercase">
                        PRICE AMOUNT
                      </label>
                      <input
                        className="bg-transparent border-b border-outline-variant text-on-surface py-2 text-sm outline-none focus:border-primary transition-colors"
                        placeholder="0.00"
                        type="number"
                        min="0"
                        step="0.01"
                        required
                        value={varPriceAmount}
                        onChange={(e) => setVarPriceAmount(e.target.value)}
                      />
                    </div>
                    {/* Currency Selector */}
                    <div className="flex flex-col gap-2">
                      <label className="font-label-caps text-[10px] tracking-widest text-on-surface-variant uppercase">
                        CURRENCY
                      </label>
                      <select
                        className="bg-transparent border-b border-outline-variant text-on-surface py-2 text-sm outline-none focus:border-primary transition-colors cursor-pointer"
                        value={varPriceCurrency}
                        onChange={(e) => setVarPriceCurrency(e.target.value)}
                      >
                        {CURRENCIES.map((c) => (
                          <option key={c} value={c} className="bg-surface text-on-surface">
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                    {/* Stock level */}
                    <div className="flex flex-col gap-2">
                      <label className="font-label-caps text-[10px] tracking-widest text-on-surface-variant uppercase">
                        INITIAL STOCK LEVEL
                      </label>
                      <input
                        className="bg-transparent border-b border-outline-variant text-on-surface py-2 text-sm outline-none focus:border-primary transition-colors"
                        placeholder="0"
                        type="number"
                        min="0"
                        value={varStock}
                        onChange={(e) => setVarStock(e.target.value)}
                      />
                    </div>

                  {/* Image Upload box */}
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <label className="font-label-caps text-[10px] tracking-widest text-on-surface-variant uppercase">
                        VARIANT MEDIA
                      </label>
                      <span className="text-[10px] text-on-surface-variant">
                        {varImages.length}/{MAX_IMAGES}
                      </span>
                    </div>

                    {varImages.length < MAX_IMAGES && (
                      <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onClick={() => fileInputRef.current?.click()}
                        className="border border-dashed border-outline-variant hover:border-primary transition-colors h-36 flex flex-col items-center justify-center cursor-pointer group bg-surface-container-lowest/50"
                        style={{
                          borderColor: isDragging ? "#C9A96E" : "#4f4633",
                        }}
                      >
                        <span className="material-symbols-outlined text-3xl text-on-surface-variant group-hover:text-primary mb-2 transition-colors">
                          add_photo_alternate
                        </span>
                        <span className="font-label-caps text-[10px] tracking-widest text-on-surface-variant group-hover:text-primary transition-colors">
                          DRAG OR CLICK TO UPLOAD VARIANT IMAGES
                        </span>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </div>
                    )}
{/* Variant Image Previews */}
                    {varImages.length > 0 && (
                      <div className="grid grid-cols-5 gap-3 mt-2">
                        {varImages.map((img, idx) => (
                          <div
                            key={idx}
                            className="group relative aspect-[3/4] border border-outline-variant overflow-hidden bg-surface-container"
                          >
                            <img
                              src={img.preview}
                              alt={`Variant preview ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(idx)}
                              className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center font-label-caps text-[9px] tracking-widest text-[#ffdad6] hover:text-white transition-opacity duration-200"
                            >
                              REMOVE
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Form */}
              <div className="flex justify-end pt-8 border-t border-outline-variant">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary text-on-primary font-label-caps text-xs tracking-[0.25em] px-10 py-4 uppercase hover:bg-[#eab308] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? "APPENDING VARIANT..." : "APPEND NEW VARIANT"}
                </button>
              </div>
            </form>
          </section>
        </main>
      </div>
    </>
  );
};

export default Sellerproductdetails;