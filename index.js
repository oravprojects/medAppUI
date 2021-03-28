function checkSession(){
    $.ajax({
        url: "http://127.0.0.1/healthcareProvider/checksession.php",
        type: "GET",
        xhrFields:{
          withCredentials: true
        },
        success: function (data) {
          if(data === "success"){
            console.log("success");
          }else{
            location.href = "http://127.0.0.1:5500/login.html";
            // console.log("failure: ", data);
          }
        }
    });
}
var year = new Date().getFullYear();
var month = new Date().getMonth();
month = (month + 1);
var day = new Date().getDate();
var queryDate = year + "-" + month + "-" + day;
var dailyReport = [];

function getDailyRep(){
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1/healthcareProvider/fetchData.php",
    data: { table: "reports", curr_date: queryDate},
    xhrFields:{
      withCredentials: true
    },
    success: function (res) {
      console.log("res is: ", res.length);
      if (res.length > 0) {
        res = JSON.parse(res);
        for (i = 0; i < res.length; i++) {
          console.log("this is the result: ", i, " ", res);
        }
      }
      dailyReport = res;
      console.log("This is daily rep again: ", dailyReport);
      reportLogTextContent(dailyReport);
    }
  });  
}

// Dashboard appointment clicks.
function appointmentClicks(){
  document.querySelectorAll('.dash-appointment').forEach(item => {
    item.addEventListener('click', e => {
      e = e || window.event;
      var target = e.target,
        // text = target.textContent || target.innerText;
        text = target.innerText;
        console.log("text: " + text + " click id: " + target.id);
      var modalButtonHeb = document.getElementById("saveChangesButtonHeb");
      var modalButton = document.getElementById("saveChangesButton");
      modalButton.name = target.id;
      modalButtonHeb.name = target.id;
      var modalTitle = document.getElementById('exampleModalLongTitle');
      modalTitle.innerText = text;
      var textArea = document.getElementById('exampleFormControlTextarea1');
      textArea.value = "";
      if (text.includes(" AM") || text.includes(" PM")) {
        var appSched = localStorage.getItem("appSched");
        appSched = JSON.parse(appSched);
        for(i=0; i<appSched.length; i++){
          if(appSched[i].meetingId == modalButton.name){
            var existingNotes = appSched[i].meetingNotes;
            i=appSched.length;
          }
        }
        textArea.value = existingNotes;
      }
      if (localStorage.getItem("langSelect") === "hebrew") {
        textArea.dir = "rtl"
        modalTitle.dir = "rtl"
      } else {
        textArea.dir = "ltr"
        modalTitle.dir = "ltr"
      }
      }, false)
  })
}

// Display alert messages.
function alertToast(type, message) {
  var alertType = document.getElementById(type);
  alertType.innerText = message;
  alertClass = type.charAt(0).toUpperCase() + type.slice(1);
  alertType.className = "centerAlert alert-item fade-in fadeIn" + alertClass;
  setTimeout(function () { alertType.className = "centerAlert alert-item fade-out fadeOut" + alertClass; }, 3000);
  setTimeout(function () { alertType.className = "alert-off"; }, 4900);
}

function getTimeOffset(){
  var currDate = new Date();
  var timeOffset = currDate.getTimezoneOffset();
  timeOffset = timeOffset/(-60);
  return timeOffset;
}

// Save report in daily report log.
function saveDailyReport() {
  var usr = localStorage.getItem("user");
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

  // send daily rep to database
  
  var timeOffset = getTimeOffset();

  $.ajax({
    type: "POST",
    url: "http://127.0.0.1/healthcareProvider/fetchData.php",
    data: { table: "reports_add", curr_date: timeOffset, notes: notes, type: "daily_report" },
    xhrFields: {
      withCredentials: true
    },
    success: function (res) {
      console.log("this is the add rep res: ", res);
      getDailyRep();
      if (localStorage.getItem("langSelect") === "english") {
        message = "Report submitted successfully!";
      } else {
        message = '!הדו"ח נשמר בהצלחה';
      }
      $("#exampleModalCenter").modal('hide');
      setTimeout(function () { alertToast('success', message) }, 500);
    }
  });
}

// Multi-purpose save button; for now it activates the saveDailyReport function.
function saveChanges(e) {
  var modalTitle = document.getElementById('exampleModalLongTitle').innerText;
  console.log(modalTitle);
  if (modalTitle.includes("Daily Report") || modalTitle.includes('דו"ח')) {
    saveDailyReport();
  }
  if (modalTitle.includes(" AM") || modalTitle.includes(" PM")) {
    saveMeetingNotes(e);
  }
}

