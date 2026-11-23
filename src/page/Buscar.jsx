import { useState } from "react";
import CardProducto from "../components/CardProducto.jsx";
function Buscar({ agregar }) {
    const [texto, setTexto] = useState("");
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [buscado, setBuscado] = useState(false);
    function buscar(e) {
        e.preventDefault();
            if (texto === "") {
            return;
    }
    setCargando(true);
    fetch("https://dummyjson.com/products/search?q=" + texto)
        .then((respuesta) => respuesta.json())
        .then((datos) => {
            setProductos(datos.products);
            setCargando(false);
            setBuscado(true);
        });
    }
    return (
        <div>
            <h2 className="mb-3">Buscar productos</h2>
            <form className="d-flex gap-2 mb-4" onSubmit={buscar}>
            <input
            className="form-control"
            placeholder="Ejemplo: phone, laptop, perfume"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
        />
                <button className="btn btn-primary">Buscar</button>
            </form>
            {cargando ? <p className="alert alert-info">Buscando...</p> : null}
            {buscado && !cargando ? (
            <p className="text-muted">Se encontraron {productos.length} productos para
            "{texto}"</p>
            ) : null}
            <div className="row">
                {productos.map((p) => (
                <CardProducto
                key={p.id}
                id={p.id}
                nombre={p.title}
                categoria={p.category}
                precio={p.price}
                disponible={p.stock > 0}
                stock={p.stock}
                agregar={agregar}
                />
        ))}
        </div>
    </div>
    );
}
export default Buscar;
