class Category {
  constructor() {
    this.nameInput = document.getElementById("category-name");
    this.descriptionInput = document.getElementById("category-desc");
    this.imageInput = document.getElementById("category-image");

    this.deleteData = this.handleDel.bind(null, 1);
  }

  async handleSubmit() {
    event.preventDefault();

    // const name = this.nameInput.value;
    // const description = this.descriptionInput.value;
    // const image = this.imageInput.files[0];

    // if (name === "") {
    //     document.querySelector('.nameError').innerHTML = "Please enter category name";
    // } else {
    //     document.querySelector('.nameError').innerHTML = "";
    // }

    // if (description === "") {
    //     document.querySelector('.descError').innerHTML = "Please enter category description";
    // } else {
    //     document.querySelector('.descError').innerHTML = "";
    // }

    // if (!image) {
    //     document.querySelector('.imageError').innerHTML = "Please upload a category image";
    // } else {
    //     document.querySelector('.imageError').innerHTML = "";
    // }
    let formErr = false;
    console.log(isNaN(this.nameInput.value));

    if (this.nameInput.value === "" || isNaN(this.nameInput.value) === false) {
      document.querySelector(".nameError").innerHTML =
        "Please enter category name";
      formErr = true;
    } else {
      document.querySelector(".nameError").innerHTML = "";
    }
    if (this.descriptionInput.value === "") {
      document.querySelector(".descError").innerHTML =
        "Please enter category description";
      formErr = true;
    } else {
      document.querySelector(".descError").innerHTML = "";
    }
    console.log(this.imageInput.files[0]);

    if (!this.imageInput.files[0]) {
      document.querySelector(".imageError").innerHTML = "Please upload a image";
      formErr = true;
    } else {
      const imgtype = ["image/jpg", "image/png", "image/jpeg"];
      console.log(this.imageInput.files[0]);

      if (!imgtype.includes(this.imageInput.files[0].type)) {
        document.querySelector(".imageError").innerHTML =
          "Please upload  image 'Image/jpg','Image/png','Image/jpeg'";
        formErr = true;
      } else {
        if (this.imageInput.files[0].size > 2 * 1024 * 1024) {
          document.querySelector(".imageError").innerHTML =
            "Please upload  image less than 2 mb";
          formErr = true;
        } else {
          document.querySelector(".imageError").innerHTML = "";
        }
      }
    }

    if (!formErr) {
      let catObj = {
        name: this.nameInput.value,
        des: this.descriptionInput.value,
        image: this.imageInput.files[0].name,
      };
      console.log(catObj);

      try {
        let response = await fetch("http://localhost:3000/category", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(catObj),
        });
        let data2 = await response.json();

        console.log(data2);
      } catch (error) {
        console.log(error);
      }
    }
  }

  handleDel = async (id) => {
    console.log(id);
    await fetch(`http://localhost:3000/category/${id}`, {
      method: "Delete",
    });
  };

  async handleEdit(id) {
    let res = await fetch(`http://localhost:3000/category/${id}`);
    let data = res.json();

    this.nameInput.value = data.name;
    this.descriptionInput.value = data.des;
    document.getElementById("etdimg").src =
      "./images/category_img" + data.image;
  }
  disp = async () => {
    console.log("huiuiui");

    const res = await fetch("http://localhost:3000/category");
    let data = await res.json();
    console.log(data);
    let print = ``;
    data.map((v, i) => {
      console.log(v, i);
      console.log(i, v.name, v.des, v.image);

      let tr2 = document.createElement("tr");
      let tdid = document.createElement("td");
      tdid.textContent = i + 1;
      let tdname = document.createElement("td");
      tdname.textContent = v.name;
      let tddes = document.createElement("td");
      tddes.textContent = v.des;
      let tdimgdata = document.createElement("td");
      let tdimg = document.createElement("img");
      tdimg.setAttribute("src", `./images/category_img/${v.image}`)
      
      tdimgdata.appendChild(tdimg)
      tr2.appendChild(tdid)
      tr2.appendChild(tdname)
      tr2.appendChild(tddes)
      tr2.appendChild(tdimgdata)
      let maiTable = document.getElementById("tableContent");
      maiTable.appendChild(tr2)


      //       print += `
      //         <tr>
      //         <td>${i + 1}</td>
      //         <td>${v.name}</td>
      //         <td>${v.des}</td>
      //         <td><img src = "./images/category_img/${v.image}" width = "80px" height = "80px"/></td>
      //         <td><button class="action-btn delete-btn"  ><i class="fa-solid fa-trash"></i></button>
      // <button class="action-btn edit-btn" title="Edit" onclick="handleEdit('${v.id}')"><i class="fa-solid fa-pen-to-square"></i></button></td>

      //         </tr>

      //       `;
      //       document.getElementById("tableContent").innerHTML = print;
    });
  };
}

const c = new Category();
const categoryForm = document.querySelector(".category-form");
categoryForm.addEventListener("submit", function () {
  c.handleSubmit();
  c.handleDel();
  c.handleEdit();
});

window.onload = function () {
  c.disp();
};

const delBtn = document.getElementById("delBtn");
delBtn.addEventListener("click", function () {
  c.handleDel(1);
});
