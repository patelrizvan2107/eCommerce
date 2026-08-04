const handleBuyProduct = async () => {
  let id = localStorage.getItem("productId");
  let res = await fetch(`http://localhost:3000/product/${id}`);
  let data = await res.json();

  let slidesHtml = data.image.map(
    (v) => `
        <div class="swiper-slide">
            <img src="admin/images/category_img/${v}" alt="">
        </div>
    `,
  );

  let print = `
        <div class="col-lg-6">
            <div class="productImg">
                <!-- Swiper Slider Outer Container -->
                <div class="swiper hero">
                    <div class="swiper-wrapper">
                        ${slidesHtml}
                    </div>
                    <!-- Navigation buttons -->
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-button-next"></div>
                </div>
            </div>
        </div>

        <div class="col-lg-6">
            <div class="productInfo">
                <h1>${data.name}</h1>

                <div class="rating">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <span>(125 Reviews)</span>
                </div>

                <div class="priceArea">
                    <span class="oldPrice">$1000</span>
                    <span class="newPrice">${data.price}</span>
                </div>

                <p>${data.desc}</p>

               

               
                <div class="sizeBtn">
                    <button onclick = "handleDEC()" type = "button">-</button>
                    <span id = "qtty">1</span>
                    <button onclick = "handleINC()" type = "button">+</button>

                </div>

                <div class="cartBtn">
                    <button class="btn btn-dark" onclick = "addtoCart()" type = "button">Add To Cart</button>
                    <button class="btn btn-danger" type = "button">Buy Now</button>
                </div>
            </div>
        </div>
    `;

  document.getElementById("productDetails").innerHTML = print;

  new Swiper(".swiper.hero", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    loop: true,
  });
};

const handleINC = () => {
  let qtty = parseInt(document.getElementById("qtty").innerHTML);

  qtty++;

  if (qtty <= 10) {
    document.getElementById("qtty").innerHTML = qtty;
  }
};

const handleDEC = () => {
  let qtty = parseInt(document.getElementById("qtty").innerHTML);

  qtty--;

  if (qtty >= 1) {
    document.getElementById("qtty").innerHTML = qtty;
  }
};

const addtoCart = async () => {
  const userId = localStorage.getItem("userId");
  const productId = localStorage.getItem("productId");

  let qtty = parseInt(document.getElementById("qtty").innerHTML);

  console.log("uid", userId, "pid", productId, "qtty", qtty);

  let addtoCart = {
    userId: userId,
    items: [{ productId: productId, qtty: parseInt(qtty) }],
  };
  let res = await fetch("http://localhost:3000/cart");
  let data = await res.json();
  let userCartData = data.filter((v) => v.userId === userId);

  console.log("daata", userCartData);
  // let cartData
  let cartData = userCartData.find((v)=> !v.status)

  if (cartData) {
    let newProductIndex = cartData?.items?.findIndex(
      (v) => v.productId === productId,
    );
    console.log(newProductIndex);

    if (newProductIndex < 0) {
      cartData.items.push({ productId: productId, qtty: parseInt(qtty) });
    } else {
      cartData.items[newProductIndex].qtty += qtty;
    }

    await fetch(`http://localhost:3000/cart/${cartData.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cartData),
    });

    console.log("whole data", cartData);
  } else {
    await fetch("http://localhost:3000/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addtoCart),
    });
  }
};

window.onload = () => {
  handleBuyProduct();
};


// let  