const handleDis = async () => {
  let uid = localStorage.getItem("userId");

  let order = await fetch(`http://localhost:3000/orders`);
  let orderData = await order.json();

  let cart = await fetch("http://localhost:3000/cart");
  let cartData = await cart.json();

  let product = await fetch(`http://localhost:3000/product`);
  let pData = await product.json();

  let print = ``;

  let userOrders = orderData.filter((v) => v.uId === uid);

  console.log(userOrders);

  let cId = userOrders.map((v) => {
    let userCart = cartData.find((v1) => v1.id === v.cartID);
    console.log(userCart);

    userCart.items.map((v2) => {
      const product = pData.find((v3) => v3.id === v2.productId);
      console.log(product);

       print += `
                         <div class="order-item-row">
                             <div class="order-item-details">
                                 <span class="order-qty-badge">Qty: ${v2.qtty}</span>
                                 <h4 class="order-product-name">${product.name}</h4>
                             </div>
                             <div class="order-product-price">$${product.price.toFixed(2)}</div>
                         </div>
                       `;
      

    })
    
  })
 
   
    

  
  
  

 
  

        // print += `
        //                  <div class="order-item-row">
        //                      <div class="order-item-details">
        //                          <span class="order-qty-badge">Qty: ${qtty[i]}</span>
        //                          <h4 class="order-product-name">${pData[j].name}</h4>
        //                      </div>
        //                      <div class="order-product-price">$${pData[j].price.toFixed(2)}</div>
        //                  </div>
        //                `;
      
  // let tax = totalPrice * 0.05;
  // totalPrice = totalPrice + tax + 50;
  // print += `
  //                        <br/>       <h4 class="order-product-name">Order Placed</h4>

  //            <div class="order-summary-footer">
  //                <span class="total-label">Total Amount</span>
  //                <span class="total-amount">$${totalPrice.toFixed(2)}</span>
  //            </div>
  //          `;
  document.getElementById("disp").innerHTML = print;
};

// const handleCart = async () => {
//   let res = await fetch("http://localhost:3000/cart");
//   let cart = await res.json();
//   console.log(cart);

//   let status = cart.includes((v) => v.status === "Ordered");
//   let id = cart.map((v) => v.id)

//   console.log(id);
  
//   console.log(status);

//   if (status !== true) {

//    console.log('hiii');
   
//     await fetch(`http://localhost:3000/cart/${id}`, {
//       method: "DELETE",
     
//     });
//   }
// };

window.onload = () => {
  handleDis();
};
