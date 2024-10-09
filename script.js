document.addEventListener('DOMContentLoaded', () => {
    let cartCount = 0; 
    let selectedSize = ''; 

    function updateCartCount() {
        const cartIcon = document.querySelector('.cart-count');
        cartIcon.setAttribute('data-count', cartCount);
        cartIcon.textContent = cartCount;
    }

    function addToCart() {
        console.log('Adding to cart');
        const quantityInput = document.querySelector('.quantity input');
        const quantity = parseInt(quantityInput.value);

        if (quantity > 0 && selectedSize) {
            const item = {
                image: 'img/p1.png',
                name: 'T-Shirts for Men',
                size: selectedSize,
                quantity: quantity,
                total: quantity * 40
            };

            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            cartItems.push(item);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));

            cartCount += quantity;
            updateCartCount();
            alert(`Added ${quantity} item(s) of size ${selectedSize} to the cart!`);
        } else {
            alert("Please select a quantity greater than 0 and choose a size.");
        }
    }

    function showImg(pic) {
        const bigImg = document.querySelector('.big-img img');
        bigImg.src = pic;
    }

    function setupImageClickHandlers() {
        const smallImages = document.querySelectorAll('.small-img img');
        smallImages.forEach(img => {
            img.addEventListener('click', function() {
                showImg(this.src);
            });
        });
    }

    function setupSizeSelection() {
        const sizes = document.querySelectorAll('.psize');

        sizes.forEach(size => {
            size.addEventListener('click', function() {
                sizes.forEach(s => s.classList.remove('active'));
                this.classList.add('active');
                selectedSize = this.textContent;
            });
        });
    }

    function toggleReviews() {
        const reviews = document.querySelector('.reviews');
        const button = document.querySelector('.see-reviews-btn');

        if (reviews.style.display === "none" || reviews.style.display === "") {
            reviews.style.display = "block";
            button.textContent = "Hide Reviews";
        } else {
            reviews.style.display = "none";
            button.textContent = "See Reviews";
        }
    }

    function showReviewForm() {
        const reviewForm = document.querySelector('.review-form');
        reviewForm.style.display = 'block';
    }

    function submitReview() {
        const name = document.getElementById('reviewer-name').value;
        const reviewText = document.getElementById('review-text').value;

        if (name && reviewText) {
            const reviewsContainer = document.querySelector('.reviews');
            const newReview = document.createElement('div');
            newReview.classList.add('review');
            newReview.innerHTML = `<strong>${name}:</strong><p>${reviewText}</p>`;
            reviewsContainer.appendChild(newReview);
            document.getElementById('reviewer-name').value = '';
            document.getElementById('review-text').value = '';
            const reviewForm = document.querySelector('.review-form');
            reviewForm.style.display = 'none';
        } else {
            alert("Please fill in both fields.");
        }
    }

    document.querySelector('.description-btn').addEventListener('click', function() {
        const description = document.querySelector('.product-description');
        description.classList.toggle('show');
        description.style.display = description.classList.contains('show') ? 'block' : 'none';
    });

    document.querySelector('.cart-btn').addEventListener('click', addToCart);
    setupImageClickHandlers();
    setupSizeSelection();
    document.querySelector('.see-reviews-btn').addEventListener('click', toggleReviews);
    document.querySelector('.add-review-btn').addEventListener('click', showReviewForm);
    document.querySelector('.submit-review-btn').addEventListener('click', submitReview);

    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    updateCartCount();
});
