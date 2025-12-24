
import React, { useState, useCallback } from 'react';
import { View, Product, CartItem } from './types';
import { PRODUCTS } from './constants';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';

const App: React.FC = () => {
    const [currentView, setCurrentView] = useState<View>(View.HOME);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [cart, setCart] = useState<CartItem[]>([]);

    const navigateTo = useCallback((view: View) => {
        window.scrollTo(0, 0);
        setCurrentView(view);
    }, []);

    const handleSelectProduct = useCallback((product: Product) => {
        setSelectedProduct(product);
        navigateTo(View.PRODUCT_DETAIL);
    }, [navigateTo]);

    const addToCart = useCallback((product: Product, size: string, color: string) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id && item.selectedSize === size && item.selectedColor === color);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id && item.selectedSize === size && item.selectedColor === color
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity: 1, selectedSize: size, selectedColor: color }];
        });
    }, []);

    const updateCartQuantity = useCallback((productId: number, selectedSize: string, delta: number) => {
        setCart(prevCart => {
            const newCart = prevCart.map(item => {
                if (item.id === productId && item.selectedSize === selectedSize) {
                    const newQuantity = item.quantity + delta;
                    return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
                }
                return item;
            }).filter(Boolean) as CartItem[];
            return newCart;
        });
    }, []);

    const removeFromCart = useCallback((productId: number, selectedSize: string) => {
        setCart(prevCart => prevCart.filter(item => !(item.id === productId && item.selectedSize === selectedSize)));
    }, []);


    const renderView = () => {
        switch (currentView) {
            case View.PRODUCT_DETAIL:
                if (selectedProduct) {
                    return <ProductDetailPage product={selectedProduct} onAddToCart={addToCart} onNavigate={navigateTo} cartItemsCount={cart.reduce((acc, item) => acc + item.quantity, 0)} />;
                }
                return <HomePage products={PRODUCTS} onSelectProduct={handleSelectProduct} onNavigate={navigateTo} cart={cart} />;
            case View.CART:
                return <CartPage cart={cart} onUpdateQuantity={updateCartQuantity} onRemoveItem={removeFromCart} onNavigate={navigateTo} />;
            case View.CHECKOUT:
                return <CheckoutPage cart={cart} onNavigate={navigateTo} />;
            case View.HOME:
            default:
                return <HomePage products={PRODUCTS} onSelectProduct={handleSelectProduct} onNavigate={navigateTo} cart={cart} />;
        }
    };

    return (
        <div className="min-h-screen">
            {renderView()}
        </div>
    );
};

export default App;
