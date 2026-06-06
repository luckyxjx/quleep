import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/api.js';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      loadProducts(search);
    }, 250);

    return () => clearTimeout(timer);
  }, [search]);

  const loadProducts = async (searchTerm) => {
    try {
      setLoading(true);
      const response = await getProducts(searchTerm);
      setProducts(response.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load products');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page-section">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1>Products</h1>
        </div>
        <Link className="primary-button" to="/add">
          Add Product
        </Link>
      </div>

      <div className="search-row">
        <Search size={20} aria-hidden="true" />
        <input
          type="search"
          placeholder="Search products by name"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      {error && <p className="error-text">{error}</p>}

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4">Loading products...</td>
              </tr>
            ) : products.length ? (
              products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>Rs. {Number(product.price).toLocaleString('en-IN')}</td>
                  <td>
                    <Link className="secondary-button" to={`/products/${product._id}`}>
                      View Details
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No products found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ProductList;
