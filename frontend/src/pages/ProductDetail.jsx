import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Product3DViewer from '../components/Product3DViewer.jsx';
import { getProductById } from '../services/api.js';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const response = await getProductById(id);
        setProduct(response.data);
        setError('');
      } catch (err) {
        setError(err.response?.data?.message || 'Unable to load product');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return <p className="status-text">Loading product details...</p>;
  }

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  return (
    <section className="detail-layout">
      <div className="detail-copy">
        <Link className="back-link" to="/">
          <ArrowLeft size={18} aria-hidden="true" />
          Back to Products
        </Link>
        <p className="eyebrow">{product.category}</p>
        <h1>{product.name}</h1>
        <p className="price-line">Rs. {Number(product.price).toLocaleString('en-IN')}</p>
        <p className="description">{product.description}</p>
      </div>

      <div className="viewer-panel">
        <Product3DViewer />
      </div>
    </section>
  );
}

export default ProductDetail;
