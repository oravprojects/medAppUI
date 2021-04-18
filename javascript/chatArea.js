const userName = document.querySelector(".chat-area span"),
status = document.querySelector(".chat-area p"),
hostImage = document.querySelector(".chat-area img"),
guestImage = document.querySelector(".chat-box .chat incoming img"),
outgoing = document.querySelector(".chat-box .chat outgoing .details p");
incoming = document.querySelector(".chat-box .chat incoming .details p");

// setInterval(()=>{
//     let xhr = new XMLHttpRequest();
//     xhr.open("GET", "http://127.0.0.1/healthcareProvider/chatArea.php", true);
//     xhr.withCredentials = true;
//     xhr.onload = () => {
//         if (xhr.readyState === XMLHttpRequest.DONE) {
//             if (xhr.status === 200) {
//                 let data = xhr.response;
//                 if(!searchBar.classList.contains("active")){
//                     usersList.innerHTML = data;
//                     // console.log(data);
//                 }
//             }
//         }
//     }
//     xhr.send();
// }, 500)

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
