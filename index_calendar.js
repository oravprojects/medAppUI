function loadCalendar() {
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
    modalTitle = document.getElementById('appSchedModalLongTitle');
    modalTitle.innerText = title.substr(0, 15) + " Appointments";
    textArea = document.getElementById('appSchedModalTextarea1');
    textArea.value = "";
    modalFirstName = document.getElementById("first-name");
    modalFirstName.value = "";
    modalLastName = document.getElementById("last-name");
    modalLastName.value = "";
    modalStartTime = document.getElementById("app-start-time");
    modalStartTime.value = null; 
    modalEndTime = document.getElementById("app-end-time");
    modalEndTime.value = null; 
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
}

const appointmentSchedFunction = () => {
  var appSchedArray = localStorage.getItem("appSched");
  console.log("1: " + appSchedArray);
  // create an appointment schedule array if it doesn't exist
  if (appSchedArray === null) {
      console.log("no appointments in storage");
      appSchedArray = [];
      appSchedArray = JSON.stringify(appSchedArray);
      localStorage.setItem("appSched", appSchedArray);
  }
}

function saveAppSchedChanges(e) {
  alert("save appointment schedule changes");
  modalTitle = document.getElementById('appSchedModalLongTitle');
  console.log(modalTitle.innerText);
  var appDate = new Date(modalTitle.innerText.substr(4, 11));
  console.log(appDate)
  //GMT offset to local time
  var d = new Date();
  var n = d.getTimezoneOffset()/60;
  if (n < 0) {n = n * -1};
  appDate.setHours(appDate.getHours()+n);
  var appSchedArray = localStorage.getItem("appSched");
  appSchedArray = JSON.parse(appSchedArray)
  var startTime = document.getElementById("app-start-time").value;
  var endTime = document.getElementById("app-end-time").value;
  var fName = document.getElementById("first-name").value;
  var lName = document.getElementById("last-name").value;
  var comments = document.getElementById("appSchedModalTextarea1").value;
  var startHour = startTime.substr(0, 2);
  var startMin = startTime.substr(3, 2);
  var dateTime = appDate.getTime() + startHour*60*60*1000 + startMin*60*1000;
  console.log("dateTime: " + dateTime);
  if(appSchedArray.length === 0){
    appSchedArray.push({ "date": appDate, "start": startTime, "end": endTime, "fName": fName, "lName": lName, "comments": comments });
    appSchedArray = JSON.stringify(appSchedArray);
    localStorage.setItem("appSched", appSchedArray);
    console.log(appSchedArray);
    return;
}
  
  var mid = Math.floor(appSchedArray.length / 2);
    var start = 0;
    var end = appSchedArray.length - 1;
    var mid = Math.floor((start + end) / 2);
    var existDateTime = 0;
    for (i = 0; i < appSchedArray.length; i++) {
      console.log(i + " " + new Date (appSchedArray[end].date.substr(0, 11) + appSchedArray[end].start+":00.000Z").getTime());
      console.log("mid: " + mid)
        existDateTime = new Date(appSchedArray[mid].date.substr(0, 11) + appSchedArray[mid].start+":00.000Z").getTime();
        console.log("existDateTime: " + existDateTime + "dateTime: " + dateTime);
        // var existStartHour = appSchedArray[mid].start.substr(0, 2);
        // console.log(existStartHour);
        // var existStartMin = appSchedArray[mid].start.substr(3, 2);
        if (mid === start) {
            i = appSchedArray.length;
            if (dateTime > existDateTime) {
              existDateTime = new Date (appSchedArray[end].date.substr(0, 11) + appSchedArray[end].start+":00.000Z").getTime();
              if( dateTime > existDateTime ){
                appSchedArray.splice(end + 1, 0, { "date": appDate, "start": startTime, "end": endTime, "fName": fName, "lName": lName, "comments": comments });
              } else {
                appSchedArray.splice(mid + 1, 0, { "date": appDate, "start": startTime, "end": endTime, "fName": fName, "lName": lName, "comments": comments });
              }
            } else {
                appSchedArray.splice(mid, 0, { "date": appDate, "start": startTime, "end": endTime, "fName": fName, "lName": lName, "comments": comments });
            }
        }
        else if (dateTime > existDateTime) {
            start = mid;
            console.log("start: " + start)
            mid = Math.floor((start + end) / 2);
            console.log("mid calc: " + start + "+" + end + " = " + mid)
        } else {
            end = mid;
            mid = Math.floor((start + end) / 2);
        }
    }
  // appSchedArray.push({ "start": startTime, "end": endTime, "fName": fName, "lName": lName, "comments": comments });
  appSchedArray = JSON.stringify(appSchedArray)
  console.log("App Array: " + appSchedArray);
  localStorage.setItem("appSched", appSchedArray);
  // console.log(text)
  // console.log(target)
  // var modalTitle = document.getElementById('exampleModalLongTitle').innerText;
  // console.log(modalTitle);
  // if (modalTitle.includes("Daily Report")) {
  //   console.log("includes daily report");
  //   saveDailyReport();
  // } else if (modalTitle.includes("Appointment")) {
  //   console.log("includes appointment")
  // }
  // else if (modalTitle.length === 15) {
  //   console.log("includes day")
  // }
}


// function that allows to add additional window.onload functions
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            if (oldonload) {
                oldonload();
            }
            func();
        }
    }
}
addLoadEvent(loadCalendar);
addLoadEvent(appointmentSchedFunction);

// addLoadEvent(function() {
//     document.body.style.backgroundColor = '#EFDF95';
// })