function saveMeetingNotes(e){
  meetingId = e.target.name;
  console.log("button name: " + meetingId)
  var patientName = document.getElementById('exampleModalLongTitle').innerText;
  var user = localStorage.getItem('user');
  var notes = document.getElementById("exampleFormControlTextarea1").value;
  var currDate = new Date();
  var appSched = localStorage.getItem("appSched");
  appSched = JSON.parse(appSched);
  console.log("save meeting notes: " + patientName + " user: " + user + " notes: " + notes + " date: " + currDate.getTime());
  
  if (notes === "") {
    if (localStorage.getItem("langSelect") === "english") {
      message = "Please, fill out the comments section.";
    } else {
      message = ".נא למלא את חלק ההערות";
    }
    alertToast('failure', message);
    return;
  }

  for (i=0; i<appSched.length; i++){
    console.log("this meetingId: " + meetingId + " array meeting id: " + appSched[i].meetingId)
    if(appSched[i].meetingId == meetingId){
      appSched[i].meetingNotes = notes;
      appSched = JSON.stringify(appSched);
      localStorage.setItem("appSched", appSched);
      appSched = localStorage.getItem("appSched");
      appSched = JSON.parse(appSched);
      console.log(appSched[i]);
    }
  }

  if (localStorage.getItem("langSelect") === "english") {
    message = "Report submitted successfully!";
  } else {
    message = '!הדו"ח נשמר בהצלחה';
  }
  $("#exampleModalCenter").modal('hide');
  setTimeout(function () { alertToast('success', message) }, 500);
}
// Delete reports from report log.
function deleteRepLog(num) {
  console.log("del")
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1/healthcareProvider/fetchData.php",
    data: { table: "reports_del", id: num},
    success: function (res) {
      console.log(res);
      getDailyRep();
    }
  });
  
  if (localStorage.getItem("langSelect") === "english") {
    message = "Report deleted successfully!";
  } else {
    message = '!הדו"ח נמחק בהצלחה';
  }
  alertToast('success', message);
}

// Edit reports in report log.
function editRepLog(num, id) {
  console.log(num, " ", id);
  sortUserButton = document.getElementsByClassName("sortUser");
  sortUserButton[0].className = "btn btn-info sortUser hide";
  sortDateButton = document.getElementsByClassName("sortDate");
  sortDateButton[0].className = "btn btn-info sortDate hide";
  saveEditButton = document.getElementById("saveEditButton");
  if (localStorage.getItem("langSelect") === "hebrew") {
    saveEditButton.innerText = "שמור"
  } else {
    saveEditButton.innerText = "Save changes"
  }
  saveEditButton.className = "btn btn-primary";
  textArea = document.getElementById("reportsLogModalBody");
  logReports = dailyReport;
  var reportsText = "";
  for (i = 0; i < logReports.length; i++) {
    if (i === num) {
      if (localStorage.getItem("langSelect") === "english") {
        reportsText += `<div><b>User: </b>${logReports[i].fname} ${logReports[i].lname}</div>` +
          `<div><b>Date: </b>${new Date(logReports[i].date).toString().substr(0, 24)}</div>` +
          `<div><b>Notes: </b><textarea class="form-control" id="editReminderText" rows="3">${logReports[i].notes}</textarea></div>`;
      } else {
        var dayName = new Date(logReports[i].date).toString().substr(0, 3);
        var dayNum = new Date(logReports[i].date).toString().substr(8, 2);
        var month = new Date(logReports[i].date).getMonth();
        dateToHebrew(dayName, month);
        var repTime = new Date(logReports[i].date).toString().substr(16, 8)
        var year = new Date(logReports[i].date).getFullYear();
        var repDate = hebDayName + ", ה-" + dayNum + " ל" + monthHebName + ", " + year + ", בשעה " + repTime;
        reportsText += `<div dir="rtl"><b>משתמש: </b>${logReports[i].fname} ${logReports[i].lname}</div>` +
          `<div dir="rtl"><b>תאריך: </b>${repDate}</div>` +
          `<div dir="rtl"><b>הערות: </b><textarea class="form-control" id="editReminderText" rows="3">${logReports[i].notes}</textarea></div>`;
      }
    }
  }
  textArea.innerHTML = reportsText;
  if (localStorage.getItem("langSelect") === "hebrew") {
    textArea.style.textAlign = "right";
  } else {
    textArea.style.textAlign = "left";
  }

  saveEditButton.onclick = function () { saveEdit(id) };
  return;
}

