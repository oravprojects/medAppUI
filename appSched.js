var langSelect = "hebrew";
if (localStorage.getItem("langSelect") != "hebrew" && localStorage.getItem("langSelect") != "english") {
    localStorage.setItem("langSelect", langSelect);
}
langSelect = localStorage.getItem("langSelect");
var patt = /[A-Za-z]/
var checkAgain = true;
var patientNumber = 0;
var todayApps = document.querySelectorAll(".dash-appointment");
var appSched = localStorage.getItem("appSched");
// create an appointment schedule array if it doesn't exist
if (appSched === null) {
    console.log("no appointments in storage");
    appSched = [];
    appSched = JSON.stringify(appSched);
    localStorage.setItem("appSched", appSched);
}
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

var timeOffset = getTimeOffset();

var http = new XMLHttpRequest();

function getApps() {
    return new Promise((resolve, reject) => {
        http.open("POST", "http://127.0.0.1/healthcareProvider/fetchData.php", true);
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http.withCredentials = true;
        var params = "table=getApp&curr_date=" + timeOffset;

        http.onreadystatechange = function () {//Call a function when the state changes.
            if (http.readyState == 4 && http.status == 200) {
                console.log("this is the get reminder res: ", this.responseText);
                appSchedTemp = JSON.parse(this.responseText);
                console.log("this is the appschedtemp: ", appSchedTemp);
                resolve(appSchedTemp);
            }
        }
        http.send(params);

    })
}


// $.ajax({
//     type: "POST",
//     url: "http://127.0.0.1/healthcareProvider/fetchData.php",
//     data: { table: "getApp", curr_date: timeOffset },
//     xhrFields: {
//         withCredentials: true
//     },
//     success: function (res) {
//         console.log("this is the get reminder res: ", res);
//         appSchedTemp = JSON.parse(res);
//     }
// });

