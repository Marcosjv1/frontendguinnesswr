import { useState, useEffect } from 'react';

export default function EditModal({ record, onSave, onClose }) {
  const [form, setForm] = useState({
    titulo: '',
    descripcion: '',
    poseedor: '',
    anio: '',
    imagenUrl: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (record) {
      setForm({
        titulo: record.titulo,
        descripcion: record.descripcion,
        poseedor: record.poseedor,
        anio: record.anio,
        imagenUrl: record.imagenUrl,
      });
      setError('');
    }
  }, [record]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await onSave(record._id, { ...form, anio: Number(form.anio) });
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!record) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="modal-backdrop fade show"
        style={{ zIndex: 1040 }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="modal fade show d-block"
        style={{ zIndex: 1050 }}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">✏️ Editar récord</h5>
              <button type="button" className="btn-close" onClick={onClose} />
            </div>
            <div className="modal-body">
              {error && <div className="alert alert-danger">{error}</div>}
              <form id="editForm" onSubmit={handleSubmit} className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Título</label>
                  <input
                    type="text"
                    name="titulo"
                    className="form-control"
                    value={form.titulo}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Poseedor</label>
                  <input
                    type="text"
                    name="poseedor"
                    className="form-control"
                    value={form.poseedor}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Descripción</label>
                  <textarea
                    name="descripcion"
                    className="form-control"
                    rows="3"
                    value={form.descripcion}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Año</label>
                  <input
                    type="number"
                    name="anio"
                    className="form-control"
                    value={form.anio}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-8">
                  <label className="form-label">URL de imagen</label>
                  <input
                    type="url"
                    name="imagenUrl"
                    className="form-control"
                    value={form.imagenUrl}
                    onChange={handleChange}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancelar
              </button>
              <button
                type="submit"
                form="editForm"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Guardando...' : 'Guardar cambios'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
