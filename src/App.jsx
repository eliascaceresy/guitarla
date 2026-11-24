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

  return (
    <>
      <Header cart={cart} />
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
