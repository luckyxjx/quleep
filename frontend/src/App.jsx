import { Box, Plus } from 'lucide-react';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import AddProduct from './pages/AddProduct.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import ProductList from './pages/ProductList.jsx';

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <Link to="/" className="brand">
          <Box size={24} aria-hidden="true" />
          <span>Product Visualizer</span>
        </Link>
        <nav className="nav-links">
          <NavLink to="/" end>
            Products
          </NavLink>
          <NavLink to="/add">
            <Plus size={18} aria-hidden="true" />
            Add Product
          </NavLink>
        </nav>
      </header>

      <main className="page-wrap">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
