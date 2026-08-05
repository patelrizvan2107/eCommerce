

const handleDispaly = async () => {

    let uid = localStorage.getItem("userId")
    let amount = localStorage.getItem("amount")
    let res = await fetch(`http://localhost:3000/orders`)
    let ordersData = await res.json();

    // console.log(ordersData);
    
    let userRes = await fetch (`http://localhost:3000/user/${uid}`);
    let userData = await userRes.json();
    // console.log(userData);

    let product = await fetch (`http://localhost:3000/product`);
    let productData = await product.json();
    // console.log(productData);

    let cartRes = await fetch (`http://localhost:3000/cart`);
    let cartData = await cartRes.json();
    // console.log(cartData);
    cartItems = cartData.find((v) => v.userId == uid);
    console.log(cartItems.items);

   let name = userData.name;
//    console.log(name);

   let print = ``;
   ordersData.map((v, i) => {

   print += `
   
   <tr>
      <td>${i + 1}</td>
      <td>${name}</td>
      <td>`
      ;

    cartItems.items.map((v2) => 
    {
      let item =   productData.filter((v3) => v3.id === v2.productId);
      console.log(item);
      
      item.map((v4) => {
        print += `
       Name: ${v4.name}, Quantity: ${v2.qtty}, Price: ${v4.price}
       
        <br>
        `;
      })
      


    })
   
})
print+= ` </td><td>${amount}</td>
        <td><select>
          <option value="Placed !!!">Placed !!!</option>
          <option value="transist">Transist</option>
          <option value="Delivered">Delivered</option>
        </select></td></tr>`

document.getElementById("tableContent").innerHTML = print;

}



window.onload = () => {
    handleDispaly()
}