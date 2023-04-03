import config from "../conf/index.js";

async function init() {
  console.log(config.backendEndpoint);
  //Fetches list of all cities along with their images and description
  try{
  let cities = await fetchCities();
    console.log(cities);
   // let key=cities[0];
    //addCityToDOM(key.id, key.city, key.description, key.image);
  

  //Updates the DOM with the cities
cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}
catch(err){
  console.log(err);
  return null;
  
}
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
   return fetch(config.backendEndpoint+'/cities').then((res)=>res.json().then((data)=>{return data})).catch((err)=>{return null;});
   
  
    
    
  }

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  //console.log(image)
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let tdiv = document.createElement("div");
  tdiv.className="col-lg-3 col-sm-6 col-mb-4 "
  tdiv.innerHTML=
 `   <div class="tile" id=${id}>
  <a href='pages/adventures/?city=${id}'>
                <div class="tile-text">               
                  <h4>${city}</h4>
                  <h5>${description}</h5>
                </div>
                <img class="tile img  img-responsive" src=${image}></div>
                </a></div>`

             let tBodyElement=document.getElementById("data")
                tBodyElement.appendChild(tdiv);
                console.log(tdiv)
}

export { init, fetchCities, addCityToDOM };
