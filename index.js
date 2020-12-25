window.onload = function onLoadFunction() {

  // sort report log messages by user name
  var sortUserDir = "";
  document.querySelector(".sortUser").addEventListener("click", () => {
    textArea = document.getElementById("reportsLogModalBody");
    logReports = JSON.parse(dailyReport);
    reportsText = "";
    function compareAsc(a, b) {
      if(logReports.length === 0){
        return;
      }
      if (a.user.toUpperCase() < b.user.toUpperCase()) {
        return -1;
      }
      if (a.user.toUpperCase() > b.user.toUpperCase()) {
        return 1;
      }
      return 0;
    }
    function compareDesc(a, b) {
      if(logReports.length === 0){
        return;
      }
      if (a.user.toUpperCase() > b.user.toUpperCase()) {
        return -1;
      }
      if (a.user.toUpperCase() < b.user.toUpperCase()) {
        return 1;
      }
      return 0;
    }
    if (sortUserDir === "desc") {
      console.log(sortUserDir, " sort desc")
      logReports = logReports.sort(compareDesc);
      sortUserDir = "asc"
    } else {
      console.log(sortUserDir, "sort asc")
      logReports = logReports.sort(compareAsc);
      sortUserDir = "desc"
    }
    console.log(logReports)
    dailyReport = JSON.stringify(logReports);
    localStorage.setItem("dailyReport", dailyReport);

    for (i = 0; i < logReports.length; i++) {
      reportsText += `<div><b>User: </b>${logReports[i].user}</div>` +
        `<div><b>Date: </b>${new Date(logReports[i].date).toString().substr(0, 24)}</div>` +
        `<div><b>Notes: </b>${logReports[i].notes}</div>` +
        `<div><i class='far fa-edit'></i><i class="far fa-trash-alt" onclick="deleteRepLog(${i})"></i></div>` +
        `<div><b>---------------</b></div>`
    }
    textArea.innerHTML = reportsText;
  });

  // sort report log messages by date
  var sortDateDir = "";
  document.querySelector(".sortDate").addEventListener("click", () => {
    textArea = document.getElementById("reportsLogModalBody");
    logReports = JSON.parse(dailyReport);
    // console.log(logReports)
    reportsText = "";
    function compareAsc(a, b) {
      if(logReports.length === 0){
        return;
      }
      if (new Date(a.date) < new Date(b.date)) {
        return -1;
      }
      if (new Date(a.date) > new Date(b.date)) {
        return 1;
      }
      return 0;
    }
    function compareDesc(a, b) {
      if(logReports.length === 0){
        return;
      }
      if (new Date(a.date) > new Date(b.date)) {
        return -1;
      }
      if (new Date(a.date) < new Date(b.date)) {
        return 1;
      }
      return 0;
    }
    if (sortDateDir === "desc") {
      console.log(sortDateDir, " sort desc")
      logReports = logReports.sort(compareAsc);
      sortDateDir = "asc"
    } else {
      console.log(sortDateDir, "sort asc")
      logReports = logReports.sort(compareDesc);
      sortDateDir = "desc"
    }
    console.log(logReports)
    dailyReport = JSON.stringify(logReports);
    localStorage.setItem("dailyReport", dailyReport);

    for (i = 0; i < logReports.length; i++) {
      reportsText += `<div><b>User: </b>${logReports[i].user}</div>` +
        `<div><b>Date: </b>${new Date(logReports[i].date).toString().substr(0, 24)}</div>` +
        `<div><b>Notes: </b>${logReports[i].notes}</div>` +
        `<div><i class='far fa-edit'></i><i class="far fa-trash-alt" onclick="deleteRepLog(${i})"></i></div>` +
        `<div><b>---------------</b></div>`
    }
    textArea.innerHTML = reportsText;
  });

  // complete report for report log
  document.querySelector("#completeReport").addEventListener("click", () => {
    var date = new Date().toString();
    modalTitle = document.getElementById('exampleModalLongTitle');
    modalTitle.innerText = date.substr(0, 15) + " Daily Report";
    textArea = document.getElementById('exampleFormControlTextarea1');
    textArea.value = "";
  });

  // view reports log
  document.querySelector("#viewReportsLog").addEventListener("click", () => {
    modalTitle = document.getElementById('reportsModalLongTitle');
    modalTitle.innerText = "Reports Log";
    textArea = document.getElementById("reportsLogModalBody");
    logReports = JSON.parse(dailyReport);
    if (logReports.length === 0) {
      reportsText = "No reports in log.";
      textArea.innerHTML = reportsText;
      return;
    }
    function compareDesc(a, b) {
      if(logReports.length === 0){
        return;
      }
      if (new Date(a.date) > new Date(b.date)) {
        return -1;
      }
      if (new Date(a.date) < new Date(b.date)) {
        return 1;
      }
      return 0;
    }
    logReports = logReports.sort(compareDesc);
    reportsText = "";
    console.log(logReports[0].user)
    for (i = 0; i < logReports.length; i++) {
      reportsText += `<div><b>User: </b>${logReports[i].user}</div>` +
        `<div><b>Date: </b>${new Date(logReports[i].date).toString().substr(0, 24)}</div>` +
        `<div><b>Notes: </b>${logReports[i].notes}</div>` +
        `<div><i class='far fa-edit'></i><i class="far fa-trash-alt" onclick="deleteRepLog(${i})"></i></div>` +
        `<div><b>---------------</b></div>`
    }
    textArea.innerHTML = reportsText;
  });

  // dashboard appointment clicks
  document.querySelectorAll('.dash-appointment').forEach(item => {
    item.addEventListener('click', e => {
      e = e || window.event;
      var target = e.target,
        // text = target.textContent || target.innerText;
        text = target.innerText;
      modalTitle = document.getElementById('exampleModalLongTitle');
      modalTitle.innerText = text;
      textArea = document.getElementById('exampleFormControlTextarea1');
      textArea.value = "";
    }, false)
  })


  // Hello User
  var helloUsr = document.getElementById("helloUsr");
  var usr = "John"
  helloUsr.innerHTML = "Hello, " + usr + "!"

  // patient cards
  var patientNumber = 0;
  var patientCard1 = document.getElementById("patient1");
  var patientCard2 = document.getElementById("patient2");
  var patientCard3 = document.getElementById("patient3");
  var patientCard4 = document.getElementById("patient4");
  var patientCard5 = document.getElementById("patient5");

  patientCard1.innerHTML = "Patient " + (1 + patientNumber);
  patientCard2.innerHTML = "Patient " + (2 + patientNumber);
  patientCard3.innerHTML = "Patient " + (3 + patientNumber);
  patientCard4.innerHTML = "Patient " + (4 + patientNumber);
  patientCard5.innerHTML = "Patient " + (5 + patientNumber);
}
// end of window onload

