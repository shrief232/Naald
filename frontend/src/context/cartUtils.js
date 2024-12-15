// Save cart items to localStorage
export const saveCartToLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
  };
  
  // Load cart items from localStorage
  export const loadCartFromLocalStorage = () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  };
  
  // Clear cart items from localStorage
  export const clearCartFromLocalStorage = () => {
    localStorage.removeItem('cart');
  };
  