let update = null;

class Category {
  constructor() {
    this.nameInput = document.getElementById("category-name");
    this.descriptionInput = document.getElementById("category-desc");
    this.imageInput = document.getElementById("category-image");

    console.log("con");
  }

  handleSubmit = async () => {
    event.preventDefault();
    let formErr = false;

    if (this.nameInput.value === "" || !isNaN(this.nameInput.value)) {
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

    if (!this.imageInput.files[0]) {
      if (update === null) {
        document.querySelector(".imageError").innerHTML =
          "Please upload an image";
        formErr = true;
      }
    } else {
      const imgtype = ["image/jpg", "image/png", "image/jpeg"];
      if (!imgtype.includes(this.imageInput.files[0].type)) {
        document.querySelector(".imageError").innerHTML =
          "Allowed formats: jpg, png, jpeg";
        formErr = true;
      } else if (this.imageInput.files[0].size > 2 * 1024 * 1024) {
        document.querySelector(".imageError").innerHTML =
          "Image must be less than 2 MB";
        formErr = true;
      } else {
        document.querySelector(".imageError").innerHTML = "";
      }
    }

    if (!formErr) {
      let edtimg = document.getElementById("etdimg");
      let arr = edtimg.src.split("/");
      console.log("arr", arr);

      let catObj = {
        name: this.nameInput.value,
        des: this.descriptionInput.value,
        image: this.imageInput?.files[0]?.name
          ? this.imageInput?.files[0]?.name
          : arr[arr.length - 1],
      };

      console.log(catObj);

      if (update !== null) {
        await fetch(`http://localhost:3000/category/${update}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(catObj),
        });
        update = null;
      } else {
        await fetch("http://localhost:3000/category", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(catObj),
        });
      }
    }
    this.handleImage();
  };

  handleDel = async (id) => {
    await fetch(`http://localhost:3000/category/${id}`, {
      method: "DELETE",
    });
  };

  handleEdit = async (id) => {
    let res = await fetch(`http://localhost:3000/category/${id}`);
    let data = await res.json();

    this.nameInput.value = data.name;
    this.descriptionInput.value = data.des;
    document.getElementById("etdimg").src =
      "./images/category_img/" + data.image;

    update = id;
  };

  disp = async () => {
    const res = await fetch("http://localhost:3000/category");
    let data = await res.json();

    let maiTable = document.getElementById("tableContent");

    data.map((v, i) => {
      let tr2 = document.createElement("tr");

      let tdid = document.createElement("td");
      tdid.textContent = i + 1;

      let tdname = document.createElement("td");
      tdname.textContent = v.name;

      let tddes = document.createElement("td");
      tddes.textContent = v.des;

      let tdimgdata = document.createElement("td");
      let tdimg = document.createElement("img");
      tdimg.setAttribute("src", `./images/category_img/${v.image}`);
      tdimg.setAttribute("width", "80px");
      tdimg.setAttribute("height", "80px");
      tdimgdata.appendChild(tdimg);

      let tdActions = document.createElement("td");

      let delBtn = document.createElement("button");
      delBtn.setAttribute("class", "action-btn delete-btn");
      delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
      delBtn.addEventListener("click", () => this.handleDel(v.id));

      let editBtn = document.createElement("button");
      editBtn.setAttribute("class", "action-btn edit-btn");
      editBtn.setAttribute("title", "Edit");
      editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
      editBtn.addEventListener("click", () => this.handleEdit(v.id));

      tdActions.appendChild(delBtn);
      tdActions.appendChild(editBtn);

      tr2.appendChild(tdid);
      tr2.appendChild(tdname);
      tr2.appendChild(tddes);
      tr2.appendChild(tdimgdata);
      tr2.appendChild(tdActions);

      maiTable.appendChild(tr2);
    });
  };
}

const c = new Category();
const categoryForm = document.querySelector(".category-form");
categoryForm.addEventListener("submit", function () {
  c.handleSubmit();
  c.handleImage();
});

window.onload = () => c.disp();

const himage = document.getElementById("category-image");
himage.addEventListener("change", function () {
  document.getElementById("etdimg").src = "./images/category_img/" + himage.files[0].name;
});
