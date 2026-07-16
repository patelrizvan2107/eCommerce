let update = null

const handleCatSubCat = async () => {
  const res = await fetch("http://localhost:3000/category");
  const data = await res.json();
  console.log(data);

  let print = `<option value="null">Select Category</option>`;
  data.map((v, i) => {
    console.log(v.name);

    print += `
        <option value = "${v.id}">${v.name}</option>
        `
  })

  document.getElementById("categorySelect").innerHTML = print;

  const res2 = await fetch("http://localhost:3000/subCategory");
  const data2 = await res2.json();
  console.log(data2);

  let print2 = `<option value="null">Select SubCategory</option>`;
  data2.map((v2, i2) => {
    console.log(v2.name);

    print2 += `
        <option value = "${v2.id}">${v2.name}</option>
        `
  })

  document.getElementById("subcategorySelect").innerHTML = print2;

}


const handleSubmit = async (id, id2) => {
  event.preventDefault();
  let category = document.getElementById("categorySelect").value
  let subCategory = document.getElementById("subcategorySelect").value
  let name = document.getElementById("productName").value
  let desc = document.getElementById("productDesc").value
  let image = document.getElementById("productImage").files[0];
  // console.log(category, subCategory);


  let formError = false;

  if (category === "null") {
    document.getElementById("categoryError").innerHTML = "Select Category";
    formError = true;
  } else {
    document.getElementById("categoryError").innerHTML = "";
  }
  if (subCategory === "null") {
    document.getElementById("subcategoryError").innerHTML = "Select SubCategory";
    formError = true;


  } else {
    document.getElementById("subcategoryError").innerHTML = "";

  }
  if (name === "" || !isNaN(name)) {
    document.getElementById("nameError").innerHTML =
      "Please enter Produc name";
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

  if (formError === false) {
    let edtImage = document.getElementById("updateImage")
    let arr = edtImage.src.split("/")
    console.log(arr.length - 1);
    

    let productObj = {
      category,
      subCategory,
      name,
      desc,
      image: image?.name ? image?.name : arr[arr.length - 1 ]
    }
    if(update != null) {
      await fetch(`http://localhost:3000/product/${update}`, {
      method: "Put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productObj),
    })
    } else {
      await fetch("http://localhost:3000/product", {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productObj),
    })
    }
    
  }

}
const handleDisplay =async () => {

  const res = await fetch("http://localhost:3000/product")
  const data = await res.json();
  let print = ``;
  data.map((v, i) => {
    print += `
    <tr>
      <td>${i + 1}</td>
      <td>${v.category}</td>
      <td>${v.subCategory}</td>
      <td>${v.name}</td>
      <td>${v.desc}</td>
      <td><img src = "./images/category_img/${v.image}"</td>
      <td><button onClick= "del('${v.id}')" class="delete-btn"><i class="fa-solid fa-trash"></i></button><button class="edit-btn"onClick= "edit('${v.id}')"><i class="fa-solid fa-pen-to-square"><i></button></td>

      </tr>
    `
  })
  document.getElementById("productTable").innerHTML = print;
}
const del = async (id) => {
  await fetch (`http://localhost:3000/product/${id}`,{
    method:"Delete"
  })
}

const edit = async (id) => {
  const res = await fetch(`http://localhost:3000/product/${id}`)
  const data  =  await res.json()
  console.log(data.name);
  
// document.getElementById("categorySelect").innerHTML = data.category
// document.getElementById("subCategorySelect").innerHTML = data.subCategory
document.getElementById("productName").value = data.name
document.getElementById("productDesc").innerHTML = data.desc
document.getElementById("updateImage").src = "./images/category_img/" + data.image;

update= id;

}

const productForm = document.getElementById("productForm")
productForm.addEventListener("submit", function () {
  handleSubmit();
})

window.onload = function () {
  handleCatSubCat();
  handleDisplay();
}

const image = document.getElementById("productImage")
image.addEventListener('change', function () {
  document.getElementById ('updateImage').src = "./images/category_img/" + image?.files[0]?.name
})