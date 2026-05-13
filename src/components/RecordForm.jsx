import { useState } from 'react';

const emptyForm = {
  titulo: '',
  descripcion: '',
  poseedor: '',
  anio: '',
  imagenUrl: '',
};

export default function RecordForm({ onCreated }) {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await onCreated({ ...form, anio: Number(form.anio) });
      setForm(emptyForm);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="nuevo" className="card shadow-sm p-4 mb-5">
      <h2 className="mb-3">Registrar nuevo récord</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} className="row g-3">
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
        <div className="col-12">
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar récord'}
          </button>
        </div>
      </form>
    </section>
  );
}
