

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

   let pid = allCartData.items.map((v2) => {
   return v2.productId

    
   });

   
   console.log(pid);
   
   let product = await fetch(`http://localhost:3000/product`);
   let pData = await product.json();
   console.log(pData);
   console.log( pData.find((v) => v.id === pid[0]));

  allCartData.items.map((v3) => {
   for (let i = 0; i< pid.length; i++) {
     let allpData = pData.find((v) => v.id === pid[i])
   console.log(allpData.price);

    print += `<span>qtty${v3.qtty}</span>`
   
   print += `<span>${allpData.name}</span>
    <span>${allpData.price}</span>`
   

   }
});
   
   
  
   
   
   

   document.getElementById("disp").innerHTML = print;
   

}




window.onload = () => {
    handleDis()
}