

const cartData = async () => {
     let uid = localStorage.getItem("userId");
  let res = await fetch("http://localhost:3000/cart");
  let cartData = await res.json();

  let productRes = await fetch("http://localhost:3000/product");
  let productData = await productRes.json();

  console.log(cartData, "cart data", productData, "product data");
  console.log(productData.map((v) => v.image));

  let cateRes = await fetch("http://localhost:3000/category");
  let catData = await cateRes.json();

  let print = "";

  //cartData        find        userId      uCart
  //uCart.items v1     map         productId                v1.qtty
        //productData   find    productId   pData           
        // pData.name



  let uCart = cartData.find((v) => v.userId === uid);

  console.log(uCart);

  uCart.items.map((v1) => {
      let pData =   productData.find((v2) => {
           return v2.id === v1.productId

            // console.log(v1.productId);
            
        })
        // let iarr = pData.image.split("/")
         print += `
        <div class="cart-item py-3 border-bottom d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3">
            <div class="d-flex align-items-center gap-3">
                <img src='./admin/images/category_img/${pData.image[0]}' alt="" style="width: 80px; height: 95px; object-fit: cover; border-radius: 8px;">
                <div>
                    <h5 class="mb-1 text-dark fw-bold">${pData.name}</h5>
                    <div class="d-flex align-items-center gap-2">
                        <span class="fw-bold text-dark">$${pData.price}</span>
                        <span class="text-muted text-decoration-line-through small">$</span>
                    </div>
                </div>
            </div>

            <div class="d-flex align-items-center justify-content-between justify-content-sm-end gap-4">
                <!-- Quantity Selector -->
                <div class="quantity-control">
                    <button class="quantity-btn" onclick="updateQuantity(, -1)">-</button>
                    <input type="text" class="quantity-input" value="${v1.qtty}" readonly>
                    <button class="quantity-btn" onclick="updateQuantity( 1)">+</button>
                </div>

                

                <!-- Remove Button -->
                <button class="btn text-danger p-0" onclick="removeItem( )">
                    <i class="fa-regular fa-trash-can fs-5"></i>
                </button>
            </div>
        </div>
    `
  })
  

  document.getElementById("cartItemsContainer").innerHTML = print;
};

window.onload = () => {
  cartData();
};

//  $${(item.price * item.quantity).toFixed(2)}
