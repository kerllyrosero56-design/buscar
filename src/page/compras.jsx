import { useState } from "react";
import { useLocation, Link } from "react-router-dom";

function Compras() {
    const location = useLocation();
    const datos = location.state || {};

    const [nombre, setNombre] = useState(datos.nombre || "");
    const [edad, setEdad] = useState(datos.edad || "");
    const [ciudad, setCiudad] = useState(datos.ciudad || "");
    const [cantidad, setCantidad] = useState(datos.cantidadTotal || 1);

    const esCompraLista = Boolean(datos.listaProductos);
    const productosMostrar = datos.listaProductos || datos.nombre || "Ninguno";

    const subtotalFinal = esCompraLista ? datos.subtotal : (datos.precio || 0) * cantidad;
    const subtotalLicoresFinal = esCompraLista
        ? (datos.subtotalLicores || 0)
        : (datos.esLicor ? (datos.precio || 0) * cantidad : 0);

    const edadNum = Number(edad);
    const esMenor = edad !== "" && edadNum < 18;
    const tieneLicores = subtotalLicoresFinal > 0;
    const ventaProhibida = esMenor && tieneLicores;

    let porcentajeIva = 0.15;
    if (esMenor) {
        porcentajeIva = 0;
    } else if (edad !== "" && edadNum > 65) {
        porcentajeIva = 0.08;
    }

    let iva = subtotalFinal * porcentajeIva;
    let ice = ventaProhibida ? 0 : subtotalLicoresFinal * 0.15;
    let total = subtotalFinal + iva + ice;

    function confirmarCompra(e) {
        e.preventDefault();
        if (ventaProhibida) {
            alert("Prohibida la venta de licores a menores de 18 años.");
            return;
        }
        alert(`Compra confirmada por ${nombre} - Total: $${total.toFixed(2)}`);
    }

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Compras</h2>
                <Link to="/productos" className="btn btn-outline-secondary btn-sm">
                    Volver a Productos
                </Link>
            </div>

            <div className="row g-4">
                <div className="col-md-6">
                    <form className="card shadow-sm p-3" onSubmit={confirmarCompra}>
                        <h5 className="card-title mb-3">Datos del cliente</h5>

                        <div className="mb-2">
                            <label className="form-label mb-1">Nombre del cliente:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />
                        </div>

                        <div className="row g-2 mb-3">
                            <div className="col-4">
                                <label className="form-label mb-1">Edad:</label>
                                <input
                                    type="number"
                                    min="0"
                                    className="form-control"
                                    value={edad}
                                    onChange={(e) => setEdad(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="col-8">
                                <label className="form-label mb-1">Ciudad:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={ciudad}
                                    onChange={(e) => setCiudad(e.target.value)}
                                />
                            </div>
                        </div>

                        {!esCompraLista && datos.nombre && (
                            <div className="mb-3">
                                <label className="form-label mb-1">Cantidad:</label>
                                <input
                                    type="number"
                                    min="1"
                                    max={datos.stock}
                                    className="form-control"
                                    value={cantidad}
                                    onChange={(e) => setCantidad(Number(e.target.value))}
                                />
                            </div>
                        )}

                        {ventaProhibida && (
                            <div className="alert alert-danger py-2 small">
                                No se puede vender licor a clientes menores de 18 años.
                            </div>
                        )}

                        <button
                            type="submit"
                            className="btn btn-danger w-100"
                            disabled={productosMostrar === "Ninguno" || ventaProhibida}
                        >
                            Confirmar Compra
                        </button>
                    </form>
                </div>

                <div className="col-md-6">
                    <div className="card shadow-sm p-3">
                        <h5 className="card-title mb-3">Factura de Compra</h5>
                        <table className="table table-bordered mb-0">
                            <tbody>
                                <tr>
                                    <th>Cliente</th>
                                    <td>{nombre || "-"}</td>
                                </tr>
                                <tr>
                                    <th>Edad</th>
                                    <td>{edad || "-"}</td>
                                </tr>
                                <tr>
                                    <th>Ciudad</th>
                                    <td>{ciudad || "-"}</td>
                                </tr>
                                <tr>
                                    <th>Productos</th>
                                    <td>{productosMostrar}</td>
                                </tr>
                                <tr>
                                    <th>Cantidad</th>
                                    <td>{productosMostrar === "Ninguno" ? 0 : cantidad}</td>
                                </tr>
                                <tr>
                                    <th>Subtotal</th>
                                    <td>${subtotalFinal.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <th>IVA ({porcentajeIva * 100}%)</th>
                                    <td>${iva.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <th>ICE Licores (15%)</th>
                                    <td>${ice.toFixed(2)}</td>
                                </tr>
                                <tr className="table-light">
                                    <th>Total</th>
                                    <td><strong>${total.toFixed(2)}</strong></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Compras;