import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Guitar from "./components/Guitar";
import { db } from "./data/db";

function App() {
  const [guitars, setGuitars] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setGuitars(db);
  }, []);

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

  return (
    <>
      <Header
        cart={cart}
        removeToCart={removeToCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {guitars.map(guitar => {
            return <Guitar guitar={guitar} key={`guitar-${guitar.id}`} addToCart={addToCart} />;
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
