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
  let price = document.getElementById("productPrice").value; // NEW: Get price
  let desc = document.getElementById("productDesc").value;
  let image = document.querySelectorAll("input[type='file']");

  let updateImage = document.getElementsByName("updateImage");

  let allpic = [];

  for(let i = 0; i < updateImage.length; i++) {

    let arr = updateImage[i].src.split("/")

    allpic.push(arr[arr.length - 1])

  }

  console.log(allpic);
  

  tagArr = [];
  document.querySelectorAll("input[name='tags']:checked").forEach((cb) => {
    tagArr.push(cb.value);
  });

  let formErr = false;

  if (category === "null") {
    document.getElementById("categoryError").innerHTML = "Select Category";
    formErr = true;
  } else {
    document.getElementById("categoryError").innerHTML = "";
  }

  if (subCategory === "null") {
    document.getElementById("subcategoryError").innerHTML = "Select SubCategory";
    formErr = true;
  } else {
    document.getElementById("subcategoryError").innerHTML = "";
  }

  if (name === "" || !isNaN(name)) {
    document.getElementById("nameError").innerHTML = "Please enter Product name";
    formErr = true;
  } else {
    document.getElementById("nameError").innerHTML = "";
  }

  if (price === "" || isNaN(price) || parseFloat(price) <= 0) {
    document.getElementById("priceError").innerHTML = "Please enter a valid price";
    formErr = true;
  } else {
    document.getElementById("priceError").innerHTML = "";
  }

  if (desc === "") {
    document.getElementById("descError").innerHTML = "Please enter description";
    formErr = true;
  } else {
    document.getElementById("descError").innerHTML = "";
  }

  if (formErr === false) {
    // let allpic = [];
    // for (let i = 0; i < image.length; i++) {
    //   if (image[i].files[0]?.name) {
    //     allpic.push(image[i].files[0].name);
    //   }
    // }

    let productObj = {
      category,
      subCategory,
      name,
      price: parseFloat(price), 
      desc,
      image: allpic,
      tags: tagArr,
    };

    if (update != null) {
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
  }
};
const hanldeMulImage = (img) => {
  // event.preventDefault()
  console.log("hiii");

  const allImg = document.getElementById("allImage");

  const divEl = document.createElement("div");
  divEl.setAttribute("class", "addDel");

  const addImg = document.createElement("input");
  addImg.setAttribute("type", "file");
  addImg.setAttribute("id", "productImage");

  const addbtn = document.createElement("button");
  addbtn.setAttribute("class", "addDelCss");
  addbtn.setAttribute("type", "button")
  addbtn.setAttribute("onclick", "hanldeMulImage()");
  addbtn.textContent = "+";
  
  const imgEl = document.createElement("img");
  imgEl.setAttribute("name", "updateImage");
  imgEl.setAttribute('class', "preview-image");
  console.log(img);
  
  imgEl.setAttribute('src', `./images/category_img/` + img)

  const delbtn = document.createElement("button");
  delbtn.textContent = "-";
  delbtn.setAttribute("class", "addDelCss");
  delbtn.setAttribute("type", "button")

  delbtn.addEventListener("click", function () {
    divEl.remove();
  });

  addImg.addEventListener('change', function () {
    console.log(imgEl);

    // imgEl.setAttribute("src", `./images/category_img/ + addImg.files[0].name`)

    imgEl.src = "./images/category_img/" +  addImg.files[0].name
    
  })

  divEl.appendChild(addImg);
  divEl.appendChild(delbtn);
  divEl.appendChild(addbtn);
  divEl.appendChild(imgEl);

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

  data.map((v, i) => {
    let catData = data2.find((v2) => v2.id === v.category);
    let subCatData = data3.find((v3) => v3.id === v.subCategory);

    print += `
    <tr>
      <td>${i + 1}</td>
      <td>${catData?.name}</td>
      <td>${subCatData?.name}</td>
      <td>${v.name}</td>
      <td>$${v.price ? parseFloat(v.price).toFixed(2) : '0.00'}
      <td>${v.desc}</td>
      <td>`;

    if ((v.image)) {
      v.image.map((v1) => {
        print += `<img src="./images/category_img/${v1}" style="width:40px; margin-right:4px;" />`;
      });
    }

    print += `</td>
      <td>
        <button onClick="del('${v.id}')" class="delete-btn"><i class="fa-solid fa-trash"></i></button>
        <button onClick="edit('${v.id}')" class="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
      </td>
    </tr>`;
  });

  document.getElementById("productTable").innerHTML = print;
};
const del = async (id) => {
  await fetch(`http://localhost:3000/product/${id}`, {
    method: "Delete",
  });
};

const edit = async (id) => {
  const res = await fetch(`http://localhost:3000/product/${id}`);
  const data = await res.json();

  document.getElementById("categorySelect").value = data.category;
  document.getElementById("subcategorySelect").value = data.subCategory;
  document.getElementById("productName").value = data.name;
  document.getElementById("productPrice").value = data.price; 
  document.getElementById("productDesc").value = data.desc;

  // if (data.image && data.image.length > 0) {
   
  // }

  document.getElementById("allImage").innerHTML = '';
  
  for (let i = 0; i < data.image.length; i++) {
      hanldeMulImage(data.image[i]);
  }

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
