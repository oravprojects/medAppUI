const searchBar = document.querySelector(".users .search input"),
searchBtn = document.querySelector(".users .search button"),
userName = document.querySelector(".details span"),
status = document.querySelector(".details p"),
image = document.querySelector(".content img"),
usersList = document.querySelector(".users .users-list"),
logoutBtn = document.querySelector(".logout");

logoutBtn.onclick = () => {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1/healthcareProvider/chatLogout.php", true);
    xhr.withCredentials = true;
    xhr.onload = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let data = xhr.response;
                if(data === "success"){
                    location.href = "http://127.0.0.1:5500/chatLogin.html";
                }else{
                    console.log(data);
                }
            }
        }
    }
    // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send();
}

searchBtn.onclick = () => {
    searchBar.classList.toggle("active");
    searchBar.focus();
    searchBtn.classList.toggle("active");
    searchBar.value = "";
}

searchBar.onkeyup = ()=>{
    let searchTerm = searchBar.value;
    // if(searchTerm != ""){
    //     searchBar.classList.add("active");
    // }else{
    //     searchBar.classList.remove("active");
    // }
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1/healthcareProvider/chatSearch.php", true);
    xhr.withCredentials = true;
    xhr.onload = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let data = xhr.response;
                usersList.innerHTML = data;
                    // console.log(data);
            }
        }
    }
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("searchTerm=" + searchTerm);
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
                    image.src = "http://127.0.0.1/healthcareProvider/images/" + JSON.parse(data).image;
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

setInterval(()=>{
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1/healthcareProvider/chatAvailUsers.php", true);
    xhr.withCredentials = true;
    xhr.onload = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let data = xhr.response;
                if(data === "logout"){
                    location.href = "http://127.0.0.1:5500/chatLogin.html";
                }
                if(!searchBar.classList.contains("active")){
                    usersList.innerHTML = data;
                    // console.log(data);
                }
            }
        }
    }
    xhr.send();
}, 500)

function isJSON(str) {
    try {
        // return (JSON.parse(str) && !!str);
        return !!(JSON.parse(str) && str);
    } catch (e) {
        return false;
    }
}