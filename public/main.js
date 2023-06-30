const parkBtn = document.querySelector("#park-btn");
const sites = document.querySelector('#park-list');
const newRes = document.querySelector("#new-res");
const resBtn = document.querySelector("#reserve");
const check = document.querySelector('#check');
const confirmed = document.querySelector('#confirmed');


let parksArr = [];
let newResArr = [];



//invoked function to display list of avaialble sites
const displaySites = (sitesArr) => {
  sites.innerHTML = "";
  // console.log(parksArr)
  sitesArr.forEach((spotObj) => {
    // console.log(spotObj);
    let { site_id, park, site, occ, price } = spotObj;
    let siteCard = document.createElement("div");
    siteCard.classList.add('site-card')
    siteCard.innerHTML = `
                <img src="./images/tent.jpg" alt="generic id photo" id="camp-pic">
                <div id="content">
                    <ul id="site-details">
                        <li id="site-name">${site}</li>
                        <li id="park">${park}</li>
                        <li id="occ">Occ: ${occ}</li>
                        <li id="price">Price: ${price} per night </li>
                    </ul>
                    <button id="add" onclick="addReserve(${site_id})">ADD</button>
        `;
    sites.appendChild(siteCard);
  });
};

//invoked function to display items in your cart
const displayCart = (newResArr) => {
  newRes.innerHTML = "";
  newResArr.forEach((spotObj) => {
    // console.log(spotObj)
    let { site_id, park, site, occ } = spotObj;
    let resItem = document.createElement("li");

    resItem.innerHTML = `
            <span>${park}</span>
            <span>${site}</span>
            <span>${occ}</span>
            <button id="delete" onclick="removeReserve(${site_id})" >X</button>
        `;
    newRes.appendChild(resItem);
  });
};

//moves a campsite from the available list to your shopping cart list
const addReserve = (id) => {
  console.log(id);
  console.log(newResArr);
  
  if (newResArr.filter(site =>site.site_id === id).length > 0) {
    alert("Campsite has already been added to cart!");
  } else{
    console.log(`Adding campsite #${id} to shopping cart`);
    let index = parksArr.findIndex((site) => site.site_id === id);
    newResArr.push(parksArr[index]);
    // console.log(newResArr[0])
    // parksArr.splice(index, 1);
    // console.log(parksArr)
    displaySites(parksArr);
    displayCart(newResArr);
    resBtn.classList.remove("hide");
  }
};

// moves a tentative reservation back to the overall list
const removeReserve = (id) => {
  console.log(parksArr);
  console.log(`Campsite #${id} removed from shopping cart`);
  let index = newResArr.findIndex((site) => site.site_id === id);
  // parksArr.push(newResArr[index]);
  newResArr.splice(index, 1);
  console.log(parksArr);
  parksArr.sort();
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
  axios
    .put("api/makeres", spotObj)
    .then((resp) => {
      confirmed.classList.remove('hide')
      resBtn.classList.add("hide");
    })
    .catch((err) => console.log(err));
};

parkBtn.addEventListener("click", getCampsites);
resBtn.addEventListener("click", makeRes);


// newResArr.findIndex((newAddition) => newAddition === -1)