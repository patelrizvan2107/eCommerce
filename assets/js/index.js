// all category get cdata

//cdata map   v  prin +=

{/* <div class="col-sm-6 col-md-4 col-lg-3 col-xl-2">
                            <div class="data">
                                <a href>
                                    <img src="assets/image/cate-1.jpg" alt>
                                    <h2 class="data">Outwear</h2>
                                </a>
                            </div>

                        </div> */}

const catData = async () => {
    const res = await fetch("http://localhost:3000/category")
    const data = await res.json();

    let print  = ``

    data.map((v) => {
        print += ` 
        <div class="col-6 col-md-4 col-lg-2">
                    <div class="category-card">
                        <img src="./admin/images/category_img/${v.image}" alt="">
                        <h5>${v.name}</h5>
                    </div>
                </div>
        `
    });
    document.getElementById("catData").innerHTML = print;
}
const productData = async () => {
    let res = await fetch ("http://localhost:3000/product")
    let data = await res.json();

    let print = ``;

    data.map((v) => {
        print += `
           <div class="col-sm-6 col-lg-3">

                    <div class="product-card">

                        <div class="product-image">
                            <span class="discount">-25%</span>
                            <img src="./admin/images/category_img/${v.image}" alt="">
                        </div>

                        <div class="product-info">

                            <h5>${v.name}</h5>

                            <div class="rating">
                                ★★★★★
                            </div>

                            <div class="price">
                                <span class="old-price">$99</span>
                                <span class="new-price">$69</span>
                            </div>

                        </div>

                    </div>

                </div>
        `
    })
    document.getElementById("todatTop").innerHTML = print;
}

window.onload = () => {
    catData();
    productData();
}