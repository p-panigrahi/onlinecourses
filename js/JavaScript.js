const menu = document.getElementById("menu");
const sideMenu = document.querySelector(".side-menu");
const closeMenu = document.querySelector(".close-btn");
menu.addEventListener("click", (e) => {
  sideMenu.classList.add("active");
  document.body.style.overflow = "hidden";
});
closeMenu.addEventListener("click", (e) => {
  sideMenu.classList.remove("active");
  document.body.style.overflow = "scroll";
});

document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cart-container-1"); // Cart page container
  const totalAmountElement = document.getElementById("total-amount-1"); // Total on cart page

  const cartItemsContainer = document.querySelector(
    ".cart-dropdown .cart-items"
  ); // Dropdown container
  const totalPriceElement = document.getElementById("total-price"); // Total in dropdown
  const cartCountElement = document.getElementById("cart-count"); // Item count
  const cartDropdown = document.querySelector(".cart-dropdown");

  let cart = JSON.parse(localStorage.getItem("cart")) || []; // Load cart from localStorage

  // Function to calculate total price
  function calculateTotalPrice() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // Function to calculate total item count
  function getTotalItemCount() {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }

  // Function to toggle cart count visibility
  function toggleCartCount() {
    cartCountElement.style.display = getTotalItemCount() > 0 ? "block" : "none";
  }

  // Function to render the cart on the cart page
  function renderCartPage() {
    if (!cartContainer) return;

    cartContainer.innerHTML = ""; // Clear the cart container
    cart.forEach((item, index) => {
      cartContainer.innerHTML += `
          <div class="course-item-1 d-flex align-items-center" data-index="${index}">
            <img src="${item.image}" alt="Course Image" class="course-image-1 me-3">
            <div class="course-details-1 flex-grow-1">
              <h5>${item.name}</h5>
              <p>${item.author}</p>
              <p class="course-rating-1">Price: ₹${item.price}</p>
              <p class="course-quantity">Quantity: ${item.quantity}</p>
            </div>
            <div class="text-end-1">
              <span class="remove-btn-1" data-index="${index}">Remove</span>
            </div>
          </div>
        `;
    });

    totalAmountElement.innerText = `₹${calculateTotalPrice()}`; // Update total price
    attachRemoveHandlers();
  }

  // Function to render the dropdown cart
  function renderDropdownCart() {
    cartItemsContainer.innerHTML = ""; // Clear dropdown items
    cart.forEach((item, index) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
          <div class="product">
            <img src="${item.image}" alt="${
        item.name
      }" class="product-image" style="width: 50px; height: 50px;">
            <div class="product-details">
              <h1 class="product-title">${item.name}</h1>
              <p class="product-author">${item.author}</p>
              <p class="product-price">₹${item.price.toFixed(2)}</p>
              <p>Quantity: ${item.quantity}</p>
            </div>
          </div>
        `;
      cartItemsContainer.appendChild(cartItem);
    });

    totalPriceElement.textContent = calculateTotalPrice().toFixed(2); // Update total price
    cartCountElement.textContent = getTotalItemCount(); // Update item count

    // Toggle dropdown visibility
    if (cart.length > 0) {
      cartDropdown.classList.add("show-items");
      cartDropdown.classList.remove("show-default");
    } else {
      cartDropdown.classList.add("show-default");
      cartDropdown.classList.remove("show-items");
    }

    toggleCartCount();
  }

  // Unified function to update both cart page and dropdown
  function updateAllCarts() {
    renderCartPage();
    renderDropdownCart();
    localStorage.setItem("cart", JSON.stringify(cart)); // Save cart to localStorage
  }

  // Function to attach event listeners to remove buttons
  function attachRemoveHandlers() {
    document.querySelectorAll(".remove-btn-1").forEach((button) => {
      button.addEventListener("click", (e) => {
        const itemIndex = e.target.dataset.index;
        cart.splice(itemIndex, 1); // Remove item from cart
        updateAllCarts(); // Update both carts
      });
    });
  }

  // Add event listeners to "add-to-cart" buttons
  document.querySelectorAll(".add-cart").forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = e.target.dataset.id; // Get product ID
      const productName = e.target.dataset.product;
      const productAuthor = e.target.dataset.author;
      const productPrice = parseFloat(e.target.dataset.price);
      const productImage = e.target.dataset.image;

      // Check if the product already exists in the cart
      const existingProductIndex = cart.findIndex(
        (item) => item.id === productId
      );

      if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1; // Increase quantity
      } else {
        cart.push({
          id: productId, // Add product ID to the cart item
          name: productName,
          author: productAuthor,
          price: productPrice,
          image: productImage,
          quantity: 1,
        });
      }

      // Store cart IDs in localStorage
      const cartIds = cart.map((item) => item.id); // Extract IDs
      localStorage.setItem("cartIds", JSON.stringify(cartIds)); // Save IDs to localStorage

      updateAllCarts(); // Update both carts
      e.target.textContent = "Go to Cart"; // Change button text
    });
  });

  // Initial render of both carts
  updateAllCarts();
});

// Accodian
document.querySelectorAll(".accordion-header").forEach((header) => {
  header.addEventListener("click", () => {
    const body = header.nextElementSibling;
    const arrow = header.querySelector(".toggle-arrow");

    body.style.display = body.style.display === "block" ? "none" : "block";
    arrow.style.transform =
      body.style.display === "block" ? "rotate(180deg)" : "rotate(0deg)";
  });
});
