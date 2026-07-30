
const handleBuy = async (id) => {
    
    localStorage.setItem("productId", id);

    window.location = "product_detail.html"


}

const handleProduct = async () => {

    let res = await fetch("http://localhost:3000/product")
    let data = await res.json()

    let print = ``
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
</div>`
    })
    document.getElementById("todatTop").innerHTML = print
}
window.onload = () => {
    handleProduct()
}