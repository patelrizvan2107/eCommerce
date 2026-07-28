// let update = null;
// let tagArr = [];
// const handleCatSubCat = async () => {
//   const res = await fetch("http://localhost:3000/category");
//   const data = await res.json();
//   console.log(data);

//   let print = `<option value="null">Select Category</option>`;
//   data.map((v, i) => {
//     console.log(v.name);

//     print += `
//         <option value = "${v.id}">${v.name}</option>
//         `;
//   });

//   document.getElementById("categorySelect").innerHTML = print;

//   const res2 = await fetch("http://localhost:3000/subCategory");
//   const data2 = await res2.json();
//   console.log(data2);

//   let print2 = `<option value="null">Select SubCategory</option>`;
//   data2.map((v2, i2) => {
//     console.log(v2.name);

//     print2 += `
//         <option value = "${v2.id}">${v2.name}</option>
//         `;
//   });

//   document.getElementById("subcategorySelect").innerHTML = print2;
// };

// const handleSubmit = async (id, id2) => {
//   event.preventDefault();
//   let category = document.getElementById("categorySelect").value;
//   let subCategory = document.getElementById("subcategorySelect").value;
//   let name = document.getElementById("productName").value;
//   let desc = document.getElementById("productDesc").value;
//   // let image = document.getElementById("productImage").files[0];

//   // console.log(category, subCategory);


//   let image = document.querySelectorAll("input[type ='file']");
//   const filePath = document.getElementsByName('updateImage');

//   document.querySelectorAll("input[name='tags']:checked").forEach((cb) => {
//     tagArr.push(cb.value);

//     console.log(tagArr);
//   });
//   let formErr = false;

//   if (category === "null") {
//     document.getElementById("categoryError").innerHTML = "Select Category";
//     formErr = true;
//   } else {
//     document.getElementById("categoryError").innerHTML = "";
//   }
//   if (subCategory === "null") {
//     document.getElementById("subcategoryError").innerHTML =
//       "Select SubCategory";
//     formErr = true;
//   } else {
//     document.getElementById("subcategoryError").innerHTML = "";
//   }
//   if (name === "" || !isNaN(name)) {
//     document.getElementById("nameError").innerHTML = "Please enter Produc name";
//     formErr = true;
//   } else {
//     document.getElementById("nameError").innerHTML = "";
//   }

//   if (desc === "") {
//     document.getElementById("descError").innerHTML =
//       "Please enter category description";
//     formErr = true;
//   } else {
//     document.getElementById("descError").innerHTML = "";
//   }

//   // if (!image) {
//   //   if (update === null) {
//   //     document.getElementById("imageError").innerHTML =
//   //       "Please upload an image";
//   //     formErr = true;
//   //   }
//   // } else {
//   //   const imgtype = ["image/jpg", "image/png", "image/jpeg"];
//   //   if (!imgtype.includes(image.type)) {
//   //     document.getElementById("imageError").innerHTML =
//   //       "Allowed formats: jpg, png, jpeg";
//   //     formErr = true;
//   //   } else if (image.size > 2 * 1024 * 1024) {
//   //     document.getElementById("imageError").innerHTML =
//   //       "Image must be less than 2 MB";
//   //     formErr = true;
//   //   } else {
//   //     document.getElementById("imageError").innerHTML = "";
//   //   }
//   // }

//   if (formErr === false) {
//     let edtImage = document.getElementById("updateImage");
//     let arr = edtImage.src.split("/");
//     console.log(arr.length - 1);

//     let productObj = {
//       category,
//       subCategory,
//       name,
//       desc,
//       image: image?.name ? image?.name : arr[arr.length - 1],
//       tags: tagArr,
//     };
//     if (update != null) {
//       await fetch(`http://localhost:3000/product/${update}`, {
//         method: "Put",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(productObj),
//       });
//       update = null;
//     } else {
//       await fetch("http://localhost:3000/product", {
//         method: "Post",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(productObj),
//       });
//     }
//   }
// };
// const hanldeMulImage = (img) => {
//   event.preventDefault();
//   console.log("hiii");

//   const allImg = document.getElementById("allImage");

//   const divEl = document.createElement("div");
//   divEl.setAttribute("class", "addDel");

//   const addImg = document.createElement("input");
//   addImg.setAttribute("type", "file");
//   addImg.setAttribute("id", "productImage");

