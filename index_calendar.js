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

function saveAppSchedChanges(e) {
  alert("save appointment schedule changes");
  e = e || window.event;
  var target = e.target,
    // text = target.textContent || target.innerText;
    text = target.innerText;
  console.log(e)
  startTime = document.getElementById("app-start-time").value;
  endTime = document.getElementById("app-end-time").value;
  fName = document.getElementById("first-name").value;
  lName = document.getElementById("last-name").value;
  comments = document.getElementById("appSchedModalTextarea1").value;
  appArray = [];
  appArray.push({ "start": startTime, "end": endTime, "fName": fName, "lName": lName, "comments": comments });
  console.log("App Array: " + JSON.stringify(appArray))
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

// addLoadEvent(function() {
//     document.body.style.backgroundColor = '#EFDF95';
// })
