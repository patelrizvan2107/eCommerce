
const handleBuy = async (id) => {
    
    localStorage.setItem("productId", id);

    window.location = "product_detail.html"


}

const handleProduct = async () => {

    let res = await fetch("http://localhost:3000/product")
    let data = await res.json()

    let print = ``
    data.map((v) => {
        print += `
            <div class="col-12 col-sm-6 col-lg-3">
                            <div class="tddata">
                                <div class="disc">
                                    25%-
                                </div>
                                <img src="./admin/images/category_img/${v.image}" alt>
                            </div>
                            <div class="dataset">
                                <h2 class="data">${v.name}</h2>
                                <span class="dis">$99.99</span><span class="disprice">$69.99</span><br>
                                <a href class="colr"><span class="bla"></span></a>
                                <a href class="colr"><span class="gr"></span></a>
                                <a href class="colr"><span class="rd"></span></a><br>
                                <button onclick= "handleBuy('${v.id}')" class = "buy" >Buy Now</button>
                            </div>
                        </div>
        `
    })
    document.getElementById("todatTop").innerHTML = print
}
window.onload = () => {
    handleProduct()
}