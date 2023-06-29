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
            <button id="delete" onclick="deleteRes(${res_id})">Cancel</button>
        `;
    resList.appendChild(resItem);
  });
};

// pulls up all reservations
const showReservation = () => {
  console.log(`Hey there camper...retrieving reservations`);
  axios
    .get("/api/getres")
    .then((resp) => {
    //   reservArr = resp.data
    //   console.log(reservArr)
      displayRes(resp.data);
    })
    .catch((err) => console.log(err));
};

//deletes reservation 
const deleteRes = (id) => {
    console.log(`attempting to cancel reservation ID ${id}`)
    // let index = reservArr.findIndex((site) => site.campsite_id === id);
    // console.log(reservArr[index])
    axios.delete(`/api/delete/${id}`)
    .then(resp =>{
        console.log('reservation cancled')
    })
}

myResBtn.addEventListener("click", showReservation);