// Save edited reports in report log.
function saveEdit(id) {
  console.log("this is the number: " + id)
  editReminderText = document.getElementById("editReminderText");
  console.log(editReminderText.value);
  var notes = editReminderText.value;
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1/healthcareProvider/fetchData.php",
    data: { table: "reports_edit", notes: notes, id: id },
    success: function (res) {
        console.log(res);
        getDailyRep();
    }
  });
  
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

// global variables for Hebrew names for days and months
var hebDayName = "";
var monthHebName = "";

function dateToHebrew(dayName, month) {
  if (dayName === "Sun") { hebDayName = "יום ראשון" };
  if (dayName === "Mon") { hebDayName = "יום שני" };
  if (dayName === "Tue") { hebDayName = "יום שלישי" };
  if (dayName === "Wed") { hebDayName = "יום רביעי" };
  if (dayName === "Thu") { hebDayName = "יום חמישי" };
  if (dayName === "Fri") { hebDayName = "יום שישי" };
  if (dayName === "Sat") { hebDayName = "יום שבת" };

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

  return ([hebDayName, monthHebName]);
}

// insert content in the reports log
function reportLogTextContent(logReports) {
  var reportsText = "";
  console.log("This is log rep from report log function: ", logReports);
  var textArea = document.getElementById("reportsLogModalBody");
  for (i = 0; i < logReports.length; i++) {
    if (localStorage.getItem("langSelect") === "english") {
      reportsText += `<div><b>User: </b>${logReports[i].fname} ${logReports[i].lname}</div>` +
        `<div><b>Date: </b>${new Date(logReports[i].date).toString().substr(0, 24)}</div>` +
        `<div><b>Notes: </b>${logReports[i].notes}</div>` +
        `<div><i class='fa fa-pencil-square-o' onclick="editRepLog(${i}, '${logReports[i].idreport}')"></i>` +
        `<i class="fa fa-trash" style="color: red;" onclick="deleteRepLog('${logReports[i].idreport}')"></i></div>` +
        `<div><b>---------------</b></div>`
        // optional fontawesome icons (update css on change): 
        // <div><i class='far fa-edit' onclick="editRepLog(${i})"></i>` +
        // `<i class="far fa-trash-alt" onclick="deleteRepLog(${i})"></i></div>`
    } else {
      var dayName = new Date(logReports[i].date).toString().substr(0, 3);
      var dayNum = new Date(logReports[i].date).toString().substr(8, 2);
      var month = new Date(logReports[i].date).getMonth();
      dateToHebrew(dayName, month);
      var repTime = new Date(logReports[i].date).toString().substr(16, 8)
      var year = new Date(logReports[i].date).getFullYear();
      var repDate = hebDayName + ", ה-" + dayNum + " ל" + monthHebName + ", " + year + ", בשעה " + repTime;
      reportsText += `<div dir="rtl"><b>משתמש: </b>${logReports[i].fname} ${logReports[i].lname}</div>` +
        `<div dir="rtl"><b>תאריך: </b>${repDate}</div>` +
        `<div dir="rtl"><b>הערות: </b>${logReports[i].notes}</div>` +
        `<div><i class='fa fa-pencil-square-o' onclick="editRepLog(${i}, '${logReports[i].idreport}')"></i>` +
        `<i class="fa fa-trash" onclick="deleteRepLog('${logReports[i].idreport}')"></i></div>` +
        `<div dir="rtl"><b>---------------</b></div>`
    }
  }
  textArea.innerHTML = reportsText;
  if (localStorage.getItem("langSelect") === "hebrew") {
    textArea.style.textAlign = "right";
  } else {
    textArea.style.textAlign = "left";
  }
}

