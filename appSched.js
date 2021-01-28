var langSelect = "hebrew";
localStorage.setItem("langSelect", langSelect);
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

for (i = 0; i < appSched.length; i++) {
    if (new Date(appSched[i].date).getTime() >= currDate.getTime() &&
        new Date(appSched[i].date).getTime() < tomorrow.getTime()) {
        appSchedTemp.push(appSched[i]);
    }
}

function loadAppSched() {
    var patt = /[A-Za-z]/
    if (appSchedTemp.length > 0) {
        var schedContainer = document.getElementById("sched-container");
        schedContainer.innerHTML = "";
        for (i = 0; i < appSchedTemp.length; i++) {
            // var patt = /[A-Za-z]/
            var firstName = appSchedTemp[i].fName;
            var lastName = appSchedTemp[i].lName;
            var startTime = appSchedTemp[i].start;
            var endTime = appSchedTemp[i].end;
            var appSchedDate = new Date(appSchedTemp[i].date);
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
            <a href="#" class="btn btn-outline-primary w-100 p-2  mb-1 no-ptr current" style="font-size: 14px">
            <ul class="flex-container">
            <li class="sched-item-icon"><i class="fa fa-user"></i></li>
            <li lang="en" class="sched-item-content" dir=${langDir}>${firstName + " " + lastName}</li>
            <li lang="he" class="sched-item-content" dir=${langDir}>${firstName + " " + lastName}</li>
            <li class="sched-item">${startTime}</li>
            </ul>
            </a></div>`
            } else {
                var content = `<div class="dash-appointment" data-toggle="modal" data-target="#exampleModalCenter">
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
    var appContainerContent = "";
    var dotContainer = document.getElementById("dot-container");
    var dotContainerContent = "";
    for (i = 1; i < todayApps.length; i++) {
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
        todayAppContainer.innerHTML = appContainerContent;
        if (i === 5) {
            i = todayApps.length;
        }
    }
    for (i = 1; i < todayApps.length; i++) {
        if(i < 6){
            dotContainerContent += `<span class="dot active"></span>`
            dotContainer.innerHTML = dotContainerContent;    
        }else{
            dotContainerContent += `<span class="dot"></span>`
            dotContainer.innerHTML = dotContainerContent;    
        }
    }
    if (appSched.length > 0) {
        for (i = 1; i < todayApps.length; i++) {
            var listInfo = todayApps[i + patientNumber].getElementsByTagName("li");
            console.log(listInfo[1].lang)
            var patientInfo = "";
            for (j = 1; j < listInfo.length; j++) {
                console.log(listInfo[j].innerHTML);
                var patient = document.getElementById("patient" + i);
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
            }
            if (i === 5) {
                i = todayApps.length;
            }
        }
    }
    console.log("today app: " + todayApps.length)
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
    for (i = 0; i < todayApps.length-1; i++){
        console.log("dot start val: " + start)
        console.log("todayApps length: " + (todayApps.length-1))
        if (start+3 > (todayApps.length-2)){
            console.log("start over")
            if (i <= ((start+3)-(todayApps.length-1)) || i >= (start-1)){
                dotContainerContent += `<span class="dot active"></span>`
                dotContainer.innerHTML = dotContainerContent; 
            } else{
                dotContainerContent += `<span class="dot"></span>`
                dotContainer.innerHTML = dotContainerContent;   
            }
        }else if (i < (start-1) || i > (start+3)){
            dotContainerContent += `<span class="dot"></span>`
            dotContainer.innerHTML = dotContainerContent;    
        }else{
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
            patientNew.innerHTML = patientInfo;

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
    patientNumber++;
    if (Math.abs(patientNumber) > todayApps.length - 1) {
        patientNumber = 1;
    }
    start = patientNumber;
    if (start < 0) {
        start = todayApps.length - Math.abs(patientNumber);
    }
    for (i = 0; i < todayApps.length-1; i++){
        console.log("dot start val: " + start)
        console.log("todayApps length: " + (todayApps.length-1))
        if (start+3 > (todayApps.length-2)){
            console.log("start over")
            if (i <= ((start+3)-(todayApps.length-1)) || i >= (start-1)){
                dotContainerContent += `<span class="dot active"></span>`
                dotContainer.innerHTML = dotContainerContent; 
            } else{
                dotContainerContent += `<span class="dot"></span>`
                dotContainer.innerHTML = dotContainerContent;   
            }
        }else if (i < (start-1) || i > (start+3)){
            dotContainerContent += `<span class="dot"></span>`
            dotContainer.innerHTML = dotContainerContent;    
        }else{
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
        }
    }
    if (langSelect === "hebrew") {
        $('[lang="he"]').show();
        $('[lang="en"]').hide();
    } else {
        $('[lang="en"]').show();
        $('[lang="he"]').hide();
    }
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
    $('[lang="en"]').hide();

    $('#switch-lang').click(function () {
        var langSwitchButton = document.getElementById("switch-lang");
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
            langSwitchButton.innerText = "English"
        }
        console.log(langSelect)
        // $('[lang="en"]').toggle();
        // $('[lang="he"]').toggle();
        setReminderForm();
        setAppSchedForm();
    });
    setReminderForm();
    setAppSchedForm();
})

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
        document.getElementById("last-name").required = true;
        document.getElementById("last-name-he").required = false;
        document.getElementById("appSchedModalTextarea1").required = true;
        document.getElementById("appSchedModalTextarea1-he").required = false;
    }
}