for (i = 0; i < appSched.length; i++) {
    if (new Date(appSched[i].date).getTime() >= currDate.getTime() &&
        new Date(appSched[i].date).getTime() < tomorrow.getTime()) {
        appSchedTemp.push(appSched[i]);
    }
}
function scrollFunction(num) {
    if ((window.innerHeight + window.scrollY - 48) >= (document.body.offsetHeight)) {
        console.log("at bottom");
        console.log("inner height: " + window.innerHeight + " scrollY: " + window.scrollY + " offset height: " + document.body.offsetHeight);
        window.location.href = "#slide-" + num;
        return;
    }
    console.log("hello" + num);
    var y = window.scrollY;
    var x = window.scrollX;
    window.location.href = "#slide-" + num;
    console.log(x, y);
    window.scrollTo(x, y);
    if (window.scrollY != y) {
        console.log("fix scroll y")
        window.scrollTo(x, y);
    }
}
function loadAppSched() {
    const promises = [
        getApps()
    ];

    Promise.all(promises).then(result => {
        appSchedTemp = result[0];
        console.log("after promise:", appSchedTemp);
        var patt = /[A-Za-z]/
        if (appSchedTemp.length > 0) {
            var schedContainer = document.getElementById("sched-container");
            schedContainer.innerHTML = "";
            for (i = 0; i < appSchedTemp.length; i++) {
                // var patt = /[A-Za-z]/
                var firstName = appSchedTemp[i].fname;
                var lastName = appSchedTemp[i].lname;
                var startTime = new Date(appSchedTemp[i].start);
                var endTime = new Date(appSchedTemp[i].end);
                var appSchedDate = new Date(appSchedTemp[i].date);
                var meetingId = appSchedTemp[i].idappointment;
                console.log(firstName, lastName, startTime, endTime, meetingId);
                var currDate = new Date();
                if (patt.test(firstName)) {
                    langDir = 'ltr'
                } else {
                    langDir = 'rtl'
                }
                // compensate for GMT offset
                var d = new Date();
                var n = d.getTimezoneOffset() / 60;
                if (n < 0) { n = n * -1 };
                currDate.setHours(currDate.getHours() + n);
                var hour = startTime.getHours();
                var endHour = endTime.getHours();
                var endMin = endTime.getMinutes();
                var dispHour = hour;
                var min = startTime.getMinutes();
                if (min < 10) { min = "0" + min };
                startTime = dispHour + ":" + min;
                if (hour < 12) { startTime += " AM" } else {
                    if (hour == 12) {
                        console.log("It's 12: " + hour);
                        startTime += " PM"
                    } else {
                        console.log("this is the hour: " + hour)
                        dispHour = (hour - 12);
                        startTime = dispHour + ":" + min + " PM"
                    }
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
                    if (currDate.getTime() >= (appSchedDate.getTime() + hour * 60 * 60 * 1000 + min * 60 * 1000)
                        && currDate.getTime() < (appSchedDate.getTime() + endHour * 60 * 60 * 1000 + endMin * 60 * 1000)) {
                        checkAgain = false;
                        setTimeout(function () { loadAppSched(); }, ((appSchedDate.getTime() + endHour * 60 * 60 * 1000 + endMin * 60 * 1000) - currDate.getTime()));
                    }
                }

                if (currDate.getTime() >= (appSchedDate.getTime() + hour * 60 * 60 * 1000 + min * 60 * 1000)
                    && currDate.getTime() < (appSchedDate.getTime() + endHour * 60 * 60 * 1000 + endMin * 60 * 1000)) {
                    var content = `<div class="dash-appointment" id=${meetingId} data-toggle="modal" data-target="#exampleModalCenter">
            <a href="#" class="btn btn-outline-primary w-100 p-2  mb-1 no-ptr current" style="font-size: 14px">
            <ul class="flex-container">
            <li class="sched-item-icon"><i class="fa fa-user"></i></li>
            <li lang="en" class="sched-item-content" dir=${langDir}>${firstName + " " + lastName}</li>
            <li lang="he" class="sched-item-content" dir=${langDir}>${firstName + " " + lastName}</li>
            <li class="sched-item">${startTime}</li>
            </ul>
            </a></div>`
                } else {
                    var content = `<div class="dash-appointment" id=${meetingId} data-toggle="modal" data-target="#exampleModalCenter">
        <a href="#" class="btn btn-light w-100 p-2 mb-1 no-ptr dashboard" style="font-size: 14px">
        <ul class="flex-container">
        <li class="sched-item-icon"><i class="fa fa-user"></i></li>
        <li lang="en" class="sched-item-content" dir=${langDir}>${firstName + " " + lastName}</li>
        <li lang="he" class="sched-item-content" dir=${langDir}>${firstName + " " + lastName}</li>
        <li class="sched-item">${startTime}</li>
        </ul>
        </a></div>`
                }
                node.innerHTML = content;
                schedContainer.appendChild(node);
            }
        }

        var todayApps = document.querySelectorAll(".dash-appointment");
        var todayAppContainer = document.getElementById("todayAppContainer");
        var slidesContainer = document.getElementsByClassName("slides");
        var appContainerContent = "";
        var slideContainerContent = "";
        var dotContainer = document.getElementById("dot-container");
        var slideNumberContainer = document.getElementById("slideNumbers");
        var dotContainerContent = "";
        var slideNumberContainerContent = "";
        for (i = 1; i < todayApps.length; i++) {
            var checkCurrent = todayApps[i].firstElementChild.className;
            if (i <= 5) { //appContainer only shows 5 patient cards for mobile view;
                console.log("This is todayApps: " + todayApps[i].firstElementChild.className);
                if (checkCurrent.includes("current")) {
                    appContainerContent += `<li class="flex-item">
                    <div class="card shadow-lg current-card" style="text-align: center;">
                        <span class="border border-light rounded">
                            <img class="card-body p-1" src="./assets/personIcon.png" height="80px"
                            width="80px" alt="avatar" alt="Card image cap">
                            <div class="card-body p-1">
                                <div id="patient${i}">Patient ${i}</div>
                            </div>
                        </span>
                    </div>
                </li>`
                    slideContainerContent += `<div id="slide-${i}">
                    <div class="card shadow-lg current-card" style="text-align: center;">
                        <span class="border border-light rounded">
                            <img class="card-body p-1" src="./assets/personIcon.png" height="80px"
                            width="80px" alt="avatar" alt="Card image cap">
                            <div class="card-body px-4 pt-1 pb-1">
                                <div id="patientSlide${i}">Patient ${i}</div>
                            </div>
                        </span>
                    </div>
                </div>`
                } else {
                    appContainerContent += `<li class="flex-item">
            <div class="card shadow" style="text-align: center;">
                <span class="border border-light rounded">
                    <img class="card-body p-1" src="./assets/personIcon.png" height="80px"
                        width="80px" alt="avatar" alt="Card image cap">
                    <div class="card-body p-1">
                        <div id="patient${i}">Patient ${i}</div>
                    </div>
                </span>
            </div>
        </li>`
                    slideContainerContent += `<div id="slide-${i}">
            <div class="card shadow" style="text-align: center;">
                <span class="border border-light rounded">
                    <img class="card-body p-1" src="./assets/personIcon.png" height="80px"
                        width="80px" alt="avatar" alt="Card image cap">
                    <div class="card-body px-4 pt-1 pb-1">
                        <div id="patientSlide${i}">Patient ${i}</div>
                    </div>
                </span>
            </div>
        </div>`
                }
                todayAppContainer.innerHTML = appContainerContent;
                slidesContainer[0].innerHTML = slideContainerContent;
            } else {
                if (checkCurrent.includes("current")) {
                    slideContainerContent += `<div id="slide-${i}">
                    <div class="card shadow current-card" style="text-align: center;">
                        <span class="border border-light rounded">
                            <img class="card-body p-1" src="./assets/personIcon.png" height="80px"
                            width="80px" alt="avatar" alt="Card image cap">
                            <div class="card-body px-4 pt-1 pb-1">
                                <div id="patientSlide${i}">Patient ${i}</div>
                            </div>
                        </span>
                    </div>
                </div>`
                } else {
                    slideContainerContent += `<div id="slide-${i}">
                <div class="card shadow" style="text-align: center;">
                    <span class="border border-light rounded">
                        <img class="card-body p-1" src="./assets/personIcon.png" height="80px"
                            width="80px" alt="avatar" alt="Card image cap">
                        <div class="card-body px-4 pt-1 pb-1">
                            <div id="patientSlide${i}">Patient ${i}</div>
                        </div>
                    </span>
                </div>
            </div>`
                }
                todayAppContainer.innerHTML = appContainerContent;
                slidesContainer[0].innerHTML = slideContainerContent;
            }

            // if (i === 5) {
            //     i = todayApps.length;
            // }
        }
        for (i = 1; i < todayApps.length; i++) {
            if (i < 6) { // show 5 active dots at a time in mobile view;
                dotContainerContent += `<span class="dot active"></span>`
                dotContainer.innerHTML = dotContainerContent;
            } else {
                dotContainerContent += `<span class="dot"></span>`
                dotContainer.innerHTML = dotContainerContent;
            }
            slideNumberContainerContent += `<button id="slideButton" onclick="scrollFunction(${i})">${i}</a>`;
            slideNumberContainer.innerHTML = slideNumberContainerContent;
        }
        if (todayApps.length > 0) {
            for (i = 1; i < todayApps.length; i++) {
                var listInfo = todayApps[i + patientNumber].getElementsByTagName("li");
                console.log(listInfo[1].lang)
                var patientInfo = "";
                for (j = 1; j < listInfo.length; j++) {
                    console.log(listInfo[j].innerHTML);
                    var patient = document.getElementById("patient" + i);
                    var patientSlide = document.getElementById("patientSlide" + i);
                    console.log(patient);
                    if (listInfo[j].lang === "he") {
                        console.log(listInfo[j].innerHTML)
                        if (patt.test(listInfo[j].innerHTML)) {
                            patientInfo += "<div lang='he'>" + listInfo[j].innerHTML + "</div>";
                        } else {
                            patientInfo += "<div lang='he' dir='rtl'>" + listInfo[j].innerHTML + "</div>";
                        }
                    } else if (listInfo[j].lang === "en") {
                        console.log(listInfo[j].innerHTML)
                        if (patt.test(listInfo[j].innerHTML)) {
                            patientInfo += "<div lang='en'>" + listInfo[j].innerHTML + "</div>";
                        } else {
                            patientInfo += "<div lang='en' dir='rtl'>" + listInfo[j].innerHTML + "</div>";
                        }
                    } else {
                        patientInfo += "<div>" + listInfo[j].innerHTML + "</div>";
                    }
                    console.log(patientInfo);
                    patient.innerHTML = patientInfo;
                    patientSlide.innerHTML = patientInfo;
                }
                if (i === 5) {
                    i = todayApps.length;
                }
            }
            for (i = 1; i < todayApps.length; i++) {
                var listInfo = todayApps[i + patientNumber].getElementsByTagName("li");
                console.log(listInfo[1].lang)
                var patientInfo = "";
                for (j = 1; j < listInfo.length; j++) {
                    console.log(listInfo[j].innerHTML);
                    var patientSlide = document.getElementById("patientSlide" + i);
                    if (listInfo[j].lang === "he") {
                        console.log(listInfo[j].innerHTML)
                        if (patt.test(listInfo[j].innerHTML)) {
                            patientInfo += "<div lang='he'>" + listInfo[j].innerHTML + "</div>";
                        } else {
                            patientInfo += "<div lang='he' dir='rtl'>" + listInfo[j].innerHTML + "</div>";
                        }
                    } else if (listInfo[j].lang === "en") {
                        console.log(listInfo[j].innerHTML)
                        if (patt.test(listInfo[j].innerHTML)) {
                            patientInfo += "<div lang='en'>" + listInfo[j].innerHTML + "</div>";
                        } else {
                            patientInfo += "<div lang='en' dir='rtl'>" + listInfo[j].innerHTML + "</div>";
                        }
                    } else {
                        patientInfo += "<div>" + listInfo[j].innerHTML + "</div>";
                    }
                    console.log(patientInfo);
                    patientSlide.innerHTML = patientInfo;
                }
            }
        }
        if (todayApps.length < 7) {
            console.log("hiding prev and next")
            document.getElementById("prev").style.display = "none"
            document.getElementById("next").style.display = "none"
        } else {
            console.log("showing prev and next")
            if (screen.width > 360) {
                document.getElementById("prev").style.display = "none"
                document.getElementById("next").style.display = "none"
            } else {
                document.getElementById("prev").style.display = "inline"
                document.getElementById("next").style.display = "inline"
            }
        }
        console.log("today app: " + todayApps.length);
        if (langSelect === "hebrew") {
            $('[lang="he"]').show();
            $('[lang="en"]').hide();
        } else {
            $('[lang="en"]').show();
            $('[lang="he"]').hide();
        }
        var todayAppContainerSize = document.getElementById("todayAppContainer").scrollHeight;
        console.log("height of element: " + todayAppContainerSize);
        if (todayAppContainerSize < 500) {
            document.getElementById("prev").style.bottom = "455px";
            document.getElementById("next").style.bottom = "455px";
        } else {
            document.getElementById("prev").style.bottom = "652px";
            document.getElementById("next").style.bottom = "652px";
        }
        appointmentClicks();
    })
}

