const parkBtn = document.querySelector('#park-btn')
const allSites = document.querySelector('#all-sites')
const sites = document.querySelector(`#sites`)
const newRes = document.querySelector('#new-res')

parksArr = []
newResArr = []

const displaySites = parksArr =>{
    sites.innerHTML = ''
    // console.log(parksArr)
    parksArr.forEach((spotObj)=> {
        console.log(spotObj)
        let {id, park, site, occ} = spotObj
        let listItem = document.createElement('li')
        listItem.innerHTML = `
            <span>${park}</span>
            <span>${site}</span>
            <span>${occ}</span>
            <button id="add" onclick="addReserve(${id})">Add</button>
        `
        sites.appendChild(listItem)
    });
}

const displayReservations = newResArr =>{
    newRes.innerHTML = ''
    newResArr.forEach((spotObj)=> {
        let {id, park, site, occ} = spotObj
        let resItem = document.createElement('li')
        
        resItem.innerHTML = `
            <span>${park}</span>
            <span>${site}</span>
            <span>${occ}</span>
            <button id="delete">X</button>
        `
        newRes.appendChild(resItem)
        // spotObj.preventDefault()
    });
    
}



const getCampsites = () =>{
    axios.get('/api/campsites')
    .then(resp =>{
        parksArr = resp.data
        displaySites(resp.data)
    }).catch(err=>console.log(err))
}


const addReserve = (id)=>{
    console.log(`reservation added for ${id}`)
    console.log(parksArr)
    let index = parksArr.findIndex((spot)=>spot.id === id)
    newResArr.push(parksArr[index])
    // console.log(newResArr)
    parksArr.splice(index, 1)
    displaySites(parksArr)
    displayReservations(newResArr)

    
}

parkBtn.addEventListener('click', getCampsites)
