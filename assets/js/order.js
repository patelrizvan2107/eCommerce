const handleDis = async () => {
  let uid = localStorage.getItem("userId");
  let totalPrice = 0;

  let order = await fetch(`http://localhost:3000/orders`);
  let orderData = await order.json();

  let cart = await fetch("http://localhost:3000/cart");
  let cartData = await cart.json();

  let product = await fetch(`http://localhost:3000/product`);
  let pData = await product.json();

  let print = ``;

  let userOrders = orderData.filter((v) => v.uId === uid);

  userOrders.forEach((v, index) => {
    let userCart = cartData.find((v1) => v1.id === v.cartID);

    let orderSubtotal = 0;

    print += `
      <div class="checkout-box mb-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="box-title m-0">Order #${index + 1}</h5>
          <span class="badge-type">${v.status}</span>
        </div>
        
        <div class="table-responsive">
          <table class="table align-middle">
            <thead class="table-light small text-uppercase text-muted">
              <tr>
                <th scope="col" style="width: 40%;">Product</th>
                <th scope="col" class="text-center">Quantity</th>
                <th scope="col" class="text-end">Unit Price</th>
                <th scope="col" class="text-end">Subtotal</th>
              </tr>
            </thead>
            <tbody>
    `;

    if (userCart && userCart.items) {
      userCart.items.map((v2) => {
        const productItem = pData.find((v3) => v3.id === v2.productId);
        const itemPrice = productItem ? productItem.price : 0;
        const itemSubtotal = v2.qtty * itemPrice;

        orderSubtotal += itemSubtotal;
        totalPrice += itemSubtotal;

        print += `
          <tr>
            <td>
              <span class="fw-bold text-dark">${productItem ? productItem.name : "Product Not Found"}</span>
            </td>
            <td class="text-center">
              <span class="badge-type">${v2.qtty}</span>
            </td>
            <td class="text-end font-monospace text-secondary">$${itemPrice.toFixed(2)}</td>
            <td class="text-end font-monospace fw-bold text-dark">$${itemSubtotal.toFixed(2)}</td>
          </tr>
        `;
      });
    }

    print += `
            </tbody>
          </table>
        </div>

        <div class="d-flex justify-content-end align-items-center gap-3 mt-3 pt-2 border-top">
          <span class="text-muted fw-semibold">Order Subtotal:</span>
          <span class="font-monospace fs-5 fw-bold text-dark">$${orderSubtotal.toFixed(2)}</span>
        </div>
      </div>
    `;
  });

  print += `
    <div class="checkout-box mt-4 d-flex justify-content-between align-items-center">
      <div>
        <h4 class="box-title m-0">Order Summary</h4>
      </div>
      <div class="text-end">
        <span class="total-label fs-6 fw-semibold text-muted d-block">Grand Total</span>
        <span class="total-amount fs-3 fw-bold" style="color: var(--accent);">$${totalPrice.toFixed(2)}</span>
      </div>
    </div>
  `;

  document.getElementById("disp").innerHTML = print;
};

window.onload = () => {
  handleDis();
};