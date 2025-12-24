
import React, { useState } from 'react';
import { Product, View } from '../types';

interface ProductDetailPageProps {
    product: Product;
    onAddToCart: (product: Product, size: string, color: string) => void;
    onNavigate: (view: View) => void;
    cartItemsCount: number;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, onAddToCart, onNavigate, cartItemsCount }) => {
    const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0].name : 'Default');
    const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[1] : 'M');

    const handleAddToCart = () => {
        onAddToCart(product, selectedSize, selectedColor);
        // Maybe show a confirmation message
    };

    return (
        <div className="bg-slate-100 dark:bg-frzn-secondary text-slate-800 dark:text-white font-mono antialiased min-h-screen relative overflow-x-hidden">
            <div className="fixed inset-0 pointer-events-none z-0 bg-noise mix-blend-overlay"></div>
            
            {/* Full-width Header */}
            <header className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 bg-slate-100/50 dark:bg-frzn-secondary/50 backdrop-blur-md">
                <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
                    <button className="p-2 rounded-full bg-white/20 hover:bg-white/40 transition" onClick={() => onNavigate(View.HOME)}>
                        <span className="material-icons text-slate-800 dark:text-white">arrow_back</span>
                    </button>
                    <div className="text-xs tracking-[0.2em] font-bold uppercase opacity-70 font-oswald">FRZN / OPS</div>
                    <button className="p-2 rounded-full bg-white/20 hover:bg-white/40 transition relative" onClick={() => onNavigate(View.CART)}>
                        <span className="material-icons text-slate-800 dark:text-white">shopping_bag</span>
                        {cartItemsCount > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>}
                    </button>
                </div>
            </header>

            <div className="max-w-7xl mx-auto lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start lg:pt-24">
                {/* Left Column: Image */}
                <section className="relative h-[65vh] w-full bg-gradient-to-b from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700 overflow-hidden flex flex-col justify-center items-center lg:h-screen lg:sticky lg:top-0 pt-16 lg:pt-0">
                    <img alt={product.name} className="w-[120%] lg:w-full h-auto object-cover object-center drop-shadow-2xl filter contrast-125 hover:scale-105 transition-transform duration-700 ease-out" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkwW5YbSFhws17dzasyuT-ZjU6psC5RydDHZtU8af8Esr0ufrf8C60XZR6CvT63pTVsL4CZoW-BcZ2fA7InWmcnxlMF6lRy0mWRmOlFnomppweToVzmol-6LiC-G--4fy75On3h_D0yQJliPGc_KhttD3RxY9bu44QEJXF4iKEahbGENu1uWOuphF4YMSlpiDWT88tm8M9awEymWaOB6lp-OIynmJz9YueZkju710RIh5Kt2yY6VwspFG97Dd3A9OO0lHVx90ATA_g" />
                    <div className="absolute bottom-12 left-6 right-6 z-20">
                        <h1 className="font-oswald text-4xl uppercase leading-none text-slate-900 dark:text-white drop-shadow-md">
                            When the cold <br /> <span className="text-frzn-primary italic">hits hard.</span>
                        </h1>
                    </div>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce opacity-50 lg:hidden">
                        <span className="material-icons text-xl">keyboard_arrow_down</span>
                    </div>
                </section>

                {/* Right Column: Details */}
                <section className="relative -mt-6 lg:mt-0 bg-white dark:bg-slate-800 rounded-t-3xl lg:rounded-none px-6 pt-8 pb-32 lg:pb-12 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.3)] z-30">
                    <div className="flex justify-between items-start mb-6 border-b border-slate-200 dark:border-slate-700 pb-4">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="px-2 py-0.5 bg-frzn-primary text-white text-[0.6rem] font-bold tracking-wider uppercase rounded-sm">New Arrival</span>
                                <span className="text-[0.6rem] text-slate-500 dark:text-slate-400 font-mono">SERIES V.02</span>
                            </div>
                            <h2 className="font-oswald text-3xl font-bold uppercase tracking-tight text-slate-900 dark:text-white">{product.name}</h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1">ENGINEERED FOR EXTREME COLD</p>
                        </div>
                        <div className="text-right">
                            <p className="font-oswald text-2xl font-bold text-slate-900 dark:text-white">${product.price.toFixed(2)}</p>
                            <div className="flex text-yellow-500 text-xs justify-end mt-1">
                                <span className="material-icons text-[14px]">star</span>
                                <span className="material-icons text-[14px]">star</span>
                                <span className="material-icons text-[14px]">star</span>
                                <span className="material-icons text-[14px]">star</span>
                                <span className="material-icons text-[14px]">star_half</span>
                            </div>
                        </div>
                    </div>
                    <div className="mb-8">
                        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 font-mono text-justify">
                            {product.fullDescription}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 mb-8">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3">Select Variant</label>
                            <div className="flex gap-4">
                                {product.colors?.map(color => (
                                    <button key={color.name} onClick={() => setSelectedColor(color.name)} className={`w-12 h-12 rounded-full border-2 shadow-lg relative flex items-center justify-center focus:outline-none ring-2 ring-offset-2 ring-frzn-primary ring-offset-white dark:ring-offset-slate-800 ${selectedColor === color.name ? 'border-frzn-primary' : 'border-slate-300 dark:border-slate-600'} ${color.class}`}>
                                        {selectedColor === color.name && <span className="material-icons text-slate-600 text-sm">check</span>}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Size Inventory</label>
                                <a className="text-[0.65rem] underline text-slate-400 dark:text-slate-500 hover:text-frzn-primary" href="#">SIZE GUIDE</a>
                            </div>
                            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                                {product.sizes?.map(size => (
                                    <button key={size} onClick={() => setSelectedSize(size)} className={`min-w-[3.5rem] h-12 rounded flex items-center justify-center font-mono text-sm transition-colors
                                        ${selectedSize === size
                                            ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold shadow-lg transform scale-105'
                                            : 'border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200 hover:border-slate-800 dark:hover:border-slate-200'}`
                                        }>
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        {product.features?.map(feature => (
                             <div key={feature.title} className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded border border-slate-100 dark:border-slate-700">
                                <span className="material-icons text-frzn-primary mb-2">{feature.icon}</span>
                                <h3 className="font-oswald text-sm font-bold uppercase text-slate-800 dark:text-white">{feature.title}</h3>
                                <p className="text-[0.6rem] text-slate-500 dark:text-slate-400 mt-1">{feature.text}</p>
                            </div>
                        ))}
                    </div>

                    {/* Desktop Add to Cart */}
                    <div className="hidden lg:flex gap-4 items-center mt-10">
                         <button className="w-14 h-14 flex-shrink-0 flex items-center justify-center border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                            <span className="material-icons text-slate-800 dark:text-white">favorite_border</span>
                        </button>
                        <button onClick={handleAddToCart} className="flex-1 bg-frzn-primary hover:bg-opacity-90 text-white h-14 rounded-lg font-oswald font-bold uppercase tracking-widest text-lg flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all">
                            <span>Add to Cart</span>
                            <span className="material-icons text-sm opacity-70">east</span>
                        </button>
                    </div>

                    {/* Mobile fixed Add to Cart */}
                    <div className="fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg pt-4 pb-6 px-6 border-t border-slate-200 dark:border-slate-700 flex gap-4 items-center z-40 lg:hidden">
                        <button className="w-14 h-14 flex-shrink-0 flex items-center justify-center border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                            <span className="material-icons text-slate-800 dark:text-white">favorite_border</span>
                        </button>
                        <button onClick={handleAddToCart} className="flex-1 bg-frzn-primary hover:bg-opacity-90 text-white h-14 rounded-lg font-oswald font-bold uppercase tracking-widest text-lg flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all">
                            <span>Add to Cart</span>
                            <span className="material-icons text-sm opacity-70">east</span>
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ProductDetailPage;
