
import React from 'react';
import { Product, View, CartItem } from '../types';

interface HomePageProps {
    products: Product[];
    onSelectProduct: (product: Product) => void;
    onNavigate: (view: View) => void;
    cart: CartItem[];
}

const ProductCard: React.FC<{ product: Product, onSelectProduct: (product: Product) => void }> = ({ product, onSelectProduct }) => (
    <div 
        className="group relative bg-card-light/20 dark:bg-card-dark/40 border border-white/5 p-3 flex flex-col hover:border-accent-blue/50 transition-colors duration-300 cursor-pointer"
        onClick={() => onSelectProduct(product)}
    >
        <div className="relative w-full aspect-[3/4] bg-gradient-to-b from-white/5 to-transparent mb-3 overflow-hidden">
            <img alt={product.name} className="w-full h-full object-cover object-top mix-blend-normal group-hover:scale-105 transition-transform duration-500" src={product.imageUrl} />
        </div>
        <div className="mt-auto">
            <div className="flex justify-between items-start mb-1">
                <h3 className="font-display font-bold uppercase text-lg leading-none text-white">{product.name}</h3>
                {product.isNew && <span className="text-[10px] font-mono border border-white/20 px-1 text-accent-blue">NEW</span>}
            </div>
            <p className="text-[10px] text-gray-300 mb-2 font-mono uppercase truncate">{product.series}</p>
            <div className="flex justify-between items-end border-t border-white/10 pt-2">
                <span className="font-bold text-sm text-white">${product.price.toFixed(2)}</span>
                <button className="text-accent-blue hover:text-white text-[10px] uppercase font-bold tracking-wider">Add +</button>
            </div>
        </div>
    </div>
);

