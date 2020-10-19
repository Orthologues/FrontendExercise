// this script corresponds to ./index.html, uses jquery AJAX and DOM

$(document).ready(() => {
  console.log('DOM is ready');
  $("#city-form").submit(event => {
    // Prevent the form from submitting via the browser.
    event.preventDefault();
    ajaxPOST();
    $('#city-input').val('');
  });

  function ajaxPOST() {
    // check radio button for temperature unit
    let tp_unit = '';
    if ($('#celsius').is(':checked')) {
      tp_unit = 'metric';
    } else if ($('#fahrenheit').is(':checked')) {
      tp_unit = 'imperial';
    }
    let cityFormData = {
      cityName: $("#city-input").val(),
      unit: tp_unit
    }
    // define ajax post
    $.ajax({
      type: 'POST',
      url: '/save',
      contentType: 'application/json',
      data: JSON.stringify(cityFormData),
      dataType: 'json',
    });
  }
});
