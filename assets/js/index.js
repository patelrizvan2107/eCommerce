const catData = async () => {
  const res = await fetch("http://localhost:3000/category");
  const data = await res.json();

  let print = ``;

  data.map((v) => {
    print += ` 
        <div class="col-sm-6 col-md-4 col-lg-3 col-xl-2">
            <div class="data banner-small mb-3">
                <a href="product.html?category=${v.id}"> 
                    <img src="./admin/images/category_img/${v.image}" alt="${v.name}">
                    <div class="banner-content">
                        <h2 class="data fs-5 fw-bold m-0">${v.name}</h2>
                    </div>
                </a>
            </div>
        </div> 
    `;
  });

  document.getElementById("catData").innerHTML = print;
};

const productData = async () => {
  try {
    let res = await fetch("http://localhost:3000/product");
    let data = await res.json();

    let print = ``;
    let bestsellerIds = [];

    data.forEach((v) => {
      let inc = v.tags && v.tags.find((tag) => tag === "bestseller");

      if (inc !== undefined) {
        bestsellerIds.push(v.id);

        let imageArray = Array.isArray(v.image) ? v.image : [v.image];

        let imageSlides = imageArray
          .map(
            (img) => `
            <div class="swiper-slide">
              <img src="./admin/images/category_img/${img}" alt="${v.name}">
            </div>
          `,
          )
          .join("");

        print += `
        <div class="col-12 col-sm-6 col-lg-3">
          <div class="product-card">
            <div class="tddata">
              <span class="disc">-25%</span>

              <div class="swiper productSwiper-${v.id}">
                <div class="swiper-wrapper">
                  ${imageSlides}
                </div>
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-pagination"></div>
              </div>
            </div>

            <div class="dataset">
              <h2 class="data">${v.name}</h2>
              <div class="dataset-prices">
                <span class="dis">₹10,000</span>
                <span class="disprice">₹${v.price}</span>
              </div>
              
              <button onclick="handleBuy('${v.id}')" class="buy" type="button">Buy Now</button>
            </div>
          </div>
        </div>
        `;
      }
    });

    document.getElementById("todatTop").innerHTML = print;

    // Initialize Swiper for each product card
    setTimeout(() => {
      bestsellerIds.forEach((id) => {
        if (typeof Swiper !== "undefined") {
          new Swiper(`.productSwiper-${id}`, {
            loop: true,
            observer: true,
            observeParents: true,
            navigation: {
              nextEl: `.productSwiper-${id} .swiper-button-next`,
              prevEl: `.productSwiper-${id} .swiper-button-prev`,
            },
            pagination: {
              el: `.productSwiper-${id} .swiper-pagination`,
              clickable: true,
            },
          });
        }
      });
    }, 100);
  } catch (error) {
    console.error("Error loading bestseller products:", error);
  }
};

const newArrivals = async () => {
  try {
    let res = await fetch("http://localhost:3000/product");
    let data = await res.json();

    let print = `<div class="row g-4">`;
    let newArrivalIds = [];

    data.forEach((v) => {
      let inc = v.tags && v.tags.find((tag) => tag === "new");

      if (inc !== undefined) {
        newArrivalIds.push(v.id);

        let imageArray = Array.isArray(v.image) ? v.image : [v.image];

        let imageSlides = imageArray
          .map(
            (img) => `
            <div class="swiper-slide">
              <img src="./admin/images/category_img/${img}" alt="${v.name}">
            </div>
          `,
          )
          .join("");

        print += `
        <div class="col-12 col-sm-6 col-lg-3">
            <div class="product-card">
                <div class="tddata">
                    <span class="disc">-25%</span>

                    <div class="swiper newArrivalSwiper-${v.id}">
                        <div class="swiper-wrapper">
                            ${imageSlides}
                        </div>
                        <div class="swiper-button-next"></div>
                        <div class="swiper-button-prev"></div>
                        <div class="swiper-pagination"></div>
                    </div>
                </div>

                <div class="dataset">
                    <h2 class="data">${v.name}</h2>
                    <div class="rating mb-2" style="color: var(--star-color);">★★★★★</div>
                    <div class="dataset-prices">
                        <span class="dis">₹10,000</span>
                        <span class="disprice">₹${v.price}</span>
                    </div>
                    <button type="button" onclick="handleBuy('${v.id}')" class="buy">Buy Now</button>
                </div>
            </div>
        </div>`;
      }
    });

    print += `</div>`;

    document.getElementById("newarrivals").innerHTML = print;

    // Initialize Swiper for each new arrival product card
    setTimeout(() => {
      newArrivalIds.forEach((id) => {
        if (typeof Swiper !== "undefined") {
          new Swiper(`.newArrivalSwiper-${id}`, {
            loop: true,
            observer: true,
            observeParents: true,
            navigation: {
              nextEl: `.newArrivalSwiper-${id} .swiper-button-next`,
              prevEl: `.newArrivalSwiper-${id} .swiper-button-prev`,
            },
            pagination: {
              el: `.newArrivalSwiper-${id} .swiper-pagination`,
              clickable: true,
            },
          });
        }
      });
    }, 100);
  } catch (error) {
    console.error("Error loading new arrival products:", error);
  }
};

const handleBuy = (pId) => {
  window.location = "product_detail.html";
  localStorage.setItem("productId", pId);
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

const Summer = () => {
  localStorage.setItem("Season", "Summer");
  window.location.href = "product.html";
};

const Monsoon = () => {
  localStorage.setItem("Season", "Monsoon");
  window.location.href = "product.html";
};

const Winter = () => {
  localStorage.setItem("Season", "Winter");
  window.location.href = "product.html";
};

window.onload = async () => {
  catData();
  await productData();
  await newArrivals();
  handleLogin();
};