const HomePage: React.FC<HomePageProps> = ({ products, onSelectProduct, onNavigate, cart }) => {
    const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <div className="bg-background-light dark:bg-background-dark text-text-light min-h-screen font-body antialiased">
            <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.08] bg-noise mix-blend-overlay"></div>

            <header className="fixed top-0 w-full z-40 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-white/10 dark:border-white/5">
                <div className="flex justify-between items-center px-6 md:px-8 lg:px-12 py-4 max-w-screen-2xl mx-auto">
                    <div className="flex flex-col">
                        <span className="text-[10px] tracking-[0.2em] font-bold text-accent-blue uppercase font-sans">Season 04</span>
                        <span className="text-xl font-display font-bold tracking-tighter leading-none text-white">FRZN OPS</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-wider">
                         <a href="#" className="text-white hover:text-accent-blue transition-colors">Shop</a>
                         <a href="#" className="text-white hover:text-accent-blue transition-colors">Archive</a>
                         <a href="#" className="text-white hover:text-accent-blue transition-colors">Intel</a>
                         <a href="#" className="text-white hover:text-accent-blue transition-colors">Contact</a>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="text-white hover:text-accent-blue transition-colors">
                            <span className="material-icons-outlined text-xl">search</span>
                        </button>
                        <button className="relative text-white hover:text-accent-blue transition-colors" onClick={() => onNavigate(View.CART)}>
                            <span className="material-icons-outlined text-xl">shopping_bag</span>
                            {cartItemCount > 0 && <span className="absolute -top-1 -right-1 bg-accent-blue text-background-dark text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-sm">{cartItemCount}</span>}
                        </button>
                        <button className="text-white hover:text-accent-blue transition-colors md:hidden">
                            <span className="material-icons-outlined text-xl">menu</span>
                        </button>
                    </div>
                </div>
                <div className="w-full bg-black/20 dark:bg-white/5 overflow-hidden py-1 border-y border-white/5">
                    <div className="whitespace-nowrap overflow-hidden">
                        <div className="inline-block scrolling-text text-[10px] font-mono tracking-widest text-accent-blue/80">
                            ENGINEERED FOR COLD // NOT FOR THE CROWD // SUB-ZERO DEPLOYMENT READY // THERMAL REGULATION ACTIVE // FRZN // PUFFERS // ENGINEERED FOR COLD // NOT FOR THE CROWD //
                        </div>
                    </div>
                </div>
            </header>

            <main className="pt-28 pb-40 px-4 md:px-8 lg:px-12 overflow-x-hidden max-w-screen-2xl mx-auto">
                <section className="mb-12 relative">
                    <div className="absolute top-0 right-0 text-right opacity-60">
                        <p className="text-[10px] font-mono text-accent-blue">LAT: 64.2008° N</p>
                        <p className="text-[10px] font-mono text-accent-blue">LON: 149.4937° W</p>
                    </div>
                    <div className="mt-8">
                        <h1 className="text-5xl md:text-7xl font-display font-bold uppercase leading-[0.85] tracking-tight mb-4 text-white drop-shadow-lg">
                            When the cold<br />
                            <span className="text-accent-blue/90 italic">Hits, Everything</span><br />
                            Else Goes Quiet
                        </h1>
                        <div className="relative w-full aspect-square md:aspect-[16/7] rounded-sm overflow-hidden border border-white/10 bg-gradient-to-b from-card-light/50 to-transparent dark:from-card-dark/50">
                            <img alt="Floating blue puffer jacket in cold environment" className="w-full h-full object-cover mix-blend-overlay opacity-50 absolute inset-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHzZDF5jF9cYR-msQdnlp4Io-7XnvlcQCPRLQz44CeDCtP8Tv1PZr2ygMj5xEc4hYRqtJhdlGZD1SnYjN-98Ek6OS1drUAc_ZpPjYvHVt7JgEle4-fh7GCqNL5Jazu1aN8zQVnTmNoA9Oin-oHrTx6Sk3tPXGfXrEkTN1lXBKn1Xx_Vvbe5Qsux3cNtqAYDb8SXT4jGxZgHzP23hKau4vLPRcs9cOKgEXvgTVpkvwD760MpjrZx0NDZkBDfoQuQxI9puLFVv8tn940" />
                            <img alt="Detailed close up of puffy jacket texture" className="w-full h-full object-cover opacity-80 mix-blend-lighten absolute inset-0 grayscale contrast-125 brightness-75" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzzpX8X6Kl2o59r6M0PIw0GpKCy5B8knD0Fldccvt2icLKdJcrqDGI_b0C_h9frouwtX-Cp26Jq3KCF2QhE9l-FuBk2xhzqwfSZa3GRL_faVLve9KRc5qJo0rcdnnyhhZQCFevJuPWwVW5QPU9omfNFrN2v9NHaBNbn0o0aOahH2B-S5t1QKfhaoOYoxxpQ_2C_ATN5P1vraARnotZuIBh0N-b7erhqyL8s6k9jMeXozV_tbJ_6d48iAhlzVqrb228om3k9GH4EHmA" />
                            <div className="absolute inset-0 flex items-center justify-center p-6">
                                <img alt="Main Hero Puffer Jacket" className="w-3/4 md:w-1/2 lg:w-1/3 drop-shadow-2xl filter contrast-110 brightness-110 -rotate-12 transform hover:scale-105 transition-transform duration-700 ease-out z-10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0esbNBR2HbdFgp9HYOuLlG9sdSKjhAzwfCW0KbvvmLoERJXSGMX7U9Oo6gz8Dw248IZZNoG7mf_Oe2lnusDmqovu6BZA_AeF3UTPK2w9_EHWcroAZk_l6p9DZ9Sf38hbyd6NV4RyPsGVDgFmi1naHuFHivt5sbnw0kblP0GxFz9Kb8KYpWlk2wUpEZOe0A8y1csOzceRVx7JlCoPiCvQZSUh4_wjdKXxV6uTOYaLhEHOwVQRUhF3ySHicOEv8dI6h0eMudICYKhpV" />
                            </div>
                            <div className="absolute bottom-6 right-6 z-20">
                                <div className="w-20 h-20 rounded-full border border-white/30 backdrop-blur-sm flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                                    <span className="material-icons-outlined text-lg mb-1 group-hover:-translate-y-1 transition-transform">north_east</span>
                                    <span className="text-[10px] font-mono uppercase text-gray-300">Add to Cart</span>
                                    <span className="text-xs font-bold text-white">$999.99</span>
                                </div>
                            </div>
                            <div className="absolute bottom-10 left-6 z-20 max-w-[150px] md:max-w-xs">
                                <div className="h-0.5 w-8 bg-accent-blue mb-2"></div>
                                <h3 className="text-xl md:text-2xl font-display uppercase leading-none text-white mb-1">Stüssy x Frzn</h3>
                                <p className="text-[9px] md:text-xs leading-relaxed opacity-80 font-mono">
                                    [Drops fast here] <br />
                                    [Action one] <br />
                                    [Becomes silent]
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-end mt-4">
                            <h2 className="text-2xl md:text-3xl font-display uppercase text-right leading-none text-white/90 w-full md:w-2/3 lg:w-1/2">
                                You don't feel cold<br />
                                <span className="text-accent-blue">You feel less</span>
                            </h2>
                        </div>
                    </div>
                </section>

                <section className="mb-6 flex justify-between items-end border-b border-white/10 pb-4">
                    <div>
                        <span className="text-[10px] font-mono text-accent-blue block mb-1">CATALOG // 2024</span>
                        <h2 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tight text-white">Cold Ops Inventory</h2>
                    </div>
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 dark:bg-white/5 dark:hover:bg-white/10 backdrop-blur-sm border border-white/10 rounded-sm text-xs uppercase tracking-wider transition-all">
                        <span>Filters</span>
                        <span className="material-icons-outlined text-sm">tune</span>
                    </button>
                </section>

                <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} onSelectProduct={onSelectProduct} />
                    ))}
                </section>
                
                <section className="relative py-12 px-2 overflow-hidden bg-black/20 dark:bg-white/5 border-t border-white/10 -mx-4 md:-mx-8 lg:-mx-12">
                    <div className="absolute top-4 right-4 text-right">
                        <h4 className="text-4xl lg:text-6xl font-display font-bold text-white/10 dark:text-white/5 uppercase select-none pointer-events-none">FRZN</h4>
                    </div>
                    <div className="flex justify-between text-[8px] font-mono text-gray-400 mb-8 px-4 md:px-8 lg:px-12 opacity-70">
                        <div className="space-y-1">
                            <p>WAREHOUSE ZONE / INDUSTRIAL</p>
                            <p>PICK / COLD STORAGE SECTOR 07</p>
                            <p>42° PIER AVE, BROOKLYN, NY</p>
                        </div>
                        <div className="text-right space-y-1">
                            <p>CATALOG: PUFFERS</p>
                            <p>STATUS: MINT</p>
                            <div className="flex gap-2 justify-end mt-2">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                <div className="w-2 h-2 border border-white rounded-full"></div>
                                <div className="w-2 h-2 border border-white rounded-full"></div>
                            </div>
                        </div>
                    </div>
                    <div className="relative h-32 flex items-center justify-center mb-8">
                        <h2 className="text-[5rem] md:text-[7rem] lg:text-[9rem] font-display font-bold text-center leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 uppercase z-10 w-full glitch-effect" data-text="FRZN PUFFERS">
                            FRZN PUFFERS
                        </h2>
                        <div className="absolute inset-0 flex justify-center items-center z-20 pointer-events-none">
                            <img alt="Running Figure Puffer" className="h-40 md:h-56 w-auto object-cover opacity-80 mix-blend-screen filter contrast-125 brightness-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDioZwJqgNhud3myAvQR2UY4AVyQ1wVO6R7m5LkLvzTBT7f8_G-UIQlr5CjvMZK2WucFeVgyHS5Tj7UxWNLl76eCa0kwoO_6vv6cPEOGZtQN_xQO0j1KbHPzQ_LfqBSQp4IKqNBboqnThrQwicgUCdZS5QYPxEeZ8GyfMZ90qevWGMZUTFukvJ1esj4CDxf_1VnrGUTVRlbOWiw-U3GI1_0VpJHQEvh65bgtCODuFafDoroXr6FF7iDWb_fokasKDTEXzxQxS3T6iLx" />
                        </div>
                    </div>
                    <div className="px-4 md:px-8 lg:px-12 max-w-2xl mx-auto">
                        <button className="w-full py-4 bg-white text-background-dark font-display font-bold text-xl uppercase tracking-widest hover:bg-accent-blue transition-colors">
                            Access Full Archive
                        </button>
                    </div>
                </section>
            </main>

            <nav className="fixed bottom-0 w-full bg-background-light/90 dark:bg-background-dark/95 backdrop-blur-xl border-t border-white/10 z-50 md:hidden">
                <div className="flex justify-around items-center h-16 px-2">
                    <button className="flex flex-col items-center justify-center w-full h-full text-accent-blue group" onClick={() => onNavigate(View.HOME)}>
                        <span className="material-icons-outlined text-2xl mb-0.5 group-hover:scale-110 transition-transform">home</span>
                        <span className="text-[9px] font-mono uppercase tracking-wider opacity-100">Home</span>
                    </button>
                    <button className="flex flex-col items-center justify-center w-full h-full text-gray-400 dark:text-gray-500 hover:text-white transition-colors group" onClick={() => onNavigate(View.HOME)}>
                        <span className="material-icons-outlined text-2xl mb-0.5 group-hover:scale-110 transition-transform">grid_view</span>
                        <span className="text-[9px] font-mono uppercase tracking-wider opacity-70 group-hover:opacity-100">Shop</span>
                    </button>
                     <button className="flex flex-col items-center justify-center w-full h-full text-gray-400 dark:text-gray-500 hover:text-white transition-colors group">
                        <span className="material-icons-outlined text-2xl mb-0.5 group-hover:scale-110 transition-transform">bookmark_border</span>
                        <span className="text-[9px] font-mono uppercase tracking-wider opacity-70 group-hover:opacity-100">Saved</span>
                    </button>
                    <button className="flex flex-col items-center justify-center w-full h-full text-gray-400 dark:text-gray-500 hover:text-white transition-colors group">
                        <span className="material-icons-outlined text-2xl mb-0.5 group-hover:scale-110 transition-transform">person_outline</span>
                        <span className="text-[9px] font-mono uppercase tracking-wider opacity-70 group-hover:opacity-100">Profile</span>
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default HomePage;