function sortContent(dir, field, arr) {
  console.log(arr);
  // return;
  if (field === "date") {
    if (dir === "desc") {
      arr = arr.sort(function (a, b) {
        if (new Date(a[field]) > new Date(b[field])) {
          return -1;
        }
        if (new Date(a[field]) < new Date(b[field])) {
          return 1;
        }
        return 0;
      });
    } else {
      arr = arr.sort(function (a, b) {
        if (new Date(a[field]) < new Date(b[field])) {
          return -1;
        }
        if (new Date(a[field]) > new Date(b[field])) {
          return 1;
        }
        return 0;
      });
    }
  } else {
    fieldF = "fname";
    fieldL = "lname";
    if (dir === "asc") {
      arr = arr.sort(function (a, b) {
        if (a[fieldF].toUpperCase() + a[fieldL].toUpperCase() < b[fieldF].toUpperCase() + b[fieldL].toUpperCase()) {
          return -1;
        }
        if (a[fieldF].toUpperCase() + a[fieldL].toUpperCase() > b[fieldF].toUpperCase() + b[fieldL].toUpperCase()) {
          return 1;
        }
        return 0;
      });
    } else {
      arr = arr.sort(function (a, b) {
        if (a[fieldF].toUpperCase() + a[fieldL].toUpperCase() > b[fieldF].toUpperCase() + b[fieldL].toUpperCase()) {
          return -1;
        }
        if (a[fieldF].toUpperCase() + a[fieldL].toUpperCase() < b[fieldF].toUpperCase() + b[fieldL].toUpperCase()) {
          return 1;
        }
        return 0;
      });
    }
  }

  // arr = JSON.stringify(arr);
  console.log("This is the sorted array: " + " direction: " + dir + " "  + JSON.stringify(arr));
  return arr;
}

// log out
function logout(event){
  console.log("loggin out");
  $.ajax({
    url: "http://127.0.0.1/healthcareProvider/logout.php",
    type: "GET",
    xhrFields:{
      withCredentials: true
    },
    success: function (data) {
      if(data === "success"){
        location.href = "http://127.0.0.1:5500/login.html";
      }else{
        console.log("failure to log out: ", data);
      }
    }
});
  // console.log("change user");
  // if (localStorage.getItem("langSelect") === "hebrew") {
  //   var username = document.getElementById("username-he").value;
  //   var pwd = document.getElementById("pwd-he").value;
  //   var res = username.split("@", 1);
  //   var name = res[0].charAt(0).toUpperCase() + res[0].slice(1);
  //   if(name === "Roni"){
  //     name = "רוני"
  //   }else if(name === "Sara"){
  //     name = "שרה"
  //   }else if(name === "Oren"){ 
  //     name = "אורן"
  //   }
  //   localStorage.setItem("user", name)
  // } else {
  //   var username = document.getElementById("username").value;
  //   var pwd = document.getElementById("pwd").value;
  //   var res = username.split("@", 1);
  //   var name = res[0].charAt(0).toUpperCase() + res[0].slice(1);
  //   if(name === "Roni"){
  //     name = "רוני"
  //   }else if(name === "Sara"){
  //     name = "שרה"
  //   }else if(name === "Oren"){ 
  //     name = "אורן"
  //   }
  //   localStorage.setItem("user", name)
  // }
  // event.preventDefault();
}

