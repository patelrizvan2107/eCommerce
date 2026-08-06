const handleBuy = async (id) => {
  localStorage.setItem("productId", id);

  window.location = "product_detail.html";
};

const handleProduct = async (e, id) => {
  let res = await fetch("http://localhost:3000/product");
  let data = await res.json();

  let season = localStorage.getItem("Season");

  let print = ``;

  // Source - https://stackoverflow.com/a/901144
  // Posted by Artem Barger, modified by community. See post 'Timeline' for change history
  // Retrieved 2026-08-03, License - CC BY-SA 4.0

  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
  let value = params.type; // "some_value"

  console.log(value, season);
    // "some_value"

  // "some_value"

  if (value) {
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
  else{
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
  }

  document.getElementById("todatTop").innerHTML = print;

//   localStorage.removeItem("Season");

};

const handleCategory = async(categoryId) => {

  let cat = await fetch (`http://localhost:3000/product`)
  let catData = await cat.json()

  console.log(catData);
  
  let print = ``;

 
    let allCatData = catData.filter((c) => c.category === categoryId)
    console.log(allCatData);
    
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
    })
  

  document.getElementById("todatTop").innerHTML = print;


}

window.onload = () => {
 
  handleCategory()

const params2 = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  let value = params2.type || params2.category;;

  console.log(value);

  if (value) {
    if (value === 'product') {
      handleProduct()
    } else {
      handleCategory(value)

    }
  } else {
     handleProduct()
  }
  




};