function prev() {
    var dotContainer = document.getElementById("dot-container");
    var dotContainerContent = "";
    var todayApps = document.querySelectorAll(".dash-appointment");
    if (todayApps.length > 0 && todayApps.length <= 6) {
        console.log("short app sched: " + todayApps.length)
        return;
    }
    for (i = 0; i < 5; i++) {
        var patient = document.getElementById("patient" + (i + 1));
        parent = patient.parentElement.parentElement.parentElement;
        if (parent.classList.contains('m')) {
            $(parent).removeClass('m').addClass('open');
        } else {
            $(parent).removeClass('open').addClass('m');
        }
    }

    setTimeout(function () {
        patientNumber--;
        if (Math.abs(patientNumber) > todayApps.length - 1) {
            patientNumber = -1;
        }
        if (patientNumber === 0) {
            patientNumber = -1;
        }
        start = patientNumber;
        if (start < 0) {
            start = todayApps.length - Math.abs(patientNumber);
        }
        for (i = 0; i < todayApps.length - 1; i++) {
            console.log("dot start val: " + start)
            console.log("todayApps length: " + (todayApps.length - 1))
            if (start + 3 > (todayApps.length - 2)) {
                console.log("start over")
                if (i <= ((start + 3) - (todayApps.length - 1)) || i >= (start - 1)) {
                    dotContainerContent += `<span class="dot active"></span>`
                    dotContainer.innerHTML = dotContainerContent;
                } else {
                    dotContainerContent += `<span class="dot"></span>`
                    dotContainer.innerHTML = dotContainerContent;
                }
            } else if (i < (start - 1) || i > (start + 3)) {
                dotContainerContent += `<span class="dot"></span>`
                dotContainer.innerHTML = dotContainerContent;
            } else {
                dotContainerContent += `<span class="dot active"></span>`
                dotContainer.innerHTML = dotContainerContent;
            }
        }
        for (i = 0; i < 5; i++) {
            if (start + i > todayApps.length - 1) {
                start = -i;
            }

            if (i + start === 0) {
                start += 1;
            }

            var listInfo = todayApps[(i + start)].getElementsByTagName("li");
            console.log("i is: " + i + " start is: " + start)
            console.log(listInfo[1].innerHTML)
            var patientInfo = "";
            for (j = 1; j < listInfo.length; j++) {
                var patient = document.getElementById("patient" + (i + 1));
                var patientNew = document.getElementById("slide-" + (i + 1));
                console.log("patient" + (i + 1))
                if (listInfo[j].lang === "he") {
                    if (patt.test(listInfo[j].innerHTML)) {
                        patientInfo += "<div lang='he'>" + listInfo[j].innerHTML + "</div>";
                    } else {
                        patientInfo += "<div lang='he' dir='rtl'>" + listInfo[j].innerHTML + "</div>";
                    }
                } else if (listInfo[j].lang === "en") {
                    if (patt.test(listInfo[j].innerHTML)) {
                        patientInfo += "<div lang='en'>" + listInfo[j].innerHTML + "</div>";
                    } else {
                        patientInfo += "<div lang='en' dir='rtl'>" + listInfo[j].innerHTML + "</div>";
                    }
                } else {
                    patientInfo += "<div>" + listInfo[j].innerHTML + "</div>";
                }
                patient.innerHTML = patientInfo;
                //patientNew.innerHTML = patientInfo;

                // animation 
                var posit = patient.getBoundingClientRect();
                console.log("position coords: " + posit.top, posit.right, posit.bottom, posit.left);

                parent = patient.parentElement.parentElement.parentElement;

                console.log(parent)
            }
            if (parent.classList.contains('m')) {
                console.log("hi")
                $(parent).removeClass('m').addClass('open');
            } else {
                console.log("ho")
                $(parent).removeClass('open').addClass('m');
            }
        }

        var todayAppContainerSize = document.getElementById("todayAppContainer").scrollHeight;
        console.log("height of element: " + todayAppContainerSize);
        if (todayAppContainerSize < 500) {
            document.getElementById("prev").style.bottom = "455px";
            document.getElementById("next").style.bottom = "455px";
        } else {
            document.getElementById("prev").style.bottom = "652px";
            document.getElementById("next").style.bottom = "652px";
        }

        if (langSelect === "hebrew") {
            $('[lang="he"]').show();
            $('[lang="en"]').hide();
        } else {
            $('[lang="en"]').show();
            $('[lang="he"]').hide();
        }
    }, 100);
}

