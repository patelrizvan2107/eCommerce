let update = null

const handleCatSubCat = async () => {
    const res =  await fetch("http://localhost:3000/category");
    const data = await res.json();
    console.log(data);
    
    let print = `<option value="null">Select Category</option>`;
    data.map((v,i) => {
        console.log(v.name);
        
        print += `
        <option value = "${v.id}">${v.name}</option>
        `
    })

    document.getElementById("categorySelect").innerHTML = print;

    const res2 =  await fetch("http://localhost:3000/subCategory");
    const data2 = await res2.json();
    console.log(data2);
    
    let print2 = `<option value="null">Select SubCategory</option>`;
    data2.map((v2,i2) => {
        console.log(v2.name);
        
        print2 += `
        <option value = "${v2.id}">${v2.name}</option>
        `
    })

    document.getElementById("subcategorySelect").innerHTML = print2;

}


const handleSubmit =  (id,id2) => {
    event.preventDefault();
    let category = document.getElementById("categorySelect").value
    let subCategory = document.getElementById("subcategorySelect").value
    let name = document.getElementById("productName").value
    let desc = document.getElementById("productDesc").value
    let image = document.getElementById("productImage").files[0];

    let formError = false;

    if(category === "null") {
        document.getElementById("categoryError").innerHTML = "Select Category";
        formError = true;
    } else {
        document.getElementById("categoryError").innerHTML = "";
    }
    if(subCategory === "null") {
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

}











const productForm = document.getElementById("productForm")
productForm.addEventListener("submit", function() {
    handleSubmit();
})

window.onload = function () {
    handleCatSubCat();
}