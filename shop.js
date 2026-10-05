const grid = document.querySelector('[data-product-grid]');
const search = document.querySelector('[data-product-search]');
const products = [...(window.NEWRY_PRODUCTS || [])].sort((a, b) => {
  const priceA = Number.isFinite(a.price) ? a.price : Infinity;
  const priceB = Number.isFinite(b.price) ? b.price : Infinity;

  return priceA - priceB || a.name.localeCompare(b.name);
});
function priceLabel(item) {
  return Number.isFinite(item.price)
    ? `£${item.price.toFixed(2)}`
    : 'Price in store';
}

function render(items) {
  grid.innerHTML = items.map(item => `
    <article class="product-card">
      <div class="product-visual has-product-image">
        <span>In stock</span>

        <img
          src="${item.image}"
          alt="${item.name}"
          loading="lazy"
        >
      </div>

      <div class="product-body">
       

        <h2>${item.name}</h2>

        ${item.description
          ? `<p class="product-description">${item.description}</p>`
          : ''
        }

        <strong>${priceLabel(item)}</strong>

        <a href="tel:+447596229325">
  Check availability
</a>
${item.video ? `
  <button
    class="product-video-button"
    type="button"
    data-product-video="${item.video}"
    data-product-name="${item.name}"
  >
    ▶ Watch video
  </button>
` : ''}
<button
  class="draft-add-button"
  type="button"
  data-draft-add="${item.id}"
>
  Add to draft order
</button>
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
    `${item.name} ${item.id} ${item.brand || ''} ${item.detail || ''}`
      .toLowerCase()
      .includes(query)
  ));
});

render(products);
const productCount = document.getElementById('product-count');

if (productCount) {
  productCount.textContent = products.length;
}
const videoModal = document.createElement('div');

videoModal.className = 'product-video-modal';
videoModal.hidden = true;

videoModal.innerHTML = `
  <div class="product-video-backdrop" data-video-close></div>

  <section
    class="product-video-panel"
    role="dialog"
    aria-modal="true"
    aria-label="Product video"
  >
    <button
      class="product-video-close"
      type="button"
      data-video-close
      aria-label="Close video"
    >
      ×
    </button>

    <p>Watch it in action</p>
    <h2 data-video-title></h2>

    <div class="product-video-frame">
      <iframe
        data-video-frame
        title="Firework demonstration video"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>

    <small>
      Product demonstration video. Always follow the instructions
      and safety distance printed on the product.
    </small>
  </section>
`;

document.body.append(videoModal);

function closeProductVideo() {
  videoModal.hidden = true;
  videoModal.querySelector('[data-video-frame]').src = '';
  document.body.classList.remove('video-modal-open');
}

document.addEventListener('click', event => {
  const videoButton = event.target.closest('[data-product-video]');

  if (videoButton) {
    const frame = videoModal.querySelector('[data-video-frame]');
    const title = videoModal.querySelector('[data-video-title]');

    frame.src = `${videoButton.dataset.productVideo}?autoplay=1&rel=0`;
    title.textContent = videoButton.dataset.productName;

    videoModal.hidden = false;
    document.body.classList.add('video-modal-open');
  }

  if (event.target.closest('[data-video-close]')) {
    closeProductVideo();
  }
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !videoModal.hidden) {
    closeProductVideo();
  }
});
