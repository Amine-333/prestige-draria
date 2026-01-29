// === PRESTIGE DRARIA - CART & ORDERS SYSTEM ===

let cart = [];

// Add to cart function
function addToCart(productName, price, type) {
    // Get the product card
    const cards = document.querySelectorAll('.product-card');
    let selectedCard = null;
    let selectedSize = '';
    
    cards.forEach(card => {
        const cardTitle = card.querySelector('h3').textContent;
        if (cardTitle === productName) {
            selectedCard = card;
        }
    });
    
    if (!selectedCard) return;
    
    // Get selected size
    const sizeSelect = selectedCard.querySelector('.size-select');
    selectedSize = sizeSelect.value;
    
    if (!selectedSize) {
        alert(type === 'shoe' ? 
            '⚠️ Veuillez choisir une pointure!' : 
            '⚠️ Veuillez choisir une taille!');
        return;
    }
    
    // Add to cart
    cart.push({
        name: productName,
        price: price,
        size: selectedSize,
        type: type
    });
    
    // Update cart display
    updateCartDisplay();
    
    // Show success animation
    showAddedNotification(productName);
    
    // Reset size selection
    sizeSelect.value = '';
}

// Update cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    
    // Update count
    cartCount.textContent = cart.length;
    
    // Calculate total
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = total.toLocaleString() + ' DZD';
    
    // Update items
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Votre panier est vide</p>';
        return;
    }
    
    cartItems.innerHTML = cart.map((item, index) => `
        <div class="cart-item" style="background: white; padding: 15px; margin-bottom: 10px; border-radius: 10px; border-left: 4px solid #1a1a1a;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <strong>${item.name}</strong>
                <button onclick="removeFromCart(${index})" style="background: none; border: none; color: #dc3545; cursor: pointer; font-size: 1.2em;">✕</button>
            </div>
            <div style="display: flex; justify-content: space-between; color: #666; font-size: 0.9em;">
                <span>${item.type === 'shoe' ? 'Pointure' : 'Taille'}: ${item.size}</span>
                <strong>${item.price.toLocaleString()} DZD</strong>
            </div>
        </div>
    `).join('');
}

// Remove from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

// Toggle cart sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.classList.toggle('active');
}

// Show added notification
function showAddedNotification(productName) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: linear-gradient(135deg, #1a1a1a, #3a3a3a);
        color: white;
        padding: 20px 30px;
        border-radius: 15px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        z-index: 3000;
        animation: slideInRight 0.4s ease-out;
    `;
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 15px;">
            <span style="font-size: 2em;">✅</span>
            <div>
                <strong>Ajouté au panier!</strong>
                <p style="margin: 5px 0 0 0; opacity: 0.9; font-size: 0.9em;">${productName}</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease-out';
        setTimeout(() => notification.remove(), 400);
    }, 3000);
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('⚠️ Votre panier est vide!');
        return;
    }
    
    // Create order form modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        z-index: 4000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease-out;
        backdrop-filter: blur(5px);
    `;
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    
    modal.innerHTML = `
        <div style="background: white; padding: 40px; border-radius: 25px; max-width: 600px; width: 90%; max-height: 90vh; overflow-y: auto; animation: slideInUp 0.4s ease-out;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                <h2 style="margin: 0; color: #1a1a1a;">Finaliser la Commande</h2>
                <button onclick="this.closest('.modal').remove()" style="background: none; border: none; font-size: 2em; cursor: pointer; color: #666;">✕</button>
            </div>
            
            <div style="background: linear-gradient(135deg, #f8f8f8, #e8e8e8); padding: 20px; border-radius: 15px; margin-bottom: 25px;">
                <h3 style="margin: 0 0 15px 0; color: #1a1a1a;">Récapitulatif (${cart.length} articles)</h3>
                ${cart.map(item => `
                    <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #ddd;">
                        <span>${item.name} <small style="color: #666;">(${item.size})</small></span>
                        <strong>${item.price.toLocaleString()} DZD</strong>
                    </div>
                `).join('')}
                <div style="display: flex; justify-content: space-between; padding: 15px 0; font-size: 1.3em; font-weight: 900;">
                    <span>TOTAL:</span>
                    <span>${total.toLocaleString()} DZD</span>
                </div>
            </div>
            
            <form id="order-form" onsubmit="submitOrder(event)">
                <div style="margin-bottom: 20px;">
                    <label style="display: block; font-weight: 700; margin-bottom: 8px; color: #1a1a1a;">Nom Complet *</label>
                    <input type="text" id="customer-name" required style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 10px; font-size: 1em;" placeholder="Votre nom">
                </div>
                
                <div style="margin-bottom: 20px;">
                    <label style="display: block; font-weight: 700; margin-bottom: 8px; color: #1a1a1a;">Numéro de Téléphone *</label>
                    <input type="tel" id="customer-phone" required style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 10px; font-size: 1em;" placeholder="0XXX XX XX XX">
                </div>
                
                <div style="margin-bottom: 20px;">
                    <label style="display: block; font-weight: 700; margin-bottom: 8px; color: #1a1a1a;">Adresse de Livraison *</label>
                    <textarea id="customer-address" required rows="3" style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 10px; font-size: 1em; resize: vertical;" placeholder="Rue, Quartier, Code Postal..."></textarea>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <label style="display: block; font-weight: 700; margin-bottom: 8px; color: #1a1a1a;">Wilaya *</label>
                    <select id="customer-wilaya" required style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 10px; font-size: 1em;">
                        <option value="">Choisir...</option>
                        <option value="Alger">Alger</option>
                        <option value="Oran">Oran</option>
                        <option value="Constantine">Constantine</option>
                        <option value="Blida">Blida</option>
                        <option value="Tipaza">Tipaza</option>
                        <option value="Boumerdes">Boumerdes</option>
                    </select>
                </div>
                
                <div style="margin-bottom: 25px;">
                    <label style="display: block; font-weight: 700; margin-bottom: 8px; color: #1a1a1a;">Notes (optionnel)</label>
                    <textarea id="customer-notes" rows="2" style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 10px; font-size: 1em; resize: vertical;" placeholder="Remarques particulières..."></textarea>
                </div>
                
                <button type="submit" style="width: 100%; background: linear-gradient(135deg, #1a1a1a, #3a3a3a); color: white; padding: 18px; border: none; border-radius: 12px; font-size: 1.2em; font-weight: 700; cursor: pointer;">
                    Confirmer la Commande 🛍️
                </button>
            </form>
        </div>
    `;
    
    modal.className = 'modal';
    document.body.appendChild(modal);
}

