import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Guitar from "./components/Guitar";
import { db } from "./data/db";

function App() {
  const [guitars, setGuitars] = useState([]);

  useEffect(() => {
    setGuitars(db);
  }, []);

  return (
    <>
      <Header />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {guitars.map(guitar => {
            return <Guitar guitar={guitar} key={`guitar-${guitar.id}`} />;
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
