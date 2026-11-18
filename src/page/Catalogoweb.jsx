import { useEffect, useState } from "react";
import CardProducto from "../components/CardProducto";

function Catalogoweb() {
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        fetch("https://dummyjson.com/products?limit=12")
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error("Error en la respuesta del servidor");
                }
                return respuesta.json();
            })
            .then((datos) => {
                setProductos(datos.products);
                setCargando(false);
            })
            .catch(() => {
                setError("No se cargan los datos");
                setCargando(false);
            });
    }, []);

    if (cargando) {
        return <p className="p-3">Cargando...</p>;
    }

    if (error) {
        return <p className="p-3 text-danger">{error}</p>;
    }

    return (
        <div className="container py-3">
            <h3 className="mb-3">Catálogo Web</h3>
            <div className="d-flex flex-wrap">
                {productos.map((prod) => (
                    <CardProducto
                        key={prod.id}
                        nombre={prod.title}
                        precio={prod.price}
                        stock={prod.stock}
                        imagen={prod.thumbnail}
                    />
                ))}
            </div>
        </div>
    );
}

export default Catalogoweb;