// Submit order
function submitOrder(event) {
    event.preventDefault();
    
    const name = document.getElementById('customer-name').value;
    const phone = document.getElementById('customer-phone').value;
    const address = document.getElementById('customer-address').value;
    const wilaya = document.getElementById('customer-wilaya').value;
    const notes = document.getElementById('customer-notes').value;
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    
    // Create order object
    const order = {
        id: Date.now(),
        date: new Date().toLocaleDateString('fr-FR', { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
        }),
        name: name,
        phone: phone,
        address: address,
        wilaya: wilaya,
        notes: notes,
        items: [...cart],
        total: total
    };
    
    // Save to localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Show success message
    document.querySelector('.modal').innerHTML = `
        <div style="background: white; padding: 60px 40px; border-radius: 25px; max-width: 500px; width: 90%; text-align: center; animation: slideInUp 0.4s ease-out;">
            <div style="font-size: 5em; margin-bottom: 20px;">✅</div>
            <h2 style="color: #1a1a1a; margin-bottom: 15px;">Commande Confirmée!</h2>
            <p style="color: #666; font-size: 1.1em; margin-bottom: 10px;">Votre commande #${order.id} a été enregistrée.</p>
            <p style="color: #666; margin-bottom: 30px;">Nous vous contacterons bientôt au <strong>${phone}</strong></p>
            <div style="background: linear-gradient(135deg, #f8f8f8, #e8e8e8); padding: 20px; border-radius: 15px; margin-bottom: 25px;">
                <p style="font-size: 1.3em; font-weight: 900; margin: 0;">Total: ${total.toLocaleString()} DZD</p>
            </div>
            <button onclick="location.reload()" style="background: linear-gradient(135deg, #1a1a1a, #3a3a3a); color: white; padding: 15px 40px; border: none; border-radius: 12px; font-size: 1.1em; font-weight: 700; cursor: pointer;">
                Retour à la Boutique
            </button>
        </div>
    `;
    
    // Clear cart
    cart = [];
    updateCartDisplay();
    
    // Auto close after 5 seconds
    setTimeout(() => {
        location.reload();
    }, 5000);
}

// Scroll animations
function initScrollAnimations() {
    const elements = document.querySelectorAll('.feature-card, .product-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => observer.observe(el));
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    updateCartDisplay();
});

// CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(50px);
        }
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
