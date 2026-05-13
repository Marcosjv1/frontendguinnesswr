import { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RecordGallery from './components/RecordGallery';
import RecordForm from './components/RecordForm';
import EditModal from './components/EditModal';
import AuthForm from './components/AuthForm';
import Footer from './components/Footer';
import { getRecords, createRecord, updateRecord, deleteRecord, checkHealth } from './services/api';

export default function App() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [backendOk, setBackendOk] = useState(null);
  const [editingRecord, setEditingRecord] = useState(null);

  const fetchRecords = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getRecords();
      setRecords(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkHealth()
      .then(() => setBackendOk(true))
      .catch(() => setBackendOk(false));

    fetchRecords();
  }, [fetchRecords]);

  const handleCreate = async (payload) => {
    await createRecord(payload);
    await fetchRecords();
  };

  const handleDelete = async (id) => {
    try {
      await deleteRecord(id);
      await fetchRecords();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
  };

  const handleSave = async (id, payload) => {
    await updateRecord(id, payload);
    await fetchRecords();
  };

  const handleCloseModal = () => {
    setEditingRecord(null);
  };

  return (
    <>
      <Navbar />
      <Hero backendOk={backendOk} />

      <main className="container my-5">
        <section id="records" className="mb-5">
          <h2 className="mb-4">Galería de Récords</h2>
          <div className="row g-4">
            <RecordGallery
              records={records}
              loading={loading}
              error={error}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </div>
        </section>

        <RecordForm onCreated={handleCreate} />

        <AuthForm />
      </main>

      <Footer />

      {editingRecord && (
        <EditModal
          record={editingRecord}
          onSave={handleSave}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
