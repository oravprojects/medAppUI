const form = document.querySelector(".typing-area"),
inputField = document.querySelector(".input-field"),
sendBtn = document.querySelector("button"),
userName = document.querySelector(".chat-area span"),
status = document.querySelector(".chat-area p"),
hostImage = document.querySelector(".chat-area img"),
guestImage = document.querySelector(".chat-box .chat incoming img"),
outgoing = document.querySelector(".chat-box .chat outgoing .details p"),
incoming = document.querySelector(".chat-box .chat incoming .details p"),
chatBox = document.querySelector(".chat-box"),
queryString = window.location.search,
urlParams = new URLSearchParams(queryString),
guestId = urlParams.get('user_id'),
img = urlParams.get('img');

console.log(guestId);

form.onsubmit = (e)=>{
    e.preventDefault();
}

sendBtn.onclick = () => {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1/healthcareProvider/chatContent.php", true);
    xhr.withCredentials = true;
    xhr.onload = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                inputField.value = "";
            }
        }
    }
    let formData = new FormData(form);
    formData.set("guest_id", guestId)
    console.log(...formData);
    xhr.send(formData);
}

setInterval(()=>{
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1/healthcareProvider/getChatContent.php", true);
    xhr.withCredentials = true;
    xhr.onload = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let data = xhr.response;
                chatBox.innerHTML = data;
            }
        }
    }
    // let formData = new FormData(form);
    // console.log(...formData);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("guest_id=" + guestId + "&img=" + img);
}, 500)

let xhr = new XMLHttpRequest();
xhr.open("POST", "http://127.0.0.1/healthcareProvider/chatUsers.php", true);
// xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhr.withCredentials = true;
xhr.onload = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
            let data = xhr.response;
            console.log(data);
            if (isJSON(data)) {
                    userName.textContent = JSON.parse(data).fname + " " + JSON.parse(data).lname;
                    status.textContent = JSON.parse(data).status;
                    hostImage.src = "http://127.0.0.1/healthcareProvider/images/" + JSON.parse(data).image;
            }
            else {
                console.log("something went wrong . . .")
            }
        }
    }
}
xhr.send();

function isJSON(str) {
    try {
        // return (JSON.parse(str) && !!str);
        return !!(JSON.parse(str) && str);
    } catch (e) {
        return false;
    }
}
