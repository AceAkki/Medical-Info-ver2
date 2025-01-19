document.addEventListener('DOMContentLoaded', function() {
var myHeaders = new Headers();
myHeaders.append("Authorization", "Basic Y29hbGl0aW9uOnNraWxscy10ZXN0");

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

fetch("https://fedskillstest.coalitiontechnologies.workers.dev", requestOptions)
  .then((response) => response.json())
  .then((data) => {
    const pList = document.querySelector(".patients");
    //console.log(pList);
   // console.log(data);

    //patientOne = data[0];
    //console.log(patientOne);

    let patient;
    let patientImg;
    let pPic;
    let patientName;

    let imageSrc; 
    let name;
    let age;
    let gender;

    data.forEach((dt) => {
      // console.log(dt);

    
      // console.log(dt.profile_picture);
      patient = document.createElement("div");
      patient.classList.add("patient");

      patientImg = document.createElement('div'); 
      patientImg.classList.add('list-img')     
      pPic = document.createElement("img");

      let moreImg = document.createElement('div');
      let morePic = document.createElement('img');

      let allWrap = document.createElement('div');
      allWrap.classList.add('allWrap');

      patientName = document.createElement('div');
      let pName = document.createElement('h5');
      pName.classList.add('name');
      
      let detWrap = document.createElement('div');
      detWrap.classList.add('detWrap');
      let patientAge = document.createElement('div'); 
      let pAge = document.createElement('p');
      let patientGender = document.createElement('div');
      let pGender = document.createElement('p');

     // console.log(pPic);
     
      imageSrc = dt.profile_picture;
      pPic.src = imageSrc;

      morePic.src = 'img/more_hori.svg';
      morePic.classList.add('icon');

      name = dt.name;
      pName.textContent = name;
      

      age = dt.age;
      pAge.textContent = age;

      gender = dt.gender;
      pGender.textContent = gender;

     // console.log(imageSrc);
     // console.log(name);

     
      pList.appendChild(patient);
      patient.appendChild(patientImg);
      patient.appendChild(allWrap);
      patient.appendChild(moreImg);
      moreImg.appendChild(morePic);
      allWrap.appendChild(patientName);
      allWrap.appendChild(detWrap);
      detWrap.appendChild(patientGender);
      detWrap.appendChild(patientAge);
 
      
      patientImg.appendChild(pPic);
      patientName.appendChild(pName);
      patientAge.appendChild(pAge);
      patientGender.appendChild(pGender);    

    });


    let wholeList = pList.childNodes;
    pList.removeChild(wholeList[0]);
    
    let pChildren = pList.childNodes;
    console.log(pChildren);

    for (let i = 0; i < data.length; i++) {
        pChildren[i].addEventListener('click', function () {
       //  console.log(pChildren[i]);
        var child = pChildren[i];
         showInformation(data[i]);
         console.log(data[i]);
        })
    }

    const profile = document.querySelector('.profile');



    function showInformation (patientInfo) {

      profile.innerHTML = `
        <div class="profile-wrap">
            <div class="profile-img">
                <img src="${patientInfo.profile_picture}">
            </div>
            <div class="allWrap">
                <div class="icon-wrap">
                  <img src= "img/BirthIcon.svg">
                  <p class="label"> Date of Birth: <br>
                  <span class="data"> ${patientInfo.date_of_birth} <span></p> 
                </div>
                <div class="icon-wrap">
                  <img id="gender" src= "img/calendar.svg">
                  <p class="label"> Gender: <br>
                  <span class="data"> ${patientInfo.gender} <span></p> 
                </div>
                <div class="icon-wrap">
                  <img src= "img/PhoneIcon.svg">
                  <p class="label"> Contact Info: <br>
                   <span class="data"> ${patientInfo.phone_number} <span></p> 
                </div>
                <div class="icon-wrap">
                  <img src= "img/PhoneIcon.svg">
                  <p class="label"> Emergency Contact: <br>
                  <span class="data"> ${patientInfo.emergency_contact} <span></p> 
                </div>
                <div class="icon-wrap">
                  <img src= "img/InsuranceIcon.svg">
                  <p class="label"> Insurance Provider: <br>
                   <span class="data"> ${patientInfo.insurance_type} <span></p> 
                </div>
                <div class="button-wrap">
                  <a class="button"> Show All Information </a>
                </div>

            </div
        </div`
        
       let change = setInterval(function () {
     
          console.log(patientInfo.gender);
          var changeIcon = document.getElementById('gender');
          if (patientInfo.gender === 'Female') {
            
           // console.log(changeIcon);
             changeIcon.src = "img/FemaleIcon.svg";
          } else {
            changeIcon.src = "img/MaleIcon.svg";
          }
          clearInterval(change);
        }, 1);
        


    }

    

    
  


    let pInput = document.querySelector('#iInput');
    let pSearch = document.querySelector('#iSearch');
    //console.log(pSearch);
    pSearch.style.cursor = 'pointer';
    let pInputValue;

    pInput.addEventListener('input', ()=> {
      pInputValue = pInput.value.toLowerCase();
      console.log(pInputValue);
    })


    
    pSearch.addEventListener('click', ()=> {
      search(); 
      console.log('click')
    })

  
    let nameText;

    function search () {
    //   pChildren.forEach(h => {
    //     //nameText = h.querySelector('h5');   // throws error because child nodes includes heading text too 
    //      console.log(h);
    //    })      

    // console.log(pInputValue);

    for (let h = 1; h < pChildren.length; h++) {
       nameText = pChildren[h].querySelector('h5').innerText;
     // console.log(pChildren[h]);
       finalName = nameText.toLowerCase();
      //console.log(finalName);

      pInput.addEventListener('focusout', function () {      
        pChildren[h].classList.remove('hide');
        pChildren[h].classList.add('patient');
        
      })

      if (!(finalName.includes(pInputValue))) {
     // console.log('text');
       pChildren[h].classList.remove('patient');
       pChildren[h].classList.add('hide');
      } 

      //console.log(pInput);
     // console.log(pChildren[h]);
    
    }
   
    }

   
      


    // let chartInstance;


    // data.forEach(dt >= {
    //   new Chart(
    //     document.getElementById('lineChart'),
    //     {
    //       type: 'line',
    //       data: {
            
    //       }
    //     }
    //   );
    // })
    
    
    

  })
  .catch((error) => console.error("error", error));
;

})
