;(function() {
  var forms = document.getElementsByTagName('form')

  var post = function(url, data, cb) {
    console.log('sending request with payload', data);
    var request = new XMLHttpRequest()

    request.onreadystatechange = function() {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
          return cb(null)
        }

        cb(request.status)
      }
    }

    request.open('POST', url)
    request.setRequestHeader('Content-Type', 'application/json')
    request.send(JSON.stringify(data))
  }

  if (forms && forms[0]) {
    forms[0].addEventListener('submit', function(event) {
      event.preventDefault()

      post(
        '/api/email',
        { email: event.target.email.value },
        function(error) {
          if (error) {
            console.error(error)
            console.log('Hi there, sorry we failed to save you email :(')
          }

          forms[0].parentElement.innerHTML =
            '<p> Thank you, come back soon! </p>'
            + '<p> Please grab the url and share it. </p>'
            + '<p> My handle on twitter is eoin_des_des </p>'
        }
      )
    }, false)
  }
})()
