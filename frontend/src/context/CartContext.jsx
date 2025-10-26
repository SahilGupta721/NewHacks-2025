import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    // Load from localStorage on initialization
    try {
      const saved = localStorage.getItem('culturacart_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  });

  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const saved = localStorage.getItem('culturacart_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading wishlist from localStorage:', error);
      return [];
    }
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('culturacart_cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cartItems]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('culturacart_wishlist', JSON.stringify(wishlistItems));
    } catch (error) {
      console.error('Error saving wishlist to localStorage:', error);
    }
  }, [wishlistItems]);

  // Cart Functions
  const addToCart = (product, quantity = 1, variant = null) => {
    setCartItems((prev) => {
      const existingItemIndex = prev.findIndex(
        (item) => item.id === product.id && JSON.stringify(item.variant) === JSON.stringify(variant)
      );

      if (existingItemIndex > -1) {
        // Item exists, update quantity
        const updated = [...prev];
        updated[existingItemIndex].quantity += quantity;
        return updated;
      } else {
        // New item
        return [...prev, { ...product, quantity, variant, addedAt: new Date().toISOString() }];
      }
    });
  };

  const removeFromCart = (productId, variant = null) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.id === productId && JSON.stringify(item.variant) === JSON.stringify(variant))
      )
    );
  };

  const updateQuantity = (productId, quantity, variant = null) => {
    if (quantity <= 0) {
      removeFromCart(productId, variant);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId && JSON.stringify(item.variant) === JSON.stringify(variant)
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const isInCart = (productId, variant = null) => {
    return cartItems.some(
      (item) => item.id === productId && JSON.stringify(item.variant) === JSON.stringify(variant)
    );
  };

  // Wishlist Functions
  const addToWishlist = (product) => {
    setWishlistItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev; // Already in wishlist
      }
      return [...prev, { ...product, addedAt: new Date().toISOString() }];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      return false;
    } else {
      addToWishlist(product);
      return true;
    }
  };

  const moveToCart = (productId) => {
    const product = wishlistItems.find((item) => item.id === productId);
    if (product) {
      addToCart(product, 1);
      removeFromWishlist(productId);
    }
  };

  const value = {
    // Cart state and methods
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    isInCart,

    // Wishlist state and methods
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
    moveToCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export default CartContext;
