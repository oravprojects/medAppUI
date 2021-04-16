window.onload = function onLoadFunction() {
$("#user-info-form").on("submit", function (e) {
    var dataString = $(this).serialize();
    console.log("dataString: " + dataString);
    $.ajax({
      type: "POST",
      url: "http://127.0.0.1/healthcareProvider/create_user.php",
      data: dataString,
      success: function (response) {
        console.log("submitted successfully to php function: " + response);
      }
    });
    e.preventDefault();
  });

  $("#patient-info-form").on("submit", function (e) {
    var dataString = $(this).serialize();
    console.log("dataString: " + dataString);
    $.ajax({
      type: "POST",
      url: "http://127.0.0.1/healthcareProvider/create_patient.php",
      data: dataString,
      success: function (response) {
        console.log(response);
      }
    });
    e.preventDefault();
  });
}