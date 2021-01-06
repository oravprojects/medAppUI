var test = "test";
var checkAgain = true;
var appSched = localStorage.getItem("appSched");
appSched = JSON.parse(appSched);
console.log(appSched);
var appSchedTemp = [];
var d = new Date();
var n = d.getTimezoneOffset() / 60;
if (n < 0) { n = n * -1 };
var currDate = new Date();
currDate.setHours(0);
currDate.setMinutes(0);
currDate.setSeconds(0);
currDate.setMilliseconds(0);
currDate.setHours(currDate.getHours() + n)
var tomorrow = new Date(currDate);
tomorrow.setDate(tomorrow.getDate() + 1);
tomorrow.setHours(0);
tomorrow.setMinutes(0);
tomorrow.setSeconds(0);
tomorrow.setMilliseconds(0);
tomorrow.setHours(tomorrow.getHours() + n);

for (i = 0; i < appSched.length; i++) {
    if (new Date(appSched[i].date).getTime() >= currDate.getTime() &&
        new Date(appSched[i].date).getTime() < tomorrow.getTime()) {
        appSchedTemp.push(appSched[i]);
    }
}

function loadAppSched() {
    if (appSchedTemp.length > 0) {
        var schedContainer = document.getElementById("sched-container");
        schedContainer.innerHTML = "";
    }
    if (appSchedTemp.length > 0) {
        for (i = 0; i < appSchedTemp.length; i++) {
            var firstName = appSchedTemp[i].fName;
            var lastName = appSchedTemp[i].lName;
            var startTime = appSchedTemp[i].start;
            var endTime = appSchedTemp[i].end;
            var appSchedDate = new Date(appSchedTemp[i].date);
            var appSchedYear = appSchedDate.getFullYear();
            var appSchedMonth = appSchedDate.getMonth();
            var appSchedDay = appSchedDate.getDay();
            var currDate = new Date();
            // compensate for GMT offset
            var d = new Date();
            var n = d.getTimezoneOffset() / 60;
            if (n < 0) { n = n * -1 };
            currDate.setHours(currDate.getHours() + n);
            var currYear = currDate.getFullYear();
            var currMonth = currDate.getMonth();
            var currDay = currDate.getDay();
            // if (appSchedYear === currYear && appSchedMonth === currMonth && appSchedDay === currDay) {
            var hour = startTime.substr(0, 2);
            var endHour = endTime.substr(0, 2);
            var endMin = endTime.substr(3, 2);
            var dispHour = hour;
            var min = startTime.substr(3, 2);
            if (hour < 12) { startTime += " AM" } else {
                dispHour = (hour - 12);
                startTime = dispHour + ":" + min + " PM"
            }

            // append appointment elements
            var node = document.createElement("div");

            if (checkAgain) {
                if (currDate.getTime() < (appSchedDate.getTime() + hour * 60 * 60 * 1000 + min * 60 * 1000)) {
                    setTimeout(function () { loadAppSched(); }, ((appSchedDate.getTime() + hour * 60 * 60 * 1000 + min * 60 * 1000) - currDate.getTime()));
                    if (i === appSchedTemp.length - 1) {
                        checkAgain = false;
                        setTimeout(function () { loadAppSched(); }, ((appSchedDate.getTime() + endHour * 60 * 60 * 1000 + endMin * 60 * 1000) - currDate.getTime()));
                    }
                }
            }

            if (currDate.getTime() >= (appSchedDate.getTime() + hour * 60 * 60 * 1000 + min * 60 * 1000)
                && currDate.getTime() < (appSchedDate.getTime() + endHour * 60 * 60 * 1000 + endMin * 60 * 1000)) {
                var content = `<div class="dash-appointment" data-toggle="modal" data-target="#exampleModalCenter">
            <a href="#" class="btn btn-outline-primary w-100 p-2  mb-1 no-ptr current">
            <ul class="flex-container">
            <li class="sched-item-icon"><i class="fa fa-user"></i></li>
            <li lang="en" class="sched-item-content">${firstName + " " + lastName}</li>
            <li lang="he" class="sched-item-content" dir="rtl">${firstName + " " + lastName}</li>
            <li class="sched-item">${startTime}</li>
            </ul>
            </a></div>`
            } else {
                var content = `<div class="dash-appointment" data-toggle="modal" data-target="#exampleModalCenter">
        <a href="#" class="btn btn-light w-100 p-2 mb-1 no-ptr dashboard">
        <ul class="flex-container">
        <li class="sched-item-icon"><i class="fa fa-user"></i></li>
        <li lang="en" class="sched-item-content">${firstName + " " + lastName}</li>
        <li lang="he" class="sched-item-content" dir="rtl">${firstName + " " + lastName}</li>
        <li class="sched-item">${startTime}</li>
        </ul>
        </a></div>`
            }
            node.innerHTML = content;
            schedContainer.appendChild(node);
        }
        // convert time from military time format to 12 hour am/pm format
    }
    var todayApps = document.querySelectorAll(".dash-appointment");
    var todayAppContainer = document.getElementById("todayAppContainer");
    var appContainerContent = "";
    for (i = 1; i < todayApps.length; i++) {
        appContainerContent += `<li class="flex-item">
                <div class="card shadow" style="text-align: center;">
                    <span class="border border-light rounded">
                        <img class="card-body p-1" src="./assets/personIcon.png" height="80px"
                            width="80px" alt="avatar" alt="Card image cap">
                        <div class="card-body p-1">
                            <div id="patient${i}">patient</div>
                        </div>
                    </span>
                </div>
            </li>`
        todayAppContainer.innerHTML = appContainerContent;
    }
    for (i = 1; i < todayApps.length; i++) {
        var listInfo = todayApps[i].getElementsByTagName("li");
        console.log(listInfo[1].lang)
        var patientInfo = "";
        for (j = 1; j < listInfo.length; j++) {
            console.log(listInfo[j].innerText);
            var patient = document.getElementById("patient" + i);
            console.log(patient);
            console.log(listInfo.lang)
            if (listInfo[j].lang === "he") {
                patientInfo += "<div lang='he'>" + listInfo[j].innerHTML + "</div>";
            } else if (listInfo[j].lang === "en") {
                patientInfo += "<div lang='en'>" + listInfo[j].innerHTML + "</div>";
            } else {
                patientInfo += "<div>" + listInfo[j].innerHTML + "</div>";
            }
            console.log(patientInfo);
            patient.innerHTML = patientInfo;
        }
    }
}
// }
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
addLoadEvent(loadAppSched);

// toggle languages
addLoadEvent(function () {
    $('[lang="en"]').hide();

    $('#switch-lang').click(function () {
        var langSwitchButton = document.getElementById("switch-lang");
        if (langSwitchButton.innerText === "English") {
            langSwitchButton.innerText = "עברית"
        } else {
            langSwitchButton.innerText = "English"
        }
        $('[lang="en"]').toggle();
        $('[lang="he"]').toggle();
    });
})
