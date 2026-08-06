const handleDispaly = async () => {
  let uid = localStorage.getItem("userId");
  let totalAmount = localStorage.getItem("amount");
  let res = await fetch(`http://localhost:3000/orders`);
  let ordersData = await res.json();

  let qty = 0;
  let amount = 0;

  // console.log(ordersData);

  let userRes = await fetch(`http://localhost:3000/user`);
  let userData = await userRes.json();
  // console.log(userData);

  let product = await fetch(`http://localhost:3000/product`);
  let productData = await product.json();
  // console.log(productData);

  let cartRes = await fetch(`http://localhost:3000/cart`);
  let cartData = await cartRes.json();
  // console.log(cartData);

  let name = userData.name;
  //    console.log(name);

  
  let print = ``;
  ordersData.map((v, i) => {
    let user = userData.find((u) => u.id === v.uId);
    // console.log(user.name);

    //v.cartID   find   cartData     cobj
    //cobj.items    map    v1   v1.productId     find   productData    pobj    pobj.name

    let cartObj = cartData.find((c) => c.id === v.cartID);
    // console.log(cartObj.items);
   print += `
  <tr>
    <td>${i + 1}</td>
    <td>${user.name}</td>
    <td colspan="3">
      <table class="inner-table">
        <tbody>`;

cartObj.items.map((ci) => {
  let pObj = productData.find((p) => p.id === ci.productId);

  print += `
          <tr>
            <td width="175px">${pObj.name}</td>
            <td width="175px">${pObj.price}</td>
            <td width="175px">${ci.qtty}</td>
          </tr>`;

  totalAmount = totalAmount + pObj.price * ci.qtty;
});

print += `
        </tbody>
      </table>
    </td>
    <td>${totalAmount}</td>
    <td>
      <select name="orderStatus" onchange="statusUp(this, '${v.id}') id="orderStatus">
        <option value="0">Select Status</option>
        <option value="Placed">Placed</option>
        <option value="Transit">In Transit</option>
        <option value="Delivered">Delivered</option>
      </select>
    </td>
  </tr>
`;
    totalAmount = 0;
  });

  // print+= `</tr>`

  document.getElementById("tableContent").innerHTML = print;
};


const statusUp = async (e, id) => {
  // event.preventDefault();
  console.log(e.value);
  console.log(id);
  
   await fetch(`http://localhost:3000/orders/${id}`, {
    method: "PATCH",
    headers: {
        "Content-Type" : "application/json"
    },

    body: JSON.stringify({status:e.value})

  })

  let res = await fetch(`http://localhost:3000/orders`)
  let data = await res.json();
  console.log(data.status);
  
  document.getElementById("orderStatus").innerHTML = data.status;

}

window.onload = () => {
  handleDispaly();
  statusUp()
};