(() => {
  const STORAGE_KEY = 'newry-fireworks-draft-order';
  const WHATSAPP_NUMBER = '447596229325';
  const products = window.NEWRY_PRODUCTS || [];

  const escapeHTML = value => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const money = value => `£${Number(value).toFixed(2)}`;

  function loadCart() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
      return {};
    }
  }

  let cart = loadCart();

  function saveCart() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    renderCart();
  }

  function productById(id) {
    return products.find(product => product.id === id);
  }

  function cartItems() {
    return Object.entries(cart)
      .map(([id, quantity]) => ({
        product: productById(id),
        quantity
      }))
      .filter(item => item.product && item.quantity > 0);
  }

  function totals() {
    return cartItems().reduce((result, item) => {
      result.quantity += item.quantity;
      result.price += item.product.price * item.quantity;
      return result;
    }, { quantity: 0, price: 0 });
  }

  const shell = document.createElement('div');
  shell.className = 'draft-order-shell';
  shell.innerHTML = `
    <button class="draft-order-toggle" type="button" data-draft-open>
      <span>Draft order</span>
      <b data-draft-count>0</b>
    </button>

    <div class="draft-order-overlay" data-draft-overlay hidden></div>

    <aside class="draft-order-panel" data-draft-panel aria-hidden="true">
      <div class="draft-order-heading">
        <div>
          <p>Newry Fireworks</p>
          <h2>Your draft order</h2>
        </div>
        <button type="button" data-draft-close aria-label="Close">×</button>
      </div>

      <div class="draft-order-items" data-draft-items></div>
      <div class="draft-order-footer" data-draft-footer></div>
    </aside>

    <section class="draft-summary" data-draft-summary hidden></section>
  `;

  document.body.append(shell);

  const panel = shell.querySelector('[data-draft-panel]');
  const overlay = shell.querySelector('[data-draft-overlay]');
  const itemsElement = shell.querySelector('[data-draft-items]');
  const footerElement = shell.querySelector('[data-draft-footer]');
  const countElement = shell.querySelector('[data-draft-count]');
  const summaryElement = shell.querySelector('[data-draft-summary]');

  function openCart() {
    panel.classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');
    overlay.hidden = false;
    document.body.classList.add('draft-order-open');
  }

  function closeCart() {
    panel.classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');
    overlay.hidden = true;
    document.body.classList.remove('draft-order-open');
  }

  function renderCart() {
    const items = cartItems();
    const total = totals();

    countElement.textContent = total.quantity;

    if (!items.length) {
      itemsElement.innerHTML = `
        <div class="draft-order-empty">
          <h3>Your draft is empty</h3>
          <p>Add products from the shop to start building your order.</p>
        </div>
      `;
      footerElement.innerHTML = '';
      return;
    }

    itemsElement.innerHTML = items.map(({ product, quantity }) => `
      <article class="draft-order-item">
        <img src="${escapeHTML(product.image)}" alt="">
        <div>
          <h3>${escapeHTML(product.name)}</h3>
          <p>${money(product.price)} each</p>

          <div class="draft-order-quantity">
            <button type="button" data-draft-decrease="${escapeHTML(product.id)}">−</button>
            <span>${quantity}</span>
            <button type="button" data-draft-increase="${escapeHTML(product.id)}">+</button>
            <button class="draft-remove" type="button" data-draft-remove="${escapeHTML(product.id)}">Remove</button>
          </div>
        </div>
        <strong>${money(product.price * quantity)}</strong>
      </article>
    `).join('');

    footerElement.innerHTML = `
      <div class="draft-order-total">
        <span>Estimated total</span>
        <strong>${money(total.price)}</strong>
      </div>

      <p class="draft-order-small">
        Prices and availability must be confirmed by Newry Fireworks.
      </p>

      <button class="button draft-review-button" type="button" data-draft-review>
        Review screenshot summary
      </button>

      <button class="draft-clear-button" type="button" data-draft-clear>
        Clear draft
      </button>
    `;
  }

  function renderSummary() {
    const items = cartItems();
    const total = totals();
    const reference = `NF-${new Date().toISOString().slice(0, 10).replaceAll('-', '')}`;

    summaryElement.innerHTML = `
      <div class="draft-summary-card">
        <div class="draft-summary-top">
          <div>
            <p>Newry Fireworks</p>
            <h2>Draft order</h2>
          </div>
          <span>${reference}</span>
        </div>

        <div class="draft-summary-lines">
          ${items.map(({ product, quantity }) => `
            <div>
              <span><b>${quantity} ×</b> ${escapeHTML(product.name)}</span>
              <strong>${money(product.price * quantity)}</strong>
            </div>
          `).join('')}
        </div>

        <div class="draft-summary-total">
          <span>Estimated total</span>
          <strong>${money(total.price)}</strong>
        </div>

        <label class="draft-licence-check">
          <input type="checkbox" data-draft-licence>
          <span>My fireworks licence has been approved</span>
        </label>

        <div class="draft-summary-notice">
          <strong>Draft request only</strong>
          <p>
            This is not a confirmed reservation. Stock is held only after
            confirmation from Newry Fireworks. A valid licence covering the
            selected products must be presented and verified before collection.
          </p>
        </div>

        <div class="draft-summary-instructions">
          <b>1.</b> Take a screenshot of this summary.<br>
          <b>2.</b> Open WhatsApp below.<br>
          <b>3.</b> Attach the screenshot and send it to us.
        </div>

        <div class="draft-summary-actions">
          <a data-draft-whatsapp class="button is-disabled" aria-disabled="true">
            Open WhatsApp
          </a>
          <button type="button" class="outline-button light" data-draft-summary-close>
            Back to shop
          </button>
        </div>
      </div>
    `;

    closeCart();
    summaryElement.hidden = false;
    document.body.classList.add('draft-summary-open');
  }

  function closeSummary() {
    summaryElement.hidden = true;
    document.body.classList.remove('draft-summary-open');
  }

  document.addEventListener('click', event => {
    const addButton = event.target.closest('[data-draft-add]');
    const increaseButton = event.target.closest('[data-draft-increase]');
    const decreaseButton = event.target.closest('[data-draft-decrease]');
    const removeButton = event.target.closest('[data-draft-remove]');

    if (addButton) {
      const id = addButton.dataset.draftAdd;
      cart[id] = (cart[id] || 0) + 1;
      saveCart();

      addButton.textContent = 'Added ✓';
      setTimeout(() => {
        addButton.textContent = 'Add to draft order';
      }, 900);

      openCart();
    }

    if (increaseButton) {
      const id = increaseButton.dataset.draftIncrease;
      cart[id] = (cart[id] || 0) + 1;
      saveCart();
    }

    if (decreaseButton) {
      const id = decreaseButton.dataset.draftDecrease;
      cart[id] = Math.max((cart[id] || 1) - 1, 0);

      if (!cart[id]) {
        delete cart[id];
      }

      saveCart();
    }

    if (removeButton) {
      delete cart[removeButton.dataset.draftRemove];
      saveCart();
    }

    if (event.target.closest('[data-draft-open]')) {
      openCart();
    }

    if (
      event.target.closest('[data-draft-close]') ||
      event.target.closest('[data-draft-overlay]')
    ) {
      closeCart();
    }

    if (event.target.closest('[data-draft-review]')) {
      renderSummary();
    }

    if (event.target.closest('[data-draft-summary-close]')) {
      closeSummary();
    }

    if (event.target.closest('[data-draft-clear]')) {
      cart = {};
      saveCart();
    }

    const whatsapp = event.target.closest('[data-draft-whatsapp]');

    if (
      whatsapp &&
      whatsapp.getAttribute('aria-disabled') === 'true'
    ) {
      event.preventDefault();
    }
  });

  document.addEventListener('change', event => {
    if (!event.target.matches('[data-draft-licence]')) {
      return;
    }

    const whatsapp = summaryElement.querySelector('[data-draft-whatsapp]');

    if (event.target.checked) {
      const text = encodeURIComponent(
        'Hello Newry Fireworks, I would like to send you a screenshot of my draft order. My fireworks licence has been approved.'
      );

      whatsapp.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
      whatsapp.target = '_blank';
      whatsapp.rel = 'noreferrer';
      whatsapp.classList.remove('is-disabled');
      whatsapp.setAttribute('aria-disabled', 'false');
    } else {
      whatsapp.removeAttribute('href');
      whatsapp.classList.add('is-disabled');
      whatsapp.setAttribute('aria-disabled', 'true');
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeCart();
      closeSummary();
    }
  });

  renderCart();
})();
