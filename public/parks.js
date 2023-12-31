const form = document.querySelector("form");
const parkSelect = document.getElementById("park-select");
const search = document.getElementById("submit");
const parkTable = document.getElementById("park-table");

let natParks = [];

const getParks = () => {
  parkSelect.innerHTML = "";

  axios
    .get(`/api/parks`)
    .then((resp) => {
      natParks = [...resp.data];
      resp.data.forEach((park) => {
        const option = document.createElement("option");
        option.setAttribute("value", park.park_id);
        option.textContent = park.park_name;
        parkSelect.appendChild(option);
      });
    })
    .catch((err) => console.log(err));
};

const tableData = (arr) => {
  parkTable.innerHTML = "";
  arr.forEach((park) => {
    let{park_id, park_name,state,acres, est} = park
    const row = document.createElement("tr");
    const name = document.createElement("td");
    const parkState = document.createElement("td");
    const parkAcres = document.createElement("td")
    const established = document.createElement("td")
    name.textContent = park_name;
    parkState.textContent = state;
    parkAcres.textContent = acres;
    established.textContent = converted(est);
    row.appendChild(name);
    row.appendChild(parkState);
    row.appendChild(parkAcres);
    row.appendChild(established);
    parkTable.appendChild(row);
  });
};

const getTable = () => {
  console.log("acquiring park list");
  axios
    .get(`/api/table`)
    .then((resp) => {
      tableData(resp.data);
    })
    .catch((err) => console.log(err));
};

const filterParks = (evt) => {
  console.log(parkSelect.value);
  console.log(natParks);
  let parksToDisplay = natParks.filter(
    (obj) => +obj.park_id === +parkSelect.value
  );
  tableData(parksToDisplay);
};

let monthWords = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const converted = (date) =>{
  dateParts= date.split("-")
  year = dateParts[0]
  month = monthWords[+dateParts[1]-1]
  day = dateParts[2]
  return `${month} ${day}, ${year}`
}

getParks();
getTable();

search.addEventListener("click", filterParks);