//   const addbtn = document.createElement("button");
//   addbtn.setAttribute("class", "addDelCss");
//   addbtn.setAttribute("onclick", "hanldeMulImage()");
//   addbtn.textContent = "+";

//   const delbtn = document.createElement("button");
//   delbtn.textContent = "-";
//   delbtn.setAttribute("class", "addDelCss");

//   delbtn.addEventListener("click", function () {
//     divEl.remove();
//   });

//   // const mainImg = document.getElementById("productImage");
//   // mainImg.setAttribute("src", `./images/category_img/${img}`)

//   const preimg = document.createElement('img');
//   preimg.setAttribute("src", `./images/category_img/${img}`)
//   preimg.setAttribute("class", "preview-image");
//   preimg.setAttribute("name", "updateImage")
//   preimg.setAttribute("id", "updateImage")

//   addImg.addEventListener('change', function () {

//     console.log('kjbbfdjsd vm d.');

//     preimg.setAttribute("src", `./images/category_img/${preimg.files[0].name}`)

//   })

//   divEl.appendChild(addImg);
//   divEl.appendChild(delbtn);
//   divEl.appendChild(addbtn);
//   divEl.appendChild(preimg)
//   allImg.appendChild(divEl);

// };

// const handleDisplay = async () => {
//   event.preventDefault();

//   let res = await fetch("http://localhost:3000/product");
//   let data = await res.json();
//   let print = ``;
//   let res2 = await fetch("http://localhost:3000/category");
//   let data2 = await res2.json();
//   let res3 = await fetch("http://localhost:3000/subCategory");
//   let data3 = await res3.json();

//   console.log("categoty", data2);
//   console.log("subbb", data3);

//   data.map((v, i) => {
//     let catData = data2.find((v2) => v2.id === v.category);
//     let subCatData = data3.find((v3) => v3.id === v.subCategory);

//    print += `
//     <tr>
//       <td>${i + 1}</td>
//       <td>${catData?.name}</td>
//       <td>${subCatData?.name}</td>
//       <td>${v.name}</td>
//       <td>${v.desc}</td>
//       <td>`;

//     v.image.map((v1) => {
//       console.log(v1);

//       print += `<img src = "./images/category_img/${v1}" />`
//     })

//     print += `</td>
//       <td><button onClick= "del('${v.id}')" class="delete-btn"><i class="fa-solid fa-trash"></i></button><button class="edit-btn"onClick= "edit('${v.id}')"><i class="fa-solid fa-pen-to-square"><i></button></td>

//       </tr>
//     `;
//   });
//   document.getElementById("productTable").innerHTML = print;
// };
// const del = async (id) => {
//   await fetch(`http://localhost:3000/product/${id}`, {
//     method: "Delete",
//   });
// };

// const edit = async (id) => {
//   event.preventDefault();

//   const res = await fetch(`http://localhost:3000/product/${id}`);
//   const data = await res.json();
//   console.log(data.name);
//   console.log(data.category);

//   document.getElementById("allImage").innerHTML = '';

//   for (let i = 0; i < data.image.length; i++) {
//     hanldeMulImage(data.image[i]);

//   }

//   // console.log(data.subCategory);

//   document.getElementById("categorySelect").value = data.category;
//   document.getElementById("subcategorySelect").value = data.subCategory;
//   document.getElementById("productName").value = data.name;
//   document.getElementById("productDesc").value = data.desc;
//   document.getElementById("updateImage").src =
//     "./images/category_img/" + data.image;

//   update = id;

// };

// const productForm = document.getElementById("productForm");
// productForm.addEventListener("submit", function () {
//   handleSubmit();
// });

// window.onload = function () {
//   handleCatSubCat();
//   handleDisplay();
// };

// const image = document.getElementById("productImage");
// image.addEventListener("change", function () {
//   document.getElementById("updateImage").src =
//     "./images/category_img/" + image?.files[0]?.name;
// });


let update = null;

// Populate Category & Subcategory dropdowns
const handleCatSubCat = async () => {
  try {
    const res = await fetch("http://localhost:3000/category");
    const data = await res.json();

    let print = `<option value="null">Select Category</option>`;
    data.forEach((v) => {
      print += `<option value="${v.id}">${v.name}</option>`;
    });
    document.getElementById("categorySelect").innerHTML = print;

    const res2 = await fetch("http://localhost:3000/subCategory");
    const data2 = await res2.json();

    let print2 = `<option value="null">Select SubCategory</option>`;
    data2.forEach((v2) => {
      print2 += `<option value="${v2.id}">${v2.name}</option>`;
    });
    document.getElementById("subcategorySelect").innerHTML = print2;
  } catch (err) {
    console.error("Error loading categories/subcategories:", err);
  }
};

