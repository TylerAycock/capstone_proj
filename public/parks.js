const form = document.querySelector('form')
const parkSelect = document.getElementById('park-select')
const search = document.getElementById('submit')
const parkTable = document.getElementById('park-table')

let natParks = []

const getParks = ()=>{
    parkSelect.innerHTML=''

    axios.get(`/api/parks`)
    .then((resp)=>{
        natParks = [...resp.data]
       resp.data.forEach(park =>{
        const option = document.createElement('option')
        option.setAttribute('value', park.park_id)
        option.textContent = park.park_name
        parkSelect.appendChild(option)
       })
    }).catch(err=>console.log(err))
}

const tableData = (arr) =>{
    parkTable.innerHTML=""
    arr.forEach(park =>{
        const row = document.createElement('tr')
        const name = document.createElement('td')
        const state = document.createElement('td')
        name.textContent = park.park_name
        state.textContent = park.park_id
        row.appendChild(name)
        row.appendChild(state)
        parkTable.appendChild(row)
})}

const getTable = ()=>{
    console.log('acquiring park list')
    axios.get(`/api/table`)
    .then(resp=>{
        tableData(resp.data)
    })
    .catch(err=>console.log(err))
}

const filterParks = evt=>{
    console.log(parkSelect.value)
    console.log(natParks)
    let parksToDisplay = natParks.filter((obj)=> +obj.park_id === +parkSelect.value)
    tableData(parksToDisplay)
}
getParks()
getTable()

search.addEventListener('click', filterParks)