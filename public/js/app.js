document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productGrid = document.getElementById('productGrid');

  if (!productGrid) return; // Exit if not on catalog page

  let currentCategory = 'all';
  let searchQuery = '';

  const fetchProducts = async () => {
    try {
      const params = new URLSearchParams();
      if (currentCategory !== 'all') params.append('category', currentCategory);
      if (searchQuery.trim() !== '') params.append('search', searchQuery);

      const response = await fetch(`/api/products?${params.toString()}`);
      const products = await response.json();
      renderProducts(products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const renderProducts = (products) => {
    if (products.length === 0) {
      productGrid.innerHTML = '<p class="no-results">No products matching your criteria.</p>';
      return;
    }

    productGrid.innerHTML = products.map(product => `
      <article class="product-card">
        <a href="/product/${product.id}" class="card-link">
          <div class="image-wrapper">
            <img src="${product.image}" alt="${product.title}" loading="lazy">
          </div>
          <div class="card-content">
            <span class="category-badge">${product.category}</span>
            <h2 class="product-title">${product.title}</h2>
            <div class="card-footer">
              <span class="price">$${product.price.toFixed(2)}</span>
              <span class="rating">★ ${product.rating}</span>
            </div>
          </div>
        </a>
      </article>
    `).join('');
  };

  // Debounced search handling
  let debounceTimer;
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      searchQuery = e.target.value;
      debounceTimer = setTimeout(fetchProducts, 300);
    });
  }

  // Category filter buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentCategory = e.target.getAttribute('data-category');
      fetchProducts();
    });
  });
});