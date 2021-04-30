let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1/healthcareProvider/checkStatus.php", true);
    xhr.withCredentials = true;
    xhr.onload = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let data = xhr.response;
                console.log(data);
                if (data === "already logged in") {
                        location.href = "http://127.0.0.1:5500/chatUsers.html";
                } 
            }
        }
    }
xhr.send();

const form = document.querySelector(".signup form"),
createAcctBtn = form.querySelector(".button input"),
errorText = form.querySelector(".error-txt");
form.onsubmit = (e)=>{
    e.preventDefault();
}

createAcctBtn.onclick = ()=>{
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1/healthcareProvider/chatSignup.php", true);
    xhr.onload = ()=>{
        if(xhr.readyState === XMLHttpRequest.DONE){
            if(xhr.status === 200){
                let data = xhr.response;
                if(data === "success"){
                    location.href = "http://127.0.0.1:5500/chatLogin.html";
                }else{
                    console.log("error: ", data);
                    errorText.textContent = data;
                    errorText.style.display = "block";
                }
            }
        }
    }
    let formData = new FormData(form);
    console.log("this is form data: ", ...formData);
    xhr.send(formData);
}

