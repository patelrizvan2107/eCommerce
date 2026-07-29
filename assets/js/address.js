

// const handleUser = async () => {
//     let userRes = await fetch("http://localhost:3000/user");
//     let userData = await userRes.json();

//     let uid = localStorage.getItem("userId")

//     let uData = userData.find((v) => v.id === uid)

//     console.log(uData?.address);

// }


// const handleDisp = () => {
//     const maindiv = document.getElementById("allData");

    

//     const card = document.createElement("div");
//     card.className = "card border-0 shadow-sm p-4 mb-4";
//     card.id = "dynamicAddressCard";

//     const form = document.createElement("form");
//     form.id = "dynamicAddressForm";

//     // Form Title
//     const title = document.createElement("h5");
//     title.className = "fw-bold mb-3 text-dark";
//     title.innerText = "Add New Address";
//     form.appendChild(title);

//     // Helper function to build form inputs
//     const createInputGroup = (placeholder, id, required = true) => {
//         const wrapper = document.createElement("div");
//         wrapper.className = "mb-3";

//         const input = document.createElement("input");
//         input.type = "text";
//         input.id = id;
//         input.placeholder = placeholder;
//         input.className = "form-control";
//         if (required) input.required = true;

//         wrapper.appendChild(input);
//         return { wrapper, input };
//     };

//     const line1 = createInputGroup("Address Line 1 (House/Flat No., Street)", "line1", true);
//     const line2 = createInputGroup("Address Line 2 (Optional)", "line2", false);
//     const landmark = createInputGroup("Landmark (e.g. Near Park)", "landmark", false);

//     const row = document.createElement("div");
//     row.className = "row g-3 mb-3";

//     const cityCol = document.createElement("div");
//     cityCol.className = "col-6";
//     const city = createInputGroup("City", "city", true);
//     cityCol.appendChild(city.wrapper);

//     const pincodeCol = document.createElement("div");
//     pincodeCol.className = "col-6";
//     const pincode = createInputGroup("Pincode / ZIP Code", "pincode", true);
//     pincodeCol.appendChild(pincode.wrapper);

//     row.appendChild(cityCol);
//     row.appendChild(pincodeCol);

//     const btnContainer = document.createElement("div");
//     btnContainer.className = "d-flex gap-2 mt-4";

//     const submitBtn = document.createElement("button");
//     submitBtn.type = "submit";
//     submitBtn.className = "btn btn-primary flex-grow-1 fw-semibold";
//     submitBtn.innerText = "Save Address";

//     const cancelBtn = document.createElement("button");
//     cancelBtn.type = "button";
//     cancelBtn.className = "btn btn-outline-secondary fw-semibold";
//     cancelBtn.innerText = "Cancel";

//     btnContainer.appendChild(submitBtn);
//     btnContainer.appendChild(cancelBtn);

//     form.appendChild(line1.wrapper);
//     form.appendChild(line2.wrapper);
//     form.appendChild(landmark.wrapper);
//     form.appendChild(row);
//     form.appendChild(btnContainer);
//     card.appendChild(form);
    
//     // Prepend form so it appears above saved addresses
//     maindiv.prepend(card);
// }


// window.onload = () => {
//     handleUser()
// }

const handleUser = async () => {

    let userRes = await fetch("http://localhost:3000/user");

    let userData = await userRes.json();



    let uid = localStorage.getItem("userId")



    let uData = userData.find((v) => v.id === uid)



    console.log(uData?.address);



}





const handleDisp = () => {

    let form = document.createElement("form")

    form.setAttribute("onsubmit", "handleSubmit()")



    let line1 = document.createElement('input');



    line1.setAttribute("type", "text")

    let line2 = document.createElement('input');

    line2.setAttribute("type", "text")

    let landmark = document.createElement('input');

    landmark.setAttribute("type", "text")

    let city = document.createElement('input');

    city.setAttribute("type", "text")

    let pincode = document.createElement('input');

    pincode.setAttribute("type", "text")



    let submit = document.createElement('input');

    submit.setAttribute("type", "submit");

    submit.setAttribute("value", "Submit")

    line1.placeholder = "Address Line 1";

    line2.placeholder = "Address Line 2 (Optional)";

    landmark.placeholder = "Landmark";

    city.placeholder = "City";

    pincode.placeholder = "Pincode / ZIP Code";



    form.appendChild(line1)

    form.appendChild(line2)

    form.appendChild(landmark)

    form.appendChild(city)

    form.appendChild(pincode)

    form.appendChild(submit)



    let maindiv = document.getElementById("allData")



    maindiv.appendChild(form)

}





window.onload = () => {

    handleUser()

} 