window.onload = function onLoadFunction() {
  checkSession();
  getDailyRep();

  // create user
  // $("#user-info-form").on("submit", function (e) {
  //   var dataString = $(this).serialize();
  //   console.log("dataString: " + dataString);
  //   $.ajax({
  //     type: "POST",
  //     url: "http://localhost/healthcareProvider/create_user.php",
  //     data: dataString,
  //     success: function (response) {
  //       console.log("submitted successfully to php function: " + response);
  //     }
  //   });
  //   e.preventDefault();
  // });

  // Define click function to sort report log messages by username.
  var sortUserDir = "";
  var sortUserClick = document.querySelectorAll(".sortUser, .sortUserHeb");
  
  for (i = 0; i < sortUserClick.length; i++) {
    sortUserClick[i].addEventListener("click", () => {
      var textArea = document.getElementById("reportsLogModalBody");
      var logReports = dailyReport;
      if (sortUserDir === "desc") {
        if (logReports.length === 0) {
          var reportsText = "No reports in log.";
          textArea.innerHTML = reportsText;
          return;
        }
        logReports = sortContent("desc", "user", logReports);
        console.log(logReports);
        sortUserDir = "asc"
      } else {
        if (logReports.length === 0) {
          reportsText = "No reports in log.";
          textArea.innerHTML = reportsText;
          return;
        }
        logReports = sortContent("asc", "user", logReports);
        console.log(logReports);
        sortUserDir = "desc"
      }
      console.log(logReports)
      reportLogTextContent(logReports);
    });
  }

  // Sort report log messages by date.
  var sortDateDir = "";
  var sortDateClick = document.querySelectorAll(".sortDate, .sortDateHeb");
  for (i = 0; i < sortDateClick.length; i++) {
    sortDateClick[i].addEventListener("click", () => {
      var textArea = document.getElementById("reportsLogModalBody");
      var logReports = dailyReport;

      if (sortDateDir === "desc") {
        if (logReports.length === 0) {
          var reportsText = "No reports in log.";
          textArea.innerHTML = reportsText;
          return;
        }
        logReports = sortContent("desc", "date", logReports);
        sortDateDir = "asc"
      } else {
        if (logReports.length === 0) {
          reportsText = "No reports in log.";
          textArea.innerHTML = reportsText;
          return;
        }
        logReports = sortContent("asc", "date", logReports);
        sortDateDir = "desc"
      }
      console.log(logReports)
      reportLogTextContent(logReports);
    });
  }

  // Complete report for report log.
  document.querySelector("#completeReport").addEventListener("click", () => {
    var date = new Date().toString();
    var modalTitle = document.getElementById('exampleModalLongTitle');
    modalTitle.innerText = date.substr(0, 15) + " Daily Report";
    var textArea = document.getElementById('exampleFormControlTextarea1');
    textArea.value = "";
    textArea.dir = "ltr";
  });

  document.querySelector("#completeReportHe").addEventListener("click", () => {
    var dateHeb = document.getElementById("dateHeb").innerText;
    var modalTitle = document.getElementById('exampleModalLongTitle');
    modalTitle.innerText = 'דו"ח ' + dateHeb;
    var textArea = document.getElementById('exampleFormControlTextarea1');
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
    console.log("view rep log: ", dailyReport);
    sortUserButton = document.getElementsByClassName("sortUser");
    sortUserButton[0].className = "btn btn-info sortUser";
    console.log(localStorage.getItem("langSelect"))
    if (localStorage.getItem("langSelect") === "hebrew") {
      sortUserButton[0].innerText = "משתמש ↕"
    } else {
      sortUserButton[0].innerText = "user ↕"
    }
    sortDateButton = document.getElementsByClassName("sortDate");
    sortDateButton[0].className = "btn btn-info sortDate";
    if (localStorage.getItem("langSelect") === "hebrew") {
      sortDateButton[0].innerText = "תאריך ↕";
      if (screen.width > 360) {
        sortDateButton[0].style.marginRight = "48%";
      } else {
        sortDateButton[0].style.marginRight = "23%";
      }
    } else {
      sortDateButton[0].innerText = "date ↕";
      if (screen.width > 360) {
        sortDateButton[0].style.marginRight = "50%";
      } else {
        sortDateButton[0].style.marginRight = "26%";
      }
    }
    saveEditButton = document.getElementById("saveEditButton");
    if (localStorage.getItem("langSelect") === "hebrew") {
      saveEditButton.innerText = "שמור"
    } else {
      saveEditButton.innerText = "Save changes"
    }

    saveEditButton.className = "btn btn-primary hide";
    modalTitle = document.getElementById('reportsModalLongTitle');
    modalTitleHeb = document.getElementById('reportsModalLongTitleHeb');
    modalTitle.innerText = "Reports Log";
    modalTitleHeb.innerText = 'יומן דו"חות';
    textArea = document.getElementById("reportsLogModalBody");
    logReports = dailyReport;
    console.log("log rep: ", logReports)
    if (logReports.length === 0) {
      reportsText = "No reports in log.";
      textArea.innerHTML = reportsText;
      return;
    }
    logReports = sortContent("desc", "date", logReports);
    reportLogTextContent(logReports);
    console.log(logReports[0].fname)
  };

  // Dashboard appointment clicks.
  appointmentClicks();


  // Hello User
  var helloUsr = document.getElementById("helloUsr");
  var helloUsrHeb = document.getElementById("helloUsrHeb");
  var usrFname = JSON.parse(sessionStorage.getItem("fname"));
  var usrLname = JSON.parse(sessionStorage.getItem("lname"));
  // if(usr === null || usr === ""){
  //   usr = "John"
  // }
  helloUsr.innerHTML = "Hello, " + usrFname + "!"
  helloUsrHeb.innerHTML = "שלום, " + usrFname + "!"
}
// End of window onload