// const myResBtn = document.querySelector("#resbtn");
const reservations = document.getElementById('reservations')

const displayRes = (reservArr) => {
  reservations.innerHTML = "";
  reservArr.forEach((resObj) => {
    console.log(resObj)
    let { res_id, park_id, park_name, campsite_id, campsite_name, occ, price,} = resObj;
    console.log(campsite_name)
    let resCard = document.createElement("div");
    resCard.classList.add('card')
    resCard.classList.add('myRes')
    resCard.innerHTML = `
            <img src="./images/tent.jpg" alt="generic id photo" id="camp-pic">
            <div id="content">
              <ul id="site-details">
                <li class="campsite"> ${campsite_name}</li>
                <li id="park">${park_name}</li>
                <li id="occ">Occ: ${occ}</li>
              </ul>
              <button id="delete" onclick="deleteRes(${campsite_id})">Cancel</button>
            </div>
        `;
    reservations.appendChild(resCard);
  });
};

// pulls up all reservations
const showReservation = (event) => {
  console.log(`Hey there camper...retrieving reservations`);
  reservations.innerHTML = ""
  axios
    .get("/api/getres")
    .then((resp) => {
      if (resp.data.length === 0) {
        let nores = document.createElement("div");
        nores.innerHTML = `
          <h2 id="none">No sites currently reserved. Click <a href="./index.html">HERE</a> to get started</span>
        `;
        reservations.appendChild(nores);
      } else {
        console.log(resp.data);
        displayRes(resp.data);
      }
    })
    .catch((err) => console.log(err));
};

//deletes selected reservation
const deleteRes = (id) => {
  console.log(`attempting to cancel reservation ID ${id}`);
  // let index = reservArr.findIndex((site) => site.campsite_id === id);
  // console.log(reservArr[index])
  axios.delete(`/api/delete/${id}`).then((resp) => {
    console.log("reservation canceled");
  }).then(() =>{
    showReservation()
  }).catch(err =>console.log(err))
};

// myResBtn.addEventListener("click", showReservation);
showReservation()