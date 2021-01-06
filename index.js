window.onload = function onLoadFunction() {

  // Sort report log messages by user name.
  var sortUserDir = "";
  document.querySelector(".sortUser").addEventListener("click", () => {
    textArea = document.getElementById("reportsLogModalBody");
    logReports = JSON.parse(dailyReport);
    reportsText = "";
    function compareAsc(a, b) {
      if (a.user.toUpperCase() < b.user.toUpperCase()) {
        return -1;
      }
      if (a.user.toUpperCase() > b.user.toUpperCase()) {
        return 1;
      }
      return 0;
    }
    function compareDesc(a, b) {
      if (a.user.toUpperCase() > b.user.toUpperCase()) {
        return -1;
      }
      if (a.user.toUpperCase() < b.user.toUpperCase()) {
        return 1;
      }
      return 0;
    }
    if (sortUserDir === "desc") {
      if(logReports.length === 0){
        reportsText = "No reports in log.";
        textArea.innerHTML = reportsText;
        return;
      }
      console.log(sortUserDir, " sort user desc")
      logReports = logReports.sort(compareDesc);
      sortUserDir = "asc"
    } else {
      if(logReports.length === 0){
        reportsText = "No reports in log.";
        textArea.innerHTML = reportsText;
        return;
      }
      console.log(sortUserDir, "sort user asc")
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
        `<div><i class='far fa-edit' onclick="editRepLog(${i})"></i>` + 
        `<i class="far fa-trash-alt" onclick="deleteRepLog(${i})"></i></div>` +
        `<div><b>---------------</b></div>`
    }
    textArea.innerHTML = reportsText;
  });

  // Sort report log messages by date.
  var sortDateDir = "";
  document.querySelector(".sortDate").addEventListener("click", () => {
    textArea = document.getElementById("reportsLogModalBody");
    logReports = JSON.parse(dailyReport);
    reportsText = "";
    function compareAsc(a, b) {
      if (new Date(a.date) < new Date(b.date)) {
        return -1;
      }
      if (new Date(a.date) > new Date(b.date)) {
        return 1;
      }
      return 0;
    }
    function compareDesc(a, b) {
      if (new Date(a.date) > new Date(b.date)) {
        return -1;
      }
      if (new Date(a.date) < new Date(b.date)) {
        return 1;
      }
      return 0;
    }
    if (sortDateDir === "desc") {
      if(logReports.length === 0){
        reportsText = "No reports in log.";
        textArea.innerHTML = reportsText;
        return;
      }
      console.log(sortDateDir, " sort date desc")
      logReports = logReports.sort(compareAsc);
      sortDateDir = "asc"
    } else {
      if(logReports.length === 0){
        reportsText = "No reports in log.";
        textArea.innerHTML = reportsText;
        return;
      }
      console.log(sortDateDir, "sort date asc")
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
        `<div><i class='far fa-edit' onclick="editRepLog(${i})"></i>` + 
        `<i class="far fa-trash-alt" onclick="deleteRepLog(${i})"></i></div>` +
        `<div><b>---------------</b></div>`
    }
    textArea.innerHTML = reportsText;
  });

  // Complete report for report log.
  document.querySelector("#completeReport").addEventListener("click", () => {
    var date = new Date().toString();
    modalTitle = document.getElementById('exampleModalLongTitle');
    modalTitle.innerText = date.substr(0, 15) + " Daily Report";
    textArea = document.getElementById('exampleFormControlTextarea1');
    textArea.value = "";
  });
  
  document.querySelector("#completeReportHe").addEventListener("click", () => {
    var dateHeb = document.getElementById("dateHeb").innerText;
    modalTitle = document.getElementById('exampleModalLongTitle');
    modalTitle.innerText =  'דו"ח ' + dateHeb;
    textArea = document.getElementById('exampleFormControlTextarea1');
    textArea.value = "";
  });

  // View reports log.
  document.querySelector("#viewReportsLogHeb").addEventListener("click", () => {
    viewRepLog();
  })

  document.querySelector("#viewReportsLog").addEventListener("click", () => {
    viewRepLog();
  })

  function viewRepLog(){
    sortUserButton = document.getElementsByClassName("sortUser");
    sortUserButton[0].className="btn btn-info sortUser";
    sortUserButton = document.getElementsByClassName("sortDate");
    sortUserButton[0].className="btn btn-info sortDate";
    saveEditButton = document.getElementById("saveEditButton");
    saveEditButton.className = "btn btn-primary hide";
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
    dailyReport = JSON.stringify(logReports);
    localStorage.setItem("dailyReport", dailyReport);
    reportsText = "";
    console.log(logReports[0].user)
    for (i = 0; i < logReports.length; i++) {
      reportsText += `<div><b>User: </b>${logReports[i].user}</div>` +
        `<div><b>Date: </b>${new Date(logReports[i].date).toString().substr(0, 24)}</div>` +
        `<div><b>Notes: </b>${logReports[i].notes}</div>` +
        `<div><i class='far fa-edit' onclick="editRepLog(${i})"></i>` + 
        `<i class="far fa-trash-alt" onclick="deleteRepLog(${i})"></i></div>` +
        `<div><b>---------------</b></div>`
    }
    textArea.innerHTML = reportsText;
  };

  // Dashboard appointment clicks.
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

  var helloUsrHeb = document.getElementById("helloUsrHeb");
  var usrHeb = "אורן"
  helloUsrHeb.innerHTML = "שלום, " + usrHeb + "!"

  // Patient cards
  // var patientNumber = 0;
  // var patientCard1 = document.getElementById("patient1");
  // var patientCard2 = document.getElementById("patient2");
  // var patientCard3 = document.getElementById("patient3");
  // var patientCard4 = document.getElementById("patient4");
  // var patientCard5 = document.getElementById("patient5");

  // patientCard1.innerHTML = `
  // <div lang="en" style="height: 25px;">Oren Avni</div>
  // <div lang="he" dir="rtl" style="height: 25px;">Oren Avni</div>
  // <div class="sched-item">7:30 AM</div>
  // `
  // patientCard2.innerHTML = "Patient " + (2 + patientNumber);
  // patientCard3.innerHTML = "Patient " + (3 + patientNumber);
  // patientCard4.innerHTML = "Patient " + (4 + patientNumber);
  // patientCard5.innerHTML = "Patient " + (5 + patientNumber);
}
// End of window onload

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

