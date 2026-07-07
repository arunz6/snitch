import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {useproduct} from "../hook/use.product"

const CURRENCIES = ['INR', 'USD', 'EUR', 'GBP'];
const MAX_IMAGES = 5;



const CreateProduct = () => {
    const { handlecreateproduct } = useproduct();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priceAmount: '',
        priceCurrency: 'INR',
    });
    const [images, setImages] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const addFiles = (files) => {
        const remaining = MAX_IMAGES - images.length;
        if (remaining <= 0) return;
        const toAdd = Array.from(files).slice(0, remaining);
        const newImages = toAdd.map(file => ({ file, preview: URL.createObjectURL(file) }));
        setImages(prev => [...prev, ...newImages]);
    };

    const handleFileChange = (e) => {
        addFiles(e.target.files);
        e.target.value = '';
    };

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
    }, [images]);

    const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
    const handleDragLeave = () => setIsDragging(false);

    const removeImage = (index) => {
        setImages(prev => {
            const updated = [...prev];
            URL.revokeObjectURL(updated[index].preview);
            updated.splice(index, 1);
            return updated;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('description', formData.description);
            data.append('priceAmount', formData.priceAmount);
            data.append('priceCurrency', formData.priceCurrency);
            images.forEach(img => data.append('images', img.file));
            await handlecreateproduct(data);
            navigate('/');
        } catch (err) {
            console.error('Failed to create product', err);
        } finally {
            setIsSubmitting(false);
        }
    };

  const inputClass = "w-full bg-transparent outline-none py-4 text-sm transition-colors duration-300 placeholder:text-[#DADADA]";
const inputStyle = { color: '#DADADA', borderBottom: '1px solid #DADADA', fontFamily: "'Inter', sans-serif" };
const handleFocus = (e) => { e.target.style.borderBottomColor = '#EAB308'; };
const handleBlur = (e) => { e.target.style.borderBottomColor = '#DADADA'; };
    return (
        <>
            {/* Google Fonts */}
            <link
                href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
                rel="stylesheet"
            />

            <div
                className="bg-black min-h-screen text-white"
                style={{ fontFamily: "'Inter', sans-serif" }}
            >
                <div className="mx-auto px-8 lg:px-16 xl:px-24 max-w-6xl">

                    {/* ── Top Bar ── */}
                    <div className="flex items-center gap-5 pt-10 pb-0">
                        <button
                            onClick={() => navigate(-1)}
                            className="text-lg leading-none transition-colors duration-200"
                            style={{ color: '#B5ADA3' }}
                            aria-label="Go back"
                            onMouseEnter={e => e.currentTarget.style.color = '#C9A96E'}
                            onMouseLeave={e => e.currentTarget.style.color = '#B5ADA3'}
                        >
                            ←
                        </button>
                        <span
                            className="text-3xl uppercase tracking-[0.32em]"
                            style={{ fontFamily: "'Cormorant Garamond', serif", color: '#C9A96E' }}
                        >
                            Snitch.
                        </span>
                    </div>

                    {/* ── Page Header ── */}
                    <div className="pt-10 pb-0">
                        <h1
                            className="font-light text-4xl lg:text-5xl leading-tight"
                            style={{ fontFamily: "'Cormorant Garamond', serif", color: '#C9A96E' }}
                        >
                            New Listing
                        </h1>
                        {/* Gold rule separator */}
                        <div className="mt-4 w-14 h-px" style={{ backgroundColor: '#C9A96E' }} />
                    </div>

                    {/* ── Form ── */}
                    <form onSubmit={handleSubmit} className="pt-14 pb-24 text-white">
                        <div className="lg:items-start gap-14 lg:gap-20 grid grid-cols-1 lg:grid-cols-2">

                            {/* ── LEFT COLUMN: Text Fields ── */}
                            <div className="flex flex-col gap-12">

                                {/* Product Title */}
                                <div className="flex flex-col gap-2">
                                    <label
                                        htmlFor="cp-title"
                                        className="font-medium text-xs uppercase tracking-[0.2em]"
                                        style={{ color: '#7A6E63' }}
                                    >
                                        Product Title
                                    </label>
                                    <input
                                        id="cp-title"
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                        placeholder="e.g. Oversized Linen Shirt"
                                        className={inputClass}
                                        style={inputStyle}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                    />
                                </div>

                                {/* Description */}
                                <div className="flex flex-col gap-2">
                                    <label
                                        htmlFor="cp-description"
                                        className="font-medium text-xs uppercase tracking-[0.2em]"
                                        style={{ color: '#7A6E63' }}
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        id="cp-description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows={5}
                                        placeholder="Describe the product — material, fit, details..."
                                        className="bg-transparent py-4 outline-none w-full placeholder:text-[#d0c5b5] text-sm leading-relaxed transition-colors duration-300 resize-none"
                                        style={inputStyle}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                    />
                                </div>

                                {/* Price */}
                                <div className="flex flex-col gap-3">
                                    <label className="font-medium text-xs uppercase tracking-[0.2em]" style={{ color: '#7A6E63' }}>
                                        Price
                                    </label>
                                    <div className="flex items-end gap-5">
                                        {/* Amount */}
                                        <div className="flex flex-col flex-[3] gap-1">
                                            <span className="text-xs uppercase tracking-[0.18em]" style={{ color: '#B5ADA3' }}>Amount</span>
                                            <input
                                                id="cp-priceAmount"
                                                type="number"
                                                name="priceAmount"
                                                value={formData.priceAmount}
                                                onChange={handleChange}
                                                required
                                                min="0"
                                                step="0.01"
                                                placeholder="0.00"
                                                className={inputClass}
                                                style={inputStyle}
                                                onFocus={handleFocus}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                        {/* Currency */}
                                        <div className="flex flex-col flex-[1] gap-1">
                                            <span className="text-xs uppercase tracking-[0.18em]" style={{ color: '#B5ADA3' }}>Currency</span>
                                            <select
                                                id="cp-priceCurrency"
                                                name="priceCurrency"
                                                value={formData.priceCurrency}
                                                onChange={handleChange}
                                                className="bg-transparent py-4 outline-none w-full text-sm transition-colors duration-300 appearance-none cursor-pointer"
                                                style={inputStyle}
                                                onFocus={handleFocus}
                                                onBlur={handleBlur}
                                            >
                                                {CURRENCIES.map(c => (
                                                    <option key={c} value={c} style={{ backgroundColor: '#fbf9f6', color: '#1b1c1a' }}>{c}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ── RIGHT COLUMN: Images ── */}
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-center">
                                    <label className="font-medium text-xm uppercase tracking-[0.2em]" style={{ color: '#7A6E63' }}>
                                        Images
                                    </label>
                                    <span className="text-[10px]" style={{ color: '#B5ADA3' }}>
                                        {images.length}/{MAX_IMAGES}
                                    </span>
                                </div>

                                {/* Drop Zone */}
                                {images.length < MAX_IMAGES && (
                                    <div
                                        onDrop={handleDrop}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onClick={() => fileInputRef.current?.click()}
                                        className="flex flex-col items-center gap-4 px-8 py-14 lg:py-20 border border-dashed transition-all duration-300 cursor-pointer"
                                        style={{
                                            borderColor: isDragging ? '#C9A96E' : '#d0c5b5',
                                            backgroundColor: isDragging ? 'rgba(201,169,110,0.04)' : 'transparent'
                                        }}
                                    >
                                        {/* Upload icon */}
                                        <div
                                            className="flex justify-center items-center border w-10 h-10 transition-colors duration-300"
                                            style={{ borderColor: isDragging ? '#C9A96E' : '#d0c5b5', color: isDragging ? '#C9A96E' : '#B5ADA3' }}
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                            </svg>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm leading-relaxed" style={{ color: '#7A6E63' }}>
                                                Drop images here or{' '}
                                                <span style={{ color: '#C9A96E', textDecoration: 'underline', textUnderlineOffset: '2px' }}>
                                                    tap to upload
                                                </span>
                                            </p>
                                            <p className="mt-2 text-[10px] uppercase tracking-[0.15em]" style={{ color: '#B5ADA3' }}>
                                                Up to {MAX_IMAGES} images
                                            </p>
                                        </div>
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

                                {/* Image Previews */}
                                {images.length > 0 && (
                                    <div className="gap-2 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 mt-1">
                                        {images.map((img, index) => (
                                            <div
                                                key={index}
                                                className="group relative aspect-square overflow-hidden"
                                                style={{ backgroundColor: '#eae8e5' }}
                                            >
                                                <img
                                                    src={img.preview}
                                                    alt={`Preview ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                                {/* Remove overlay */}
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 font-medium text-xs uppercase tracking-widest transition-opacity duration-200"
                                                    style={{ backgroundColor: 'rgba(27,24,20,0.55)', color: '#fbf9f6' }}
                                                    aria-label={`Remove image ${index + 1}`}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* ── Submit Button ── */}
                        <div className="mt-16 lg:mt-20">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="disabled:opacity-50 py-5 w-full font-medium text-[11px] uppercase tracking-[0.3em] transition-all duration-300 disabled:cursor-not-allowed"
                                style={{
                                    backgroundColor: isSubmitting ? '#7A6E63' : '#1b1c1a',
                                    color: '#fbf9f6',
                                    fontFamily: "'Inter', sans-serif"
                                }}
                                onMouseEnter={e => {
                                    if (!isSubmitting) {
                                        e.currentTarget.style.backgroundColor = '#C9A96E';
                                        e.currentTarget.style.color = '#1b1c1a';
                                    }
                                }}
                                onMouseLeave={e => {
                                    if (!isSubmitting) {
                                        e.currentTarget.style.backgroundColor = '#1b1c1a';
                                        e.currentTarget.style.color = '#fbf9f6';
                                    }
                                }}
                            >
                                {isSubmitting ? 'Publishing...' : 'Publish Listing'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateProduct;