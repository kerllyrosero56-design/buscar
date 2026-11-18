function SeccionCategoria({ titulo, children }) {
    return (
        <div className="bg-info p-3 mb-3 rounded">
            <h3 className="badge bg-secondary ">{titulo}</h3>
            <div className="row">
                {children}
            </div>
        </div>
    );
}
export default SeccionCategoria;