var patientNumber = 0;

function prev() {
  console.log("prev");
  patientNumber--;
  if (patientNumber < 0) {
    patientNumber = 5;
  }
  var patientCard1 = document.getElementById("patient1");
  var patientCard2 = document.getElementById("patient2");
  var patientCard3 = document.getElementById("patient3");
  var patientCard4 = document.getElementById("patient4");
  var patientCard5 = document.getElementById("patient5");

  patientCard1.innerHTML = "Patient " + (1 + patientNumber);
  patientCard2.innerHTML = "Patient " + (2 + patientNumber);
  patientCard3.innerHTML = "Patient " + (3 + patientNumber);
  patientCard4.innerHTML = "Patient " + (4 + patientNumber);
  patientCard5.innerHTML = "Patient " + (5 + patientNumber);
}
function next() {
  console.log("next");
  patientNumber++;
  if (patientNumber > 5) {
    patientNumber = 0;
  }

  var patientCard1 = document.getElementById("patient1");
  var patientCard2 = document.getElementById("patient2");
  var patientCard3 = document.getElementById("patient3");
  var patientCard4 = document.getElementById("patient4");
  var patientCard5 = document.getElementById("patient5");

  patientCard1.innerHTML = "Patient " + (1 + patientNumber);
  patientCard2.innerHTML = "Patient " + (2 + patientNumber);
  patientCard3.innerHTML = "Patient " + (3 + patientNumber);
  patientCard4.innerHTML = "Patient " + (4 + patientNumber);
  patientCard5.innerHTML = "Patient " + (5 + patientNumber);
}