// Handle Form Submission (Add / Update Product)
const handleSubmit = async (event) => {
  if (event) event.preventDefault();

  let category = document.getElementById("categorySelect").value;
  let subCategory = document.getElementById("subcategorySelect").value;
  let name = document.getElementById("productName").value.trim();
  let price = document.getElementById("productPrice").value.trim(); // Added price
  let desc = document.getElementById("productDesc").value.trim();

  // Read Tag Checkboxes
  let tagArr = [];
  document.querySelectorAll("input[name='tags']:checked").forEach((cb) => {
    tagArr.push(cb.id);
  });

  // Read Images
  let imagesArr = [];
  const imageDivs = document.querySelectorAll("#allImage .addDel");

  if (imageDivs.length > 0) {
    imageDivs.forEach((div) => {
      const fileInput = div.querySelector("input[type='file']");
      const imgPreview = div.querySelector("img");

      if (fileInput && fileInput.files[0]) {
        imagesArr.push(fileInput.files[0].name);
      } else if (imgPreview && imgPreview.src) {
        let parts = imgPreview.src.split("/");
        let filename = parts[parts.length - 1];
        if (filename && !filename.includes("null")) {
          imagesArr.push(filename);
        }
      }
    });
  } else {
    // Fallback for default main image input if no dynamic rows exist
    const mainImgInput = document.getElementById("productImage");
    const mainImgPreview = document.getElementById("updateImage");

    if (mainImgInput && mainImgInput.files[0]) {
      imagesArr.push(mainImgInput.files[0].name);
    } else if (mainImgPreview && mainImgPreview.src) {
      let parts = mainImgPreview.src.split("/");
      let filename = parts[parts.length - 1];
      if (filename) imagesArr.push(filename);
    }
  }

  console.log(imagesArr);
  

  // --- Form Validation ---
  let formErr = false;

  if (category === "null") {
    document.getElementById("categoryError").innerText = "Select Category";
    formErr = true;
  } else {
    document.getElementById("categoryError").innerText = "";
  }

  if (subCategory === "null") {
    document.getElementById("subcategoryError").innerText = "Select SubCategory";
    formErr = true;
  } else {
    document.getElementById("subcategoryError").innerText = "";
  }

  if (name === "") {
    document.getElementById("nameError").innerText = "Please enter product name";
    formErr = true;
  } else {
    document.getElementById("nameError").innerText = "";
  }

  if (price === "" || isNaN(price) || parseFloat(price) < 0) {
    document.getElementById("priceError").innerText = "Please enter a valid price";
    formErr = true;
  } else {
    document.getElementById("priceError").innerText = "";
  }

  if (desc === "") {
    document.getElementById("descError").innerText = "Please enter description";
    formErr = true;
  } else {
    document.getElementById("descError").innerText = "";
  }

  if (imagesArr.length === 0) {
    document.getElementById("imageError").innerText = "Please upload at least one image";
    formErr = true;
  } else {
    document.getElementById("imageError").innerText = "";
  }

  // --- API Request ---
  if (!formErr) {
    let productObj = {
      category,
      subCategory,
      name,
      price: parseFloat(price),
      desc,
      image: imagesArr,
      tags: tagArr,
    };

    if (update !== null) {
      await fetch(`http://localhost:3000/product/${update}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productObj),
      });
      update = null;
    } else {
      await fetch("http://localhost:3000/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productObj),
      });
    }

    // Reset Form & Re-render Table
    document.getElementById("productForm").reset();
    document.getElementById("allImage").innerHTML = "";
    document.getElementById("updateImage").src = "";
    handleDisplay();
  }
};

// Dynamic Multiple Image Generator
const hanldeMulImage = (imgName = "") => {
  if (event && event.type === "click") event.preventDefault();

  const allImg = document.getElementById("allImage");

  const divEl = document.createElement("div");
  divEl.setAttribute("class", "addDel");
  divEl.style.display = "flex";
  divEl.style.alignItems = "center";
  divEl.style.gap = "10px";
  divEl.style.marginBottom = "10px";

  const addImg = document.createElement("input");
  addImg.setAttribute("type", "file");

  const preimg = document.createElement("img");
  preimg.setAttribute("class", "preview-image");
  preimg.style.width = "50px";
  preimg.style.height = "50px";
  preimg.style.objectFit = "cover";

  if (imgName) {
    preimg.setAttribute("src", `./images/category_img/${imgName}`);
  }

  addImg.addEventListener("change", function () {
    if (addImg.files && addImg.files[0]) {
      preimg.src = `./images/category_img/${addImg.files[0].name}`;
    }
  });

  const delbtn = document.createElement("button");
  delbtn.textContent = "-";
  delbtn.setAttribute("type", "button");
  delbtn.setAttribute("class", "addDelCss");

  delbtn.addEventListener("click", function () {
    divEl.remove();
  });

  divEl.appendChild(addImg);
  divEl.appendChild(preimg);
  divEl.appendChild(delbtn);
  allImg.appendChild(divEl);
};

// Fetch & Render Product List Table
const handleDisplay = async () => {
  try {
    let res = await fetch("http://localhost:3000/product");
    let data = await res.json();

    let res2 = await fetch("http://localhost:3000/category");
    let data2 = await res2.json();

    let res3 = await fetch("http://localhost:3000/subCategory");
    let data3 = await res3.json();

    let print = ``;

    data.forEach((v, i) => {
      let catData = data2.find((v2) => (v2.id) === (v.category));
      let subCatData = data3.find((v3) => (v3.id) === (v.subCategory));

      print += `
      <tr>
        <td>${i + 1}</td>
        <td>${catData ? catData.name : "-"}</td>
        <td>${subCatData ? subCatData.name : "-"}</td>
        <td>${v.name}</td>
        <td>$${v.price ? parseFloat(v.price).toFixed(2) : "0.00"}</td>
        <td>${v.desc}</td>
        <td>`;

      if ((v.image)) {
        v.image.map((img) => {
          print += `<img src="./images/category_img/${img}" style="width:40px; height:40px; object-fit:cover; margin-right:4px; border-radius:4px;" />`;
        });
      } else if (v.image) {
        print += `<img src="./images/category_img/${v.image}" style="width:40px; height:40px; object-fit:cover; border-radius:4px;" />`;
      }

      print += `</td>
        <td>
          <button onclick="edit('${v.id}')" class="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
          <button onclick="del('${v.id}')" class="delete-btn"><i class="fa-solid fa-trash"></i></button>
        </td>
      </tr>`;
    });

    document.getElementById("productTable").innerHTML = print;
  } catch (err) {
    console.error("Error fetching product list:", err);
  }
};

// Delete Product
const del = async (id) => {
  if (confirm("Are you sure you want to delete this product?")) {
    await fetch(`http://localhost:3000/product/${id}`, {
      method: "DELETE",
    });
    handleDisplay();
  }
};