// Display alert messages.
function alert(type, message){
  var alertType = document.getElementById(type);
  alertType.innerText = message;
  alertClass = type.charAt(0).toUpperCase() + type.slice(1);
  alertType.className = "centerAlert alert-item fade-in fadeIn" + alertClass;
  setTimeout(function () { alertType.className = "centerAlert alert-item fade-out fadeOut" + alertClass; }, 3000);
  setTimeout(function () { alertType.className = "alert-off"; }, 4900);
}

// Create an empty daily report array if it doesn't exist yet.
var dailyReport = localStorage.getItem("dailyReport");
if (dailyReport === null) {
  console.log("no daily rep in storage");
  var dailyReportArray = [];
  dailyReportArray = JSON.stringify(dailyReportArray)
  localStorage.setItem("dailyReport", dailyReportArray);
  dailyReport = localStorage.getItem("dailyReport");
};

// Save report in daily report log.
function saveDailyReport() {
  console.log("function saveDaily report");
  console.log(dailyReport);
  dailyReportArray = JSON.parse(dailyReport);
  var notes = document.getElementById("exampleFormControlTextarea1").value;
  if (notes === ""){
    message = "Please, fill out the comments section.";
    alert('failure', message);
    return;
  }
  dailyReportArray.push({ "date": new Date, "user": "Oren", "notes": notes });
  console.log(dailyReportArray);
  dailyReportArray = JSON.stringify(dailyReportArray)
  localStorage.setItem("dailyReport", dailyReportArray);
  dailyReport = localStorage.getItem("dailyReport");
  message = "Report submitted successfully!";
  alert('success', message);
}

// Multi-purpose save button; for now it activates the saveDailyReport function.
function saveChanges() {
  var modalTitle = document.getElementById('exampleModalLongTitle').innerText;
  console.log(modalTitle);
  if (modalTitle.includes("Daily Report") || modalTitle.includes('דו"ח')) {
    saveDailyReport();
  }
}

// Delete reports from report log.
function deleteRepLog(num) {
  console.log("delete: " + num);
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
      `<div><i class='far fa-edit' onclick="editRepLog(${i})"></i>` + 
      `<i class="far fa-trash-alt" onclick="deleteRepLog(${i})"></i></div>` +
      `<div><b>---------------</b></div>`
  }
  textArea.innerHTML = reportsText;
  message = "Report deleted successfully!";
  alert('success', message);
}

// Edit reports in report log.
function editRepLog(num) {
  console.log(num);
  sortUserButton = document.getElementsByClassName("sortUser");
  sortUserButton[0].className = "btn btn-info sortUser hide";
  sortUserButton = document.getElementsByClassName("sortDate");
  sortUserButton[0].className = "btn btn-info sortDate hide";
  saveEditButton = document.getElementById("saveEditButton");
  saveEditButton.className = "btn btn-primary";
  textArea = document.getElementById("reportsLogModalBody");
  logReports = JSON.parse(dailyReport);
  reportsText = "";
  for (i = 0; i < logReports.length; i++) {
    if(i === num){
      reportsText += `<div><b>User: </b>${logReports[i].user}</div>` +
      `<div><b>Date: </b>${new Date(logReports[i].date).toString().substr(0, 24)}</div>` +
      `<div><b>Notes: </b><textarea class="form-control" id="editReminderText" rows="3">${logReports[i].notes}</textarea></div>`
    }
  }
  textArea.innerHTML = reportsText;
  saveEditButton.addEventListener("click", () => {
    saveEdit(num)
  })
  return;
}

// Save edited reports in report log.
function saveEdit(num){
  console.log("this is the number: " + num)
  editReminderText = document.getElementById("editReminderText");
  console.log(editReminderText.value);
  logReports = JSON.parse(dailyReport);
  logReports[num].notes = editReminderText.value;
  dailyReport = JSON.stringify(logReports);
  localStorage.setItem("dailyReport", dailyReport);
  message = "report log edited successfully!"
  $("#reportsModal").modal('hide');
  setTimeout(function () { alert('success', message) }, 500);
}