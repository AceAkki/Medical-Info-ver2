document.addEventListener("DOMContentLoaded", function () {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Basic Y29hbGl0aW9uOnNraWxscy10ZXN0");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    "https://fedskillstest.coalitiontechnologies.workers.dev",
    requestOptions
  )
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

        patientImg = document.createElement("div");
        patientImg.classList.add("list-img");
        pPic = document.createElement("img");

        let moreImg = document.createElement("div");
        let morePic = document.createElement("img");

        let allWrap = document.createElement("div");
        allWrap.classList.add("allWrap");

        patientName = document.createElement("div");
        let pName = document.createElement("h5");
        pName.classList.add("name");

        let detWrap = document.createElement("div");
        detWrap.classList.add("detWrap");
        let patientAge = document.createElement("div");
        let pAge = document.createElement("p");
        let patientGender = document.createElement("div");
        let pGender = document.createElement("p");

        // console.log(pPic);

        imageSrc = dt.profile_picture;
        pPic.src = imageSrc;

        morePic.src = "img/more_hori.svg";
        morePic.classList.add("icon");

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

      let index = null;

      for (let i = 0; i < data.length; i++) {
        index = i;
        pChildren[i].addEventListener("click", function () {
          //  console.log(pChildren[i]);
          var child = pChildren[i];
          showInformation(data[i]);
          showAll.addEventListener("click", (e) => {
            getdata(data[i]);
            getList(data[i])
          });
          console.log(data[i]);
        });
      }

      const profile = document.querySelector(".profile");

      function showInformation(patientInfo) {
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
                  <a class="button" id="showAll" style="cursor:pointer"> Show All Information </a>
                </div>

            </div
        </div`;

        let change = setInterval(function () {
          console.log(patientInfo.gender);
          var changeIcon = document.getElementById("gender");
          if (patientInfo.gender === "Female") {
            // console.log(changeIcon);
            changeIcon.src = "img/FemaleIcon.svg";
          } else {
            changeIcon.src = "img/MaleIcon.svg";
          }
          clearInterval(change);
        }, 1);
      }

      let pInput = document.querySelector("#iInput");
      let pSearch = document.querySelector("#iSearch");
      //console.log(pSearch);
      pSearch.style.cursor = "pointer";
      let pInputValue;

      pInput.addEventListener("input", () => {
        pInputValue = pInput.value.toLowerCase();
        console.log(pInputValue);
      });

      pSearch.addEventListener("click", () => {
        search();
        console.log("click");
      });

      let nameText;

      function search() {
        //   pChildren.forEach(h => {
        //     //nameText = h.querySelector('h5');   // throws error because child nodes includes heading text too
        //      console.log(h);
        //    })

        // console.log(pInputValue);

        for (let h = 1; h < pChildren.length; h++) {
          nameText = pChildren[h].querySelector("h5").innerText;
          // console.log(pChildren[h]);
          finalName = nameText.toLowerCase();
          //console.log(finalName);

          pInput.addEventListener("focusout", function () {
            pChildren[h].classList.remove("hide");
            pChildren[h].classList.add("patient");
          });

          if (!finalName.includes(pInputValue)) {
            // console.log('text');
            pChildren[h].classList.remove("patient");
            pChildren[h].classList.add("hide");
          }

          //console.log(pInput);
          // console.log(pChildren[h]);
        }
      }

      let labResults = '';
      let lab = document.querySelector(".lab");
      let labContainer = lab.querySelector(".api-wrap");

      let diagnosisList = ''
      let dListElem = document.querySelector(".d-list");
      let listContainer = dListElem.querySelector(".api-wrap");

      function getdata(dt) {

        let getTable = labContainer.querySelector('table');
        if (getTable) {
          getTable.remove()
        }
        console.log(dt.diagnosis_history);

        labResults = dt.lab_results;
        console.log(labResults);

        let labDiv = document.createElement('div');
        let labTable = document.createElement('table');
        let labHead = document.createElement('thead');
        let labThsr = document.createElement('th');
        let labTh = document.createElement('th');
        let labBody = document.createElement('tbody');

        labContainer.appendChild(labDiv);
        labDiv.classList.add('table');
        labDiv.appendChild(labTable);
        labTable.appendChild(labHead);

        labThsr.textContent = 'Sr No'
        labTh.textContent = 'Name'


        labHead.appendChild(labThsr);
        labHead.appendChild(labTh);
        labTable.appendChild(labBody);

        labResults.forEach(re => {
          let labRow = document.createElement('tr');
          let labTD = document.createElement('td');
          let labTD1 = document.createElement('td');
          
          labBody.appendChild(labRow);
          labRow.appendChild(labTD);
          labRow.appendChild(labTD1);
          labTD1.textContent = re;
          console.log(re)
        })

        let firstChild = labTable.querySelectorAll('td:nth-child(1)');
        console.log(firstChild);
        for (let i = 0; i < firstChild.length; i++) {
          firstChild[i].textContent += i + 1;          
        }          
      }

      function getList (dt) {
        diagnosisList = dt.diagnostic_list;
        console.log(diagnosisList);

        let getTable = listContainer.querySelector('table');
        if (getTable) {
          getTable.remove()
        }

        let dDiv = document.createElement('div');
        let dTable = document.createElement('table');
        let dHead = document.createElement('thead');
        let dThsr = document.createElement('th');
        let dThName = document.createElement('th');
        let dThDesc = document.createElement('th');
        let dThStat = document.createElement('th');
        let dBody = document.createElement('tbody');

      
        listContainer.appendChild(dDiv);
        dDiv.classList.add('table');
        dDiv.appendChild(dTable);
        dTable.appendChild(dHead);

        dThsr.textContent = 'Sr No';
        dThName.textContent = 'Name';
        dThDesc.textContent = 'Description';
        dThStat.textContent = 'Status';


        dHead.appendChild(dThsr);
        dHead.appendChild(dThName);
        dHead.appendChild(dThDesc);
        dHead.appendChild(dThStat);
        dTable.appendChild(dBody);

        
        diagnosisList.forEach(list => {
          console.log(list)
          let dRow = document.createElement('tr');
          let dTDsr = document.createElement('td');
          let dTDname = document.createElement('td');
          let dTDdesc = document.createElement('td');
          let dTDstat = document.createElement('td');
          
          dBody.appendChild(dRow);
          dRow.appendChild(dTDsr);
          dRow.appendChild(dTDname);
          dRow.appendChild(dTDdesc);
          dRow.appendChild(dTDstat);

          dTDname.textContent = list.name;
          dTDdesc.textContent = list.description;
          dTDstat.textContent = list.status;

        
        })
        

        let firstChildAg = dTable.querySelectorAll('td:nth-child(1)');
        console.log(firstChildAg);
        for (let i = 0; i < firstChildAg.length; i++) {
          firstChildAg[i].textContent += i + 1;          
        }
      }

      let chartInstance;

      // Get the canvas element by its ID
      const ctx = document.getElementById("lineChart").getContext("2d");

      // Create the chart
      const myChart = new Chart(ctx, {
        type: "bar", // Type of chart ('bar', 'line', 'pie', etc.)
        data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"], // Labels for the X-axis
          datasets: [
            {
              label: "# of Votes", // Dataset label
              data: [12, 19, 3, 5, 2, 3], // Data points for the chart
              backgroundColor: [
                // Background colors for bars
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                // Border colors for bars
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1, // Border width for bars
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true, // Start Y-axis at 0
            },
          },
        },
      });
    })
    .catch((error) => console.error("error", error));
});
