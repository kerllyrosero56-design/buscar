import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CardProducto from "../components/CardProducto";
import SeccionCategoria from "../components/seccionCategoria";

function Productos() {
    const navigate = useNavigate();

    const [nombre, setNombre] = useState("");
    const [edad, setEdad] = useState("");
    const [ciudad, setCiudad] = useState("");

    const [listaProductos, setListaProductos] = useState("");
    const [cantidadTotal, setCantidadTotal] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [subtotalLicores, setSubtotalLicores] = useState(0);

    const edadNum = Number(edad);
    let porcentajeIva = 0.15;

    if (edad !== "" && edadNum < 18) {
        porcentajeIva = 0; 
    } else if (edad !== "" && edadNum > 65) {
        porcentajeIva = 0.08; 
    }

    let iva = subtotal * porcentajeIva;
    let ice = edad !== "" && edadNum < 18 ? 0 : subtotalLicores * 0.15;
    let total = subtotal + iva + ice;

    function agregarProducto(nombreProducto, precioProducto, esLicor) {
        if (esLicor && edad !== "" && edadNum < 18) {
            alert("No se puede vender licor a menores de 18 años.");
            return;
        }

        setCantidadTotal(cantidadTotal + 1);
        setSubtotal(subtotal + precioProducto);

        if (esLicor) {
            setSubtotalLicores(subtotalLicores + precioProducto);
        }

        if (listaProductos === "") {
            setListaProductos(nombreProducto);
        } else {
            setListaProductos(listaProductos + ", " + nombreProducto);
        }
    }

    function comprarTodo() {
        if (subtotalLicores > 0 && edad !== "" && edadNum < 18) {
            alert("No se puede vender licor a un menor de edad.");
            return;
        }

        navigate("/compras", {
            state: {
                nombre,
                edad,
                ciudad,
                listaProductos,
                cantidadTotal,
                subtotal,
                subtotalLicores
            }
        });
    }

    return (
        <div className="p-3" style={{ paddingRight: "370px" }}>
            <SeccionCategoria titulo="Snacks">
                <CardProducto nombre="Papas" precio={2} stock={20} edadCliente={edad} onAgregar={agregarProducto} />
                <CardProducto nombre="Galletas" precio={1.5} stock={8} edadCliente={edad} onAgregar={agregarProducto} />
                <CardProducto nombre="TAKIS" precio={3} stock={2} edadCliente={edad} onAgregar={agregarProducto} />
            </SeccionCategoria>

            <SeccionCategoria titulo="Licores">
                <CardProducto nombre="Pilsener" precio={5} stock={15} esLicor={true} edadCliente={edad} onAgregar={agregarProducto} />
                <CardProducto nombre="Club" precio={5.5} stock={7} esLicor={true} edadCliente={edad} onAgregar={agregarProducto} />
                <CardProducto nombre="Corona" precio={6} stock={3} esLicor={true} edadCliente={edad} onAgregar={agregarProducto} />
            </SeccionCategoria>

            <div
                className="card shadow p-3 bg-white"
                style={{
                    position: "fixed",
                    right: "20px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "330px",
                    maxHeight: "90vh",
                    overflowY: "auto",
                    zIndex: 1000
                }}
            >
                <h5 className="card-title mb-2">Datos del cliente</h5>

                <label className="form-label mb-1">Nombre del cliente:</label>
                <input
                    type="text"
                    className="form-control form-control-sm mb-2"
                    placeholder="Ingrese el nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />

                <label className="form-label mb-1">Edad:</label>
                <input
                    type="number"
                    className="form-control form-control-sm mb-2"
                    placeholder="Edad"
                    min="0"
                    value={edad}
                    onChange={(e) => setEdad(e.target.value)}
                />

                <label className="form-label mb-1">Ciudad:</label>
                <input
                    type="text"
                    className="form-control form-control-sm mb-2"
                    placeholder="Ciudad"
                    value={ciudad}
                    onChange={(e) => setCiudad(e.target.value)}
                />

                <hr className="my-2" />

                <h6>Resumen de productos</h6>
                <table className="table table-bordered table-sm mb-2">
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
                            <td>{listaProductos || "Ninguno"}</td>
                        </tr>
                        <tr>
                            <th>Cantidad</th>
                            <td>{cantidadTotal}</td>
                        </tr>
                        <tr>
                            <th>Subtotal</th>
                            <td>${subtotal.toFixed(2)}</td>
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

                <button
                    className="btn btn-danger w-100 mt-1"
                    onClick={comprarTodo}
                    disabled={cantidadTotal === 0 || (subtotalLicores > 0 && edad !== "" && edadNum < 18)}
                >
                    Comprar
                </button>
            </div>
        </div>
    );
}

export default Productos;