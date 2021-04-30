function isJSON(str) {
  try {
    // return (JSON.parse(str) && !!str);
    return !!(JSON.parse(str) && str);
  } catch (e) {
    return false;
  }
}

window.onload = function onLoadFunction() {
  let errorMessage = document.getElementById("login-error");
  let pwdField = document.getElementById("password");
  let loginButton = document.getElementById("login-button");

  $("#login-form").on("submit", function (e) {
    var dataString = $(this).serialize();
    console.log("dataString: " + dataString);
    $.ajax({
      type: "POST",
      url: "http://127.0.0.1/healthcareProvider/login.php",
      data: dataString,
      xhrFields: {
        withCredentials: true
      },
      success: function (res) {
        if (!isJSON(res)) {
          console.log(res);
          pwdField.style.marginBottom = "10px";
          loginButton.style.marginTop = "15px";
          errorMessage.innerHTML = res;
          return;
        }
        res = JSON.parse(res);
        if (res["login"] == "success") {
          sessionStorage.setItem("fname", JSON.stringify(res["fname"]));
          sessionStorage.setItem("lname", JSON.stringify(res["lname"]));
          window.location = "http://127.0.0.1:5500";
        } else {
          console.log("login failure");
          pwdField.style.marginBottom = "10px";
          loginButton.style.marginTop = "15px";
          errorMessage.innerHTML = "Incorrect username and/or password";
        }
      }
    });
    e.preventDefault();
  });
}