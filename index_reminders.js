// global variable
var message = "";

// display reminders when they are due or past due
function displayReminder(subject, user, date, text) {
    modalMessage = document.getElementById("reminderTextModalBody");
    reminderModalTitle = document.getElementById("reminderTextModalLongTitle");
    reminderModalTitle.innerText = subject;
    if((localStorage.getItem)("langSelect") === "hebrew"){
        modalMessage.dir = "rtl";
        modalMessage.style.textAlign = "right";
        message += `<div><b>משתמש: </b>${user}</div>` +
        `<div><b>נקבעה ל: </b>${new Date(date).toString().substr(0, 24)}</div>` +
        `<div><b>תזכורת: </b>${text}</div>` +
        `<div><b>---------------</b></div>`
    }else{
        modalMessage.dir = "ltr";
        modalMessage.style.textAlign = "left";
        message += `<div><b>User: </b>${user}</div>` +
        `<div><b>Set for: </b>${new Date(date).toString().substr(0, 24)}</div>` +
        `<div><b>Reminder: </b>${text}</div>` +
        `<div><b>---------------</b></div>`
    }
    modalMessage.innerHTML = message;
    $('#reminderTextModal').modal('show');
}

function getReminders(timeOffset) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "http://127.0.0.1/healthcareProvider/fetchData.php",
            data: { table: "getReminders", curr_date: timeOffset },
            xhrFields: {
                withCredentials: true
            },
            success: function (res) {
                console.log("this is the reminder res: ", res);
                res = JSON.parse(res);
                console.log("this is the reminder res again: ", res);
                resolve(res);
            }
        });
    })
}

const reminderFunction = () => {
    var timeOffset = getTimeOffset();
    var reminderArray = [];


    const promises = [
        getReminders(timeOffset)
    ];

    Promise.all(promises).then(result => {
        console.log("Hello result", result);
        reminderArray = result[0];

        console.log("end of test rem function: ", reminderArray);

        // var reminderArray = localStorage.getItem("reminders");

        // create a reminders array if it doesn't exist
        if (reminderArray === null) {
            console.log("no reminders in storage");
            reminderArray = [];
            reminderArray = JSON.stringify(reminderArray)
            localStorage.setItem("reminders", reminderArray);
        } else {
            counter = 0;
            // reminderArray = JSON.parse(reminderArray);
            console.log(reminderArray);
            if (reminderArray.length === 0) {
                if (localStorage.getItem("langSelect") === "english") {
                    remAlert = "No reminders for the next 24 hours";
                } else {
                    remAlert = "אין תזכורות ל-24 שעות הקרובות";
                }
                reminderAlert(remAlert);
                return;
            }
            var now = Date.now();
            for (var i = 0; i < reminderArray.length; i++) {
                console.log("array length: ", reminderArray.length)
                alarmTime = new Date(reminderArray[i].due);
                alarmTime = alarmTime.getTime();
                console.log("alarm time: ", alarmTime);
                console.log("now: ", now);

                // check for missed reminders, show them to the user, and remove them from the reminders array
                if (alarmTime < now) {
                    var subject = "Missed Reminder";
                    var setFor = reminderArray[i].due;
                    var text = reminderArray[i].text;
                    var setBy = reminderArray[i].fname + " " + reminderArray[i].lname;

                    displayReminder(subject, setBy, setFor, text);
                    // reminderArray.splice(i, 1);
                    // reminderArray = JSON.stringify(reminderArray);
                    // localStorage.setItem("reminders", reminderArray);
                    // reminderArray = JSON.parse(reminderArray);
                    // i--;

                }

                // check if there are reminders set for the next 24 hours and set a timeout to notify user 
                // when reminder is due
                else if (alarmTime <= now + 24 * 60 * 60 * 1000) {
                    var number = i;
                    if (localStorage.getItem("langSelect") === "hebrew") {
                        var subject = "תזכורת";
                    } else {
                        var subject = "Reminder";
                    }
                    var setFor = reminderArray[i].due;
                    var text = reminderArray[i].text;
                    var setBy = reminderArray[i].fname + " " + reminderArray[i].lname;

                    setTimeout(function () {
                        // reminderArray.splice(number, 1);
                        // reminderArray = JSON.stringify(reminderArray);
                        // localStorage.setItem("reminders", reminderArray);
                        // reminderArray = JSON.parse(reminderArray);
                        displayReminder(subject, setBy, setFor, text);

                    }, (alarmTime - now))
                    if (Math.floor((alarmTime - now) / 1000 / 60 / 60) === 1) {
                        if (localStorage.getItem("langSelect") === "english") {
                            remAlert = "The next reminder is in " + Math.floor((alarmTime - now) / 1000 / 60 / 60) + " hour and " +
                                Math.floor(((alarmTime - now) / 1000 / 60 / 60 - Math.floor((alarmTime - now) / 1000 / 60 / 60)) * 60) + " minutes."
                        } else {
                            remAlert = "ההתרעה הקרובה היא לעוד " + Math.floor((alarmTime - now) / 1000 / 60 / 60) + "שעה ו-" +
                                Math.floor(((alarmTime - now) / 1000 / 60 / 60 - Math.floor((alarmTime - now) / 1000 / 60 / 60)) * 60) + " דקות"

                        }
                        reminderAlert(remAlert);
                    }
                    if (Math.floor((alarmTime - now) / 1000 / 60 / 60) > 1) {
                        if (localStorage.getItem("langSelect") === "english") {
                            remAlert = "The next reminder is in " + Math.floor((alarmTime - now) / 1000 / 60 / 60) + " hours and " +
                                Math.floor(((alarmTime - now) / 1000 / 60 / 60 - Math.floor((alarmTime - now) / 1000 / 60 / 60)) * 60) + " minutes."
                        } else {
                            remAlert = "ההתרעה הקרובה היא לעוד " + Math.floor((alarmTime - now) / 1000 / 60 / 60) + " שעות ו-" +
                                Math.floor(((alarmTime - now) / 1000 / 60 / 60 - Math.floor((alarmTime - now) / 1000 / 60 / 60)) * 60) + " דקות"

                        }
                        reminderAlert(remAlert);
                    }
                    if (Math.floor((alarmTime - now) / 1000 / 60 / 60) < 1) {
                        if (localStorage.getItem("langSelect") === "english") {
                            remAlert = "The next reminder is in " +
                                Math.floor(((alarmTime - now) / 1000 / 60 / 60 - Math.floor((alarmTime - now) / 1000 / 60 / 60)) * 60) + " minutes."
                        } else {
                            remAlert = "ההתרעה הקרובה היא לעוד " +
                                Math.floor(((alarmTime - now) / 1000 / 60 / 60 - Math.floor((alarmTime - now) / 1000 / 60 / 60)) * 60) + " דקות"
                        }
                        reminderAlert(remAlert);
                    }
                    counter++;
                    i = reminderArray.length;
                }

                // notify the user that there are no reminders set for the next 24 hours
                else if (alarmTime > now + 24 * 60 * 60 * 1000) {
                    if (counter === 0) {
                        if (localStorage.getItem("langSelect") === "english") {
                            remAlert = "No reminders for the next 24 hours";
                        } else {
                            remAlert = "אין תזכורות ל-24 שעות הקרובות";
                        }
                        reminderAlert(remAlert);
                        i = reminderArray.length;
                    } else {
                        i = reminderArray.length;
                    }
                }
            }
        }
    })
}

