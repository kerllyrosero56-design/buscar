import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function DetalleProducto({ agregar }) {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);

    useEffect(() => {
        fetch("https://dummyjson.com/products/" + id)
            .then((respuesta) => respuesta.json())
            .then((datos) => setProducto(datos));
    }, [id]);

    if (producto === null) {
        return <p className="alert alert-info">Cargando producto...</p>;
    }

    return (
        <div className="card shadow-sm">
            <div className="row g-0">
                <div className="col-md-4">
                    <img
                        src={producto.thumbnail}
                        alt={producto.title}
                        className="img-fluid p-3"
                    />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <span className="badge bg-secondary mb-2 me-2">
                            {producto.category}
                        </span>
                        {producto.stock < 10 && (
                            <span className="badge bg-warning text-dark mb-2">
                                ¡Últimas unidades!
                            </span>
                        )}
                        <h2>{producto.title}</h2>
                        <p>{producto.description}</p>
                        <p className="fs-4 fw-bold">${producto.price.toFixed(2)}</p>
                        <p>Stock: {producto.stock} unidades</p>
                        <button
                            className="btn btn-primary me-2"
                            onClick={() => agregar(producto.title, producto.price)}
                        >
                            Agregar
                        </button>
                        <Link to="/buscar" className="btn btn-outline-secondary">
                            Volver
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetalleProducto;