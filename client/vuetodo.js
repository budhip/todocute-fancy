Vue.component('isi-todonya', {
  props: ['todos'],
  template:`
  <div>
    <li v-for="(task, index) in todos" class="list-group-item">
      <div class="row">
        <div class="col-xs-1">
          <a v-if="task.status" v-on:click="toggleStatus(task)"><span class="glyphicon glyphicon-check"></span></a>
          <a v-if="task.status==false" v-on:click="toggleStatus(task)"><span class="glyphicon glyphicon-unchecked"></span></a>
        </div>
        <div class="col-xs-10">
          <span style="font-size: 20px; margin-top: 0; line-height: 1.5em"><strong>{{ task.task }}</strong></span>
          <p><small>Date todo: {{ moment(task.tglTaskTodo).format('dddd, Do MMMM YYYY') }}</small></p>
          <p><small>Tags: {{ (task.tags).toString() }}</small></p>
        </div>
        <div class="col-xs-1">
          <a v-on:click="remove(task, index)"><span class="glyphicon glyphicon-trash"></span></a>
        </div>
        <div>
        </div>
      </div>
    </li>
    </div>
  `,
  methods: {
    moment: function (date) {
      return moment(date);
    },
    toggleStatus: function(todo) {
      var value = !todo.status;
      todo.status = value;
      axios.put(`http://localhost:3000/todos/${todo._id}/toggle`, {
        status: value
      })
      .then(response => {
      })
    },
    remove: function(todo, index) {
      if(window.confirm("Remove this item?")) {
        app.todos.splice(index, 1)
        axios.delete(`http://localhost:3000/todos/${todo._id}`, {
          data: {
            _id: todo._id
          }
        })
      }
    },
    getUser: function() {
      var self = this;
      axios.post('http://localhost:3000/userinfo', {
        token: self.token
      })
      .then(response => {
        self.user = response.data;
      })
      .catch(err => {

      })
    },
    created: function(){
      this.getUser()
    }
  }
})

Vue.component('header-belum-login', {
  template:`
  <nav class="navbar">
    <div class="container">
      <div class="navbar-header">
        <a class="navbar-brand" href="#">
          <img alt="Brand" src="resources/img/todo.png">
        </a>
      </div>

      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <form class="navbar-form navbar-left">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Search By Tag" disabled>
          </div>
          <button type="submit" class="btn" disabled="">Submit</button>
        </form>
        <ul class="nav navbar-nav navbar-right">
          <li><a href="index.html" >Register|Login</a></li>
        </ul>
      </div>
    </div>
  </nav>
  `
})
Vue.component('content-belum-login', {
  template: `
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-md-6 col-md-offset-3">
        <h1>Please register or sign in</h1>
      </div>
    </div>
  </div>
  `
})
var app = new Vue({
  el: '#app',
  data: {
    todos: [],
    user: '',
    todo: '',
    tags: '',
    tglTaskTodo: '',
    search: '',
    getSearch: false,
    token: localStorage.getItem('token'),
    name: localStorage.getItem('name'),
    username: localStorage.getItem('username'),
    email: localStorage.getItem('email')
  },
  created: function() {
    this.populateTodo();
    this.getUser();
  },
  methods: {
    populateTodo: function() {
      var self = this;
      if(self.token.length > 0) {
        axios.post('http://localhost:3000/todos', {
          token: self.token
        })
        .then(response => {
          self.todos = response.data;
          self.getSearch = false
        })
        .catch(err => {

        })
      } else {
        window.location.href = "./index.html";
      }
    },
    getUser: function() {
      var self = this;
      axios.post('http://localhost:3000/userinfo', {
        token: self.token
      })
      .then(response => {
        self.user = response.data;
      })
      .catch(err => {

      })
    },
    createNew: function() {
      var self = this;
      axios.post('http://localhost:3000/todos/add', {
        task: self.todo,
        tglTaskTodo: self.tglTaskTodo,
        tags: (self.tags).toLowerCase(),
        token: self.token
      })
      .then(response => {
        self.todo = ''
        self.tags = ''
        self.tglTaskTodo = ''
        self.populateTodo()
      })
      .catch(err => {

      })
    },
    searchTag: function(e) {
      e.preventDefault()
      console.log('tes');
      let result = []
      if(this.search.length > 0) {
        this.todos.forEach(todo => {
          if(todo.tags.includes((this.search).toLowerCase())) {
            result.push(todo)
          }
        })
        this.getSearch = true
      } else {
        this.populateTodo()
      }
      this.todos = result
      this.search = ''
    },
    doLogout(){
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      window.location.href = "./index.html";
    }
  }
})
