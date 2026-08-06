// all category get cdata

//cdata map   v  prin +=

{
  /* <div class="col-sm-6 col-md-4 col-lg-3 col-xl-2">
                            <div class="data">
                                <a href>
                                    <img src="assets/image/cate-1.jpg" alt>
                                    <h2 class="data">Outwear</h2>
                                </a>
                            </div>

                        </div> */
}

const catData = async () => {
  const res = await fetch("http://localhost:3000/category");
  const data = await res.json();

  let print = ``;

  data.map((v) => {
    print += ` 
        <div class="col-sm-6 col-md-4 col-lg-3 col-xl-2">
                            <div class="data">
                                <a href>
                                    <img src="./admin/images/category_img/${v.image}" alt>
                                    <h2 class="data">${v.name}</h2>
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
      console.log(inc);
      

      if (inc !== undefined) {
        bestsellerIds.push(v.id);

        let imageArray = Array.isArray(v.image) ? v.image : [v.image];

        let imageSlides = imageArray
          .map(
            (img) => `
            <div class="swiper-slide">
              <img src="./admin/images/category_img/${img}" alt="${v.name}" class="product-card-img">
            </div>
          `
          )
          .join("");

        print += `
        <div class="col-12 col-sm-6 col-lg-3">
          <div class="product-card">
            <div class="tddata">
              <div class="disc">-25%</div>

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
              <h3 class="data">${v.name}</h3>
              <div class="dataset-prices">
                <span class="dis">₹10,000</span>
                <span class="disprice">₹${v.price}</span>
              </div>
              
              <button onclick="handleBuy('${v.id}')" class="buy">Buy Now</button>
            </div>
          </div>
        </div>
        `;
      }
    });

    document.getElementById("todatTop").innerHTML = print;

    // Initialize Swiper
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
    console.error("Error loading products:", error);
  }
};

document.addEventListener("DOMContentLoaded", productData);
document.addEventListener("DOMContentLoaded", productData);

const handleBuy = async () => {
  window.location = "product.html";
};

{
  /*  */
}

const handleLogin = () => {
  const uid = localStorage.getItem("userId");

  let print = ``;

  if (uid) {
    print += `<a href="" id="loged" onclick = "handleLogout()"><i class="fa-solid fa-arrow-right-from-bracket"></i></a>`;
  } else {
    print += `<a href="login.html" id="loged" onclick = "handleLogout()"><i class="fa-regular fa-user"></i></a>`;
  }

  document.getElementById("auth").innerHTML = print;
};

const handleLogout = () => {
  localStorage.removeItem("userId");

  window.location.href = "";
};

const newArrivals = async () => {
  let res = await fetch("http://localhost:3000/product");
  let data = await res.json();

  console.log(data);
  let print = `<div class="row g-4">`;

  data.map((v) => {
    console.log(v.tags);

    console.log(v.tags.find((v2) => v2 === "new"));

    let inc = v.tags.find((v2) => v2 === "new");

    if (inc !== undefined) {
      print += `
        <div class="col-sm-6 col-lg-3">
                    <div class="product-card">
                        <div class="product-image">
                            <img src="admin/images/category_img/${v.image[0]}" alt="">
                        </div>

                        <div class="product-info">
                            <h5>${v.name}</h5>
                            <div class="rating">★★★★★</div>
                            <div class="price">
                                <span class="old-price">$1000</span>
                                <span class="new-price">${v.price}</span>
                            </div>
                        </div>
                    </div>
                </div>`;
    }
  });

  document.getElementById("newarrivals").innerHTML = print;
};

const Summer = () => {
    console.log('helloo summer');
    localStorage.setItem("Season", "Summer");
    window.location.href = 'product.html'
}

const Monsoon = () => {
    console.log('helloo Monsoon');
    localStorage.setItem("Season", "Monsoon");
    window.location.href = 'product.html'
}

const Winter = () => {
    console.log('helloo Winter');
    localStorage.setItem("Season", "Winter");
    window.location.href = 'product.html'
}

window.onload =async () => {
  catData();
  await productData();
  newArrivals();
  handleLogin();
//   detail()
};
