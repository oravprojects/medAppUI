
window.onload = function onLoadFunction() {
    $("#login-form").on("submit", function (e) {
        var dataString = $(this).serialize();
        console.log("dataString: " + dataString);
        $.ajax({
          type: "POST",
          url: "http://127.0.0.1/healthcareProvider/login.php",
          data: dataString,
          xhrFields:{
            withCredentials: true
          },
          success: function (res) {
            console.log(res);
            if(res == "success"){
              window.location="http://127.0.0.1:5500";
            }else{
              console.log("login failure");
              var errorMessage = document.getElementById("login-error");
              var pwdField = document.getElementById("password");
              var loginButton = document.getElementById("login-button");
              pwdField.style.marginBottom = "10px";
              loginButton.style.marginTop = "15px";
              errorMessage.innerHTML = "Incorrect username and/or password";
            }
          }
        });
        e.preventDefault();
      });
}  