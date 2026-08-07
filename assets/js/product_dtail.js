const handleBuyProduct = async () => {
    let id = localStorage.getItem("productId");
    let res = await fetch(`http://localhost:3000/product/${id}`);
    let data = await res.json();

    let slidesHtml = data.image.map((v) => `
        <div class="swiper-slide">
            <img src="admin/images/category_img/${v}" alt="${data.name}">
        </div>
    `);

    let print = `
        <!-- Product Details Main Row -->
        <div class="col-lg-6">
            <div class="productImg">
                <div class="swiper hero">
                    <div class="swiper-wrapper">
                        ${slidesHtml.join('')}
                    </div>
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-button-next"></div>
                    <div class="swiper-pagination"></div>
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
                    <i class="fa-solid fa-star-half-stroke"></i>
                    <span>(125 Reviews)</span>
                </div>

                <div class="priceArea">
                    <span class="oldPrice">$1000</span>
                    <span class="newPrice">$${data.price}</span>
                </div>

                <p class="product-description">${data.desc}</p>

                <div class="quantityArea mb-3">
                    <label class="fw-semibold d-block mb-2">Quantity:</label>
                    <div class="sizeBtn">
                        <button onclick="handleDEC()" type="button">-</button>
                        <span id="qtty">1</span>
                        <button onclick="handleINC()" type="button">+</button>
                    </div>
                </div>

                <div class="cartBtn">
                    <button class="btn btn-dark" onclick="addtoCart()" type="button">Add To Cart</button>
                    <button class="btn btn-danger" type="button" onclick="buy()">Buy Now</button>
                </div>
            </div>
        </div>

        <!-- Review System Section UI -->
        <div class="col-12 mt-5">
            <div class="reviews-section p-4 rounded border bg-white shadow-sm">
                <h3 class="mb-4 font-bold">Customer Reviews</h3>
                
                <div class="row g-4">
                    <!-- Rating Summary -->
                    <div class="col-md-4 text-center border-end">
                        <div class="display-4 fw-bold text-dark">4.8</div>
                        <div class="rating text-warning my-2">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star-half-stroke"></i>
                        </div>
                        <p class="text-muted">Based on 125 reviews</p>

                        <div class="rating-bars mt-3 text-start px-3">
                            <div class="d-flex align-items-center gap-2 mb-1">
                                <small>5 ★</small>
                                <div class="progress flex-grow-1" style="height: 6px;">
                                    <div class="progress-bar bg-warning" style="width: 80%"></div>
                                </div>
                                <small class="text-muted">80%</small>
                            </div>
                            <div class="d-flex align-items-center gap-2 mb-1">
                                <small>4 ★</small>
                                <div class="progress flex-grow-1" style="height: 6px;">
                                    <div class="progress-bar bg-warning" style="width: 15%"></div>
                                </div>
                                <small class="text-muted">15%</small>
                            </div>
                            <div class="d-flex align-items-center gap-2 mb-1">
                                <small>3 ★</small>
                                <div class="progress flex-grow-1" style="height: 6px;">
                                    <div class="progress-bar bg-warning" style="width: 3%"></div>
                                </div>
                                <small class="text-muted">3%</small>
                            </div>
                            <div class="d-flex align-items-center gap-2 mb-1">
                                <small>2 ★</small>
                                <div class="progress flex-grow-1" style="height: 6px;">
                                    <div class="progress-bar bg-warning" style="width: 1%"></div>
                                </div>
                                <small class="text-muted">1%</small>
                            </div>
                            <div class="d-flex align-items-center gap-2">
                                <small>1 ★</small>
                                <div class="progress flex-grow-1" style="height: 6px;">
                                    <div class="progress-bar bg-warning" style="width: 1%"></div>
                                </div>
                                <small class="text-muted">1%</small>
                            </div>
                        </div>
                    </div>

                    <!-- Review Form & User Reviews -->
                    <div class="col-md-8">
                        <!-- Write a Review Form UI -->
                        <div class="add-review-card p-3 mb-4 rounded border bg-light">
                            <h5 class="mb-3">Write a Review</h5>
                            <form onsubmit="return false;">
                                <div class="mb-2">
                                    <label class="form-label mb-1">Your Rating:</label>
                                    <div class="star-rating-input text-warning fs-5">
                                        <i class="fa-regular fa-star" role="button"></i>
                                        <i class="fa-regular fa-star" role="button"></i>
                                        <i class="fa-regular fa-star" role="button"></i>
                                        <i class="fa-regular fa-star" role="button"></i>
                                        <i class="fa-regular fa-star" role="button"></i>
                                    </div>
                                </div>
                                <div class="mb-2">
                                    <textarea class="form-control" rows="3" placeholder="Share your experience with this product..."></textarea>
                                </div>
                                <button type="submit" class="btn btn-dark btn-sm">Submit Review</button>
                            </form>
                        </div>

                        <!-- Sample Customer Review Cards -->
                        <div class="user-reviews-list">
                            <div class="review-item pb-3 mb-3 border-bottom">
                                <div class="d-flex justify-content-between align-items-center mb-1">
                                    <h6 class="mb-0 fw-bold">Alex Johnson</h6>
                                    <small class="text-muted">2 days ago</small>
                                </div>
                                <div class="rating text-warning mb-2" style="font-size: 0.8rem;">
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                </div>
                                <p class="mb-0 text-secondary" style="font-size: 0.95rem;">Excellent quality and fitting! The delivery was also super fast.</p>
                            </div>

                            <div class="review-item pb-3 mb-3 border-bottom">
                                <div class="d-flex justify-content-between align-items-center mb-1">
                                    <h6 class="mb-0 fw-bold">Sarah M.</h6>
                                    <small class="text-muted">1 week ago</small>
                                </div>
                                <div class="rating text-warning mb-2" style="font-size: 0.8rem;">
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                </div>
                                <p class="mb-0 text-secondary" style="font-size: 0.95rem;">Great material, exactly like shown in the picture.</p>
                            </div>
                        </div>
                    </div>
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
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        loop: true,
    });
}

const handleINC = () => {
    let qtty = parseInt(document.getElementById("qtty").innerHTML);

    qtty++;

    if (qtty <= 10) {
        document.getElementById("qtty").innerHTML = qtty;
    }
}

const handleDEC = () => {
    let qtty = parseInt(document.getElementById("qtty").innerHTML);

    qtty--;

    if (qtty >= 1) {
        document.getElementById("qtty").innerHTML = qtty;
    }
}

const addtoCart = async () => {
    const userId = localStorage.getItem('userId');
    const productId = localStorage.getItem('productId');

    let qtty = parseInt(document.getElementById("qtty").innerHTML);

    let addtoCart = {
        userId: userId,
        items: [
            { productId: productId, qtty: parseInt(qtty) }
        ]
    }
    let res = await fetch('http://localhost:3000/cart')
    let data = await res.json()
    let userCartData = data.filter((v) => v.userId === userId)

    let cartData = userCartData.find((v) => !v.status)

    if (cartData) {
        let newProductIndex = cartData?.items?.findIndex((v) => v.productId === productId);

        if (newProductIndex < 0) {
            cartData.items.push({ productId: productId, qtty: parseInt(qtty) })
        } else {
            cartData.items[newProductIndex].qtty += qtty;
        }

        await fetch(`http://localhost:3000/cart/${cartData.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cartData)
        })

        localStorage.setItem('cartId', cartData.id)
    } else {
        const res = await fetch("http://localhost:3000/cart", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(addtoCart)
        })

        const data = await res.json()

        localStorage.setItem('cartId', data.id)
    }

    existingQtty()
}

const existingQtty = async () => {
    let cartId = localStorage.getItem("cartId")
    let qttyres = await fetch(`http://localhost:3000/cart/${cartId}`)
    let qttydata = await qttyres.json()

    if (!qttydata?.status) {
        let qtty = qttydata?.items?.reduce((acc, v) => acc + v.qtty, 0)
        document.getElementById("cartCount").innerHTML = qtty
    }
}

const buy = () => {
    window.location.href = "cart.html"
}

window.onload = async () => {
    handleBuyProduct();
    existingQtty();
};