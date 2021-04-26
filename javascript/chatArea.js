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

// socket test
// var exampleSocket = new WebSocket("ws://127.0.0.1:8000/healthcareProvider/socketServer.php");

// sendBtn.onclick = () => {
//     let formData = new FormData(form);
//     console.log(...formData);
//     let msg = {"message": formData.get('message'), "guest_id": guestId}
//     let message = formData.get('message');
//     console.log(message);
//     exampleSocket.send(message);
//     // exampleSocket = new WebSocket("ws://127.0.0.1:8000/healthcareProvider/socketServer.php");
//     // exampleSocket.onmessage = function (event) {
//     //     console.log(event.data);
//     // }    
// }

// exampleSocket.onmessage = function (event) {
//     console.log(event.data);
// }

sendBtn.onclick = () => {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1/healthcareProvider/chatContent.php", true);
    xhr.withCredentials = true;
    xhr.onload = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let data = xhr.response;
                console.log(data);
                if(data === "logout"){
                    location.href = "http://127.0.0.1:5500/chatLogin.html";
                    return;
                }
                inputField.value = "";
            }
        }
    }
    let formData = new FormData(form);
    formData.set("guest_id", guestId)
    console.log(...formData);
    xhr.send(formData);
    chatBox.classList.remove("active");
}

// chatBox.onmouseenter = ()=>{
//     chatBox.classList.add("active");
// }
// chatBox.onmouseleave = ()=>{
//     chatBox.classList.remove("active");
// }

setInterval(()=>{
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1/healthcareProvider/getChatContent.php", true);
    xhr.withCredentials = true;
    xhr.onload = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let data = xhr.response;
                if(data === "logout"){
                    location.href = "http://127.0.0.1:5500/chatLogin.html";
                    return;
                }
                chatBox.innerHTML = data;
                if(!chatBox.classList.contains("active")){
                    scrollToBottom();
                    chatBox.classList.add("active");
                }
            }
        }
    }
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("guest_id=" + guestId + "&img=" + img);
}, 500)

function scrollToBottom(){
    chatBox.scrollTop = chatBox.scrollHeight;
}

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
                if(data === "logout"){
                    location.href = "http://127.0.0.1:5500/chatLogin.html";
                    return;
                }
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
