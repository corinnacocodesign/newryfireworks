const grid = document.querySelector('[data-product-grid]');
const search = document.querySelector('[data-product-search]');
const products = window.NEWRY_PRODUCTS || [];

function priceLabel(item) {
  return Number.isFinite(item.price)
    ? `€${item.price.toFixed(2)}`
    : 'Price in store';
}

function render(items) {
  grid.innerHTML = items.map(item => `
    <article class="product-card">
      <div class="product-visual has-product-image">
        <span>In stock</span>
        <img src="${item.image}" alt="${item.name}" loading="lazy">
      </div>

      <div class="product-body">
        <p class="product-detail">
          Cosmic Fireworks · Product ${item.id}
        </p>

        <h2>${item.name}</h2>
        <strong>${priceLabel(item)}</strong>
        <a href="tel:+447596229325">Check availability</a>
      </div>
    </article>
  `).join('');

  if (!items.length) {
    grid.innerHTML = `
      <p class="empty-products">
        No products match your search. Try another name or call the shop.
      </p>
    `;
  }
}

search.addEventListener('input', event => {
  const query = event.target.value.trim().toLowerCase();

  render(products.filter(item =>
    `${item.name} ${item.id}`.toLowerCase().includes(query)
  ));
});

render(products);
