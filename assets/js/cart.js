// function renderCart() {
//     const container = document.getElementById("cartItemsContainer");

//     if (cart.length === 0) {
//         container.innerHTML = `
//             <div class="text-center py-5">
//                 <i class="fa-solid fa-cart-shopping fs-1 text-muted mb-3"></i>
//                 <h3>Your cart is empty</h3>
//                 <p class="text-muted">Looks like you haven't added anything to your cart yet.</p>
//             </div>
//         `;
//         updateSummary(0);
//         updateCartBadge();
//         return;
//     }

//     container.innerHTML = cart.map(item => `
//         <div class="cart-item py-3 border-bottom d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3">
//             <div class="d-flex align-items-center gap-3">
//                 <img src="${item.image}" alt="${item.title}" style="width: 80px; height: 95px; object-fit: cover; border-radius: 8px;">
//                 <div>
//                     <h5 class="mb-1 text-dark fw-bold">${item.title}</h5>
//                     <p class="mb-1 text-muted small">Size: <strong>${item.size}</strong> | Color: <strong>${item.color}</strong></p>
//                     <div class="d-flex align-items-center gap-2">
//                         <span class="fw-bold text-dark">$${item.price}</span>
//                         <span class="text-muted text-decoration-line-through small">$${item.originalPrice}</span>
//                     </div>
//                 </div>
//             </div>

//             <div class="d-flex align-items-center justify-content-between justify-content-sm-end gap-4">
//                 <!-- Quantity Selector -->
//                 <div class="quantity-control">
//                     <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
//                     <input type="text" class="quantity-input" value="${item.quantity}" readonly>
//                     <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
//                 </div>

//                 <!-- Total item price -->
//                 <div class="fw-bold text-dark fs-6 text-end" style="min-width: 70px;">
//                     $${(item.price * item.quantity).toFixed(2)}
//                 </div>

//                 <!-- Remove Button -->
//                 <button class="btn text-danger p-0" onclick="removeItem(${item.id})">
//                     <i class="fa-regular fa-trash-can fs-5"></i>
//                 </button>
//             </div>
//         </div>
//     `).join('');

//     calculateTotals();
//     updateCartBadge();
// }


const cartData = async () => {
    let res = await fetch("http://localhost:3000/cart");
    let cartData = await res.json();

    let productRes = await fetch("http://localhost:3000/product");
    let productData = await productRes.json();

    console.log(cartData, 'cart data', productData, 'product data');
    console.log(productData.map((v) => v.image));

    let cateRes = await fetch("http://localhost:3000/category");
    let catData = await cateRes.json();

    let print = "";

    cartData.map((v) => {
        let pid = v.items.map((v2) => v2.productId);
        pid.reverse();

        console.log(pid);

        productData.map((v1) => {
            for (let i = 0; i < pid.length; i++) {
                if (pid[i] === v1.id) {
                    
                    let categoryName = "";
                    catData.map((v3) => {
                        if (v3.id === v1.category) {
                            categoryName = v3.name;
                        }
                    });

                    print += `
                    <div class="cart-item py-3 border-bottom d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3">
                        <div class="d-flex align-items-center gap-3">
                            <img src="./admin/images/category_img/${v1.image}" alt="img" style="width: 80px; height: 95px; object-fit: cover; border-radius: 8px;">

                            <div>
                                <div class="d-flex align-items-center gap-2">
                                    <span class="fw-bold text-dark">${v1.name}</span>
                                    <span class="fw-bold text-dark">Category: ${categoryName}</span>
                                    <span class="fw-bold text-dark">$${v1.price}</span>
                                    <span class="text-muted text-decoration-line-through small">$99.99</span>
                                </div>
                            </div>
                        </div>

                        <div class="d-flex align-items-center justify-content-between justify-content-sm-end gap-4">
                            <!--Quantity Selector-->
                            <div class="quantity-control">
                                <button class="quantity-btn" onclick="updateQuantity('${v.id}', -1)">-</button>
                                <input type="text" class="quantity-input" value="1" readonly>
                                <button class="quantity-btn" onclick="updateQuantity('${v.id}', 1)">+</button>
                            </div>

                            <!--Total item price-->
                            <div class="fw-bold text-dark fs-6 text-end" style="min-width: 70px;">
                                $${v1.price}
                            </div>

                            <!--Remove Button-->
                            <button class="btn text-danger p-0" onclick="removeItem('${v.id}')">
                                <i class="fa-regular fa-trash-can fs-5"></i>
                            </button>
                        </div>
                    </div>`;
                }
            }
        });
    });

    document.getElementById("cartItemsContainer").innerHTML = print;
};



window.onload = () => {
    cartData()
}

//  $${(item.price * item.quantity).toFixed(2)}