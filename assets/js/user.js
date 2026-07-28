const handleRegidtration = async () => {
  event.preventDefault();
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let formError = false;
  if (name === "") {
    document.getElementById("nameErr").innerHTML = "Enter Your name";
    let formError = true;
  } else {
    document.getElementById("nameErr").innerHTML = "";
  }
  if (email === "") {
    document.getElementById("emailErr").innerHTML = "Please enter your email";
    let formError = true;
  } else {
    document.getElementById("emailErr").innerHTML = "";
  }
  if (!email.includes("@") || !email.includes(".")) {
    document.getElementById("emailErr").innerHTML =
      "Please enter a valid email";
    let formError = true;
  } else {
    document.getElementById("emailErr").innerHTML = "";
  }
  if (password === "") {
    document.getElementById("passErr").innerHTML = "Please enter your password";
    let formError = true;
  } else {
    document.getElementById("passErr").innerHTML = "";
  }
  if (password.length < 6) {
    document.getElementById("passErr").innerHTML =
      "Password must be at least 6 characters";
    let formError = true;
  } else {
    document.getElementById("passErr").innerHTML = "";
  }

  if (formError !== true) {
    let user = {
      name,
      email,
      password,
    };

    await fetch("http://localhost:3000/user", {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
  }

  //   window.location = "login.html";
  return false;
};

const handleLogin = async () => {
  event.preventDefault();
  let userEmail = document.getElementById("userEmail").value;
  let userPassword = document.getElementById("userPassword").value;

  let res = await fetch("http://localhost:3000/user");
  let data = await res.json();

  let auth = data.find(
    (v) => v.email === userEmail && v.password === userPassword, 
  );

  if (auth) {
    localStorage.setItem("userId", `${auth.id}`);
    window.location = "index.html";
  } else {
    alert("Incorrect Password");
  }

};
