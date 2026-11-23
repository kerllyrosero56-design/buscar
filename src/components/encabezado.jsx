import { Link, NavLink } from 'react-router-dom';

function Encabezado({ titulo }) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">{titulo}</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <NavLink className="nav-link" to="/">Inicio</NavLink>
                <NavLink className="nav-link" to="/productos">Productos</NavLink>
                <NavLink className="nav-link" to="/contactos">Contactos</NavLink>
                <NavLink className="nav-link" to="/compras">Compras</NavLink>
                <NavLink className="nav-link" to="/catalogo">Catalogo</NavLink>
                <NavLink className="nav-link" to="/Ofertas">Ofertas</NavLink>
                <NavLink className="nav-link" to="/buscar">Buscar</NavLink>
              </div>
            </div>
          </div>
        </nav>
    );
}

export default Encabezado;