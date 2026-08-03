const grid = document.querySelector('[data-product-grid]');
const search = document.querySelector('[data-product-search]');
const products = window.NEWRY_PRODUCTS || [];
function render(items) {
  grid.innerHTML = items.map(item => `<article class="product-card"><div class="product-visual"><span>${item.badge || 'Retail range'}</span><i aria-hidden="true">✦</i></div><div class="product-body"><p class="product-detail">${item.detail}</p><h2>${item.name}</h2><strong>£${item.price.toFixed(2)}</strong><a href="tel:+447596229325">Check availability</a></div></article>`).join('');
}
search.addEventListener('input', event => { const query = event.target.value.toLowerCase(); render(products.filter(item => `${item.name} ${item.detail}`.toLowerCase().includes(query))); });
render(products);
