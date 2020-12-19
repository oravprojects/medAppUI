window.onload = function exampleFunction(callback) {
  // set reminder
  document.querySelector("#setReminder").addEventListener("click", () => {
    alert('set reminder');
    textArea = document.getElementById('reminderText');
    textArea.value = "";
    reminderTime = document.getElementById('reminder-time');
    reminderTime.value = "";
  });

  // complete report
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
    textArea = document.getElementById("reportsModalBody");
    logReports = JSON.parse(dailyReport);
    console.log(logReports)
    reportsText = "";
    console.log(logReports[0].user)
    for (i = 0; i < logReports.length; i++) {
      reportsText += `<div><b>User: </b>${logReports[i].user}</div>` +
        `<div><b>Date: </b>${new Date(logReports[i].date).toString().substr(0, 24)}</div>` +
        `<div><b>Notes: </b>${logReports[i].notes}</div>` +
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

  // calendar
  var date = new Date();

  const renderCalendar = () => {
    date.setDate(1);

    const monthDays = document.querySelector(".days");

    const lastDay = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();

    const prevLastDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      0
    ).getDate();

    const firstDayIndex = date.getDay();

    const lastDayIndex = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDay();

    const nextDays = 7 - lastDayIndex - 1;

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const thisYear = new Date().getFullYear();

    document.querySelector(".date h1").innerHTML = months[date.getMonth()] + " " + date.getFullYear();

    let days = "";

    for (let x = firstDayIndex; x > 0; x--) {
      if (date.getMonth() - 1 < 0) {
        var lastYear = date.getFullYear() - 1;
        days += `<div class="prev-date" id="${lastYear + "-" + Number(date.getMonth() + 12) +
          "-" + Number(prevLastDay - x + 1)}">${prevLastDay - x + 1}</div>`;
      } else {
        days += `<div class="prev-date" id="${date.getFullYear() + "-" + Number(date.getMonth()) +
          "-" + Number(prevLastDay - x + 1)}">${prevLastDay - x + 1}</div>`;
      }
    }

    for (let i = 1; i <= lastDay; i++) {
      if (
        i === new Date().getDate() &&
        date.getMonth() === new Date().getMonth() &&
        date.getFullYear() === thisYear
      ) {
        days += `<div class="today" id="${date.getFullYear() + "-" + Number(date.getMonth() + 1) + "-" + i}">${i}</div>`;
      } else {
        days += `<div id="${date.getFullYear() + "-" + Number(date.getMonth() + 1) + "-" + i}">${i}</div>`;
      }
    }

    for (let j = 1; j <= nextDays; j++) {
      if (date.getMonth() + 1 > 11) {
        var nextYear = date.getFullYear() + 1
        days += `<div class="next-date" id="${nextYear + "-" + Number(date.getMonth() - 10) + "-" + j}">${j}</div>`;
      } else {
        days += `<div class="prev-date" id="${date.getFullYear() + "-" + Number(date.getMonth() + 2) + "-" + j}">${j}</div>`;
      }
      monthDays.innerHTML = days;
    }
  };

  // previous month
  document.querySelector(".prev").addEventListener("click", () => {
    date.setMonth(date.getMonth() - 1);
    console.log("prev", date);
    renderCalendar();
  });

  // next month
  document.querySelector(".next").addEventListener("click", () => {
    date.setMonth(date.getMonth() + 1);
    console.log("next", date);
    renderCalendar();
  });

  // days click event
  document.querySelector(".days").addEventListener("click", function (e) {
    e = e || window.event;
    var target = e.target,
      // text = target.textContent || target.innerText;
      text = target.getAttribute("id")
    title = new Date(text).toString();
    modalTitle = document.getElementById('exampleModalLongTitle');
    modalTitle.innerText = title.substr(0, 15);
    textArea = document.getElementById('exampleFormControlTextarea1');
    textArea.value = "";
  }, false);

  renderCalendar();

  // Set date for schedule

  var dateTitle = document.getElementById("date")

  var date = new Date();

  var day = date.getDay();

  var dayNumber = date.getDate();

  var month = date.getMonth();

  var year = date.getUTCFullYear();

  var monthName = "";

  var dayName = "";

  if (month === 0) { monthName = "Jan" };
  if (month === 1) { monthName = "Feb" };
  if (month === 2) { monthName = "Mar" };
  if (month === 3) { monthName = "Apr" };
  if (month === 4) { monthName = "May" };
  if (month === 5) { monthName = "Jun" };
  if (month === 6) { monthName = "Jul" };
  if (month === 7) { monthName = "Aug" };
  if (month === 8) { monthName = "Sep" };
  if (month === 9) { monthName = "Oct" };
  if (month === 10) { monthName = "Nov" };
  if (month === 11) { monthName = "Dec" };

  if (day === 1) { dayName = "Mon" };
  if (day === 2) { dayName = "Tue" };
  if (day === 3) { dayName = "Wed" };
  if (day === 4) { dayName = "Thu" };
  if (day === 5) { dayName = "Fri" };
  if (day === 6) { dayName = "Sat" };
  if (day === 0) { dayName = "Sun" };


  dateTitle.innerHTML = dayName + ", " + dayNumber + " " + monthName + " " + year;

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

  // Reminders
  const reminderFunction = () => {
  var reminderArray = localStorage.getItem("reminders");
  if (reminderArray === null) {
    console.log("no reminders in storage");
    reminderArray = [];
    reminderArray = JSON.stringify(reminderArray)
    localStorage.setItem("reminders", reminderArray);
    // reminderArray = localStorage.getItem("reminders");
  } else {
    counter = 0;
    reminderArray = JSON.parse(reminderArray);
    console.log(reminderArray);
    var now = Date.now()
    for (i = 0; i < reminderArray.length; i++) {
      console.log("array length: ", reminderArray.length)
      alarmTime = new Date(reminderArray[i].dateTime);
      alarmTime = alarmTime.getTime();
      console.log("alarm time: ", alarmTime);
      console.log("now: ", now);
      if (alarmTime < now) { 
        alert("Missed Reminder number " + i + " set for: " + reminderArray[i].dateTime + "; reminder: " +
        reminderArray[i].text + " set by: " + reminderArray[i].user + ".");
        reminderArray.splice(i, 1); 
        reminderArray = JSON.stringify(reminderArray);
        localStorage.setItem("reminders", reminderArray);
        reminderArray = JSON.parse(reminderArray);
        i--;
      }
      else if (alarmTime <= now + 24 * 60 * 60 * 1000) {
        var number = i;
        var setFor = reminderArray[i].dateTime;
        var text = reminderArray[i].text;
        var setBy = reminderArray[i].user;
        setTimeout(function(){
          alert("This is Reminder number " + number + " set for: " + setFor + "; reminder: " +
        text + " set by: " + setBy + ".");
          reminderArray.splice(number, 1); 
          reminderArray = JSON.stringify(reminderArray);
          localStorage.setItem("reminders", reminderArray);
        }, (alarmTime-now))
        if (Math.floor((alarmTime - now) / 1000 / 60 / 60) === 1) {
          alert("Reminder number " + i + " is in " + Math.floor((alarmTime - now) / 1000 / 60 / 60) + " hour and " +
            Math.floor(((alarmTime - now) / 1000 / 60 / 60 - Math.floor((alarmTime - now) / 1000 / 60 / 60)) * 60) + " minutes.")
        }
        if (Math.floor((alarmTime - now) / 1000 / 60 / 60) > 1) {
          alert("Reminder number " + i + " is in " + Math.floor((alarmTime - now) / 1000 / 60 / 60) + " hours and " +
            Math.floor(((alarmTime - now) / 1000 / 60 / 60 - Math.floor((alarmTime - now) / 1000 / 60 / 60)) * 60) + " minutes.")
        }
        if (Math.floor((alarmTime - now) / 1000 / 60 / 60) < 1) {
          alert("Reminder number " + i + " is in " +
            Math.floor(((alarmTime - now) / 1000 / 60 / 60 - Math.floor((alarmTime - now) / 1000 / 60 / 60)) * 60) + " minutes.")
        }
        counter++
      } else if(alarmTime > now + 24 * 60 * 60 * 1000){
        if (counter === 0) {
          alert("No reminders for the next 24 hours");
          i = reminderArray.length;
        } else{
          i = reminderArray.length;
        }
      }
    }
  }
}
setTimeout(function(){
  reminderFunction();
}, 10)
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

function setReminder() {
  var reminderArray = localStorage.getItem("reminders");

  alert("set reminder");
  var reminderTime = document.getElementById("reminder-time").value;
  var reminderTimeMilli = new Date(reminderTime);
  reminderTimeMilli = reminderTimeMilli.getTime();

  console.log(reminderTime);

  reminderArray = JSON.parse(reminderArray);
  reminderText = document.getElementById("reminderText").value;
  console.log(reminderText);
  var mid = Math.floor(reminderArray.length/2);
  var start = 0;
  var end = reminderArray.length-1;
  for(i=0; i<reminderArray.length; i++){
    var dateTimeMilli = new Date(reminderArray[mid].dateTime);
    dateTimeMilli = dateTimeMilli.getTime();
    
    if(reminderTimeMilli > dateTimeMilli){
      start = mid;
      mid = Math.floor((mid + end/2));
    } else{
      end = mid;
      mid = Math.floor((start + end)/2);
    }
    if(mid === start){
      i = reminderArray.length;
      if (reminderTimeMilli > dateTimeMilli){
        reminderArray.splice(mid+1, 0, { "dateTime": reminderTime, "user": "Oren", "text": reminderText })
      } else{
        reminderArray.splice(mid, 0, { "dateTime": reminderTime, "user": "Oren", "text": reminderText })
      }
    }
  }
  // reminderArray.push({ "dateTime": reminderTime, "user": "Oren", "text": reminderText });
  console.log(reminderArray);
  reminderArray = JSON.stringify(reminderArray)
  localStorage.setItem("reminders", reminderArray);
  reminderArray = localStorage.getItem("reminders");

  const when = Date.now(reminderText);

  console.log(when);
}

