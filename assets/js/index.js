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
        <div class="col-sm-6 col-md-4 col-lg-3 col-xl-2">
                            <div class="data">
                                <a href>
                                    <img src="./admin/images/category_img/${v.image}" alt>
                                    <h2 class="data">${v.name}</h2>
                                </a>
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
                                <a href class="colr"><span class="rd"></span></a>
                            </div>
                        </div>
        `
    })
    document.getElementById("todatTop").innerHTML = print
}

window.onload = () => {
    catData();
    productData();
}