
import React from 'react';
import { CartItem, View } from '../types';

interface CheckoutPageProps {
    cart: CartItem[];
    onNavigate: (view: View) => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cart, onNavigate }) => {
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = subtotal > 0 ? 25.00 : 0;
    const total = subtotal + shipping;

    const OrderSummary = () => (
        <div className="bg-checkout-surface border border-white/10 rounded p-4 relative overflow-hidden group">
            <h2 className="font-oswald text-lg uppercase mb-4 flex items-center gap-2"><span className="material-icons text-sm">inventory_2</span> Order Summary</h2>
            {cart.map((item, index) => (
                <div key={`${item.id}-${item.selectedSize}`} className={`flex gap-4 mb-4 ${index < cart.length - 1 ? 'pb-4 border-b border-white/10' : ''}`}>
                    <div className="w-20 h-24 bg-black/20 rounded overflow-hidden relative border border-white/5">
                        <img alt={item.name} className="w-full h-full object-cover opacity-90" src={item.imageUrl}/>
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                            <h3 className="font-oswald text-base uppercase tracking-wide leading-none mb-1">{item.name}</h3>
                            <p className="text-xs text-primary/80 mb-1">Size: {item.selectedSize}</p>
                        </div>
                        <div className="flex justify-between items-end">
                            <span className="font-mono text-sm">Qty: {item.quantity}</span>
                            <span className="font-mono font-bold text-lg">${item.price.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            ))}
            <div className="flex justify-between items-center text-xs text-white/70 mb-1 pt-4 border-t border-white/10"><span>Subtotal</span><span className="font-mono">${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between items-center text-xs text-white/70 mb-3"><span>Shipping (Cold Storage)</span><span className="font-mono">${shipping.toFixed(2)}</span></div>
            <div className="flex justify-between items-center pt-3 border-t border-white/10"><span className="font-oswald uppercase text-sm font-bold">Total Due</span><span className="font-mono text-xl text-primary font-bold">${total.toFixed(2)}</span></div>
        </div>
    );

    return (
        <div className="bg-checkout-bg text-white font-mono antialiased min-h-screen relative overflow-x-hidden selection:bg-primary selection:text-frzn-secondary">
            <div className="fixed inset-0 w-full h-full texture-overlay z-0 mix-blend-overlay"></div>
            <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md bg-checkout-bg/80 border-b border-white/10">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate(View.CART)}>
                    <span className="material-icons text-primary text-xl">ac_unit</span>
                    <h1 className="font-oswald font-bold text-xl tracking-tighter uppercase">FRZN<span className="text-primary">OPS</span></h1>
                </div>
                <div className="text-xs text-white/60 tracking-widest uppercase">[ Checkout_v2.0 ]</div>
            </header>

            <main className="relative z-10 pt-24 pb-32 lg:pb-24 px-4 max-w-7xl mx-auto w-full lg:grid lg:grid-cols-2 lg:gap-16">
                {/* Left Column: Forms */}
                <div className="lg:col-span-1">
                    <div className="flex justify-between items-center mb-8 px-2 max-w-lg">
                        <div className="flex flex-col items-center opacity-50">
                            <div className="w-8 h-8 rounded-full bg-primary/50 text-secondary flex items-center justify-center font-bold text-sm mb-1">01</div>
                            <span className="text-[10px] uppercase tracking-wider text-white/70">Cart</span>
                        </div>
                        <div className="h-[1px] bg-white/20 flex-1 mx-2"></div>
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full border-2 border-primary text-primary flex items-center justify-center font-bold text-sm mb-1 bg-checkout-surface shadow-[0_0_15px_rgba(170,189,207,0.3)]">02</div>
                            <span className="text-[10px] uppercase tracking-wider text-primary font-bold">Details</span>
                        </div>
                        <div className="h-[1px] bg-white/20 flex-1 mx-2"></div>
                        <div className="flex flex-col items-center opacity-50">
                            <div className="w-8 h-8 rounded-full border border-white/30 text-white/50 flex items-center justify-center font-bold text-sm mb-1">03</div>
                            <span className="text-[10px] uppercase tracking-wider">Done</span>
                        </div>
                    </div>
                    
                    <form className="max-w-lg">
                        <section className="mb-6 lg:hidden">
                           <OrderSummary />
                        </section>

                        <section className="mb-6">
                            <h2 className="font-oswald text-lg uppercase mb-3 text-white/90 flex items-center gap-2"><span className="w-1 h-4 bg-primary block"></span> Shipping Intel</h2>
                            <div className="space-y-3">
                                <div className="grid grid-cols-2 gap-3">
                                    <input className="w-full bg-input-bg border border-white/20 rounded px-3 py-3 text-sm placeholder-white/40 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="FIRST NAME" type="text" />
                                    <input className="w-full bg-input-bg border border-white/20 rounded px-3 py-3 text-sm placeholder-white/40 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="LAST NAME" type="text" />
                                </div>
                                <input className="w-full bg-input-bg border border-white/20 rounded px-3 py-3 text-sm placeholder-white/40 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="CONTACT EMAIL" type="email" />
                                <input className="w-full bg-input-bg border border-white/20 rounded px-3 py-3 text-sm placeholder-white/40 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="STREET ADDRESS" type="text" />
                                <div className="grid grid-cols-3 gap-3">
                                    <input className="col-span-1 w-full bg-input-bg border border-white/20 rounded px-3 py-3 text-sm placeholder-white/40 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="ZIP" type="text" />
                                    <input className="col-span-2 w-full bg-input-bg border border-white/20 rounded px-3 py-3 text-sm placeholder-white/40 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="CITY" type="text" />
                                </div>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="font-oswald text-lg uppercase mb-3 text-white/90 flex items-center gap-2"><span className="w-1 h-4 bg-primary block"></span> Payment Protocol</h2>
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <button type="button" className="relative bg-checkout-surface border-2 border-primary rounded p-3 flex flex-col items-center justify-center gap-2 transition-all shadow-[0_0_10px_rgba(170,189,207,0.2)]">
                                    <span className="material-icons text-white text-2xl">credit_card</span>
                                    <span className="text-[10px] uppercase font-bold tracking-wider">Card</span>
                                    <div className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                                </button>
                                <button type="button" className="bg-transparent border border-white/10 rounded p-3 flex flex-col items-center justify-center gap-2 hover:bg-white/5 transition-all opacity-60 hover:opacity-100">
                                    <span className="font-oswald font-bold italic text-lg">Pay<span className="text-blue-400">Pal</span></span>
                                    <span className="text-[10px] uppercase font-bold tracking-wider">Wallet</span>
                                </button>
                            </div>
                            <div className="bg-checkout-surface border border-white/10 rounded p-4 space-y-3 relative overflow-hidden">
                                <div className="relative"><input className="w-full bg-input-bg border border-white/20 rounded px-3 py-3 text-sm font-mono tracking-widest focus:ring-1 focus:ring-primary focus:border-primary outline-none placeholder-white/40 transition-all" placeholder="0000 0000 0000 0000" type="text" /><span className="material-icons absolute right-3 top-3 text-white/40">lock</span></div>
                                <div className="grid grid-cols-2 gap-3">
                                    <input className="w-full bg-input-bg border border-white/20 rounded px-3 py-3 text-sm font-mono tracking-widest focus:ring-1 focus:ring-primary focus:border-primary outline-none placeholder-white/40 transition-all" placeholder="MM/YY" type="text" />
                                    <input className="w-full bg-input-bg border border-white/20 rounded px-3 py-3 text-sm font-mono tracking-widest focus:ring-1 focus:ring-primary focus:border-primary outline-none placeholder-white/40 transition-all" placeholder="CVC" type="text" />
                                </div>
                            </div>
                        </section>
                        
                        <div className="mb-8 flex items-start gap-3 px-1">
                            <input id="terms" type="checkbox" className="h-5 w-5 mt-0.5 cursor-pointer appearance-none rounded border border-white/30 bg-white/5 checked:bg-primary flex-shrink-0" />
                            <label htmlFor="terms" className="text-xs text-white/60 leading-tight">I agree to the <a href="#" className="text-primary underline">Terms of Cold Storage</a> and accept that my order will be processed in a sub-zero environment.</label>
                        </div>
                         {/* Desktop Button */}
                        <div className="hidden lg:flex gap-4 items-center">
                            <button className="flex-1 bg-white text-frzn-secondary hover:bg-primary transition-colors py-4 px-6 rounded font-oswald font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                                Place Order <span className="material-icons text-sm transform group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </button>
                             <div className="flex-1 text-right">
                                <p className="text-xs uppercase text-white/50 mb-1">Total Amount</p>
                                <p className="text-2xl font-mono font-bold text-white">${total.toFixed(2)}</p>
                            </div>
                        </div>
                    </form>
                </div>
                
                {/* Right Column: Order Summary (Desktop) */}
                <div className="hidden lg:block lg:col-span-1">
                    <div className="sticky top-24">
                        <OrderSummary />
                    </div>
                </div>
            </main>

            {/* Mobile Fixed Footer */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-checkout-bg border-t border-white/10 z-50 backdrop-blur-md bg-opacity-90 lg:hidden">
                <div className="max-w-lg mx-auto flex gap-4 items-center">
                    <div className="flex-1">
                        <p className="text-[10px] uppercase text-white/50 mb-1">Total Amount</p>
                        <p className="text-lg font-mono font-bold text-white">${total.toFixed(2)}</p>
                    </div>
                    <button className="flex-1 bg-white text-frzn-secondary hover:bg-primary transition-colors py-4 px-6 rounded font-oswald font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                        Place Order <span className="material-icons text-sm transform group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
