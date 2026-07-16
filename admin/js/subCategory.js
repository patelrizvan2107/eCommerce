let update = null;

const handleCatDropdown = async () => {
  const res = await fetch("http://localhost:3000/category");
  let data = await res.json();
  console.log(data);

  let print = `
  <option value="null">Select Category</option>`;

  data.map((v, i) => {
    print += `
        <option value = "${v.id}">${v.name}</option>
        `;
  });
  document.getElementById("subData").innerHTML = print;
};

const handleSubmit = async (id) => {
  event.preventDefault();
  let catId = document.getElementById("subData").value;
  let name = document.getElementById("category-name").value;
  let des = document.getElementById("category-desc").value;
  let image = document.getElementById("category-image");
  console.log('this cat id:',catId);
  
  let formErr = false;
  if (catId === "null") {
    document.getElementById("catError").innerHTML =
      "Please select a Category";
    formErr = true;
  } else {
    // document.getElementById("catError").innerHTML = "";
  }
  if (name === "" || !isNaN(name)) {
    document.getElementById("nameError").innerHTML =
      "Please enter category name";
    formErr = true;
  } else {
    document.getElementById("nameError").innerHTML = "";
  }

  if (des === "") {
    document.getElementById("descError").innerHTML =
      "Please enter category description";
    formErr = true;
  } else {
    document.getElementById("descError").innerHTML = "";
  }

  if (!image.files[0]) {
    if (update === null) {
      document.getElementById("imageError").innerHTML =
        "Please upload an image";
      formErr = true;
    }
  } else {
    const imgtype = ["image/jpg", "image/png", "image/jpeg"];
    if (!imgtype.includes(image.files[0].type)) {
      document.getElementById("imageError").innerHTML =
        "Allowed formats: jpg, png, jpeg";
      formErr = true;
    } else if (image.files[0].size > 2 * 1024 * 1024) {
      document.getElementById("imageError").innerHTML =
        "Image must be less than 2 MB";
      formErr = true;
    } else {
      document.getElementById("imageError").innerHTML = "";
    }
  }

  if (formErr === false) {
    let edtimg = document.getElementById("updateImage");
      let arr = edtimg.src.split("/");
    let subObj = {
      CategoryId: catId,
      name,
      des,
      image: image?.files[0]?.name ? image?.files[0]?.name : arr[arr.length - 1]
    };
    if (update != null) {
      await fetch(`http://localhost:3000/subCategory/${update}`, {
        method: "Put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subObj),
      });
      update = null;
    } else {
      await fetch("http://localhost:3000/subCategory", {
        method: "Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subObj),
      });
    }
  }
};



const handleSubCatDisplay = async () => {
  let res = await fetch("http://localhost:3000/subCategory");
  let data = await res.json();

  console.log(data);

  //get all category cdata
  const res2 = await fetch("http://localhost:3000/category");
  const cdata = await res2.json();
  //cdata   find  v.id  === v.CategoryId    .name
  let print = ``;

  data.map((v, i) => {
    let catName = cdata.find((v2) => String(v2.id) === String(v.CategoryId));
    console.log(catName);

    print += `
        <tr>
        <td>${i + 1}</td>
        <td>${catName.name}</td>
        <td>${v.name}</td>
        <td>${v.des}</td>
        <td><img src="./images/category_img/${v.image}" width="80px" height="80px"</td>
        <td><button onClick= "del('${v.id}')" class="delete-btn"><i class="fa-solid fa-trash"></i></button><button class="edit-btn"onClick= "edit('${v.id}')"><i class="fa-solid fa-pen-to-square"><i></button></td>
        </tr>
        `;
  });

  print += ``;

  document.getElementById("subDataDisp").innerHTML = print;
};

const del = async (id) => {
  await fetch(`http://localhost:3000/subCategory/${id}`, {
    method: "Delete",
  });
};
const edit = async (id) => {
  let res = await fetch(`http://localhost:3000/subCategory/${id}`);
  let data = await res.json();

  document.getElementById("subData").value = data.CategoryId;
  document.getElementById("category-name").value = data.name;
  document.getElementById("category-desc").value = data.des;
  document.getElementById("updateImage").src =
    " ./images/category_img/" + data.image;

  update = id;
};

const subForm = document.getElementById("subForm");
subForm.addEventListener("submit", function () {
  handleSubmit();
});
window.onload = function () {
  handleCatDropdown();
  handleSubCatDisplay();
};

const chooseEditImage = document.getElementById("category-image");
chooseEditImage.addEventListener("change", function () {
  document.getElementById("updateImage").src =
    " ./images/category_img/" + chooseEditImage?.files[0]?.name;
});
