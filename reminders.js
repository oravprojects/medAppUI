// global variable
var message = "";

// display reminders when they are due or past due
function displayReminder(subject, user, date, text) {
    modalMessage = document.getElementById("reminderTextModalBody");
    reminderModalTitle = document.getElementById("reminderTextModalLongTitle");
    reminderModalTitle.innerText = subject;
    message += `<div><b>User: </b>${user}</div>` +
        `<div><b>Set for: </b>${new Date(date).toString().substr(0, 24)}</div>` +
        `<div><b>Reminder: </b>${text}</div>` +
        `<div><b>---------------</b></div>`
    modalMessage.innerHTML = message;
    $('#reminderTextModal').modal('show');
}

const reminderFunction = () => {
    var reminderArray = localStorage.getItem("reminders");

    // create a reminders array if it doesn't exist
    if (reminderArray === null) {
        console.log("no reminders in storage");
        reminderArray = [];
        reminderArray = JSON.stringify(reminderArray)
        localStorage.setItem("reminders", reminderArray);
    } else {
        counter = 0;
        reminderArray = JSON.parse(reminderArray);
        console.log(reminderArray);
        var now = Date.now()
        for (var i = 0; i < reminderArray.length; i++) {
            console.log("array length: ", reminderArray.length)
            alarmTime = new Date(reminderArray[i].dateTime);
            alarmTime = alarmTime.getTime();
            console.log("alarm time: ", alarmTime);
            console.log("now: ", now);

            // check for missed reminders, show them to the user, and remove them from the reminders array
            if (alarmTime < now) {
                var subject = "Missed Reminder";
                var setFor = reminderArray[i].dateTime;
                var text = reminderArray[i].text;
                var setBy = reminderArray[i].user;
                var check = true;
                displayReminder(subject, setBy, setFor, text);
                reminderArray.splice(i, 1);
                reminderArray = JSON.stringify(reminderArray);
                localStorage.setItem("reminders", reminderArray);
                reminderArray = JSON.parse(reminderArray);
                i--;
                check = false;
            }

            // check if there are reminders set for the next 24 hours and set a timeout to notify user 
            // when reminder is due
            else if (alarmTime <= now + 24 * 60 * 60 * 1000) {
                var number = i;
                var subject = "Reminder";
                var setFor = reminderArray[i].dateTime;
                var text = reminderArray[i].text;
                var setBy = reminderArray[i].user;
                check = true;
                setTimeout(function () {
                    reminderArray.splice(number, 1);
                    reminderArray = JSON.stringify(reminderArray);
                    localStorage.setItem("reminders", reminderArray);
                    reminderArray = JSON.parse(reminderArray);
                    displayReminder(subject, setBy, setFor, text);
                    check = false;
                }, (alarmTime - now))
                if (Math.floor((alarmTime - now) / 1000 / 60 / 60) === 1) {
                    remAlert = "The next reminder is in " + Math.floor((alarmTime - now) / 1000 / 60 / 60) + " hour and " +
                        Math.floor(((alarmTime - now) / 1000 / 60 / 60 - Math.floor((alarmTime - now) / 1000 / 60 / 60)) * 60) + " minutes."
                    reminderAlert(remAlert);
                }
                if (Math.floor((alarmTime - now) / 1000 / 60 / 60) > 1) {
                    remAlert = "The next reminder is in " + Math.floor((alarmTime - now) / 1000 / 60 / 60) + " hours and " +
                        Math.floor(((alarmTime - now) / 1000 / 60 / 60 - Math.floor((alarmTime - now) / 1000 / 60 / 60)) * 60) + " minutes."
                    reminderAlert(remAlert);
                }
                if (Math.floor((alarmTime - now) / 1000 / 60 / 60) < 1) {
                    remAlert = "The next reminder is in " +
                        Math.floor(((alarmTime - now) / 1000 / 60 / 60 - Math.floor((alarmTime - now) / 1000 / 60 / 60)) * 60) + " minutes."
                    reminderAlert(remAlert);
                }
                counter++;
                i = reminderArray.length;
            }

            // notify the user that there are no reminders set for the next 24 hours
            else if (alarmTime > now + 24 * 60 * 60 * 1000) {
                if (counter === 0) {
                    remAlert = "No reminders for the next 24 hours";
                    reminderAlert(remAlert);
                    i = reminderArray.length;
                } else {
                    i = reminderArray.length;
                }
            }
        }
    }
}

// displays the message sent by reminderFunction to notify user of whether there are 
// reminders in the next 24 hours 
function reminderAlert(message) {
    var reminderAlert = document.getElementById("reminderAlert");
    reminderAlert.className = "reminder-item fade-in fadeInReminder";
    var reminderAlertText = document.getElementById("reminderAlertText");
    reminderAlertText.innerText = message;
    setTimeout(function () { reminderAlert.className = "reminder-item fade-out fadeOutReminder"; }, 3000);
    setTimeout(function () { reminderAlert.className = "alert-off"; }, 4900);
}

// allows user to set a new reminder
function setReminder() {
    var reminderArray = localStorage.getItem("reminders");
    var reminderTime = document.getElementById("reminder-time").value;
    var reminderTimeMilli = new Date(reminderTime);
    reminderTimeMilli = reminderTimeMilli.getTime();
    console.log(reminderTime);
    reminderArray = JSON.parse(reminderArray);
    reminderText = document.getElementById("reminderText").value;
    console.log(reminderText);
    var mid = Math.floor(reminderArray.length / 2);
    var start = 0;
    var end = reminderArray.length - 1;
    var mid = Math.floor((start + end) / 2);
    for (i = 0; i < reminderArray.length; i++) {
        var dateTimeMilli = new Date(reminderArray[mid].dateTime);
        dateTimeMilli = dateTimeMilli.getTime();
        if (mid === start) {
            i = reminderArray.length;
            if (reminderTimeMilli > dateTimeMilli) {
                reminderArray.splice(mid + 1, 0, { "dateTime": reminderTime, "user": "Oren", "text": reminderText })
                console.log("remTime: " + reminderTimeMilli + " dateTime: " + dateTimeMilli + " placed in place: " + (mid + 1))
            } else {
                reminderArray.splice(mid, 0, { "dateTime": reminderTime, "user": "Oren", "text": reminderText })
                console.log("remTime: " + reminderTimeMilli + " dateTime: " + dateTimeMilli + " placed in place: " + (mid))
            }
        }
        else if (reminderTimeMilli > dateTimeMilli) {
            start = mid;
            mid = Math.floor((start + end / 2));
        } else {
            end = mid;
            mid = Math.floor((start + end) / 2);
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

// add window.load function
function func1() {
    // set reminder onclick event
    document.querySelector("#setReminder").addEventListener("click", () => {
        textArea = document.getElementById('reminderText');
        textArea.value = "";
        reminderTime = document.getElementById('reminder-time');
        reminderTime.value = "";
    });

    // call reminderFunction to check for reminders
    setTimeout(function () {
        reminderFunction();
    }, 0)
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
addLoadEvent(func1);

// addLoadEvent(function() {
//     document.body.style.backgroundColor = '#EFDF95';
// })

