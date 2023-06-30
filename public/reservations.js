const myResBtn = document.querySelector("#reservations");
const resList = document.querySelector("#my-res");

reservArr = [];

const displayRes = (reservArr) => {
  resList.innerHTML = "";
  reservArr.forEach((resObj) => {
    let {
      res_id,
      park_id,
      park_name,
      campsite_id,
      campsite_name,
      occ,
      available,
    } = resObj;
    let resItem = document.createElement("li");
    resItem.innerHTML = `
            <span>ResID${res_id}</span>
            <span>${park_name}</span>
            <span>${campsite_name}</span>
            <span>${occ}</span>
            <button id="delete" onclick="deleteRes(${campsite_id})">Cancel</button>
        `;
    resList.appendChild(resItem);
  });
};

// pulls up all reservations
const showReservation = (event) => {
  console.log(`Hey there camper...retrieving reservations`);
  resList.innerHTML = ""
  axios
    .get("/api/getres")
    .then((resp) => {
      if (resp.data.length === 0) {
        let nores = document.createElement("li");
        nores.innerHTML = `
          <span>No sites currently reserved.</span>
          <span>Click <a href="./index.html">Here</a> to get started</span>
        `;
        resList.appendChild(nores);
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

myResBtn.addEventListener("click", showReservation);
