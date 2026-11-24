import { useEffect, useMemo, useState } from "react";

const useCart = () => {
  const [cart, setCart] = useState(() => {
      const localCart = localStorage.getItem("cart");
      return localCart ? JSON.parse(localCart) : [];
    });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = product => {
    const item = {};
    const itemExists = cart.findIndex(guitar => guitar.id === product.id);

    if (itemExists >= 0) {
      const updatedCart = [...cart];
      updatedCart[itemExists].quantity += 1;
      setCart(updatedCart);
    } else {
      product.quantity = 1;
      setCart([...cart, product]);
    }
  };

  const removeToCart = id => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
  };

  const increaseQuantity = id => {
    const updatedCart = cart.map(item => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      } else {
        return item;
      }
    });

    setCart(updatedCart);
  };

  const decreaseQuantity = id => {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      } else {
        return item;
      }
    });

    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  return {
    cart,
    addToCart,
    removeToCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    cartTotal
  }
}

export default useCart