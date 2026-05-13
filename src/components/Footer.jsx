export default function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-4 text-center text-md-start mb-2 mb-md-0">
            <span className="fw-bold fs-5">Guinness WR</span>
          </div>
          <div className="col-md-4 text-center mb-2 mb-md-0">
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <a href="#records" className="text-white-50 text-decoration-none">Récords</a>
              </li>
              <li className="list-inline-item mx-2 text-white-50">|</li>
              <li className="list-inline-item">
                <a href="#nuevo" className="text-white-50 text-decoration-none">Nuevo Récord</a>
              </li>
              <li className="list-inline-item mx-2 text-white-50">|</li>
              <li className="list-inline-item">
                <a href="#cuenta" className="text-white-50 text-decoration-none">Cuenta</a>
              </li>
            </ul>
          </div>
          <div className="col-md-4 text-center text-md-end">
            <small className="text-white-50">
              © 2026 Guinness World Records. Ordinario Programación para internet.
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
}
