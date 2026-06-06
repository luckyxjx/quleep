import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../services/api.js';

const initialForm = {
  name: '',
  category: '',
  price: '',
  description: ''
};

function AddProduct() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');

    try {
      const response = await createProduct(form);
      navigate(`/products/${response.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to add product');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="page-section narrow">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Inventory</p>
          <h1>Add Product</h1>
        </div>
      </div>

      <form className="product-form" onSubmit={handleSubmit}>
        <label>
          Product Name
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Category
          <input name="category" value={form.category} onChange={handleChange} required />
        </label>
        <label>
          Price
          <input name="price" type="number" min="0" value={form.price} onChange={handleChange} required />
        </label>
        <label>
          Description
          <textarea name="description" rows="5" value={form.description} onChange={handleChange} required />
        </label>

        {error && <p className="error-text">{error}</p>}

        <button className="primary-button" type="submit" disabled={saving}>
          {saving ? 'Saving...' : 'Create Product'}
        </button>
      </form>
    </section>
  );
}

export default AddProduct;
