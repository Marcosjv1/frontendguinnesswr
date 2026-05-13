export default function Hero({ backendOk }) {
  return (
    <header
      className="text-white text-center d-flex align-items-center"
      style={{
        minHeight: '45vh',
        background: 'linear-gradient(135deg, #001f54, #034078)',
      }}
    >
      <div className="container">
        <h1 className="display-5 fw-bold">Guinness World Records</h1>
        <p className="lead">Descubre y registra logros extraordinarios en tiempo real</p>
        {backendOk === false && (
          <span className="badge bg-danger fs-6 px-3 py-2">Backend no disponible</span>
        )}
      </div>
    </header>
  );
}
