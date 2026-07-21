const handleBuyProduct = async () => {
    let id = localStorage.getItem("productId");
    let res = await fetch(`http://localhost:3000/product/${id}`);
    let data = await res.json();

    let slidesHtml = data.image.map((v) => `
        <div class="swiper-slide">
            <img src="./assets/image/${v}" alt="">
        </div>
    `);

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
                    <span class="oldPrice">$100</span>
                    <span class="newPrice">$75</span>
                </div>

                <p>${data.desc}</p>

                <h5>Available Colors</h5>
                <div class="colorBox">
                    <a href="#" class="colr active"><span class="bla"></span></a>
                    <a href="#" class="colr"><span class="gr"></span></a>
                    <a href="#" class="colr"><span class="rd"></span></a>
                </div>

                <h5>Available Sizes</h5>
                <div class="sizeBtn">
                    <button>S</button>
                    <button class="active">M</button>
                    <button>L</button>
                    <button>XL</button>
                </div>

                <div class="cartBtn">
                    <button class="btn btn-dark">Add To Cart</button>
                    <button class="btn btn-danger">Buy Now</button>
                </div>
            </div>
        </div>
    `;

    document.getElementById("productDetails").innerHTML = print;

    new Swiper('.swiper.hero', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        loop: true,
    });
}

window.onload = () => {
    handleBuyProduct();
}