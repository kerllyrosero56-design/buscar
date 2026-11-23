import { useState } from "react";

function TarjetaOferta({
    nombre,
    precio,
    stock,
    imagen,
    descuento = 0,
    bloqueadoPorEdad = false,
    onAgregar
}) {
    const [contador, setContador] = useState(0);

    const precioDescuento = precio * (descuento / 100);
    const precioFinal = precio - precioDescuento;
    const iva = precioFinal * 0.15;
    const totalUnitario = precioFinal + iva;
    const totalAcumulado = totalUnitario * contador;

    let estadoTexto = "";
    let estadoClase = "";

    if (stock > 10) {
        estadoTexto = "Disponible";
        estadoClase = "badge bg-success";
    } else if (stock > 0) {
        estadoTexto = "En riesgo";
        estadoClase = "badge bg-warning text-dark";
    } else {
        estadoTexto = "No disponible";
        estadoClase = "badge bg-danger";
    }

    const etiquetaDescuento = descuento >= 10 ? "Gran oferta" : "Oferta";
    const etiquetaClase = descuento >= 10 ? "badge bg-danger" : "badge bg-secondary";

    const ahorroTotal = (precio - precioFinal) * contador;

    function mostrarProducto() {
        if (contador < stock && !bloqueadoPorEdad) {
            setContador((prev) => prev + 1);
            if (onAgregar) {
                onAgregar(nombre, totalUnitario);
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
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title mb-0">{nombre}</h5>
                    {descuento > 0 && (
                        <span className={etiquetaClase}>
                            {etiquetaDescuento} (-{descuento}%)
                        </span>
                    )}
                </div>

                <p className="card-text mb-1">
                    Precio: ${precio.toFixed(2)}
                </p>
                {descuento > 0 && (
                    <p className="card-text text-success mb-1">
                        Con descuento: ${precioFinal.toFixed(2)}
                    </p>
                )}
                <p className="card-text mb-1">IVA (15%): ${iva.toFixed(2)}</p>
                <p className="card-text fw-bold mb-2">
                    Total unitario: ${totalUnitario.toFixed(2)}
                </p>

                <p className="card-text">
                    <span className={estadoClase}>
                        {estadoTexto} ({stock})
                    </span>
                </p>

                {bloqueadoPorEdad && (
                    <p className="text-danger small fw-bold mb-2">
                        Prohibido para menores de 18 años
                    </p>
                )}

                <button
                    className="btn btn-primary mb-3 w-100"
                    onClick={mostrarProducto}
                    disabled={contador >= stock || stock === 0 || bloqueadoPorEdad}
                >
                    Agregar
                </button>

                <div className="border-top pt-2">
                    <h6 className="mb-1">Cantidad agregada: {contador}</h6>
                    <p className="mb-1 fw-bold">
                        Total a pagar: ${totalAcumulado.toFixed(2)}
                    </p>
                    {ahorroTotal > 0 && (
                        <p className="text-success small mb-0">
                            Ahorro total: ${ahorroTotal.toFixed(2)}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TarjetaOferta;