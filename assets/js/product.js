const handleBuy = async (id) => {
  localStorage.setItem("productId", id);
  window.location = "product_detail.html";
};

const handleProduct = async (e, id) => {
  let res = await fetch("http://localhost:3000/product");
  let data = await res.json();

  let season = localStorage.getItem("Season");

  let print = ``;

  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  let value = params.type;
  console.log(value);
  

  if (value === 'product') {
    data.map((v) => {
      print += `<div class="col-12 col-sm-6 col-lg-3">
    <div class="product-card">
        <div class="tddata">
            <span class="disc">-25%</span>
            <img src="./admin/images/category_img/${v.image[0]}" alt="${v.name}">
        </div>
        
        <div class="dataset">
            <h2 class="data">${v.name}</h2>
            
            <div class="dataset-prices">
                <span class="dis">$99.99</span>
                <span class="disprice">${v.price}</span>
            </div>
            
            <button type="button" onclick="handleBuy('${v.id}')" class="buy">Buy Now</button>
        </div>
    </div>
</div>`;
    });
  } else if (value) {
    if (season === "Summer") {
      data.map((v) => {
        let inc = v.tags.find((v2) => v2 === "summer");

        if (inc !== undefined) {
          print += `<div class="col-12 col-sm-6 col-lg-3">
    <div class="product-card">
        <div class="tddata">
            <span class="disc">-25%</span>
            <img src="./admin/images/category_img/${v.image[0]}" alt="${v.name}">
        </div>
        
        <div class="dataset">
            <h2 class="data">${v.name}</h2>
            
            <div class="dataset-prices">
                <span class="dis">$99.99</span>
                <span class="disprice">${v.price}</span>
            </div> 
            <button type="button" onclick="handleBuy('${v.id}')" class="buy">Buy Now</button>
        </div>
    </div>
</div>`;
        }
      });
    } else if (season === "Monsoon") {
      data.map((v) => {
        let inc = v.tags.find((v2) => v2 === "monsoon");

        if (inc !== undefined) {
          print += `<div class="col-12 col-sm-6 col-lg-3">
    <div class="product-card">
        <div class="tddata">
            <span class="disc">-25%</span>
            <img src="./admin/images/category_img/${v.image[0]}" alt="${v.name}">
        </div>
        
        <div class="dataset">
            <h2 class="data">${v.name}</h2>
            
            <div class="dataset-prices">
                <span class="dis">$99.99</span>
                <span class="disprice">${v.price}</span>
            </div>
            
            <button type="button" onclick="handleBuy('${v.id}')" class="buy">Buy Now</button>
        </div>
    </div>
</div>`;
        }
      });
    } else if (season === "Winter") {
      data.map((v) => {
        let inc = v.tags.find((v2) => v2 === "winter");

        if (inc !== undefined) {
          print += `<div class="col-12 col-sm-6 col-lg-3">
    <div class="product-card">
        <div class="tddata">
            <span class="disc">-25%</span>
            <img src="./admin/images/category_img/${v.image[0]}" alt="${v.name}">
        </div>
        
        <div class="dataset">
            <h2 class="data">${v.name}</h2>
            
            <div class="dataset-prices">
                <span class="dis">$99.99</span>
                <span class="disprice">${v.price}</span>
            </div>
            
            <button type="button" onclick="handleBuy('${v.id}')" class="buy">Buy Now</button>
        </div>
    </div>
</div>`;
        }
      });
    }
  } else {
    data.map((v) => {
      print += `<div class="col-12 col-sm-6 col-lg-3">
    <div class="product-card">
        <div class="tddata">
            <span class="disc">-25%</span>
            <img src="./admin/images/category_img/${v.image[0]}" alt="${v.name}">
        </div>
        
        <div class="dataset">
            <h2 class="data">${v.name}</h2>
            
            <div class="dataset-prices">
                <span class="dis">$99.99</span>
                <span class="disprice">${v.price}</span>
            </div>
            
            <button type="button" onclick="handleBuy('${v.id}')" class="buy">Buy Now</button>
        </div>
    </div>
</div>`;
    });
  }

  document.getElementById("todatTop").innerHTML = print;
};

const handleCategory = async (categoryId) => {
  let cat = await fetch(`http://localhost:3000/product`);
  let catData = await cat.json();

  let print = ``;

  let allCatData = catData.filter((c) => c.category === categoryId);

  allCatData.map((v) => {
    print += `<div class="col-12 col-sm-6 col-lg-3">
    <div class="product-card">
        <div class="tddata">
            <span class="disc">-25%</span>
            <img src="./admin/images/category_img/${v.image[0]}" alt="${v.name}">
        </div>
        
        <div class="dataset">
            <h2 class="data">${v.name}</h2>
            
            <div class="dataset-prices">
                <span class="dis">$99.99</span>
                <span class="disprice">${v.price}</span>
            </div>
            
            <button type="button" onclick="handleBuy('${v.id}')" class="buy">Buy Now</button>
        </div>
    </div>
</div>`;
  });

  document.getElementById("todatTop").innerHTML = print;
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
  handleCategory();
  handleLogin();

  const params2 = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  let value = params2.type || params2.category || params2.season;

  if (value) {
    if (value === "product") {
      handleProduct();
    } else if (value === "season") {
      handleProduct();
    } else {
      handleCategory(value);
    }
  } else {
    handleProduct();
  }
};