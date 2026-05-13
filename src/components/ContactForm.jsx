import { useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const emptyForm = {
  nombre: '',
  email: '',
  asunto: '',
  mensaje: '',
};

export default function ContactForm() {
  const [form, setForm] = useState(emptyForm);
  const [submitted, setSubmitted] = useState(false);
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
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error al enviar el mensaje.');
      }

      setSubmitted(true);
      setForm(emptyForm);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacto" className="card shadow-sm p-4 mb-5">
      <h2 className="mb-1">Contacto</h2>
      <p className="text-muted mb-3">
        ¿Tienes alguna pregunta o sugerencia? Escríbenos.
      </p>

      {submitted && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          ✅ ¡Mensaje enviado correctamente! Te responderemos pronto.
          <button
            type="button"
            className="btn-close"
            onClick={() => setSubmitted(false)}
          />
        </div>
      )}

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          ❌ {error}
          <button
            type="button"
            className="btn-close"
            onClick={() => setError('')}
          />
        </div>
      )}

      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label fw-semibold">Nombre</label>
          <input
            type="text"
            name="nombre"
            className="form-control"
            placeholder="Tu nombre completo"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">Correo electrónico</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="correo@ejemplo.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12">
          <label className="form-label fw-semibold">Asunto</label>
          <input
            type="text"
            name="asunto"
            className="form-control"
            placeholder="¿De qué trata tu mensaje?"
            value={form.asunto}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12">
          <label className="form-label fw-semibold">Mensaje</label>
          <textarea
            name="mensaje"
            className="form-control"
            rows="4"
            placeholder="Escribe tu mensaje aquí..."
            value={form.mensaje}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12">
          <button
            type="submit"
            className="btn btn-dark px-4"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" />
                Enviando...
              </>
            ) : (
              '📨 Enviar mensaje'
            )}
          </button>
        </div>
      </form>
    </section>
  );
}
