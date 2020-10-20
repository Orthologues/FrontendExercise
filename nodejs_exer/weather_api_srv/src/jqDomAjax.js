// this script corresponds to ./index.html, uses jquery AJAX and DOM

$(document).ready(() => {
  var lastSuccQuery;
  var if_lastQuery_succeeded = false;
  console.log('DOM is ready');
  $("#city-form").submit(event => {
    // Prevent the form from submitting via the browser.
    event.preventDefault();
    ajaxPOSTandGET(0);
    $('#city-input').val('');
  });

  $('#celsius').click(() => {
    if (if_lastQuery_succeeded === true) {
      ajaxPOSTandGET(1);
    }
  });

  $('#fahrenheit').click(() => {
    if (if_lastQuery_succeeded === true) {
      ajaxPOSTandGET(1);
    }
  });

  function ajaxPOSTandGET(mode) {
    // check radio button for temperature unit
    let tp_unit = '';
    let cityFormData = {};
    if ($('#celsius').is(':checked')) {
      tp_unit = 'metric';
    } else if ($('#fahrenheit').is(':checked')) {
      tp_unit = 'imperial';
    }
    if (mode == 0) { //new query
      cityFormData = {
        city_name: $("#city-input").val(),
        unit: tp_unit
      }
    } else { //update the last successful query, can switch its temperature unit
      //remove quotes wrapping ${lastSuccQuery}
      lastSuccQuery = lastSuccQuery.replace(/^\"/, "");
      lastSuccQuery = lastSuccQuery.replace(/\"$/, "");
      cityFormData = {
        city_name: lastSuccQuery,
        unit: tp_unit
      }
    }
    // define ajax post
    $.ajax({
      type: 'POST',
      url: '/openWeatherAPI',
      contentType: 'application/json',
      // JSON.stringify(obj) converts object to string
      data: JSON.stringify(cityFormData),
      dataType: 'json',
      success: res => {
        html_show_weather(res.data, cityFormData); //res.data returns to an object(array)
      }
    });
  }

  function html_show_weather(weather, query) {
    $('#weatherInfo-container').empty();
    if (weather.length == 1) {
      if_lastQuery_succeeded = false;
      $('#weatherInfo-container').append(`<p class='weather-info'>${weather[0]}</p>`);
    } else {
      lastSuccQuery = JSON.stringify(query.city_name);
      if_lastQuery_succeeded = true;
      let iconUrl = weather.pop();
      let imgTag = `<img src=${iconUrl} class="weather-img" alt="weather img">`;
      $('#weatherInfo-container').append(imgTag);
      for (let info of weather) {
        $('#weatherInfo-container').append(`<p class='weather-info'>${info}</p>`);
      }
    }
  }

  $('#weather-clear').click(() => {
    $('#weatherInfo-container').empty();
  });
});
