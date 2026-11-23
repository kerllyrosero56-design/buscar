import { useState } from "react";
import { Link } from "react-router-dom";

function Compras({ lista = [], limpiarLista }) {
    const [nombreCliente, setNombreCliente] = useState("");
    const [cedula, setCedula] = useState("");
    const [correo, setCorreo] = useState("");
    const [direccion, setDireccion] = useState("");
    const [factura, setFactura] = useState(null);

    const subtotal = lista.reduce((acum, item) => acum + Number(item.precio), 0);
    const iva = subtotal * 0.15;
    const total = subtotal + iva;

    function limpiarTodo() {
        setNombreCliente("");
        setCedula("");
        setCorreo("");
        setDireccion("");
        if (limpiarLista) {
            limpiarLista();
        }
    }

    function generarFactura(e) {
        e.preventDefault();
        if (lista.length === 0) {
            alert("Agrega al menos un producto antes de comprar.");
            return;
        }
        if (nombreCliente.trim() === "" || cedula.trim() === "") {
            alert("Por favor ingresa al menos el nombre y la cédula/RUC del cliente.");
            return;
        }

        setFactura({
            cliente: nombreCliente,
            cedula: cedula,
            correo: correo,
            direccion: direccion,
            productos: [...lista],
            subtotal: subtotal,
            iva: iva,
            total: total,
            fecha: new Date().toLocaleDateString()
        });

        if (limpiarLista) {
            limpiarLista();
        }
    }

    function nuevaCompra() {
        setFactura(null);
        limpiarTodo();
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="mb-0">Lista de Compras</h2>
                <Link to="/buscar" className="btn btn-outline-primary">
                    + Agregar productos
                </Link>
            </div>

            {!factura ? (
                <div className="card p-3 mb-4 shadow-sm">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="mb-0">Datos del Cliente</h5>
                        <button
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                            onClick={limpiarTodo}
                        >
                            Limpiar todo
                        </button>
                    </div>
                    <form onSubmit={generarFactura}>
                        <div className="row g-3 mb-3">
                            <div className="col-md-6">
                                <label className="form-label">Nombre completo *</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Ej: Kerly Rosero"
                                    value={nombreCliente}
                                    onChange={(e) => setNombreCliente(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Cédula / RUC *</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Ej: 1001234567"
                                    value={cedula}
                                    onChange={(e) => setCedula(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Correo electrónico</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="cliente@correo.com"
                                    value={correo}
                                    onChange={(e) => setCorreo(e.target.value)}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Dirección</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Ibarra, Ecuador"
                                    value={direccion}
                                    onChange={(e) => setDireccion(e.target.value)}
                                />
                            </div>
                        </div>

                        {lista.length === 0 ? (
                            <p className="alert alert-warning mb-3">
                                No hay productos agregados en el carrito.
                            </p>
                        ) : (
                            <table className="table table-bordered bg-white mb-3">
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Precio</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lista.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.nombre}</td>
                                            <td>${Number(item.precio).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}

                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <p className="mb-1">Subtotal: ${subtotal.toFixed(2)}</p>
                                <p className="mb-1">IVA (15%): ${iva.toFixed(2)}</p>
                                <h4 className="mb-0">Total: ${total.toFixed(2)}</h4>
                            </div>
                            <div className="d-flex gap-2">
                                <button
                                    type="button"
                                    className="btn btn-outline-danger"
                                    onClick={limpiarTodo}
                                >
                                    Limpiar
                                </button>
                                <Link to="/buscar" className="btn btn-secondary">
                                    Agregar productos
                                </Link>
                                <button
                                    type="submit"
                                    className="btn btn-success"
                                    disabled={lista.length === 0}
                                >
                                    Comprar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="card p-4 shadow-sm border-success">
                    <div className="d-flex justify-content-between align-items-start border-bottom pb-3 mb-3">
                        <div>
                            <h3 className="text-success mb-1">FACTURA DE VENTA</h3>
                            <p className="text-muted mb-0">Tienda PUCE Ibarra</p>
                        </div>
                        <div className="text-end">
                            <p className="mb-0 fw-bold">Fecha: {factura.fecha}</p>
                            <p className="mb-0 text-muted">N° 001-001-000124</p>
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col-md-6">
                            <p className="mb-1"><strong>Cliente:</strong> {factura.cliente}</p>
                            <p className="mb-1"><strong>Cédula / RUC:</strong> {factura.cedula}</p>
                        </div>
                        <div className="col-md-6">
                            <p className="mb-1"><strong>Correo:</strong> {factura.correo || "No especificado"}</p>
                            <p className="mb-1"><strong>Dirección:</strong> {factura.direccion || "Ibarra"}</p>
                        </div>
                    </div>

                    <table className="table table-striped table-bordered mb-4">
                        <thead className="table-dark">
                            <tr>
                                <th>#</th>
                                <th>Detalle del Producto</th>
                                <th className="text-end">Valor Unitario</th>
                            </tr>
                        </thead>
                        <tbody>
                            {factura.productos.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.nombre}</td>
                                    <td className="text-end">${Number(item.precio).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="row justify-content-end mb-4">
                        <div className="col-md-4">
                            <table className="table table-sm table-bordered mb-0">
                                <tbody>
                                    <tr>
                                        <th>Subtotal</th>
                                        <td className="text-end">${factura.subtotal.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <th>IVA (15%)</th>
                                        <td className="text-end">${factura.iva.toFixed(2)}</td>
                                    </tr>
                                    <tr className="table-success">
                                        <th>Total a Pagar</th>
                                        <td className="text-end fw-bold">${factura.total.toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="d-flex justify-content-end gap-2">
                        <button
                            type="button"
                            className="btn btn-outline-dark"
                            onClick={() => window.print()}
                        >
                            Imprimir Factura
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={nuevaCompra}
                        >
                            Nueva Compra
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Compras;