window.onload = function onLoadFunction() {

  // Sort report log messages by user name.
  var sortUserDir = "";
  var sortUserClick = document.querySelectorAll(".sortUser, .sortUserHeb");
  for (i = 0; i < sortUserClick.length; i++) {
    sortUserClick[i].addEventListener("click", () => {
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
        if (logReports.length === 0) {
          reportsText = "No reports in log.";
          textArea.innerHTML = reportsText;
          return;
        }
        console.log(sortUserDir, " sort user desc")
        logReports = logReports.sort(compareDesc);
        sortUserDir = "asc"
      } else {
        if (logReports.length === 0) {
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
        if (localStorage.getItem("langSelect") === "english") {
          reportsText += `<div><b>User: </b>${logReports[i].user}</div>` +
            `<div><b>Date: </b>${new Date(logReports[i].date).toString().substr(0, 24)}</div>` +
            `<div><b>Notes: </b>${logReports[i].notes}</div>` +
            `<div><i class='far fa-edit' onclick="editRepLog(${i})"></i>` +
            `<i class="far fa-trash-alt" onclick="deleteRepLog(${i})"></i></div>` +
            `<div><b>---------------</b></div>`
        } else {
          reportsText += `<div dir="rtl"><b>משתמש: </b>${logReports[i].user}</div>` +
            `<div dir="rtl"><b>תאריך: </b>${new Date(logReports[i].date).toString().substr(0, 24)}</div>` +
            `<div dir="rtl"><b>הערות: </b>${logReports[i].notes}</div>` +
            `<div><i class='far fa-edit' onclick="editRepLog(${i})"></i>` +
            `<i class="far fa-trash-alt" onclick="deleteRepLog(${i})"></i></div>` +
            `<div dir="rtl"><b>---------------</b></div>`
        }
      }
      textArea.innerHTML = reportsText;
      if (localStorage.getItem("langSelect") === "hebrew") {
        textArea.style.textAlign = "right";
      }else{
        textArea.style.textAlign = "left";
      }
    });
  }

  // Sort report log messages by date.
  var sortDateDir = "";
  var sortDateClick = document.querySelectorAll(".sortDate, .sortDateHeb");
  for (i = 0; i < sortDateClick.length; i++) {
    sortDateClick[i].addEventListener("click", () => {
      textArea = document.getElementById("reportsLogModalBody");
      logReports = JSON.parse(dailyReport);
      reportsText = "";
      function compareAsc(a, b) {
        if (new Date(a.date) > new Date(b.date)) {
          return -1;
        }
        if (new Date(a.date) < new Date(b.date)) {
          return 1;
        }
        return 0;
      }
      function compareDesc(a, b) {
        if (new Date(a.date) < new Date(b.date)) {
          return -1;
        }
        if (new Date(a.date) > new Date(b.date)) {
          return 1;
        }
        return 0;
      }
      if (sortDateDir === "desc") {
        if (logReports.length === 0) {
          reportsText = "No reports in log.";
          textArea.innerHTML = reportsText;
          return;
        }
        console.log(sortDateDir, " sort date desc")
        logReports = logReports.sort(compareAsc);
        sortDateDir = "asc"
      } else {
        if (logReports.length === 0) {
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
        if (localStorage.getItem("langSelect") === "english") {
          reportsText += `<div><b>User: </b>${logReports[i].user}</div>` +
            `<div><b>Date: </b>${new Date(logReports[i].date).toString().substr(0, 24)}</div>` +
            `<div><b>Notes: </b>${logReports[i].notes}</div>` +
            `<div><i class='far fa-edit' onclick="editRepLog(${i})"></i>` +
            `<i class="far fa-trash-alt" onclick="deleteRepLog(${i})"></i></div>` +
            `<div><b>---------------</b></div>`
        } else {
          var dayName = new Date(logReports[i].date).toString().substr(0, 3);
          var dayNum = new Date(logReports[i].date).getDay();
          var month = new Date(logReports[i].date).getMonth();
          dateToHebrew(dayName, month);
          var repTime = new Date(logReports[i].date).toString().substr(16, 8)
          var year = new Date(logReports[i].date).getFullYear();
          var repDate = hebDayName + ", ה-" + dayNum + " ל" + monthHebName + ", " + year + ", בשעה " + repTime;
          reportsText += `<div dir="rtl"><b>משתמש: </b>${logReports[i].user}</div>` +
            `<div dir="rtl"><b>תאריך: </b>${repDate}</div>` +
            `<div dir="rtl"><b>הערות: </b>${logReports[i].notes}</div>` +
            `<div><i class='far fa-edit' onclick="editRepLog(${i})"></i>` +
            `<i class="far fa-trash-alt" onclick="deleteRepLog(${i})"></i></div>` +
            `<div dir="rtl"><b>---------------</b></div>`
        }
      }
      textArea.innerHTML = reportsText;
      if (localStorage.getItem("langSelect") === "hebrew") {
        textArea.style.textAlign = "right";
      }else{
        textArea.style.textAlign = "left";
      }
    });
  }

  // Complete report for report log.
  document.querySelector("#completeReport").addEventListener("click", () => {
    var date = new Date().toString();
    modalTitle = document.getElementById('exampleModalLongTitle');
    modalTitle.innerText = date.substr(0, 15) + " Daily Report";
    textArea = document.getElementById('exampleFormControlTextarea1');
    textArea.value = "";
    textArea.dir = "ltr";
  });

  document.querySelector("#completeReportHe").addEventListener("click", () => {
    var dateHeb = document.getElementById("dateHeb").innerText;
    modalTitle = document.getElementById('exampleModalLongTitle');
    modalTitle.innerText = 'דו"ח ' + dateHeb;
    textArea = document.getElementById('exampleFormControlTextarea1');
    textArea.value = "";
    textArea.dir = "rtl";
  });

  // View reports log.
  document.querySelector("#viewReportsLogHeb").addEventListener("click", () => {
    viewRepLog();
  })

  document.querySelector("#viewReportsLog").addEventListener("click", () => {
    viewRepLog();
  })

  function viewRepLog() {
    sortUserButton = document.getElementsByClassName("sortUser");
    sortUserButton[0].className = "btn btn-info sortUser";
    console.log(localStorage.getItem("langSelect"))
    if (localStorage.getItem("langSelect") === "hebrew") {
      sortUserButton[0].innerText = "משתמש ↕"
      } else{
        sortUserButton[0].innerText = "user ↕"
      }
    sortDateButton = document.getElementsByClassName("sortDate");
    sortDateButton[0].className = "btn btn-info sortDate";
    if (localStorage.getItem("langSelect") === "hebrew") {
    sortDateButton[0].innerText = "תאריך ↕";
    if(screen.width > 360){
      sortDateButton[0].style.marginRight = "48%";
    }else{ 
      sortDateButton[0].style.marginRight = "23%";
    }
    } else{
      sortDateButton[0].innerText = "date ↕";
      if(screen.width > 360){
        sortDateButton[0].style.marginRight = "50%";
      }else{ 
        sortDateButton[0].style.marginRight = "26%";
      }
    }
    saveEditButton = document.getElementById("saveEditButton");
    if (localStorage.getItem("langSelect") === "hebrew") {
      saveEditButton.innerText = "שמור"
      } else{
        saveEditButton.innerText = "Save changes"
      }

    saveEditButton.className = "btn btn-primary hide";
    modalTitle = document.getElementById('reportsModalLongTitle');
    modalTitleHeb = document.getElementById('reportsModalLongTitleHeb');
    modalTitle.innerText = "Reports Log";
    modalTitleHeb.innerText = 'יומן דו"חות';
    textArea = document.getElementById("reportsLogModalBody");
    logReports = JSON.parse(dailyReport);
    if (logReports.length === 0) {
      reportsText = "No reports in log.";
      textArea.innerHTML = reportsText;
      return;
    }
    function compareDesc(a, b) {
      if (logReports.length === 0) {
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
      if (localStorage.getItem("langSelect") === "english") {
        reportsText += `<div><b>User: </b>${logReports[i].user}</div>` +
          `<div><b>Date: </b>${new Date(logReports[i].date).toString().substr(0, 24)}</div>` +
          `<div><b>Notes: </b>${logReports[i].notes}</div>` +
          `<div><i class='far fa-edit' onclick="editRepLog(${i})"></i>` +
          `<i class="far fa-trash-alt" onclick="deleteRepLog(${i})"></i></div>` +
          `<div><b>---------------</b></div>`
      } else {
        var dayName = new Date(logReports[i].date).toString().substr(0, 3);
        var dayNum = new Date(logReports[i].date).getDay(); 
        var month = new Date(logReports[i].date).getMonth();
        dateToHebrew(dayName, month);
        var repTime = new Date(logReports[i].date).toString().substr(16, 8)
        var year = new Date(logReports[i].date).getFullYear();
        var repDate = hebDayName + ", ה-" + dayNum + " ל" + monthHebName + ", " + year + ", בשעה " + repTime;
        reportsText += `<div dir="rtl"><b>משתמש: </b>${logReports[i].user}</div>` +
          `<div dir="rtl"><b>תאריך: </b>${repDate}</div>` +
          `<div dir="rtl"><b>הערות: </b>${logReports[i].notes}</div>` +
          `<div><i class='far fa-edit' onclick="editRepLog(${i})"></i>` +
          `<i class="far fa-trash-alt" onclick="deleteRepLog(${i})"></i></div>` +
          `<div dir="rtl"><b>---------------</b></div>`
      }
    }
    textArea.innerHTML = reportsText;
    if (localStorage.getItem("langSelect") === "hebrew") {
      textArea.style.textAlign = "right";
    } else{
      textArea.style.textAlign = "left";
    }
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


// Display alert messages.
function alertToast(type, message) {
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
  if (notes === "") {
    if (localStorage.getItem("langSelect") === "english") {
      message = "Please, fill out the comments section.";
    } else {
      message = ".נא למלא את חלק ההערות";
    }
    alertToast('failure', message);
    return;
  }
  dailyReportArray.push({ "date": new Date, "user": "Oren", "notes": notes });
  console.log(dailyReportArray);
  dailyReportArray = JSON.stringify(dailyReportArray)
  localStorage.setItem("dailyReport", dailyReportArray);
  dailyReport = localStorage.getItem("dailyReport");
  if (localStorage.getItem("langSelect") === "english") {
    message = "Report submitted successfully!";
  } else {
    message = '!הדו"ח נשמר בהצלחה';
  }
  $("#exampleModalCenter").modal('hide');
  setTimeout(function () { alertToast('success', message) }, 500);
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
    if(localStorage.getItem("langSelect") === "english"){
      reportsText += `<div><b>User: </b>${logReports[i].user}</div>` +
      `<div><b>Date: </b>${new Date(logReports[i].date).toString().substr(0, 24)}</div>` +
      `<div><b>Notes: </b>${logReports[i].notes}</div>` +
      `<div><i class='far fa-edit' onclick="editRepLog(${i})"></i>` +
      `<i class="far fa-trash-alt" onclick="deleteRepLog(${i})"></i></div>` +
      `<div><b>---------------</b></div>`
    }else {
        reportsText += `<div dir="rtl"><b>משתמש: </b>${logReports[i].user}</div>` +
          `<div dir="rtl"><b>תאריך: </b>${new Date(logReports[i].date).toString().substr(0, 24)}</div>` +
          `<div dir="rtl"><b>הערות: </b>${logReports[i].notes}</div>` +
          `<div><i class='far fa-edit' onclick="editRepLog(${i})"></i>` +
          `<i class="far fa-trash-alt" onclick="deleteRepLog(${i})"></i></div>` +
          `<div dir="rtl"><b>---------------</b></div>`
      }
  }
  textArea.innerHTML = reportsText;

  if (localStorage.getItem("langSelect") === "english") {
    message = "Report deleted successfully!";
  } else {
    message = '!הדו"ח נמחק בהצלחה';
  }
  alertToast('success', message);
}

// Edit reports in report log.
function editRepLog(num) {
  console.log(num);
  sortUserButton = document.getElementsByClassName("sortUser");
  sortUserButton[0].className = "btn btn-info sortUser hide";
  sortDateButton = document.getElementsByClassName("sortDate");
  sortDateButton[0].className = "btn btn-info sortDate hide";
  saveEditButton = document.getElementById("saveEditButton");
  if (localStorage.getItem("langSelect") === "hebrew") {
    saveEditButton.innerText = "שמור"
    } else{
      saveEditButton.innerText = "Save changes"
    }
  saveEditButton.className = "btn btn-primary";
  textArea = document.getElementById("reportsLogModalBody");
  logReports = JSON.parse(dailyReport);
  reportsText = "";
  for (i = 0; i < logReports.length; i++) {
    if (i === num) {
      if (localStorage.getItem("langSelect") === "english") {
        reportsText += `<div><b>User: </b>${logReports[i].user}</div>` +
        `<div><b>Date: </b>${new Date(logReports[i].date).toString().substr(0, 24)}</div>` +
        `<div><b>Notes: </b><textarea class="form-control" id="editReminderText" rows="3">${logReports[i].notes}</textarea></div>`;
      } else {
        reportsText += `<div dir="rtl"><b>משתמש: </b>${logReports[i].user}</div>` +
        `<div dir="rtl"><b>תאריך: </b>${new Date(logReports[i].date).toString().substr(0, 24)}</div>` +
        `<div dir="rtl"><b>הערות: </b><textarea class="form-control" id="editReminderText" rows="3">${logReports[i].notes}</textarea></div>`;
      }
    }
  }
  textArea.innerHTML = reportsText;
  if (localStorage.getItem("langSelect") === "hebrew") {
    textArea.style.textAlign = "right";
  }else{
    textArea.style.textAlign = "left";
  }

  saveEditButton.onclick = function(){saveEdit(num)};
  return;
}

// Save edited reports in report log.
  function saveEdit(num) {
  console.log("this is the number: " + num)
  editReminderText = document.getElementById("editReminderText");
  console.log(editReminderText.value);
  logReports = JSON.parse(dailyReport);
  logReports[num].notes = editReminderText.value;
  dailyReport = JSON.stringify(logReports);
  localStorage.setItem("dailyReport", dailyReport);
  if (localStorage.getItem("langSelect") === "english") {
    message = "report log edited successfully!";
    } else {
      message = '!הדו"ח נערך בהצלחה';
    }
    $("#reportsModal").modal('hide');
    if (localStorage.getItem("langSelect") === "english") {
      setTimeout(function () { document.getElementById("viewReportsLog").click(); }, 500);
    } else {
      setTimeout(function () { document.getElementById("viewReportsLogHeb").click(); }, 500);
    }
    setTimeout(function () { alertToast('success', message) }, 500);
    return;
  }

  var hebDayName = "";
  var monthHebName = "";

  function dateToHebrew(dayName, month){
    if(dayName === "Sun"){hebDayName = "יום ראשון"};
        if(dayName === "Mon"){hebDayName = "יום שני"};
        if(dayName === "Tue"){hebDayName = "יום שלישי"};
        if(dayName === "Wed"){hebDayName = "יום רביעי"};
        if(dayName === "Thu"){hebDayName = "יום חמישי"};
        if(dayName === "Fri"){hebDayName = "יום שישי"};
        if(dayName === "Sat"){hebDayName = "יום שבת"};
        
        if (month === 0) { monthHebName = "ינואר" };
        if (month === 1) { monthHebName = "פברואר" };
        if (month === 2) { monthHebName = "מרץ" };
        if (month === 3) { monthHebName = "אפריל" };
        if (month === 4) { monthHebName = "מאי" };
        if (month === 5) { monthHebName = "יוני" };
        if (month === 6) { monthHebName = "יולי" };
        if (month === 7) { monthHebName = "אוגוסט" };
        if (month === 8) { monthHebName = "ספטמבר" };
        if (month === 9) { monthHebName = "אוקטובר" };
        if (month === 10) { monthHebName = "נובמבר" };
        if (month === 11) { monthHebName = "דצמבר" };
  }