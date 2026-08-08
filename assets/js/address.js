let address = [];

const handleUser = async () => {
  let userRes = await fetch("http://localhost:3000/user");
  let userData = await userRes.json();
  let uid = localStorage.getItem("userId");
  let uData = userData.find((v) => v.id === uid);

  address = uData?.address;
};

const formDisp = async () => {
  let form = document.createElement("form");

  form.setAttribute("onsubmit", "handleSubmit()");
  form.className = "checkout-box mt-4"; // Designed container card from CSS

  let title = document.createElement("h4");
  title.className = "box-title";
  title.innerText = "Add New Delivery Address";
  form.appendChild(title);

  let line1 = document.createElement("input");
  line1.setAttribute("type", "text");
  line1.setAttribute("id", "line1");
  line1.className = "form-control mb-3";

  let line2 = document.createElement("input");
  line2.setAttribute("id", "line2");
  line2.setAttribute("type", "text");
  line2.className = "form-control mb-3";

  let landmark = document.createElement("input");
  landmark.setAttribute("id", "landmark");
  landmark.setAttribute("type", "text");
  landmark.className = "form-control mb-3";

  let city = document.createElement("input");
  city.setAttribute("id", "city");
  city.setAttribute("type", "text");
  city.className = "form-control mb-3";

  let pincode = document.createElement("input");
  pincode.setAttribute("id", "pincode");
  pincode.setAttribute("type", "text");
  pincode.className = "form-control mb-3";

  let submit = document.createElement("input");
  submit.setAttribute("type", "submit");
  submit.setAttribute("value", "Submit Address");
  submit.className = "auth-btn mt-2";

  line1.placeholder = "Address Line 1";
  line2.placeholder = "Address Line 2 (Optional)";
  landmark.placeholder = "Landmark";
  city.placeholder = "City";
  pincode.placeholder = "Pincode / ZIP Code";

  form.appendChild(line1);
  form.appendChild(line2);
  form.appendChild(landmark);
  form.appendChild(city);
  form.appendChild(pincode);
  form.appendChild(submit);

  let maindiv = document.getElementById("allData");
  maindiv.appendChild(form);

  let btn = document.getElementById("addAddressBtn");
  btn.setAttribute("disabled", "true");
};

const handleSubmit = async () => {
  event.preventDefault();

  let uid = localStorage.getItem("userId");
  let uRes = await fetch(`http://localhost:3000/user/${uid}`);
  let uData = await uRes.json();

  let line1 = document.getElementById("line1").value;
  let line2 = document.getElementById("line2").value;
  let landmark = document.getElementById("landmark").value;
  let city = document.getElementById("city").value;
  let pincode = document.getElementById("pincode").value;

  let addressObj = {
    id: crypto.randomUUID(),
    line1,
    line2,
    landmark,
    city,
    pincode,
  };

  console.log(addressObj);

  if (uData?.address) {
    uData?.address.push(addressObj);

    await fetch(`http://localhost:3000/user/${uData.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(uData),
    });
  } else {
    uData.address = [addressObj];

    await fetch(`http://localhost:3000/user/${uData.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(uData),
    });
  }
};

const addressDisp = async () => {
  let uid = localStorage.getItem("userId");
  let uRes = await fetch(`http://localhost:3000/user/${uid}`);
  let uData = await uRes.json();

  console.log(uData.address);

  let print = `<h3 class="box-title mb-3">Existing Addresses</h3><div class="row g-3">`;

  let inc = 1;

  uData.address.map((v) => {
    print += `<div class="col-md-6">
            <label class="address-card">
                <input type="radio" name="slctAddress" value="${v.id}" onclick="checkAddress(this.value)"/>
                <div class="address-content">
                    <span class="badge-type mb-2">Address ${inc++}</span>
                    <h5>${v.line1}</h5>
                    ${v.line2 ? `<p>${v.line2}</p>` : ""}
                    ${v.landmark ? `<p>${v.landmark}</p>` : ""}
                    <p>${v.city}</p>
                    <p><strong>${v.pincode}</strong></p>
                </div>
            </label>
        </div>`;
  });

  print += `</div>`;

  document.getElementById("addressDisp").innerHTML = print;
};

const checkAddress = async (adrsId) => {
  console.log("id", adrsId);

  localStorage.setItem("adrsId", adrsId);

  let slctAddress = document.querySelectorAll(
    'input[name="slctAddress"]:checked',
  );

  if (slctAddress) {
    console.log(slctAddress.value);
  } else {
    console.log("No radio button selected");
  }

  document.getElementById("buyNowBtn").style.display = "block";
};

const order = async (adrs) => {
  let pId = localStorage.getItem("productId");
  let addressId = localStorage.getItem("adrsId");
  let uId = localStorage.getItem("userId");
  let amount = parseFloat(localStorage.getItem("amount"));

  let cartRes = await fetch(`http://localhost:3000/cart`);
  let cartData = await cartRes.json();
  console.log(cartData);

  let cartID = localStorage.getItem("cartID");

  let orderObj = {
    uId,
    pId,
    addressId,
    cartID,
    amount,
    status: "Placed !!!",
  };

  await fetch("http://localhost:3000/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderObj),
  });

  localStorage.setItem("cartId", cartID);

  await fetch(`http://localhost:3000/cart/${cartID}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: "Ordered" }),
  });

  localStorage.removeItem("cartID");
  localStorage.removeItem("adrsId");
  localStorage.removeItem("amount");

  window.location.href = "orders.html";
};
const handleLogin = () => {
  const uid = localStorage.getItem("userId");

  let print = ``;

  if (uid) {
    print += `<a href="" id="loged" onclick="handleLogout()"><i class="fa-solid fa-arrow-right-from-bracket"></i></a>`;
  } else {
    print += `<a href="login.html" id="loged" onclick="handleLogout()"><i class="fa-regular fa-user"></i></a>`;
  }

  document.getElementById("auth").innerHTML = print;
};

const handleLogout = () => {
  localStorage.removeItem("userId");
  window.location.href = "";
};

window.onload = () => {
  handleUser();
  addressDisp();
  handleLogin();
};