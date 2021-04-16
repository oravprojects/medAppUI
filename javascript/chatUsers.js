const searchBar = document.querySelector(".users .search input"),
searchBtn = document.querySelector(".users .search button");

const userName = document.querySelector(".details span");
userName.textContent = "this is a test"

searchBtn.onclick = () => {
    searchBar.classList.toggle("active");
    searchBar.focus();
    searchBtn.classList.toggle("active");
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
                    userName.textContent = JSON.parse(data).fname + " " + JSON.parse(data).lname
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