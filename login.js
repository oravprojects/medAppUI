
window.onload = function onLoadFunction() {
    $("#login-form").on("submit", function (e) {
        var dataString = $(this).serialize();
        console.log("dataString: " + dataString);
        $.ajax({
          type: "POST",
          url: "http://localhost/healthcareProvider/login.php",
          data: dataString,
          success: function (res) {
            console.log(res);
            if(res == "success"){
              location.href="http://localhost:5500";
            }else{
              console.log("login failure");
            }
          }
        });
        e.preventDefault();
      });
}  