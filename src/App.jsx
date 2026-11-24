import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Guitar from "./components/Guitar";
import { db } from "./data/db";
import useCart from "./hooks/useCart";

function App() {
  const { cart, addToCart, removeToCart, increaseQuantity, decreaseQuantity, clearCart, cartTotal } = useCart();
  const [guitars, setGuitars] = useState([]);

  useEffect(() => {
    setGuitars(db);
  }, []);

  return (
    <>
      <Header
        cart={cart}
        removeToCart={removeToCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
        cartTotal={cartTotal}
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
