
import React from 'react';
import { CartItem, View } from '../types';

interface CartPageProps {
    cart: CartItem[];
    onUpdateQuantity: (productId: number, selectedSize: string, delta: number) => void;
    onRemoveItem: (productId: number, selectedSize: string) => void;
    onNavigate: (view: View) => void;
}

const CartPage: React.FC<CartPageProps> = ({ cart, onUpdateQuantity, onRemoveItem, onNavigate }) => {
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = subtotal > 0 ? 25.00 : 0;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;
    const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    const OrderSummary = () => (
        <div className="bg-[#E2E8F0]/50 dark:bg-[#1E293B]/50 backdrop-blur-sm p-6 border border-[#E2E8F0] dark:border-slate-700">
            <h4 className="font-oswald font-bold text-lg uppercase mb-4 tracking-widest border-b border-[#94A3B8]/20 pb-2">Order Intel</h4>
            <div className="space-y-3 text-sm font-mono">
                <div className="flex justify-between text-[#64748B] dark:text-[#94A3B8]"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-[#64748B] dark:text-[#94A3B8]"><span>Shipping (Standard)</span><span>${shipping.toFixed(2)}</span></div>
                <div className="flex justify-between text-[#64748B] dark:text-[#94A3B8]"><span>Tax (Est.)</span><span>${tax.toFixed(2)}</span></div>
            </div>
            <div className="mt-6 pt-4 border-t border-[#94A3B8]/20 flex justify-between items-end">
                <span className="font-oswald font-bold text-lg uppercase">Total</span>
                <span className="font-oswald font-bold text-2xl text-[#64748B] dark:text-white">${total.toFixed(2)}</span>
            </div>
        </div>
    );

    return (
        <div className="bg-[#F1F5F9] dark:bg-[#0F172A] text-[#0F172A] dark:text-[#F8FAFC] font-mono antialiased min-h-screen">
            <header className="fixed top-0 w-full z-50 bg-[#F1F5F9]/90 dark:bg-[#0F172A]/90 backdrop-blur-md border-b border-[#E2E8F0] dark:border-[#1E293B]">
                <div className="px-6 py-4 flex justify-between items-center max-w-7xl mx-auto">
                    <button className="text-[#0F172A] dark:text-[#F8FAFC] hover:text-[#64748B] transition-colors" onClick={() => onNavigate(View.HOME)}>
                        <span className="material-icons-outlined text-2xl">arrow_back</span>
                    </button>
                    <h1 className="font-oswald font-bold text-xl tracking-widest uppercase text-center">CART // OPERATION</h1>
                    <div className="relative">
                        <span className="material-icons-outlined text-2xl">shopping_bag</span>
                        {cartItemCount > 0 && <span className="absolute -top-1 -right-1 bg-[#64748B] text-white text-[10px] font-bold px-1.5 py-0.5">{cartItemCount}</span>}
                    </div>
                </div>
            </header>
            
            <main className="pt-24 pb-48 lg:pb-24 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto min-h-screen relative overflow-hidden">
                <div className="fixed top-1/4 -right-20 w-64 h-64 border border-[#94A3B8]/20 rounded-full dark:border-[#94A3B8]/10 pointer-events-none rotate-45"></div>
                <div className="fixed bottom-1/4 -left-20 w-80 h-80 border border-[#94A3B8]/20 rounded-full dark:border-[#94A3B8]/10 pointer-events-none -rotate-12"></div>
                <div className="fixed top-10 left-10 text-[10rem] font-oswald font-bold text-[#E2E8F0] dark:text-[#1E293B] opacity-20 pointer-events-none select-none z-0">FRZN</div>

                <div className="relative z-10 mb-8 flex justify-between items-end border-b border-[#94A3B8]/30 pb-4">
                    <div>
                        <p className="text-xs text-[#64748B] dark:text-[#94A3B8] tracking-widest uppercase mb-1">Sector 04</p>
                        <h2 className="text-3xl font-oswald font-bold uppercase leading-none">Your Gear</h2>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-[#64748B] dark:text-[#94A3B8] font-mono">ID: #892-XJ</p>
                    </div>
                </div>

                <div className="lg:grid lg:grid-cols-3 lg:gap-12 lg:items-start">
                    <div className="relative z-10 space-y-6 lg:col-span-2">
                        {cart.length === 0 ? (
                            <div className="text-center py-12 text-[#64748B] dark:text-[#94A3B8]">
                                <p className="mb-2">Your cart is empty.</p>
                                <button onClick={() => onNavigate(View.HOME)} className="font-oswald uppercase tracking-wider text-sm border-b border-[#64748B] hover:text-white">Start Shopping</button>
                            </div>
                        ) : (
                            cart.map(item => (
                                <div key={`${item.id}-${item.selectedSize}`} className="group relative bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-slate-700 p-3 shadow-sm hover:shadow-glow transition-all duration-300">
                                    <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-[#64748B] z-20"></div>
                                    <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r-2 border-b-2 border-[#64748B] z-20"></div>
                                    <div className="flex gap-4">
                                        <div className="w-24 h-32 bg-[#E2E8F0] dark:bg-slate-800 flex-shrink-0 relative overflow-hidden">
                                            <img alt={item.name} className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal opacity-90" src={item.imageUrl} />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <h3 className="font-oswald font-bold text-lg uppercase tracking-wide">{item.name}</h3>
                                                    <button className="text-[#64748B] dark:text-[#94A3B8] hover:text-red-500 transition-colors" onClick={() => onRemoveItem(item.id, item.selectedSize)}>
                                                        <span className="material-icons-outlined text-sm">close</span>
                                                    </button>
                                                </div>
                                                <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-1 font-mono uppercase">Color: {item.series} / Size: {item.selectedSize}</p>
                                            </div>
                                            <div className="flex justify-between items-end mt-4">
                                                <div className="flex items-center border border-[#E2E8F0] dark:border-slate-600 bg-[#F1F5F9] dark:bg-slate-900 h-8">
                                                    <button className="px-2 hover:bg-[#E2E8F0] dark:hover:bg-slate-800 text-[#64748B] dark:text-[#94A3B8] transition-colors" onClick={() => onUpdateQuantity(item.id, item.selectedSize, -1)}>-</button>
                                                    <span className="px-2 text-sm font-mono w-8 text-center">{item.quantity}</span>
                                                    <button className="px-2 hover:bg-[#E2E8F0] dark:hover:bg-slate-800 text-[#64748B] dark:text-[#94A3B8] transition-colors" onClick={() => onUpdateQuantity(item.id, item.selectedSize, 1)}>+</button>
                                                </div>
                                                <div className="text-right">
                                                    <span className="font-oswald font-bold text-xl">${(item.price * item.quantity).toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {cart.length > 0 && (
                        <div className="mt-12 lg:mt-0 relative z-10 lg:col-span-1 lg:sticky lg:top-24">
                            <OrderSummary />
                            <div className="mt-4 flex gap-2">
                                <input className="flex-1 bg-transparent border border-[#E2E8F0] dark:border-slate-600 p-3 text-sm font-mono uppercase text-[#0F172A] dark:text-[#F8FAFC] placeholder-[#64748B] focus:outline-none focus:border-[#64748B] transition-colors" placeholder="ENTER ACCESS CODE" type="text" />
                                <button className="px-4 py-2 border border-[#E2E8F0] dark:border-slate-600 hover:border-[#64748B] hover:text-[#64748B] transition-colors font-oswald font-bold uppercase text-sm">Apply</button>
                            </div>
                            <div className="hidden lg:block mt-6">
                                <button onClick={() => cart.length > 0 && onNavigate(View.CHECKOUT)} disabled={cart.length === 0} className="w-full py-4 bg-[#64748B] hover:bg-[#475569] text-white font-oswald font-bold uppercase tracking-widest text-sm shadow-lg flex items-center justify-center gap-2 transition-all group disabled:opacity-50 disabled:cursor-not-allowed">
                                    Checkout
                                    <span className="material-icons-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Mobile-only fixed footer */}
            <div className="fixed bottom-0 w-full z-50 bg-white/90 dark:bg-slate-900/95 backdrop-blur-lg border-t border-[#E2E8F0] dark:border-slate-700 lg:hidden">
                <div className="px-6 py-4 max-w-md mx-auto flex gap-4">
                    <button onClick={() => onNavigate(View.HOME)} className="flex-1 py-4 px-2 border border-[#E2E8F0] dark:border-slate-600 text-[#0F172A] dark:text-[#F8FAFC] font-oswald font-bold uppercase tracking-widest text-sm hover:bg-[#E2E8F0] dark:hover:bg-slate-800 transition-all">Continue</button>
                    <button onClick={() => cart.length > 0 && onNavigate(View.CHECKOUT)} disabled={cart.length === 0} className="flex-[2] py-4 bg-[#64748B] hover:bg-[#475569] text-white font-oswald font-bold uppercase tracking-widest text-sm shadow-lg flex items-center justify-center gap-2 transition-all group disabled:opacity-50 disabled:cursor-not-allowed">
                        Checkout
                        <span className="material-icons-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
