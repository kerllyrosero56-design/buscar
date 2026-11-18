import { useState } from "react";

function CardProducto({ nombre, precio, stock, imagen, esLicor = false, edadCliente = "", onAgregar }) {
    const [contador, setContador] = useState(0);

    const edadNum = Number(edadCliente);
    const esMenor = edadCliente !== "" && edadNum < 18;
    const bloqueadoPorEdad = esLicor && esMenor;

    const iva = precio * 0.15;
    const total = precio + iva;

    let estadoTexto = "";
    let estadoClase = "";

    if (stock > 10) {
        estadoTexto = "Disponible";
        estadoClase = "badge bg-success";
    } else if (stock >= 5 && stock <= 10) {
        estadoTexto = "En riesgo";
        estadoClase = "badge bg-warning text-dark";
    } else {
        estadoTexto = "No disponible";
        estadoClase = "badge bg-danger";
    }

    const subtotal = precio * contador;
    const ivaVistas = subtotal * 0.15;
    const totalVistas = subtotal + ivaVistas;

    function mostrarProducto() {
        if (bloqueadoPorEdad) {
            alert("Prohibida la venta de licores a menores de 18 años.");
            return;
        }
        if (contador < stock) {
            setContador(contador + 1);
            if (onAgregar) {
                onAgregar(nombre, precio, esLicor);
            }
        }
    }

    return (
        <div className="card m-2" style={{ width: "18rem" }}>
            {imagen && (
                <img
                    src={imagen}
                    alt={nombre}
                    className="card-img-top p-2"
                    style={{ height: "180px", objectFit: "contain" }}
                />
            )}
            <div className="card-body">
                <h5 className="card-title">{nombre}</h5>
                <p className="card-text mb-1">Precio: ${precio.toFixed(2)}</p>
                <p className="card-text mb-1">IVA: ${iva.toFixed(2)}</p>
                <p className="card-text mb-2">Total: ${total.toFixed(2)}</p>

                <p className="card-text">
                    <span className={estadoClase}>{estadoTexto} ({stock})</span>
                </p>

                {bloqueadoPorEdad && (
                    <p className="text-danger small fw-bold mb-2">
                        Prohibido para menores de 18 años
                    </p>
                )}

                <button
                    className="btn btn-primary mb-2"
                    onClick={mostrarProducto}
                    disabled={contador >= stock || bloqueadoPorEdad}
                >
                    Agregar
                </button>

                <h5>Cantidad: {contador}</h5>
                <p className="mb-0">Total: ${totalVistas.toFixed(2)}</p>
            </div>
        </div>
    );
}

export default CardProducto;