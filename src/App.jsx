import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {useState} from 'react';
import Encabezado from './components/encabezado';
import Pie from './components/pie';
import Inicio from './page/inicio';
import Productos from './page/productos';
import Compras from "./page/compras";
import Catalogoweb from './page/Catalogoweb';
import Ofertas from './page/Ofertas';


function App() {

  const [lista, setLista] = useState([]);

  function agregar(nombre, precio) {
    const producto = { nombre: nombre, precio: precio };  
    setLista([...lista, producto]);
  }
  console.log("lista:", lista);

    return (

      <BrowserRouter>
        <main className='container bg bg-light'>
          <section>
            <Encabezado titulo="Puce ibarra" />
          </section>

          <section className="my-4">
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/productos" element={<Productos agregar={agregar} />} />
              <Route path="/contactos" element={<h2>Contactos</h2>} />
              <Route path="/compras" element={<Compras />} />
              <Route path="/catalogo" element={<Catalogoweb />} />
              <Route path="/Ofertas" element={<Ofertas/>} />
            </Routes>
          </section>

          <section>
            <Pie titulo="Puce ibarra" />
          </section>
        </main>
      </BrowserRouter>
    );
}
export default App;