export default function RecordCard({ record, onDelete, onEdit }) {
  const handleDelete = () => {
    if (window.confirm(`¿Eliminar el récord "${record.titulo}"?`)) {
      onDelete(record._id);
    }
  };

  return (
    <div className="col-md-6 col-lg-4">
      <div className="card h-100 shadow-sm record-card">
        <img
          src={record.imagenUrl}
          className="card-img-top"
          alt={record.titulo}
          style={{ height: '220px', objectFit: 'cover' }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/400x220?text=Sin+imagen';
          }}
        />
        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h5 className="card-title mb-0">{record.titulo}</h5>
            {record.isOficial && (
              <span className="badge bg-warning text-dark ms-2 flex-shrink-0">Oficial</span>
            )}
          </div>
          <p className="card-text text-muted small">{record.descripcion}</p>
          <ul className="list-group list-group-flush mt-auto">
            <li className="list-group-item px-0">
              <strong>Poseedor:</strong> {record.poseedor}
            </li>
            <li className="list-group-item px-0">
              <strong>Año:</strong> {record.anio}
            </li>
          </ul>
          {!record.isOficial && (
            <div className="d-flex gap-2 mt-3">
              <button
                className="btn btn-outline-primary btn-sm flex-fill"
                onClick={() => onEdit(record)}
              >
                ✏️ Editar
              </button>
              <button
                className="btn btn-outline-danger btn-sm flex-fill"
                onClick={handleDelete}
              >
                🗑️ Eliminar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
