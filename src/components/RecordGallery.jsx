import RecordCard from './RecordCard';

export default function RecordGallery({ records, loading, error, onDelete, onEdit }) {
  if (loading) {
    return (
      <div className="col-12 text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2 text-muted">Cargando récords...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-12">
        <div className="alert alert-danger">Error cargando récords: {error}</div>
      </div>
    );
  }

  if (!records.length) {
    return (
      <div className="col-12">
        <div className="alert alert-info">No hay récords registrados aún.</div>
      </div>
    );
  }

  return (
    <>
      {records.map((record) => (
        <RecordCard
          key={record._id}
          record={record}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </>
  );
}