// displays the message sent by reminderFunction to notify user of whether there are 
// reminders in the next 24 hours 
function reminderAlert(message) {
    var reminderAlert = document.getElementById("reminderAlert");
    reminderAlert.className = "centerAlert reminder-item fade-in fadeInReminder";
    var reminderAlertText = document.getElementById("reminderAlertText");
    reminderAlertText.innerText = message;
    setTimeout(function () { reminderAlert.className = "centerAlert reminder-item fade-out fadeOutReminder"; }, 3000);
    setTimeout(function () { reminderAlert.className = "alert-off"; }, 4900);
}

// allows user to set a new reminder
function setReminder() {
    if(localStorage.getItem("langSelect") === "hebrew"){
        var reminderTime = document.getElementById("reminder-time-he").value;
        var reminderText = document.getElementById("reminderText-he").value;
    }else{
        var reminderTime = document.getElementById("reminder-time").value;
        var reminderText = document.getElementById("reminderText").value;
    }
    var reminderArray = localStorage.getItem("reminders");
    var reminderTimeMilli = new Date(reminderTime);
    reminderTimeMilli = reminderTimeMilli.getTime();
    console.log(reminderTime);
    reminderArray = JSON.parse(reminderArray);
    console.log(reminderText);
    if(reminderArray.length === 0){
        reminderArray.push({ "dateTime": reminderTime, "user": "Oren", "text": reminderText });
        reminderArray = JSON.stringify(reminderArray)
        localStorage.setItem("reminders", reminderArray);
        reminderArray = localStorage.getItem("reminders");
        return;
    }
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
                dateTimeMilli = new Date(reminderArray[end].dateTime);
                if (reminderTimeMilli > dateTimeMilli) {
                    reminderArray.splice(end + 1, 0, { "dateTime": reminderTime, "user": "Oren", "text": reminderText })
                } else { 
                    reminderArray.splice(mid + 1, 0, { "dateTime": reminderTime, "user": "Oren", "text": reminderText })
                }   
            } else {
                reminderArray.splice(mid, 0, { "dateTime": reminderTime, "user": "Oren", "text": reminderText })
                console.log("remTime: " + reminderTimeMilli + " dateTime: " + dateTimeMilli + " placed in place: " + (mid))
            }
        }
        else if (reminderTimeMilli > dateTimeMilli) {
            start = mid;
            mid = Math.floor((start + end) / 2);
        } else {
            end = mid;
            mid = Math.floor((start + end) / 2);
        }
    }
    // reminderArray.push({ "dateTime": reminderTime, "user": "Oren", "text": reminderText });
    if(localStorage.getItem("langSelect")==="hebrew"){
        reminderAlert(".התזכורת נשמרה בהצלחה")
    }else{
        reminderAlert("Reminder saved successfully!")
    }
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

    var storeAlert = localStorage.getItem("alert");
    if (storeAlert === null) {
        storeAlert = []
    } else {
        storeAlert = JSON.parse(storeAlert);
        if (storeAlert.length > 0) {
            alertToast(storeAlert[0].type, storeAlert[0].message);
            storeAlert = [];
            storeAlert = JSON.stringify(storeAlert);
            localStorage.setItem("alert", storeAlert);
            return;
        }
    }

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

