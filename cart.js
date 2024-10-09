document.addEventListener('DOMContentLoaded', () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; 
    const cartContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.querySelector('.total-price');

    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>'; 
        return;
    }

    let totalAmount = 0; 

    cartItems.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <div class="item-details">
                <img src="${item.image}" alt="${item.name}" style="width: 100px; height: auto;">
                <p>${item.name}</p>
                <p>Size: ${item.size}</p>
                <p>Quantity: ${item.quantity}</p>
                <p>Price: Rs ${item.total.toFixed(2)}</p>
            </div>
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        cartContainer.appendChild(itemElement);
        totalAmount += item.total; 
    });

    totalPriceElement.textContent = totalAmount.toFixed(2); 

    function deleteItem(index) {
        cartItems.splice(index, 1); 
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        location.reload(); 
    }

    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            deleteItem(index); 
        });
    });
});
