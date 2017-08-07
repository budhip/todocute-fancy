
axios.defaults.baseURL = 'http://localhost:3000/signin';

window.fbAsyncInit = function() {
FB.init({
  appId      : '1352252414893899',
  cookie     : true,  // enable cookies to allow the server to access
                      // the session
  xfbml      : true,  // parse social plugins on this page
  version    : 'v2.8' // use graph api version 2.8
});

FB.getLoginStatus(function(response) {
  statusChangeCallback(response);
});

};

// Load the SDK asynchronously
(function(d, s, id) {
  // console.log('masuk sdk facebokk');
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function statusChangeCallback(response) {
  // console.log('statusChangeCallback');
  // console.log(response);
  if (response.status === 'connected') {
    // console.log(response);
    let token = response.authResponse.accessToken
    localStorage.setItem('fbtoken', token)
    // tokenFB(token)
    // testAPI();
    console.log(`masuk response`);
  } else {
    console.log(`please login first`);
  }
}

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

function fbLogin() {
  FB.login(function(response) {
    // console.log(response);
    var tokenFromFb = response.authResponse.accessToken
    console.log(tokenFromFb);
    if(response.authResponse) {
      FB.api('/me', {fields: 'id, name, first_name, email'}, function(response){
        var id = response.id;
        var name = response.name;
        var first_name = response.first_name;
        var email = response.email;
        console.log(response.id);
        console.log(response.name);
        console.log(response.first_name);
        console.log(response.email);
        console.log(tokenFromFb);
        axios.post('http://localhost:3000/signin', {

        }, {
          headers: {
            accesstoken: tokenFromFb,
            id: id,
            name: name,
            first_name: first_name,
            email: email
          }
        })
        .then(response => {
          console.log('ini response.data dari then',response.data);
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('id', response.data.id)
          localStorage.setItem('name', response.data.name)
          localStorage.setItem('username', response.data.username)
          localStorage.setItem('email', response.data.email)
          window.location = 'home.html'
          console.log('Good to see you, ' + response.name + '.');
        })
        .catch(err => {
          console.log(err);
        })
      })
    } else {
      console.log('User cancelled login or did not fully authorize.');
    }
  }, {
    scope: 'public_profile,email'
  });
}

// function fbLogout() {
//   FB.logout(response => {
//     if (response) {
//       console.log(response);
//       window.location = 'index.html';
//     } else {
//       console.log(`error`);
//     }
//   })
// }
