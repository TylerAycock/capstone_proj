const {response} =require('express')

const parkBtn = document.querySelector('#park-btn')
const allSites = document.querySelector('#all-sites')

const displayCampsites = parksArr =>{
    allSites.innerHTML = ''
    parksArr.forEach(park => {
        
    });


}

const getCampsites = () =>{
    axios.get('/api/campsites')
    .then(resp =>{
        displayCampsites(resp.data)
    }).catch(err=>console.log(err))
}

parkBtn.addEventListener('click', getParks)