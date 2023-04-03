
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
   
  // console.log(search.split("=")[1])
  // let cityp=search.split("=")[1];
const urlParams=new URLSearchParams(search);
const city=urlParams.get("city");
  return city;

  
 
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
//console.log(config.backendEndpoint+'/adventures?city='+city)

  //return fetch(config.backendEndpoint+'/adventures?city='+city).then((res)=>res.json().then((data)=>{return data})).catch((err)=>{return null;});
try{
const res= await fetch(config.backendEndpoint+'/adventures?city='+city);
const data= res.json();
return data;
}catch(e){
  return null;
}

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach((key) => {
 let adventures_id= key.id;
  let category= key.category;
  let image= key.image;
  let name= key.name;
   let costPerHead=key.costPerHead;
  let duration= key.duration;
//console.log('id is',adventures_id)
  let tdiv = document.createElement("div");
  tdiv.className="col-lg-3 col-sm-6 col-mb-4 "
  tdiv.innerHTML=
 `   <div class="activity-card" id=${name}>
     <a id=${adventures_id} href='detail/?adventure=${adventures_id}'>
                <div class="category-banner">               
                  <h4>${category}</h4>
                 </div>
                 <div class="img-container">
                <img class="activity-card img  img-responsive" src=${image}></div>
                <div class="adventure-card-text text-md-center w-100 mt-3">
              <div class="d-block d-md-flex justify-content-between flex-wrap px-3">
                <h5 class=""text-left">${name}</h5>
                <p>${costPerHead}</p>
              </div>
              <div class="d-block d-md-flex justify-content-between flex-wrap px-3">
                <h5 class=""text-left">Duration</h5>
                <p>${duration}</p>
              </div>
                </a></div>`

             let tBodyElement=document.getElementById("data")
                tBodyElement.appendChild(tdiv);
  })
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let arraydur=[]
  list.forEach((key)=>{
    
      if(key.duration>=low && key.duration<=high ){console.log(key.duration); arraydur.push(key)}
   
  
  })
  //console.log(arraycat,"arratcat")
  return arraydur;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let arraycat=[]
  list.forEach((key)=>{
    categoryList.forEach((cata)=>{
      if(key.category==cata){console.log(key.category); arraycat.push(key)}
    })
  
  })
  //console.log(arraycat,"arratcat")
  return arraycat;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
 if(filters.category.length>0&&filters.duration.length==0)
  {//console.log(filters.category.length);  
 //console.log("list",list);
 //console.log("filterBycata");
 //console.log(filters);
 const arraycat=filterByCategory(list,filters.category);
 //console.log("arraycat",arraycat);
 //console.log("list is",list);
 return arraycat;
 
}
if(filters.duration.length>0 &&filters.category.length==0)
  {//console.log(filters.category.length);  
    console.log(filters.duration.length);
 console.log("filterByDuration");
 console.log("low,high",filters.duration.split("-")[0],filters.duration.split("-")[1])
 const arraydur=filterByDuration(list,filters.duration.split("-")[0],filters.duration.split("-")[1]);

 return arraydur;
}
if(filters.category.length>0&&filters.duration.length>0){
  const arraycat=filterByCategory(list,filters.category);
  const arraydur=filterByDuration(arraycat,filters.duration.split("-")[0],filters.duration.split("-")[1]);
  return arraydur;
}
  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters", JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  JSON.parse(localStorage.getItem('filters'));

  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  if(filters.category.length>0 ||filters.duration.length>0){
    filters.category.forEach((cata)=>{
      let parentdiv=document.getElementById("category-list");
      let pilldiv=document.createElement("div");
      pilldiv.className="category-filter";
      pilldiv.innerHTML=`<p>${cata}</p>`;
      parentdiv.appendChild(pilldiv);
    })
    
    
  }
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