function next() {
    var dotContainer = document.getElementById("dot-container");
    var dotContainerContent = "";
    if (patientNumber === 0) {
        patientNumber = 1;
    }
    var todayApps = document.querySelectorAll(".dash-appointment");
    if (todayApps.length > 0 && todayApps.length <= 6) {
        console.log("short app sched: " + todayApps.length)
        return;
    }

    for (i = 0; i < 5; i++) {
        var patient = document.getElementById("patient" + (i + 1));
        parent = patient.parentElement.parentElement.parentElement;
        if (parent.classList.contains('o')) {
            $(parent).removeClass('o').addClass('open');
        } else {
            $(parent).removeClass('open').addClass('o');
        }
    }

    setTimeout(function () {
        console.log("patient number before: " + patientNumber)
        patientNumber++;
        console.log("patient number after plus: " + patientNumber)
        if (Math.abs(patientNumber) > todayApps.length - 1) {
            patientNumber = 1;
        }
        start = patientNumber;
        console.log("start: " + start)
        if (start < 0) {
            start = todayApps.length - Math.abs(patientNumber);
        }
        if (start === 0) {
            start = 1;
        }
        for (i = 0; i < todayApps.length - 1; i++) {
            console.log("dot start val: " + start)
            console.log("todayApps length: " + (todayApps.length - 1))
            if (start + 3 > (todayApps.length - 2)) {
                console.log("start over")
                if (i <= ((start + 3) - (todayApps.length - 1)) || i >= (start - 1)) {
                    dotContainerContent += `<span class="dot active"></span>`
                    dotContainer.innerHTML = dotContainerContent;
                } else {
                    dotContainerContent += `<span class="dot"></span>`
                    dotContainer.innerHTML = dotContainerContent;
                }
            } else if (i < (start - 1) || i > (start + 3)) {
                dotContainerContent += `<span class="dot"></span>`
                dotContainer.innerHTML = dotContainerContent;
            } else {
                dotContainerContent += `<span class="dot active"></span>`
                dotContainer.innerHTML = dotContainerContent;
            }
        }
        for (i = 0; i < 5; i++) {
            if (start + i > todayApps.length - 1) {
                start = -i;
            }

            if (i + start === 0) {
                start += 1;
            }

            var listInfo = todayApps[(i + start)].getElementsByTagName("li");
            console.log("i is: " + i + " start is: " + start)
            console.log(listInfo[1].innerHTML)
            var patientInfo = "";
            for (j = 1; j < listInfo.length; j++) {
                var patient = document.getElementById("patient" + (i + 1));
                console.log("patient" + (i + 1))
                if (listInfo[j].lang === "he") {
                    if (patt.test(listInfo[j].innerHTML)) {
                        patientInfo += "<div lang='he'>" + listInfo[j].innerHTML + "</div>";
                    } else {
                        patientInfo += "<div lang='he' dir='rtl'>" + listInfo[j].innerHTML + "</div>";
                    }
                } else if (listInfo[j].lang === "en") {
                    if (patt.test(listInfo[j].innerHTML)) {
                        patientInfo += "<div lang='en'>" + listInfo[j].innerHTML + "</div>";
                    } else {
                        patientInfo += "<div lang='en' dir='rtl'>" + listInfo[j].innerHTML + "</div>";
                    }
                } else {
                    patientInfo += "<div>" + listInfo[j].innerHTML + "</div>";
                }
                patient.innerHTML = patientInfo;

                // animation
                var posit = patient.getBoundingClientRect();
                console.log("position coords: " + posit.top, posit.right, posit.bottom, posit.left);

                parent = patient.parentElement.parentElement.parentElement;

                console.log(parent)
            }
            if (parent.classList.contains('o')) {
                console.log("hi")
                $(parent).removeClass('o').addClass('open');
            } else {
                console.log("ho")
                $(parent).removeClass('open').addClass('o');
            }
        }

        var todayAppContainerSize = document.getElementById("todayAppContainer").scrollHeight;
        console.log("height of element: " + todayAppContainerSize);
        if (todayAppContainerSize < 500) {
            document.getElementById("prev").style.bottom = "455px";
            document.getElementById("next").style.bottom = "455px";
        } else {
            document.getElementById("prev").style.bottom = "652px";
            document.getElementById("next").style.bottom = "652px";
        }

        if (langSelect === "hebrew") {
            $('[lang="he"]').show();
            $('[lang="en"]').hide();
        } else {
            $('[lang="en"]').show();
            $('[lang="he"]').hide();
        }
    }, 100);
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
addLoadEvent(loadAppSched);

// toggle languages
addLoadEvent(function () {
    var langSwitchButton = document.getElementById("switch-lang");
    if (langSelect === "hebrew") {
        $('[lang="en"]').hide();
        langSwitchButton.innerText = "English";
    } else {
        $('[lang="he"]').hide();
        langSwitchButton.innerText = "עברית";
    }

    $('#switch-lang').click(function () {
        if (langSelect === "hebrew") {
            langSelect = "english";
            localStorage.setItem("langSelect", langSelect);
            langSelect = localStorage.getItem("langSelect");
            $('[lang="en"]').show();
            $('[lang="he"]').hide();
            langSwitchButton.innerText = "עברית";
        } else {
            langSelect = "hebrew";
            localStorage.setItem("langSelect", langSelect);
            langSelect = localStorage.getItem("langSelect");
            $('[lang="en"]').hide();
            $('[lang="he"]').show();
            langSwitchButton.innerText = "English";
        }
        console.log(langSelect)
        // $('[lang="en"]').toggle();
        // $('[lang="he"]').toggle();
        setReminderForm();
        setAppSchedForm();
        // setChangeUserForm();
    });
    setReminderForm();
    setAppSchedForm();
    // setChangeUserForm();
})

// function setChangeUserForm() {
//     console.log("setChangeUserForm")
//     if (localStorage.getItem("langSelect") === "hebrew") {
//         document.getElementById("username").required = false;
//         document.getElementById("username-he").required = true;
//         document.getElementById("pwd").required = false;
//         document.getElementById("pwd-he").required = true;
//     } else {
//         document.getElementById("username").required = true;
//         document.getElementById("username-he").required = false;
//         document.getElementById("pwd").required = true;
//         document.getElementById("pwd-he").required = false;
//     }
// }

function setReminderForm() {
    console.log("setRemFunction")
    if (localStorage.getItem("langSelect") === "hebrew") {
        document.getElementById("reminder-time").required = false;
        document.getElementById("reminder-time-he").required = true;
        document.getElementById("reminderText").required = false;
        document.getElementById("reminderText-he").required = true;
    } else {
        document.getElementById("reminder-time").required = true;
        document.getElementById("reminder-time-he").required = false;
        document.getElementById("reminderText").required = true;
        document.getElementById("reminderText-he").required = false;
    }
}

function setAppSchedForm() {
    if (localStorage.getItem("langSelect") === "hebrew") {
        console.log("setAppSched")
        document.getElementById("app-start-time").required = false;
        document.getElementById("app-start-time-he").required = true;
        document.getElementById("app-end-time").required = false;
        document.getElementById("app-end-time-he").required = true;
        document.getElementById("first-name").required = false;
        document.getElementById("first-name-he").required = true;
        document.getElementById("pId").required = false;
        document.getElementById("pId-he").required = true;
        document.getElementById("last-name").required = false;
        document.getElementById("last-name-he").required = true;
        document.getElementById("appSchedModalTextarea1").required = false;
        document.getElementById("appSchedModalTextarea1-he").required = true;
    } else {
        document.getElementById("app-start-time").required = true;
        document.getElementById("app-start-time-he").required = false;
        document.getElementById("app-end-time").required = true;
        document.getElementById("app-end-time-he").required = false;
        document.getElementById("first-name").required = true;
        document.getElementById("first-name-he").required = false;
        document.getElementById("pId").required = true;
        document.getElementById("pId-he").required = false;
        document.getElementById("last-name").required = true;
        document.getElementById("last-name-he").required = false;
        document.getElementById("appSchedModalTextarea1").required = true;
        document.getElementById("appSchedModalTextarea1-he").required = false;
    }
}
