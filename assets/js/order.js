

const handleDis = async () => {

   let uid =  localStorage.getItem("userId")

   let order  = await fetch(`http://localhost:3000/orders`)
   let orderData = await order.json();

   console.log(orderData);

   let user = orderData.find((v) => v.uId === uid);

   console.log(user.cartID);
   let userData = user.cartID;

    let print = ``;


   let cart = await fetch('http://localhost:3000/cart')
   let cartData = await cart.json();
   let allCartData = cartData.find((v)=> v.id === userData)
   console.log(allCartData);

//    console.log(allCartData.items.map((v) => v.productId));

   let pid = allCartData.items.map((v2) => v2.productId);
   let qtty = allCartData.items.map((v2) => v2.qtty);

   console.log(qtty);
   console.log(pid);
   
   let product = await fetch(`http://localhost:3000/product`);
   let pData = await product.json();
   console.log(pData);
   console.log( pData.find((v) => v.id === pid[0]));

   let totalPrice =0 ;

  for (let i = 0; i < pid.length; i++) {
      for (let j = 0; j < pData.length; j++) {
          if (pData[j].id === pid[i]) {
            let itemTotal = pData[j].price * qtty[i];
                       totalPrice += itemTotal;
            print += `
                         <div class="order-item-row">
                             <div class="order-item-details">
                                 <span class="order-qty-badge">Qty: ${qtty[i]}</span>
                                 <h4 class="order-product-name">${pData[j].name}</h4>
                             </div>
                             <div class="order-product-price">$${pData[j].price.toFixed(2)}</div>
                         </div>
                       `;
              break;
          }
      }
  } 
  let tax = totalPrice * 0.05;
  totalPrice =totalPrice + tax + 50;
 print += `
             <div class="order-summary-footer">
                 <span class="total-label">Total Amount</span>
                 <span class="total-amount">$${totalPrice.toFixed(2)}</span>
             </div>
           `;
   document.getElementById("disp").innerHTML = print;
   

}




window.onload = () => {
    handleDis()
}