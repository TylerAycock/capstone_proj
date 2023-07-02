const parkBtn = document.querySelector("#park-btn");
const sites = document.getElementById("park-list");
const cart = document.getElementById("res-list");
const resBtn = document.querySelector("#reserve");

let parksArr = [];
let newResArr = [];



// display list of avaialble sites
const displaySites = (sitesArr) => {
  sites.innerHTML = "";
  // console.log(parksArr)
  sitesArr.forEach((spotObj) => {
    // console.log(spotObj);
    let { site_id, park, site, occ, price } = spotObj;
    let siteCard = document.createElement("div");
    siteCard.classList.add("card");
    siteCard.innerHTML = `
                <img src="./images/tent.jpg" alt="generic id photo" id="camp-pic">
                <div id="content">
                    <ul id="site-details">
                        <li id="site-name">${site}</li>
                        <li id="park">${park}</li>
                        <li id="occ">Occ: ${occ}</li>
                        <li id="price">Price: $${price} per night </li>
                    </ul>
                    <button id="add" onclick="addReserve(${site_id})">ADD</button>
                 </div>
        `;
    sites.appendChild(siteCard);
  });
};

//display items in your cart
const displayCart = (newResArr) => {
  cart.innerHTML = "";
  newResArr.forEach((spotObj) => {
    // console.log(spotObj)
    let { site_id, park, site, occ, price } = spotObj;
    let resCard = document.createElement("div");
    resCard.classList.add("card");
    resCard.classList.add("res");
    resCard.innerHTML = `
    <img src="./images/tent.jpg" alt="generic id photo" id="camp-pic">
    <div id="content">
        <ul id="site-details">
            <li id="site-name">${site}</li>
            <li id="park">${park}</li>
            <li id="occ">Occ: ${occ}</li>
            <li id="price">Price: $${price} per night </li>
        </ul>
        <button id="delete" onclick="removeReserve(${site_id})" >REMOVE</button>
    </div>
        `;
    cart.appendChild(resCard);
  });
};

//moves a campsite from the available list to your shopping cart list
const addReserve = (id) => {
  // console.log(id);
  // console.log(newResArr);

  if (newResArr.filter((site) => site.site_id === id).length > 0) {
    alert("Campsite has already been added to cart!");
  } else {
    console.log(`Adding campsite #${id} to shopping cart`);
    let index = parksArr.findIndex((site) => site.site_id === id);
    newResArr.push(parksArr[index]);
    displaySites(parksArr);
    displayCart(newResArr);
    resBtn.classList.remove("hide");
  }
};

// moves a tentative reservation back to the overall list
const removeReserve = (id) => {
  console.log(`Campsite #${id} removed from shopping cart`);
  let index = newResArr.findIndex((site) => site.site_id === id);
  // parksArr.push(newResArr[index]);
  newResArr.splice(index, 1);
  // parksArr.sort();
  displaySites(parksArr);
  displayCart(newResArr);
  if (newResArr.length === 0) {
    resBtn.classList.add("hide");
  }
};

//Pulls entire DB of available campspots to the homepage on btn click
const getCampsites = () => {
  axios
    .get("/api/campsites")
    .then((resp) => {
      parksArr = resp.data;
      displaySites(resp.data);
    })
    .catch((err) => console.log(err));
};

//adds reservation to reservations table and marks aviale as "false"
const makeRes = (evt) => {
  let spotObj = newResArr[0];
  console.log(spotObj)
  axios
    .put("api/makeres", spotObj)
    .then((resp) => {
      newResArr=[]
      cart.innerHTML=`
      <div id='confirmed'>
      <img src="./images/checkmark.png" alt="green check" id="check">
      <h2 id="message">Reservation confirmed, Happy Camping!</h2>
      </div>
      `
    })
    .catch((err) => console.log(err));
};

// parkBtn.addEventListener("click", getCampsites);
resBtn.addEventListener("click", makeRes);

// newResArr.findIndex((newAddition) => newAddition === -1)
getCampsites()