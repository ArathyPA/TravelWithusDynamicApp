import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    const res= await fetch(config.backendEndpoint+'/reservations/');    
const data= await res.json();
console.log(config.backendEndpoint+'/reservations/')

// let bodyString=JSON.stringify({
//   name: data["name"].value,
//   date:data["date"].value,
//   person:data["person"].value,
//   adventure:data.id,
// });
 //console.log("here"+JSON.parse(data))
return data;

}catch(e){
  //console.log('error now!!')
  return null;
}


  // Place holder for functionality to work in the Stubs
  return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  if(reservations.length>0){
    document.getElementById("no-reservation-banner").style.display="none";
    document.getElementById("reservation-table-parent").style.display="block";
     }
  else{
    document.getElementById("no-reservation-banner").style.display="block";
    document.getElementById("reservation-table-parent").style.display="none";
  }

  reservations.map((key,idx)=>{
    var hours =  new Date(key.time).getHours();
    var minutes =  new Date(key.time).getMinutes();
    var seconds =  new Date(key.time).getSeconds();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var times = hours + ':' + minutes + ':' +seconds + ' ' +ampm;
    
   let month= new Date(key.date).getMonth();
   let montht= new Date(key.time).getMonth();
   let m=month+1;
   var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

var selectedMonthName = months[montht];

//     let objdate = ${key.date};
//     let day=objdate.getDate();
//     if(day<10){day='0'+day};
// let month =  objdate.getMonth();
// if(month<10){month='0'+month};
// let year =  objdate.getFullYear();
    let ele= document.createElement("tr");
    ele.innerHTML=`
    <th scope="row">${key.id}</th>
    <td>${key.name}</td>
    <td>${key.adventureName}</td>
    <td>${key.person}</td>
    <td>${new Date(key.date).getDate()+'/'+m+'/'+new Date(key.date).getFullYear()}</td>
      <td>${key.price}</td>
    <td>${new Date(key.time).getDate()+' '+selectedMonthName+' '+new Date(key.time).getFullYear()+', '+times}</td>
  
    <td><div class="reservation-visit-button" id=${key.id}>
    <a href="../detail/?adventure=${key.adventure}">Visit Adventure</a>
    </div></td>
    `;
    document.getElementById("reservation-table").appendChild(ele);
  });

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
