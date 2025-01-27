let cart = [];

function addToCart(name, price, imageUrl) {
  const item = cart.find(i => i.name === name);
  if (item) {
    item.quantity++;
  } else {
    cart.push({ name, price, quantity: 1, imageUrl });
  }
  updateCart();
}

function updateCart() {
  const cartContainer = document.getElementById('cart-items');
  cartContainer.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
    cartContainer.innerHTML += `
      <div class="cart-item">
        <span>${item.name} (x${item.quantity})</span>
        <span>
          <button class="btn btn-sm btn-danger" onclick="updateQuantity('${item.name}', -1)">-</button>
          <button class="btn btn-sm btn-success" onclick="updateQuantity('${item.name}', 1)">+</button>
          <button class="btn btn-sm btn-warning" onclick="removeFromCart('${item.name}')">Remove</button>
        </span>
        <img src="${item.imageUrl}" alt="${item.name}" style="width: 50px; height: auto;">
      </div>`;
  });
  document.getElementById('cart-total').innerText = `Total: $${total.toFixed(2)}`;
}

function goToCheckout() {
  const name = document.getElementById('user-name').value;
  const email = document.getElementById('user-email').value;
  const address = document.getElementById('user-address').value;
  const phone = document.getElementById('user-phone').value;

  if (!name || !email || !address || !phone) {
    alert('Please fill all fields.');
    return;
  }

  let message = `Name: ${name}%0AEmail: ${email}%0AAddress: ${address}%0APhone: ${phone}%0AOrder:%0A`;
  cart.forEach(item => {
    message += `${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}%0A`;
    message += `Image: ${item.imageUrl}%0A`;  // تم تصحيح إضافة رابط الصورة هنا
  });
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  message += `Total: $${total.toFixed(2)}`;

  const whatsappURL = `https://wa.me/+2001501377311?text=${message}`;
  window.open(whatsappURL, '_blank');
}
