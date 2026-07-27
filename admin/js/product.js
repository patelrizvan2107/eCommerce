let update = null;
let tagArr = [];
const handleCatSubCat = async () => {
  const res = await fetch("http://localhost:3000/category");
  const data = await res.json();
  console.log(data);

  let print = `<option value="null">Select Category</option>`;
  data.map((v, i) => {
    console.log(v.name);

    print += `
        <option value = "${v.id}">${v.name}</option>
        `;
  });

  document.getElementById("categorySelect").innerHTML = print;

  const res2 = await fetch("http://localhost:3000/subCategory");
  const data2 = await res2.json();
  console.log(data2);

  let print2 = `<option value="null">Select SubCategory</option>`;
  data2.map((v2, i2) => {
    console.log(v2.name);

    print2 += `
        <option value = "${v2.id}">${v2.name}</option>
        `;
  });

  document.getElementById("subcategorySelect").innerHTML = print2;
};

const handleSubmit = async (id, id2) => {
  event.preventDefault();
  let category = document.getElementById("categorySelect").value;
  let subCategory = document.getElementById("subcategorySelect").value;
  let name = document.getElementById("productName").value;
  let desc = document.getElementById("productDesc").value;
  let image = document.getElementById("productImage").files[0];
  // console.log(category, subCategory);
  document.querySelectorAll("input[name='tags']:checked").forEach((cb) => {
    tagArr.push(cb.value);

    console.log(tagArr);
  });
  let formErr = false;

  if (category === "null") {
    document.getElementById("categoryError").innerHTML = "Select Category";
    formErr = true;
  } else {
    document.getElementById("categoryError").innerHTML = "";
  }
  if (subCategory === "null") {
    document.getElementById("subcategoryError").innerHTML =
      "Select SubCategory";
    formErr = true;
  } else {
    document.getElementById("subcategoryError").innerHTML = "";
  }
  if (name === "" || !isNaN(name)) {
    document.getElementById("nameError").innerHTML = "Please enter Produc name";
    formErr = true;
  } else {
    document.getElementById("nameError").innerHTML = "";
  }

  if (desc === "") {
    document.getElementById("descError").innerHTML =
      "Please enter category description";
    formErr = true;
  } else {
    document.getElementById("descError").innerHTML = "";
  }

  if (!image) {
    if (update === null) {
      document.getElementById("imageError").innerHTML =
        "Please upload an image";
      formErr = true;
    }
  } else {
    const imgtype = ["image/jpg", "image/png", "image/jpeg"];
    if (!imgtype.includes(image.type)) {
      document.getElementById("imageError").innerHTML =
        "Allowed formats: jpg, png, jpeg";
      formErr = true;
    } else if (image.size > 2 * 1024 * 1024) {
      document.getElementById("imageError").innerHTML =
        "Image must be less than 2 MB";
      formErr = true;
    } else {
      document.getElementById("imageError").innerHTML = "";
    }
  }

  if (formErr === false) {
    let edtImage = document.getElementById("updateImage");
    let arr = edtImage.src.split("/");
    console.log(arr.length - 1);

    let productObj = {
      category,
      subCategory,
      name,
      desc,
      image: image?.name ? image?.name : arr[arr.length - 1],
      tags: tagArr,
    };
    if (update != null) {
      await fetch(`http://localhost:3000/product/${update}`, {
        method: "Put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productObj),
      });
      update = null;
    } else {
      await fetch("http://localhost:3000/product", {
        method: "Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productObj),
      });
    }
  }
};
const hanldeMulImage = (img) => {
  event.preventDefault();
  console.log("hiii");

  const allImg = document.getElementById("allImage");

  const divEl = document.createElement("div");
  divEl.setAttribute("class", "addDel");

  const addImg = document.createElement("input");
  addImg.setAttribute("type", "file");
  addImg.setAttribute("id", "productImage");

  const addbtn = document.createElement("button");
  addbtn.setAttribute("class", "addDelCss");
  addbtn.setAttribute("onclick", "hanldeMulImage()");
  addbtn.textContent = "+";

  const delbtn = document.createElement("button");
  delbtn.textContent = "-";
  delbtn.setAttribute("class", "addDelCss");

  delbtn.addEventListener("click", function () {
    divEl.remove();
  });

  // const mainImg = document.getElementById("productImage");
  // mainImg.setAttribute("src", `./images/category_img/${img}`)

  const preimg = document.createElement('img');
  preimg.setAttribute("src", `./images/category_img/${img}`)
  preimg.setAttribute("class", "preview-image");
  preimg.setAttribute("name", "updateImage")
  preimg.setAttribute("id", "updateImage")

  addImg.addEventListener('change', function () {

    console.log('kjbbfdjsd vm d.');

    preimg.setAttribute("src", `./images/category_img/${preimg.files[0].name}`)

  })

  divEl.appendChild(addImg);
  divEl.appendChild(delbtn);
  divEl.appendChild(addbtn);
  divEl.appendChild(preimg) 
  allImg.appendChild(divEl);
};
const handleDisplay = async () => {
  let res = await fetch("http://localhost:3000/product");
  let data = await res.json();
  let print = ``;
  let res2 = await fetch("http://localhost:3000/category");
  let data2 = await res2.json();
  let res3 = await fetch("http://localhost:3000/subCategory");
  let data3 = await res3.json();

  console.log('categoty',data2);
  console.log("subbb",data3);
  
  
  data.map((v, i) => {
    let catData = data2.find((v2) => 
      v2.id === v.category
      
    );
    let subCatData = data3.find((v3) => v3.id === v.subCategory);

    print += `
    <tr>
      <td>${i + 1}</td>
      <td>${catData?.name}</td>
      <td>${subCatData?.name}</td>
      <td>${v.name}</td>
      <td>${v.desc}</td>
      <td><img src = "./images/category_img/${v.image}"</td>
      <td><button onClick= "del('${v.id}')" class="delete-btn"><i class="fa-solid fa-trash"></i></button><button class="edit-btn"onClick= "edit('${v.id}')"><i class="fa-solid fa-pen-to-square"><i></button></td>

      </tr>
    `;
  });
  document.getElementById("productTable").innerHTML = print;
};
const del = async (id) => {
  await fetch(`http://localhost:3000/product/${id}`, {
    method: "Delete",
  });
};

const edit = async (id) => {
  event.preventDefault();

  const res = await fetch(`http://localhost:3000/product/${id}`);
  const data = await res.json();
  console.log(data.name);
  console.log(data.category);

  document.getElementById("allImage").innerHTML = '';

  for (let i = 0; i < data.image.length; i++) {
    hanldeMulImage(data.image[i]);

  }

  // console.log(data.subCategory);

  document.getElementById("categorySelect").value = data.category;
  document.getElementById("subcategorySelect").value = data.subCategory;
  document.getElementById("productName").value = data.name;
  document.getElementById("productDesc").value = data.desc;
  document.getElementById("updateImage").src =
    "./images/category_img/" + data.image;

  update = id;

};

const productForm = document.getElementById("productForm");
productForm.addEventListener("submit", function () {
  handleSubmit();
});

window.onload = function () {
  handleCatSubCat();
  handleDisplay();
};

const image = document.getElementById("productImage");
image.addEventListener("change", function () {
  document.getElementById("updateImage").src =
    "./images/category_img/" + image?.files[0]?.name;
});
