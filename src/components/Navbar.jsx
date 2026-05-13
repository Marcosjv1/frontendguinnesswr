export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <a className="navbar-brand fw-bold" href="#">Guinness WR</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <a className="nav-link" href="#records">Récords</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#nuevo">Nuevo Récord</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#auth">Cuenta</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
