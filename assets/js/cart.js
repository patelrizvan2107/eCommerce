

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



  let uCart1 = cartData.filter((v) => v.userId === uid );

  console.log(uCart1);

  let uCart = uCart1.find((v) => !v.status)

  if (uCart) {

    uCart.items.map((v1) => {
      let pData =   productData.find((v2) => {
           return v2.id === v1.productId

            // console.log(v1.productId);
            
        })
        // let iarr = pData.image.split("/")
        print += `<div class="cart-item py-3 border-bottom d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3">
            <div class="d-flex align-items-center gap-3">
                <img src='admin/images/category_img/${pData.image[0]}' alt="" style="width: 80px; height: 95px; object-fit: cover; border-radius: 8px;">
                <div>
                    <h5 class="mb-1 text-dark fw-bold">${pData.name}</h5>
                    <div class="d-flex align-items-center gap-2">
                        <span class="fw-bold text-dark">${pData.price}</span>
                        <span class="text-muted text-decoration-line-through small"></span>
                    </div>
                </div>
            </div>
    <div class="d-flex align-items-center justify-content-between justify-content-sm-end gap-4">
                <div class="quantity-control">
                    <button class="quantity-btn" onclick="minusQuantity(this, '${v1.productId}')"  type = "button" >-</button>
                    <span id='qttySpan'>${v1.qtty}</span>
                    <button class="quantity-btn" onclick="plusQuantity(this, '${v1.productId}')" type = "button">+</button>
                </div>
 <button class="btn text-danger p-0" onclick="removeItem( )">
                    <i class="fa-regular fa-trash-can fs-5"></i>
                </button>
            </div>
        </div>`
  })
    

    // calcTotal();
    
  }

  localStorage.setItem("cartID", uCart.id)

  
  

  document.getElementById("cartItemsContainer").innerHTML = print;
};

const plusQuantity = async(e, pid) => {

    console.log(e.parentNode.childNodes[3].innerHTML);
    


 let qtty = parseInt(e.parentNode.childNodes[3].innerHTML);

  qtty++;

  if (qtty <= 10) {
    e.parentNode.childNodes[3].innerHTML = qtty;
//   }else {
//     e.disabled = true;
}
  const userId = localStorage.getItem("userId");
 let res = await fetch("http://localhost:3000/cart");
  let data = await res.json();
  let userCartData = data.filter((v) => v.userId === userId);
  let cartData = userCartData.find((v)=> !v.status)
  console.log(cartData);
  
  let newProductIndex = cartData?.items?.findIndex(
      (v) => v.productId === pid,
    );
      cartData.items[newProductIndex].qtty = qtty;

    await fetch(`http://localhost:3000/cart/${cartData.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cartData),
    });
  calcTotal()

}

const minusQuantity =async (e,pid) => {
 console.log(e.parentNode.childNodes[3].innerHTML);

 let qtty = parseInt(e.parentNode.childNodes[3].innerHTML);

  qtty--;

  if (qtty >= 1) {
    e.parentNode.childNodes[3].innerHTML = qtty;
//   }else if(qtty>1){
//     e.disabled = true;
  }
  const userId = localStorage.getItem("userId");
 let res = await fetch("http://localhost:3000/cart");
  let data = await res.json();
  let userCartData = data.filter((v) => v.userId === userId);
  let cartData = userCartData.find((v)=> !v.status)
  console.log(cartData);
  
  let newProductIndex = cartData?.items?.findIndex(
      (v) => v.productId === pid,
    );
      cartData.items[newProductIndex].qtty = qtty;

    await fetch(`http://localhost:3000/cart/${cartData.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cartData),
    });
  calcTotal()
}

const calcTotal = () => {
    const cartItemsContainer = document.getElementById("cartItemsContainer");
    console.log(cartItemsContainer.childNodes, cartItemsContainer.childNodes.length);

    let total = 0

    for (let i = 0; i < cartItemsContainer.childNodes.length; i++) {
        let price = parseInt(cartItemsContainer.childNodes[i].childNodes[1].childNodes[3].childNodes[3].childNodes[1].innerHTML);
        let qtty =parseInt((cartItemsContainer.childNodes[i].childNodes[3].childNodes[1].childNodes[3].innerHTML))
        console.log(price * qtty);

        total += price * qtty
        
    }

    document.getElementById("subtotalPrice").innerHTML = total;

    total = total + 50;
    
    let tax = total * 0.05;
   

    let totalPrice = total + tax

    localStorage.setItem("amount", totalPrice)

    document.getElementById("taxPrice").innerHTML = tax.toFixed(2);
    document.getElementById("totalPrice").innerHTML = totalPrice;
}


//  $${(item.price * item.quantity).toFixed(2)}
                    // <input type="text" class="quantity-input" value="${v1.qtty}" readonly>


const Proceed = () => {
    window.location = "address.html"

    
}

window.onload = async() => {
   await cartData();

    calcTotal()

};