function success() {
  var success = document.getElementById("success");
  success.className = "alert-item fade-in fadeInSuccess";
  setTimeout(function () { success.className = "alert-item fade-out fadeOutSuccess"; }, 3000);
  setTimeout(function () { success.className = "alert-off"; }, 4900);
}
function warning() {
  var warning = document.getElementById("warning");
  warning.className = "alert-item fade-in fadeInWarning";
  setTimeout(function () { warning.className = "alert-item fade-out fadeOutWarning"; }, 3000);
  setTimeout(function () { warning.className = "alert-off"; }, 4900);
}
function failure() {
  var failure = document.getElementById("failure");
  failure.className = "alert-item fade-in fadeInFailure";
  setTimeout(function () { failure.className = "alert-item fade-out fadeOutFailure"; }, 3000);
  setTimeout(function () { failure.className = "alert-off"; }, 4900);
}

// Daily Report
var dailyReport = localStorage.getItem("dailyReport");
if (dailyReport === null) {
  console.log("no daily rep in storage");
  var dailyReportArray = [];
  dailyReportArray = JSON.stringify(dailyReportArray)
  localStorage.setItem("dailyReport", dailyReportArray);
  dailyReport = localStorage.getItem("dailyReport");
};

function saveDailyReport() {
  console.log("function saveDaily report");
  console.log(dailyReport);
  dailyReportArray = JSON.parse(dailyReport);
  var notes = document.getElementById("exampleFormControlTextarea1").value;
  console.log(notes);
  dailyReportArray.push({ "date": new Date, "user": "Oren", "notes": notes });
  console.log(dailyReportArray);
  dailyReportArray = JSON.stringify(dailyReportArray)
  localStorage.setItem("dailyReport", dailyReportArray);
  dailyReport = localStorage.getItem("dailyReport");
}

function saveChanges(e) {
  alert("save changes");
  e = e || window.event;
  var target = e.target,
    // text = target.textContent || target.innerText;
    text = target.innerText;
  console.log(e)
  console.log(text)
  console.log(target)
  var modalTitle = document.getElementById('exampleModalLongTitle').innerText;
  console.log(modalTitle);
  if (modalTitle.includes("Daily Report")) {
    console.log("includes daily report");
    saveDailyReport();
  } else if (modalTitle.includes("Appointment")) {
    console.log("includes appointment")
  }
  else if (modalTitle.length === 15) {
    console.log("includes day")
  }
}


function deleteRepLog(num) {
  console.log(num);
  textArea = document.getElementById("reportsLogModalBody");
  logReports = JSON.parse(dailyReport);
  logReports.splice(num, 1);
  dailyReport = JSON.stringify(logReports);
  localStorage.setItem("dailyReport", dailyReport);
  console.log(logReports)
  reportsText = "";
  for (i = 0; i < logReports.length; i++) {
    reportsText += `<div><b>User: </b>${logReports[i].user}</div>` +
      `<div><b>Date: </b>${new Date(logReports[i].date).toString().substr(0, 24)}</div>` +
      `<div><b>Notes: </b>${logReports[i].notes}</div>` +
      `<div><i class='far fa-edit'></i><i class="far fa-trash-alt" onclick="deleteRepLog(${i})"></i></div>` +
      `<div><b>---------------</b></div>`
  }
  textArea.innerHTML = reportsText;
}