// Edit Product
const edit = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/product/${id}`);
    const data = await res.json();

    document.getElementById("categorySelect").value = data.category;
    document.getElementById("subcategorySelect").value = data.subCategory;
    document.getElementById("productName").value = data.name;
    document.getElementById("productPrice").value = data.price || ""; // Populates price field
    document.getElementById("productDesc").value = data.desc;

    // Reset & Populate Checkboxes
    document.querySelectorAll("input[name='tags']").forEach((cb) => {
      cb.checked = data.tags ? data.tags.includes(cb.id) : false;
    });

    // Populate Dynamic Images
    document.getElementById("allImage").innerHTML = "";
    if (Array.isArray(data.image)) {
      data.image.forEach((imgName) => hanldeMulImage(imgName));
    } else if (data.image) {
      hanldeMulImage(data.image);
    }

    update = id;
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (err) {
    console.error("Error editing product:", err);
  }
};

// Event Listeners
document.getElementById("productForm").addEventListener("submit", handleSubmit);

// Default Main Image File Listener
const mainImageInput = document.getElementById("productImage");
if (mainImageInput) {
  mainImageInput.addEventListener("change", function () {
    if (this.files && this.files[0]) {
      document.getElementById("updateImage").src = "./images/category_img/" + this.files[0].name;
    }
  });
}

// Window Load Init
window.onload = function () {
  handleCatSubCat();
  handleDisplay();
};