Vue.component('success',{
  template: `<div class="alert alert-success alert-dismissible">
    <a href="#" class="close" data-dismiss="alert" aria-label="close">×</a>
    <strong>Congratulation!</strong> You have successfully registered.
  </div>`
})

new Vue({
  el:'#app',
  data: {
    name: '',
    username: '',
    password: '',
    email: '',
    success: false
  },
  methods: {
    doRegister() {
      var self = this
      axios.post('http://localhost:3000/signup', {
        name: self.name,
        username: self.username,
        password: self.password,
        email: self.email
      })
      .then( (response) => {
        if(response.data) {
          console.log('======masuk login');
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('id', response.data.id)
          localStorage.setItem('username', response.data.username)
          this.name = '';
          this.username = '';
          this.password = '';
          this.email = '';
          this.success = true
        }
      })
      .catch( (err) => {
        console.log(err);
        alert('Register Fail')
      })
    },
    doLogin() {
      var self = this
      axios.post('http://localhost:3000/signin', {
        username: self.username,
        password: self.password
      })
      .then( (response) => {
        if((response.data !== 'Maaf username atau password salah') && (response.data !== 'Maaf username tidak terdaftar')) {
          console.log('======masuk login');
          localStorage.setItem('id', response.data.id)
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('name', response.data.name)
          localStorage.setItem('username', response.data.username)
          localStorage.setItem('email', response.data.email)
          window.location.href='home.html'
        }
      })
      .catch( (err) => {
        console.log(err);
        alert('Wrong username or password')
      } )
    }
  }
})
